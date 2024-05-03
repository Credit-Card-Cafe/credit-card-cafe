import { collection, doc, getDoc, where, query, getDocs, type DocumentData, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";
import type { BankType, CreditCardType, Submission, UserType } from "$lib/types";
import { get } from "svelte/store";
import { cardList } from "$lib/stores";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import type { User } from "firebase/auth";

//gets one card from its ID
export async function getOneCardByID(id: string) {
    const docRef = doc(db, "creditCards", id);
    const docSnap: DocumentData | undefined = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  }
  
  //finds the first card with the given url
  export async function getOneCardByURL(url: string){
    const docQuery = query(collection(db, "creditCards"), where("url", "==", url));
    const docs = await getDocs(docQuery);
    if (!docs.empty) {
      const card = docs.docs[0];
      return card.data() as CreditCardType | undefined;
    } 
  } 
  
  export async function getOneBankByURL(url: string) {
    const docQuery = query(collection(db, "banks"), where("url", "==", url));
    const docs = await getDocs(docQuery);
    if (!docs.empty) {
      const bank = docs.docs[0];
      return bank.data() as BankType | undefined;
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
  
  export async function getCards() {
    const order = query(
      collection(db, "creditCards"),
      orderBy("name", "asc"),
      limit(50)
    );
    let list;
    if (get(cardList).length > 0) {
      list = get(cardList);
    } else {
      const queryDocs = await getDocs(order);
      list = queryDocs.docs.map((doc) => doc.data() as CreditCardType);
      cardList.set(list);
    }
    return list;
  }
  
  export async function getBanks():Promise<BankType[]> {
    const bankCollection = collection(db, "banks");
    const bankDocs = await getDocs(bankCollection);
    const list = bankDocs.docs.map((doc) => doc.data() as BankType);
    return list;
  }
  
  
  // export async function getSubmissions() {
  //   const subCollection = query(collection(db, "submissions"), where('display','==',true));
  //   const subdocs = await getDocs(subCollection);
  //   const list = subdocs.docs.map((doc) => {
  //     let obj = doc.data()
  //     obj.id = doc.id
  //     return obj as Submission
  //   });
  //   return list;
  // }
  
  export async function getCardImage(card: CreditCardType) {
    const storage = getStorage();
    const imgRef = ref(storage, 'images/' + card.id + ".png");
    return await getDownloadURL(imgRef);
  }

  // export async function getUserDocData(authUser: User) {
  //   if (authUser) {
  //     const docRef = doc(db, "users", authUser.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log("Document exists!")
  //       let document: UserType = {
  //           uid: authUser.uid,
  //           email: authUser.email,
  //           display_name: authUser.displayName,
  //           wallet: docSnap.data().wallet,
  //           tracking: docSnap.data().tracking,
  //           custom_choices: docSnap.data().custom_choices,
  //         }
  //       return document;
  //     }
  //   }
  //   return undefined; 
  // }