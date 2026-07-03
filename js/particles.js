/**
 * particles.js — Canvas-based gold sparkle/confetti particle system
 * Triggered on envelope open and can be called manually.
 */

(function () {
  'use strict';

  const COLORS = [
    '#C9A84C', '#E4C97B', '#F0D98A', '#A07830',
    '#8B2E47', '#E8B4C0', '#FDF6EE', '#ffffff'
  ];

  let canvas, ctx;
  let particles = [];
  let animFrame = null;
  let active    = false;

  class Particle {
    constructor(x, y, burst) {
      this.x     = x;
      this.y     = y;
      this.vx    = (Math.random() - 0.5) * (burst ? 14 : 4);
      this.vy    = Math.random() * (burst ? -16 : -5) - (burst ? 2 : 1);
      this.size  = Math.random() * (burst ? 7 : 4) + (burst ? 2 : 1);
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = 1;
      this.decay = Math.random() * 0.012 + (burst ? 0.012 : 0.006);
      this.gravity = 0.25;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.15;
      this.shape = Math.random() > 0.5 ? 'circle' : 'rect';
    }

    update() {
      this.vy += this.gravity;
      this.x  += this.vx;
      this.y  += this.vy;
      this.alpha -= this.decay;
      this.rotation += this.rotSpeed;
      this.vx *= 0.995; // slight air resistance
    }

    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      if (this.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.5);
      }
      ctx.restore();
    }

    isDead() { return this.alpha <= 0 || this.y > window.innerHeight + 50; }
  }

  function ensureCanvas() {
    if (canvas) return;
    canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.cssText = `
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 40;
    `;
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function startLoop() {
    if (active) return;
    active = true;
    loop();
  }

  function loop() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(p => !p.isDead());
    particles.forEach(p => { p.update(); p.draw(ctx); });

    if (particles.length > 0) {
      animFrame = requestAnimationFrame(loop);
    } else {
      active = false;
      cancelAnimationFrame(animFrame);
    }
  }

  /**
   * Burst — large explosion of particles at (x, y)
   * Called on envelope open
   */
  function burst(x, y, count = 60) {
    ensureCanvas();
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(x, y, true));
    }
    startLoop();
  }

  /**
   * Scatter — gentle scatter from a position (for ambient effects)
   */
  function scatter(x, y, count = 12) {
    ensureCanvas();
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(x, y, false));
    }
    startLoop();
  }

  /**
   * Rain — gentle confetti falling from top (for celebration state)
   */
  function rain() {
    ensureCanvas();
    const spawnInterval = setInterval(() => {
      const x = Math.random() * window.innerWidth;
      particles.push(new Particle(x, -10, false));
      particles.push(new Particle(x + (Math.random() - 0.5) * 100, -10, false));
    }, 120);

    startLoop();

    setTimeout(() => clearInterval(spawnInterval), 5000);
  }

  // Expose globally
  window.ParticleSystem = { burst, scatter, rain };
})();
