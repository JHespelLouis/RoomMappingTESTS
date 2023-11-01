import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgTMDZFE34kAzTXCYyHlR2S2mjfEhwVOM",
  authDomain: "roommapping-enhance-exp.firebaseapp.com",
  projectId: "roommapping-enhance-exp",
  storageBucket: "roommapping-enhance-exp.appspot.com",
  messagingSenderId: "1000583574",
  appId: "1:1000583574:web:79ed57486ecd415a27edb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };