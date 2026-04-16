const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));

if (revealElements.length) {
  const reveal = (element) => {
    requestAnimationFrame(() => {
      element.classList.add("is-visible");
    });
  };

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 90}ms`;
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(reveal);
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        revealElements.forEach((element) => {
          observer.observe(element);
        });
      });
    });
  }
}
