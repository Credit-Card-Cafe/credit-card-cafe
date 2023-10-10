import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { user } from "./stores";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

async function getCards(db) {
  const cardsCollection = collection(db, "creditCards");
  const cardsDocs = await getDocs(cardsCollection);
  const cardsList = cardsDocs.docs.map((doc) => doc.data());
  return cardsList;
}

export const cardList = getCards(db);

//google sign in
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

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

onAuthStateChanged(auth, (client) => {
  if (client) {
    user.set(client);
  } else {
    user.set();
  }
});

export async function logout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

//DATA NOT SANATIZED, so pretty please dont go live :)
export async function addCard(name, bank, network, id) {
  await setDoc(doc(db, "creditCards", id), {
    name: name,
    bank: bank,
    network: network,
    url: id,
  });
}

//DATA NOT SANATIZED, so pretty please dont go live :)
export async function updateCard(card, id) {
  const ccard = doc(db, "creditCards", id);
  return updateDoc(ccard, card);
}
