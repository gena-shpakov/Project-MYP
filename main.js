window.addEventListener('load', () => {
    if (typeof gsap !== "undefined") {
        const tl = gsap.timeline();
        tl.to("header", { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power4.out" 
        })
        .to(".pre-title", { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        .to(".main-title", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .to(".hero-image-wrapper", { opacity: 1, y: 0, duration: 1 }, "-=0.6")
        .to(".hero-description", { opacity: 1, y: 0, duration: 0.8 }, "-=0.8")
        .to(".cta-button", { opacity: 1, y: 0, duration: 0.5 }, "-=0.5");
    }
});
if (document.querySelector('.archive-page')) {
    gsap.from(".archive-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
    });
}

if (document.querySelector('.about-page')) {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });

    tl.from(".about-title", { opacity: 0, y: 50 })
      .from(".disclaimer-box", { opacity: 0, x: -20 }, "-=0.5")
      .from(".mission-section", { opacity: 0, y: 30 }, "-=0.7")
      .from(".official-links", { opacity: 0, y: 30 }, "-=0.7")
      .from(".back-link", { opacity: 0 }, "-=0.5");
}