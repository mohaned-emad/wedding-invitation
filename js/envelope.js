/**
 * envelope.js — Envelope interaction and opening animation sequence
 */

(function () {
  'use strict';

  let hasOpened = false;

  function initEnvelope() {
    const scene     = document.getElementById('envelope-scene');
    const wrapper   = document.querySelector('.envelope-wrapper');
    const seal      = document.querySelector('.wax-seal');
    const mainInv   = document.getElementById('invitation-main');

    if (!scene || !wrapper || !mainInv) return;

    // Trigger on clicking either the seal or anywhere on the envelope
    [seal, wrapper].forEach(el => {
      if (el) el.addEventListener('click', openEnvelope);
    });

    function openEnvelope() {
      if (hasOpened) return;
      hasOpened = true;

      // 1. Stop floating animation, start opening class
      wrapper.classList.add('opening');

      // 2. Fire gold particle burst from seal position
      const sealRect = seal.getBoundingClientRect();
      if (window.ParticleSystem) {
        window.ParticleSystem.burst(
          sealRect.left + sealRect.width / 2,
          sealRect.top  + sealRect.height / 2,
          60
        );
      }

      // 3. After flap flips (1s), slide card out and fade envelope
      setTimeout(() => {
        // Show the invitation behind the scene
        mainInv.style.display = 'block';
        document.body.classList.add('invitation-open');

        // Slight delay then fade scene out
        setTimeout(() => {
          scene.classList.add('fade-out');

          // After scene fades, hide it completely and reveal invitation
          scene.addEventListener('transitionend', function onFadeOut(e) {
            if (e.propertyName !== 'opacity') return;
            scene.style.display = 'none';
            scene.removeEventListener('transitionend', onFadeOut);

            // Trigger entrance animation on the invitation
            requestAnimationFrame(() => {
              mainInv.classList.add('visible');

              // Start music autoplay (user gesture happened)
              if (window.MusicPlayer) {
                window.MusicPlayer.tryAutoplay();
              }

              // Trigger scroll animations
              if (window.ScrollAnimations) {
                window.ScrollAnimations.init();
              }
            });
          });
        }, 400);
      }, 900);
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnvelope);
  } else {
    initEnvelope();
  }
})();
