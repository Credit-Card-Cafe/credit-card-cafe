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

// https://firebase.google.com/docs/web/setup#available-libraries

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHdRUzJTM-_3JQr4LW9fYS3935w28FHKw",
  authDomain: "creditcarddb-3fafd.firebaseapp.com",
  projectId: "creditcarddb-3fafd",
  storageBucket: "creditcarddb-3fafd.appspot.com",
  messagingSenderId: "992368058830",
  appId: "1:992368058830:web:393c3331148baba69a8b9f",
};

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
      user.set(client);
      // IdP data available using getAdditionalUserInfo(result)
      //if user not in database
      initUserData();
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

//adds user paramaters from database to local client
export async function initUserData() {
  console.log("read")
  let uid = ""
  user.subscribe((usr) => {
    uid = usr.uid;
  })
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    user.update((usr) => {
      return {...usr, ...docSnap.data()}
    });
    user.subscribe((usr) => {
    })
  } else {
    let usr = {
      username: "",
      wallet: [],
      tracking: [],
    }
    await setDoc(doc(db, "users", uid), usr);
  }
}

//checks for user logged in; sets user
onAuthStateChanged(auth, (client) => {
  if (client) {
    user.set(client);
    initUserData();
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
