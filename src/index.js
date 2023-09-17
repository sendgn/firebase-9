import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where
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
// ---------------------------
// Set a subscription (or real time listener) to a firestore collection
// to apply changes on a webpage without refreshing it
// ---------------------------------------------------------
// The second argument is a callback that fires every time
// there's a change in the collection and it send us back a new snapshot
// and also once initially as well
onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log('All books:');
  console.log(books);
});

// Firestore queries
const q = query(colRef, where('author', '==', 'Alexandre Dumas'));

// We're gonna get real time data whenever the data changes
// that includes the 'author' property to be 'Alexandre Dumas'
// -------------------------------------------------------------
// So now if we add a new book where the 'author' is 'Alexandre Dumas'
// that will fire this function right here where we get a new snapshot
// ---------------------------------------------------------------------
// If we add a new book where the 'author' is NOT 'Alexandre Dumas'
// then we're NOT gonna get a new snapshot
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log('Alexandre Dumas\' books:');
  console.log(books);
});

// Adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value
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
    })
});
