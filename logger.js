import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCNTaXpk4Bpo8iG9Rt-_HbRj8nLgcnGxm0",
    authDomain: "projectmyp-88373.firebaseapp.com",
    databaseURL: "https://projectmyp-88373-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "projectmyp-88373",
    storageBucket: "projectmyp-88373.firebasestorage.app",
    messagingSenderId: "836849026238",
    appId: "1:836849026238:web:f578478f70b1a85faa0aef"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function getLocation() {
    try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        return {
            city: data.city || "Невідомо",
            region: data.region || "",
            country: data.country || "Невідомо",
        };
    } catch (error) {
        console.error("Не вдалося визначити місто:", e);
        return {
            city: "Невідомо",
            region: "",
            country: "Невідомо",
        };
    }
}

async function logVisit() {
  if (sessionStorage.getItem('visit_logged')) return;

  const visitsRef = ref(database, 'visits');
  let pageName = window.location.pathname.split('/').pop();
  if (!pageName) pageName = 'index.html';

  const location = await getLocation();

  push(visitsRef, {
    page: pageName,
    timestamp: serverTimestamp(),
    userAgent: navigator.userAgent.substring(0, 60),
    city: location.city,
    region: location.region,
    country: location.country
  }).then(() => {
    sessionStorage.setItem('visit_logged', 'true');
  }).catch(console.error);
}

logVisit();