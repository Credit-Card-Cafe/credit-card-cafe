import { initializeApp } from "firebase/app";
import {
  collection,
  onSnapshot,
  getFirestore,
  setDoc,
  updateDoc,
  doc,
  query,
  limit,
  orderBy,
  getDocs,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { user, cardList, oneCard } from "./stores";
import { firebaseConfig } from "../../firebaseconfig"


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//----------------------Database read functions-----------------

//gets a singular doc from its URL
export async function getOne(url) {
  const docRef = doc(db, "creditCards", url);
  const docSnap = await getDoc(docRef);
  oneCard.set(docSnap.data());
  const sleep = (m) => new Promise((r) => setTimeout(r, m));
  await sleep(500);
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

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//----------------------Database write functions-----------------

//adds a new card to the database
//DATA NOT SANATIZED, so pretty please dont go live :)
export async function addCard(card) {
  await setDoc(doc(db, "creditCards", card.url), card);
}

//updates a card in the database
//DATA NOT SANATIZED, so pretty please dont go live :)
export async function updateCard(card, id) {
  const ccard = doc(db, "creditCards", id);
  return updateDoc(ccard, card);
}

export async function updateUser(field, value) {
  let uid = ""
  user.subscribe((usr) => {
    uid = usr.uid;
  })
  const userDoc = doc(db, "users", uid);
  const sleep = (m) => new Promise((r) => setTimeout(r, m));
  await sleep(500);
  return updateDoc(userDoc, {
    [field]: [...value]
  })
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
      console.log(docSnap.data())
      user.set({ ...client, ...docSnap.data() });
    } else {
      await setDoc(doc(db, "users", {
        username: "",
        wallet: [],
        tracking: []
      })).then((obj) => {
        console.log(obj)
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
