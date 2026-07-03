/**
 * music.js — Background music player with floating toggle button
 *
 * Uses a royalty-free elegant wedding/classical music piece via CDN.
 * Source: Musopen (public domain classical music)
 * Track: Johann Pachelbel — Canon in D Major (public domain)
 */

(function () {
  'use strict';

  let audio   = null;
  let btn     = null;
  let isPlaying = false;

  // Public domain wedding music — Pachelbel's Canon in D (Musopen CDN)
  const MUSIC_URL = 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Pachelbel%27s_Canon_in_D_Major.ogg';

  // Fallback to another public domain source if above fails
  const MUSIC_FALLBACK = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  function createAudio() {
    audio = new Audio();
    audio.loop   = true;
    audio.volume = 0;

    // Try main source, fallback on error
    audio.src = MUSIC_URL;
    audio.addEventListener('error', () => {
      if (audio.src !== MUSIC_FALLBACK) {
        audio.src = MUSIC_FALLBACK;
        audio.load();
        if (isPlaying) audio.play().catch(() => {});
      }
    });
  }

  function fadeVolume(target, duration = 1500) {
    if (!audio) return;
    const start   = audio.volume;
    const diff    = target - start;
    const steps   = 30;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      audio.volume = Math.min(1, Math.max(0, start + diff * (step / steps)));
      if (step >= steps) {
        clearInterval(timer);
        if (target === 0) audio.pause();
      }
    }, interval);
  }

  function play() {
    if (!audio) createAudio();
    audio.play().then(() => {
      isPlaying = true;
      fadeVolume(0.35);
      btn.classList.add('playing');
      btn.setAttribute('aria-label', 'Pause music / إيقاف الموسيقى');
      btn.innerHTML = '♪';
    }).catch(() => {
      // Autoplay blocked — update icon to show it needs manual tap
      isPlaying = false;
    });
  }

  function pause() {
    fadeVolume(0, 800);
    setTimeout(() => {
      isPlaying = false;
      btn.classList.remove('playing');
      btn.setAttribute('aria-label', 'Play music / تشغيل الموسيقى');
      btn.innerHTML = '♩';
    }, 850);
  }

  function toggle() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function initButton() {
    btn = document.getElementById('music-toggle');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'music-toggle';
      document.body.appendChild(btn);
    }
    btn.innerHTML = '♩';
    btn.setAttribute('aria-label', 'Play music / تشغيل الموسيقى');
    btn.title = 'Toggle Music';
    btn.addEventListener('click', toggle);
  }

  /**
   * Called after the envelope opens (user gesture = autoplay allowed)
   */
  function tryAutoplay() {
    if (!btn) initButton();
    if (!isPlaying) play();
  }

  function init() {
    createAudio();
    initButton();
  }

  // Expose globally
  window.MusicPlayer = { tryAutoplay, play, pause, toggle };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
