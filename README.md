# 💍 Mostafa & Nada — Digital Wedding Invitation

A highly interactive, bilingual (Arabic/English) digital wedding invitation built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

- **Envelope Interaction** — 3D animated envelope with wax seal that opens on click
- **Gold Particle Burst** — Celebratory confetti on envelope open
- **Elegant Animations** — Scroll-triggered fade-in/slide-up animations throughout
- **Live Countdown** — Ticking countdown to August 14, 2026
- **Background Music** — Pachelbel's Canon in D with floating mute toggle
- **Bilingual** — Full Arabic/English content
- **Placeholder Sections** — Gallery, Love Story Timeline, Quote, Dress Code (ready for your content)
- **Fully Responsive** — Mobile, tablet, desktop
- **No Dependencies** — Pure HTML, CSS, JavaScript

## 📁 Project Structure

```
wedding-invitation/
├── index.html              # Main page
├── css/
│   ├── variables.css       # 🎨 Theme colors, fonts, spacing (edit here to retheme)
│   ├── base.css            # Reset & global styles
│   ├── envelope.css        # Envelope interaction styles
│   ├── invitation.css      # Main invitation content styles
│   ├── music.css           # Music toggle button
│   └── responsive.css      # Breakpoints
├── js/
│   ├── envelope.js         # Envelope open animation sequence
│   ├── countdown.js        # Live countdown timer
│   ├── particles.js        # Gold confetti particle system
│   ├── animations.js       # Scroll-triggered animations
│   └── music.js            # Background music player
└── assets/
    └── images/
        ├── groom.jpg       # Groom illustration
        ├── bride.jpg       # Bride illustration
        └── floral.jpg      # Corner ornament
```

## 🚀 Getting Started

No build step needed. Just open `index.html` in a browser:

```bash
# Option 1: Double-click index.html
# Option 2: Use VS Code Live Server extension
# Option 3: Simple HTTP server
npx serve .
```

## 🎨 Customization

### Change Theme Colors
Edit `css/variables.css` — all colors are CSS custom properties:

```css
:root {
  --burgundy: #6D1F34;   /* Main dark color */
  --blush:    #E8B4C0;   /* Soft accent */
  --cream:    #FDF6EE;   /* Background */
  --gold:     #C9A84C;   /* Gold accents */
}
```

### Change Wedding Details
Edit `index.html` — search for these values:
- `Mostafa` / `Nada` — couple's names
- `مصطفى و ندى` — Arabic names
- `August 14, 2026` — date text
- `7:00 PM` — time

Update the countdown date in `js/countdown.js`:
```js
const WEDDING_DATE = new Date('2026-08-14T19:00:00+03:00');
```

### Add Gallery Photos
Replace the `.gallery-placeholder` divs in `index.html` with:
```html
<img src="your-photo.jpg" alt="Description" class="gallery-photo" />
```

### Add Timeline Events
Replace placeholder text in `#section-timeline` with your real dates and stories.

### Add Your Quote / Message
Edit the `#section-quote` section in `index.html`.

### Update Dress Code Colors
Change the `background` color of `.dresscode-swatch` elements in `index.html`.

## 🌐 Sharing

Host on any static file host:
- [Netlify](https://netlify.com) — drag & drop the folder
- [Vercel](https://vercel.com) — `npx vercel`
- [GitHub Pages](https://pages.github.com)

## 📝 License

Personal use — made with ❤️ for Mostafa & Nada's special day.
