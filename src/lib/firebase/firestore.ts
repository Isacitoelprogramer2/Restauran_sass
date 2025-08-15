import { db } from "./config";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

export const createDocument = async (collectionName: string, data: any) => {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, data);
  return docRef.id;
};

export const getDocuments = async (collectionName: string) => {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
};

export const deleteDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};
