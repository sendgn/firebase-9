import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  getDocs, query, where,
  orderBy, serverTimestamp,
  getDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB-qOtsmwlOtOUNHQbx6rf_enkxzc2ZlHs",
  authDomain: "fir-9-dojo-cbbb2.firebaseapp.com",
  projectId: "fir-9-dojo-cbbb2",
  storageBucket: "fir-9-dojo-cbbb2.appspot.com",
  messagingSenderId: "587458817876",
  appId: "1:587458817876:web:27f3fded09a57f0a1a22c1"
};

// Init firebase app
// ----------------------
// connect our app to firebase backend using the config
initializeApp(firebaseConfig);

// Init services
// ---------------
// it represents our data base connection, and anytime we do smth
// with the database like reach out to get data we're gonna use this constant
const db = getFirestore();

// Collection ref
// ----------------
// get an access to a specific collection (in our case - books)
const colRef = collection(db, 'books');

// Real time collection data
// onSnapshot(colRef, (snapshot) => {
//   let books = [];
//   snapshot.docs.forEach((doc) => {
//     books.push({ ...doc.data(), id: doc.id });
//   });
//   console.log(books);
// });

// Firestore queries
const q = query(colRef, orderBy('createdAt'));

// Realtime collection data (but callback doesn't fire when we change collection directly from firebase website)
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// Adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
    .then(() => {
      addBookForm.reset();
    });
});

// Deleting documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get a document reference we want to delete
  const docRef = doc(db, 'books', deleteBookForm.id.value);

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset();
    });
});

// Get a single document
const docRef = doc(db, 'books', '3l6gzWekugv3x66mIIk9');

// get document once
// getDoc(docRef)
//   .then((doc) => {
//     console.log(doc.data(), doc.id);
//   });

// Real time subscription to a document
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});
