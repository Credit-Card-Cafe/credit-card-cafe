import { PUBLIC_FIREBASE_CLIENT_CONFIG } from "$env/static/public";
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

export const app: FirebaseApp = initializeApp(JSON.parse(PUBLIC_FIREBASE_CLIENT_CONFIG));
export const db: Firestore = getFirestore(app);