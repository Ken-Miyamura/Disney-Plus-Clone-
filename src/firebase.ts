import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from "firebase/storage";

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  databaseURL: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyCkQBXHGDXlEl-Nx88obGavoIvjeicNQ6Q",
  authDomain: "disney-plus-clone-3cbbd.firebaseapp.com",
  projectId: "disney-plus-clone-3cbbd",
  storageBucket: "disney-plus-clone-3cbbd.appspot.com",
  messagingSenderId: "837097826014",
  appId: "1:837097826014:web:2946c66aabb5263513444f",
  databaseURL: "https://disney-plus-clone-3cbbd.firebaseio.com"
};

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(firebaseApp);
const auth: Auth = getAuth(firebaseApp);
const provider: GoogleAuthProvider = new GoogleAuthProvider();
const storage: FirebaseStorage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
