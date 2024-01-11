import { initializeApp } from "firebase/app";
import { collection, onSnapshot, getFirestore, setDoc, updateDoc, doc, query, limit,orderBy, getDocs, getDoc, where, Firestore, type DocumentData} from "firebase/firestore";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, OAuthCredential, type UserCredential, type User } from "firebase/auth";
import { user, cardList, oneCard } from "./stores";
import { firebaseConfig } from "../../firebaseconfig"
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import type { BankType, CreditCardType, Submission } from "./types";

//lmao lets make the user wait longer for the website to load
const sleep = () => new Promise((r) => setTimeout(r, 500));

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db:Firestore = getFirestore(app);
const storage = getStorage();

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//----------------------Database read functions-----------------

//gets a singular doc from its ID
export async function getOne(id: string) {
  const docRef = doc(db, "creditCards", id);
  const docSnap: DocumentData | undefined = await getDoc(docRef);
  oneCard.set(docSnap.data());
  await sleep();
  if (docSnap.exists()) {
    return docSnap.data();
  }
}

export async function getOneBank(id: string) {
  const docRef = doc(db, "banks", id);
  const docSnap: DocumentData | undefined = await getDoc(docRef);
  oneCard.set(docSnap.data());
  await sleep();
  if (docSnap.exists()) {
    return docSnap.data();
  }
}

//gets an ordered list of cards
export async function orderCards(param:string, results:number) {
  const order = query(
    collection(db, "creditCards"),
    orderBy(param, "asc"),
    limit(results)
  );
  const queryDocs = await getDocs(order);
  const queryList = queryDocs.docs.map((doc) => doc.data() as CreditCardType);
  return queryList;
}

//Will call upon app creation. Does not need to be referenced.
//Could be expensive?
export const unsubCards = onSnapshot(
  collection(db, "creditCards"),
  (creditCards) => {
    const list:Array<CreditCardType> = creditCards.docs.map((doc) => doc.data() as CreditCardType);
    cardList.set(list);
  }
);

async function getBanks(db:Firestore) {
  const bankCollection = collection(db, "banks");
  const bankDocs = await getDocs(bankCollection);
  const list = bankDocs.docs.map((doc) => doc.data() as BankType);
  return list;
}

export const getBankList = getBanks(db);

async function getSubmissions(db:Firestore) {
  const subCollection = query(collection(db, "submissions"), where('display','==',true));
  const subdocs = await getDocs(subCollection);
  const list = subdocs.docs.map((doc) => {
    let obj = doc.data()
    obj.id = doc.id
    return obj as Submission
  });
  return list;
}

export const getSubmissionList = getSubmissions(db);

export async function getCardImage(card: CreditCardType) {
  const imgRef = ref(storage, 'images/' + card.id + ".png");
  return await getDownloadURL(imgRef);
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//----------------------Database write functions-----------------

//adds a new card to the database
//DATA NOT SANATIZED, so pretty please dont go live :)
export async function addCard(card: CreditCardType) {
  await setDoc(doc(db, "creditCards", card.id), card);
}

export async function addBank(bank: BankType) {
  await setDoc(doc(db, "banks", bank.id), bank);
}

export async function addSubmission(submission: Submission) {
  if (submission.image) { //add image to storage if submission is an update
    const imgRef = ref(storage, 'images/' + submission.obj.id + ".png");
    uploadBytes(imgRef, submission.image).then(() => {
      delete submission.image;
    }).catch(() => {
      delete submission.image
    })
  }
  await setDoc(doc(collection(db, "submissions")), submission);
}

//updates a card in the database
//DATA NOT SANATIZED, so pretty please dont go live :)
export async function updateCard(card:CreditCardType) {
  if (card.image && card.image != "pending" && typeof card.image != 'boolean') {
    const imgRef = ref(storage, 'images/' + card.id + ".png");
    uploadBytes(imgRef, card.image).then(() => {
      card.image = true
    }).catch((e) => {
      console.log(e);
      card.image = false;
    });
  }
  const ccard = doc(db, "creditCards", card.id);
  return updateDoc(ccard, card);
}


export async function updateUser(field: "wallet" | "tracking", value:Array<string>) {
  let uid: string | undefined = "";
  user.subscribe((usr) => {
    if (usr) {
      uid = usr.uid;
    }
  })
  const userDoc = doc(db, "users", uid);
  return updateDoc(userDoc, {
    [field]: [...value]
  })
}

export async function updateSubmission(submission: Submission) {
  if (submission.id) {
    const subDoc = doc(db, "submissions", submission.id);
    return updateDoc(subDoc, submission as object);
  }
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//----------------------Firebase Auth functions-----------------

//initialize google sign in
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

//log in function
export async function logIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
      //const token = credential.accessToken;
      // The signed-in user info.
      const client = result.user;
      initUserData(client);
      // IdP data available using getAdditionalUserInfo(result)
      //if user not in database
    })
    .catch((error) => {
      // Handle Errors here.
      //const errorCode = error.code;
      //const errorMessage = error.message;
      // The email of the user's account used.
      //const email = error.customData.email;
      // The AuthCredential type that was used.
      //const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

async function initUserData(client: User) {
    const docRef = doc(db, "users", client.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      user.set({
        displayName: client.displayName,
        admin: docSnap.data().admin,
        wallet: docSnap.data().wallet,
        tracking: docSnap.data().tracking,
        uid: client.uid,
        email: client.email,
        });
    } else {
      await setDoc(doc(db, "users", client.uid),{
        wallet: [],
        tracking: []
      }).then((obj) => {
        user.set({
          displayName: client.displayName,
          wallet: [],
          tracking: [],
          uid: client.uid,
          email: client.email,
        });
      });
    }
}
  

//checks for user logged in; sets user
onAuthStateChanged(auth, (client) => {
  if (client) {
    initUserData(client);
  } else {
    user.set(null);
  }
});

//log out
export async function logout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
