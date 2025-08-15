import { auth } from "./config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createDocument } from "./firestore";

export const register = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};

export const onUserStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Login con Google
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  if (user) {
    // Guardar nombre y foto de avatar en Firestore (colección 'users')
    await createDocument("users", {
      uid: user.uid,
      name: user.displayName,
      avatar: user.photoURL,
      email: user.email,
      provider: "google"
    });
  }
  return user;
};
