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
        const response = await fetch("https://ipwho.is/");
        const data = await response.json();

        return {
            city: data.city || "Невідомо",
            region: data.region || "",
            country: data.country || "Невідомо",
            ip: data.ip || ""
        };
    } catch (error) {
        console.error("Помилка геолокації:", error);
        return {
            city: "Невідомо",
            region: "",
            country: "Невідомо",
            ip: ""
        };
    }
}

async function logVisit() {
    let pageName = window.location.pathname.split("/").pop();
    if (!pageName || pageName === "") pageName = "index.html";

    const sessionKey = `visit_logged_${pageName}`;

    if (sessionStorage.getItem(sessionKey)) {
        console.log(`Сторінка ${pageName} вже зафіксована у цьому сеансі.`);
        return;
    }

    try {
        const location = await getLocation();
        const visitsRef = ref(database, "visits");

        await push(visitsRef, {
            page: pageName,
            timestamp: serverTimestamp(),
            url: window.location.href,
            referrer: document.referrer || "direct",
            userAgent: navigator.userAgent.substring(0, 80),
            city: location.city,
            region: location.region,
            country: location.country,
            ip: location.ip
        });

        sessionStorage.setItem(sessionKey, "true");
        console.log(`Візит на ${pageName} успішно записано.`);

    } catch (error) {
        console.error("Помилка запису в Firebase:", error);
    }
}

logVisit();