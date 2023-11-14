import { initializeApp } from "firebase/app";
import { collection, onSnapshot, getFirestore, setDoc, updateDoc, doc, query, limit,orderBy, getDocs, getDoc, where} from "firebase/firestore";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { user, cardList, oneCard } from "./stores";
import { firebaseConfig } from "../../firebaseconfig"
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

//lmao lets make the user wait longer for the website to load
const sleep = (m) => new Promise((r) => setTimeout(r, m));
const waitTime = 500;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//----------------------Database read functions-----------------

//gets a singular doc from its ID
export async function getOne(id) {
  const docRef = doc(db, "creditCards", id);
  const docSnap = await getDoc(docRef);
  oneCard.set(docSnap.data());
  await sleep(waitTime);
  if (docSnap.exists()) {
    return docSnap.data();
  }
}

export async function getOneBank(id) {
  const docRef = doc(db, "banks", id);
  const docSnap = await getDoc(docRef);
  oneCard.set(docSnap.data());
  await sleep(waitTime);
  if (docSnap.exists()) {
    return docSnap.data();
  }
}

//gets an ordered list of cards
export async function orderCards(param, results) {
  const order = query(
    collection(db, "creditCards"),
    orderBy(param, "asc"),
    limit(results)
  );
  const queryDocs = await getDocs(order);
  const queryList = queryDocs.docs.map((doc) => doc.data());
  return queryList;
}

//Will call upon app creation. Does not need to be referenced.
//Could be expensive?
export const unsubCards = onSnapshot(
  collection(db, "creditCards"),
  (creditCards) => {
    const list = creditCards.docs.map((doc) => doc.data());
    cardList.set(list);
  }
);

async function getBanks(db) {
  const bankCollection = collection(db, "banks");
  const bankDocs = await getDocs(bankCollection);
  const list = bankDocs.docs.map((doc) => doc.data());
  return list;
}

export const getBankList = getBanks(db);

async function getSubmissions(db) {
  const subCollection = query(collection(db, "submissions"), where('display','==',true));
  const subdocs = await getDocs(subCollection);
  const list = subdocs.docs.map((doc) => doc);
  return list;
}

export const getSubmissionList = getSubmissions(db);

export async function getCardImage(card) {
  const imgRef = ref(storage, 'images/' + card.id + ".png");
  return await getDownloadURL(imgRef);
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//----------------------Database write functions-----------------

//adds a new card to the database
//DATA NOT SANATIZED, so pretty please dont go live :)
export async function addCard(card) {
  await setDoc(doc(db, "creditCards", card.id), card);
}

export async function addBank(bank) {
  await setDoc(doc(db, "banks", bank.id), bank);
}

export async function addSubmission(obj, type) {
  let uid = ""
  user.subscribe((usr) => {
    uid = usr.uid;
  })
  if (Object.hasOwn(obj, "card") && Object.hasOwn(obj.card, "image")) {
    const imgRef = ref(storage, 'images/' + obj.id + ".png");
    uploadBytes(imgRef, obj.card.image).then(
      obj.card.image = true
    ).catch((e) => {
      console.log(e);
      obj.card.image = false;
    });
  }
  await setDoc(doc(collection(db, "submissions")), {
    obj: obj,
    type: type,
    user: uid,
    time: Date.now(),
    display: true
  });
}

//updates a card in the database
//DATA NOT SANATIZED, so pretty please dont go live :)
export async function updateCard(card, id) {
  if (Object.hasOwn(card, "image") && card.image != "pending") {
    const imgRef = ref(storage, 'images/' + id + ".png");
    uploadBytes(imgRef, card.image).then(
      card.image = true
    ).catch((e) => {
      console.log(e);
      card.image = false;
    });
  }
  const ccard = doc(db, "creditCards", id);
  return updateDoc(ccard, card);
}

export async function updateUser(field, value) {
  let uid = ""
  user.subscribe((usr) => {
    uid = usr.uid;
  })
  const userDoc = doc(db, "users", uid);
  return updateDoc(userDoc, {
    [field]: [...value]
  })
}

export async function updateSubmission(submission, id) {
  const subDoc = doc(db, "submissions", id);
  return updateDoc(subDoc, submission);
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
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const client = result.user;
      initUserData(client);
      // IdP data available using getAdditionalUserInfo(result)
      //if user not in database
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

async function initUserData(client) {
    const docRef = doc(db, "users", client.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      user.set({ ...client, ...docSnap.data() });
    } else {
      await setDoc(doc(db, "users", client.uid),{
        wallet: [],
        tracking: []
      }).then((obj) => {
        user.set({ ...client, ...obj });
      });
    }
}
  

//checks for user logged in; sets user
onAuthStateChanged(auth, (client) => {
  if (client) {
    initUserData(client);
  } else {
    user.set();
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
