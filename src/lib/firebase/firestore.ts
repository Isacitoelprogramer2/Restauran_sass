import { db } from "./config";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import type { Receta } from "@/types/receta";

export const createDocument = async (collectionName: string, data: Record<string, unknown>) => {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, data);
  return docRef.id;
};

export const getDocuments = async (collectionName: string) => {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateDocument = async (collectionName: string, id: string, data: Record<string, unknown>) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
};

export const deleteDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

export const createReceta = async (receta: Omit<Receta, "id">) => {
  const colRef = collection(db, "Recetas");
  const docRef = await addDoc(colRef, receta);
  return docRef.id;
};

export const updateReceta = async (id: string, receta: Partial<Receta>) => {
  const docRef = doc(db, "Recetas", id);
  await updateDoc(docRef, receta);
};

export const deleteReceta = async (id: string) => {
  const docRef = doc(db, "Recetas", id);
  await deleteDoc(docRef);
};
