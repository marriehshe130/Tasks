import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const tasksRef = db.collection('tasks');

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const tasksList = document.getElementById('tasks-list');


taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  if (task) {
    await tasksRef.add({ task });
    taskInput.value = '';
  }
});


tasksRef.onSnapshot((snapshot) => {
  tasksList.innerHTML = '';
  snapshot.forEach((doc) => {
    const li = document.createElement('li');
    li.textContent = doc.data().task;
    tasksList.appendChild(li);
  });
});
