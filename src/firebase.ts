// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCZXIVYI2Bq8OKeVXQyjZ7iaCX803BQeec',
  authDomain: 'nomad-nwitter-reloaded.firebaseapp.com',
  projectId: 'nomad-nwitter-reloaded',
  storageBucket: 'nomad-nwitter-reloaded.appspot.com',
  messagingSenderId: '208798134767',
  appId: '1:208798134767:web:8740dde64dcf502fbf061a',
  measurementId: 'G-GWWE68Y8FB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);
