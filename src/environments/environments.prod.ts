import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "a",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(environment);
const analytics = getAnalytics(app);