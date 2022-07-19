import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgAbuOdsXjnD0k4OVuRhvSRHjMRsiycEs",
  authDomain: "pide-tu-domi.firebaseapp.com",
  projectId: "pide-tu-domi",
  storageBucket: "pide-tu-domi.appspot.com",
  messagingSenderId: "874839859963",
  appId: "1:874839859963:web:4c14874547049b106d065e",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
