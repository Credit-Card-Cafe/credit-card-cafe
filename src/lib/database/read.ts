import { collection, doc, getDoc, where, query, getDocs, type DocumentData, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";
import type { BankType, CreditCardType } from "$lib/types";
import { get } from "svelte/store";
import { cardList } from "$lib/stores";
import { getDownloadURL, getStorage, ref } from "firebase/storage";


//gets one card from its ID
export async function getOneCardByID(id: string) {
    const docRef = doc(db, "creditCards", id);
    const docSnap: DocumentData | undefined = await getDoc(docRef);
    if (docSnap.exists()) {
      return {...docSnap.data(), id:id};
    }
  }
  
  //finds the first card with the given url
  export async function getOneCardByURL(url: string){
    const docQuery = query(collection(db, "creditCards"), where("url", "==", url));
    const docs = await getDocs(docQuery);
    if (!docs.empty) {
      const card = docs.docs[0];
      return {...card.data(), id:card.id} as CreditCardType | undefined;
    } 
  } 
  
  export async function getOneBankById(id: string) {
    const docRef = doc(db, "banks", id);
    const docSnap: DocumentData | undefined = await getDoc(docRef);
    if (docSnap.exists()) {
      return {...docSnap.data(), id:id} as BankType;
    } 
  }

  export async function getOneBankByURL(url: string) {
    const docQuery = query(collection(db, "banks"), where("url", "==", url));
    const docs = await getDocs(docQuery);
    if (!docs.empty) {
      const bank = docs.docs[0];
      return {...bank.data(), id:bank.id } as BankType | undefined;
    } 
  }

  export async function getCardsFromBankId(id: string) {
    let list:CreditCardType[] = []
    const docQuery = query(collection(db, "creditCards"), where("bank_id", "==", id));
    const docs = await getDocs(docQuery);
    if (!docs.empty) {
      docs.docs.forEach((card) => {
        list.push({...card.data(), id:card.id} as CreditCardType);
      });
    } 
    return list
  } 
  
  //gets an ordered list of cards
  export async function orderCards(param:string, results:number) {
    const order = query(
      collection(db, "creditCards"),
      orderBy(param, "asc"),
      limit(results)
    );
    const queryDocs = await getDocs(order);
    const queryList = queryDocs.docs.map((qdoc) => ({...qdoc.data(), id:qdoc.id} as CreditCardType));
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
      list = queryDocs.docs.map((qdoc) => ({...qdoc.data(), id:qdoc.id} as CreditCardType));
      cardList.set(list);
    }
    return list;
  }
  
  export async function getBanks():Promise<BankType[]> {
    const bankCollection = collection(db, "banks");
    const bankDocs = await getDocs(bankCollection);
    const list = bankDocs.docs.map((qdoc) => ({ ...qdoc.data(), id: qdoc.id } as BankType));
    return list;
  }
  
  export async function getCardImage(card: CreditCardType) {
    const storage = getStorage();
    const imgRef = ref(storage, 'images/' + card.id + ".png");
    return await getDownloadURL(imgRef);
  }

  export async function searchCreditCards(searchTerm:string ) {
    const cardsRef = collection(db, "creditCards");
    const q = query(cardsRef, where('search_terms', 'array-contains', searchTerm));
    let list:CreditCardType[] = []
    try {
        const docs = await getDocs(q);
        docs.docs.forEach((card) => {
          list.push({...card.data(), id:card.id} as CreditCardType);
        });
    } catch (error) {
        console.error("Error searching credit cards:", error);
    }
    return list
}

