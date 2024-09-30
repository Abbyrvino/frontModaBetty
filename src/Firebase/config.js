import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage, ref, uploadBytes} from 'firebase/storage'
import {v4}from 'uuid'

const firebaseConfig = {
  apiKey: "AIzaSyAI051ft26NPrUKhuLuHVAYej4qFb5Th5A",
  authDomain: "pruebaimgcafeseria.firebaseapp.com",
  projectId: "pruebaimgcafeseria",
  storageBucket: "pruebaimgcafeseria.appspot.com",
  messagingSenderId: "743832268414",
  appId: "1:743832268414:web:ded34a3ad62e88596af22f",
  measurementId: "G-PY8J9WKWES"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage=getStorage(app)
export function uploadFile(file){
    const storageRef=ref(storage, v4())
    uploadBytes(storageRef, file). then(snapshot =>{
        console.log(snapshot)
    }).catch(error => {
        console.error('Error al subir el archivo:', error);
    });
 }

