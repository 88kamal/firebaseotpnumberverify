// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBEtKy24aP0v8sWK51twQ4pR4YP9n7eOGg",
    authDomain: "fir-nextjs-f2292.firebaseapp.com",
    projectId: "fir-nextjs-f2292",
    storageBucket: "fir-nextjs-f2292.appspot.com",
    messagingSenderId: "43162643213",
    appId: "1:43162643213:web:aabb7f03b4d0dc9821de44",
    measurementId: "G-6ZM1BD0CHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const fireDb = getFirestore(app);
// const storage = getStorage(app);
export const auth = getAuth(app);

// export { fireDb, storage, auth };

