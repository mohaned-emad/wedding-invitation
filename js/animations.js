/**
 * animations.js — Scroll-triggered entrance animations (IntersectionObserver)
 */

(function () {
  'use strict';

  let observer = null;

  function init() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // Expose so envelope.js can call after invitation is shown
  window.ScrollAnimations = { init };

  // Auto-init on DOMContentLoaded (for non-envelope pages)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
