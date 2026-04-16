const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));

if (revealElements.length) {
  const reveal = (element) => {
    requestAnimationFrame(() => {
      element.classList.add("is-visible");
    });
  };

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return rect.top < viewportHeight * 0.92 && rect.bottom > 0;
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
          if (isInViewport(element)) {
            reveal(element);
            return;
          }

          observer.observe(element);
        });
      });
    });
  }
}
