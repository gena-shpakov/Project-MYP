import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
const auth = getAuth(app);


document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== "undefined") {
        const tl = gsap.timeline();

        tl.to("header", { opacity: 1, y: 0, duration: 1, ease: "power4.out" })
          .to(".pre-title", { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
          .to(".main-title", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
          .to(".hero-image-wrapper", { opacity: 1, y: 0, duration: 1 }, "-=0.6")
          .to(".hero-description", { opacity: 1, y: 0, duration: 0.8 }, "-=0.8")
          .to(".cta-button", { opacity: 1, y: 0, duration: 0.5 }, "-=0.5");
    }
});

if (document.querySelector('.archive-page') && typeof gsap !== "undefined") {
    gsap.from(".archive-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
    });
}

if (document.querySelector('.about-page') && typeof gsap !== "undefined") {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });
    tl.from(".about-title", { opacity: 0, y: 50 })
      .from(".disclaimer-box", { opacity: 0, x: -20 }, "-=0.5")
      .from(".mission-section", { opacity: 0, y: 30 }, "-=0.7")
      .from(".official-links", { opacity: 0, y: 30 }, "-=0.7")
      .from(".back-link", { opacity: 0 }, "-=0.5");
}

if (document.querySelector('.project-page') && typeof gsap !== "undefined") {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
    tl.from(".project-tag", { opacity: 0, y: 20 })
      .from(".project-title", { opacity: 0, y: 40 }, "-=0.6")
      .from(".project-lead", { opacity: 0, y: 30 }, "-=0.5")
      .from(".media-frame-wrapper", { opacity: 0, y: 50, scale: 0.98 }, "-=0.5")
      .from(".section-heading", { opacity: 0, y: 30 }, "-=0.5")
      .from(".team-card", { opacity: 0, y: 40, stagger: 0.15 }, "-=0.6")
      .from(".back-link", { opacity: 0 }, "-=0.4");
}

document.addEventListener('DOMContentLoaded', () => {
    const adminOverlay = document.getElementById('admin-auth-overlay');
    const passwordInput = document.getElementById('admin-password-input');
    const submitBtn = document.getElementById('auth-submit-btn');
    const closeBtn = document.getElementById('auth-close-btn');
    const errorMsg = document.getElementById('auth-error-msg');

    if (!adminOverlay) return;

    function openAdminAuth() {
        adminOverlay.classList.add('show');
        if (passwordInput) {
            passwordInput.value = '';
            setTimeout(() => passwordInput.focus(), 100);
        }
        if (errorMsg) {
            errorMsg.style.color = "var(--red)";
            errorMsg.innerText = '';
        }
    }

    function closeAdminAuth() {
        adminOverlay.classList.remove('show');
    }

    function checkAdminPassword() {
        const enteredPassword = passwordInput.value;

        if (!enteredPassword) {
            errorMsg.innerText = "❌ ВВЕДІТЬ КОД!";
            return;
        }

        errorMsg.style.color = "var(--black)";
        errorMsg.innerText = "З'ЄДНАННЯ З АРХІВОМ КДБ...";
        
        const adminEmail = "admin@projectmup.com"; 

        signInWithEmailAndPassword(auth, adminEmail, enteredPassword)
            .then((userCredential) => {
                errorMsg.style.color = "green";
                errorMsg.innerText = "ДОСТУП ДОЗВОЛЕНО. ВХІД В АРХІВ...";
                setTimeout(() => {
                    window.location.href = 'admin.html';
                }, 1000);
            })
            .catch((error) => {
                console.error("Помилка авторизації:", error.message);
                errorMsg.style.color = "var(--red)";
                errorMsg.innerText = "❌ ВІДМОВА У ДОСТУПІ: НЕВІРНИЙ КОД!";
                passwordInput.value = '';
                passwordInput.focus();
            });
    }

    const logoLink = document.querySelector('.logo-link');
    let clickCount = 0;
    let clickTimeout;

    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                openAdminAuth();
                return;
            }

            e.preventDefault();
            clickCount++;

            if (clickCount === 3) {
                clickCount = 0;
                clearTimeout(clickTimeout);
                openAdminAuth();
            } else {
                clearTimeout(clickTimeout);
                clickTimeout = setTimeout(() => {
                    clickCount = 0;
                    window.location.href = logoLink.getAttribute('href');
                }, 500);
            }
        });
    }

    let inputSequence = '';
    const secretCode = 'mup';

    window.addEventListener('keydown', (e) => {
        if (adminOverlay.classList.contains('show')) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key.length !== 1) return;

        inputSequence += e.key.toLowerCase();
        inputSequence = inputSequence.slice(-secretCode.length);

        if (inputSequence === secretCode) {
            inputSequence = '';
            openAdminAuth();
        }
    });

    if (submitBtn) submitBtn.addEventListener('click', checkAdminPassword);
    
    if (passwordInput) {
        passwordInput.addEventListener('keydown', (e) => { 
            if (e.key === 'Enter') checkAdminPassword(); 
        });
    }
    
    if (closeBtn) closeBtn.addEventListener('click', closeAdminAuth);
    
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && adminOverlay.classList.contains('show')) {
            closeAdminAuth();
        }
    });
});