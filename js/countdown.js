/**
 * countdown.js — Live countdown timer to the wedding date
 * Wedding: Friday, August 14, 2026 at 7:00 PM (Egypt time, UTC+3)
 */

(function () {
  'use strict';

  const WEDDING_DATE = new Date('2026-08-14T19:00:00+03:00');

  const labels = {
    days:    { en: 'Days',    ar: 'أيام'   },
    hours:   { en: 'Hours',   ar: 'ساعات'  },
    minutes: { en: 'Minutes', ar: 'دقائق'  },
    seconds: { en: 'Seconds', ar: 'ثواني'  },
  };

  let intervalId = null;
  let prevValues = { days: -1, hours: -1, minutes: -1, seconds: -1 };

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function getTimeLeft() {
    const now  = new Date();
    const diff = WEDDING_DATE - now;
    if (diff <= 0) return null;

    const totalSecs = Math.floor(diff / 1000);
    const days    = Math.floor(totalSecs / 86400);
    const hours   = Math.floor((totalSecs % 86400) / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    return { days, hours, minutes, seconds };
  }

  function animateNumber(el, newVal) {
    el.classList.remove('flip');
    // Force reflow so animation restarts
    void el.offsetWidth;
    el.textContent = pad(newVal);
    el.classList.add('flip');
  }

  function updateCountdown() {
    const timeLeft = getTimeLeft();

    const grid       = document.getElementById('countdown-grid');
    const celebration = document.getElementById('countdown-celebration');

    if (!timeLeft) {
      // Wedding day or past — show celebration
      if (grid)        grid.style.display = 'none';
      if (celebration) celebration.classList.add('visible');
      clearInterval(intervalId);
      return;
    }

    const keys = ['days', 'hours', 'minutes', 'seconds'];
    keys.forEach(key => {
      const numEl = document.getElementById(`cd-${key}`);
      if (!numEl) return;
      if (timeLeft[key] !== prevValues[key]) {
        animateNumber(numEl, timeLeft[key]);
        prevValues[key] = timeLeft[key];
      }
    });
  }

  function initCountdown() {
    // Build the countdown HTML
    const grid = document.getElementById('countdown-grid');
    if (!grid) return;

    const keys = ['days', 'hours', 'minutes', 'seconds'];
    grid.innerHTML = keys.map(key => `
      <div class="countdown-unit">
        <div class="countdown-box">
          <span class="countdown-number" id="cd-${key}">00</span>
        </div>
        <span class="countdown-label">${labels[key].en}</span>
        <span class="countdown-label-ar">${labels[key].ar}</span>
      </div>
    `).join('');

    // Run immediately, then tick every second
    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountdown);
  } else {
    initCountdown();
  }
})();
