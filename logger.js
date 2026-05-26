import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function logVisit() {
  if (sessionStorage.getItem('visit_logged')) {
    console.log("Сеанс уже зафіксовано. Захист від оновлення сторінки (F5) спрацював.");
    return; 
  }

  try {
    const visitsRef = ref(database, 'visits');
    let pageName = window.location.pathname.split('/').pop();
    if (!pageName || pageName === "") pageName = "index.html";

    push(visitsRef, {
      page: pageName,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent.substring(0, 60)
    }).then(() => {
      console.log(`Візит на сторінку /${pageName} успішно записано в архів Firebase!`);
      sessionStorage.setItem('visit_logged', 'true');
    }).catch((err) => {
      console.error("Firebase відхилив запис візиту:", err);
    });
  } catch (e) {
    console.error("Помилка модуля логування:", e);
  }
}

logVisit();