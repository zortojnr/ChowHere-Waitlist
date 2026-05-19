import { useEffect, useState } from "react";

const landingCSS = `
  :root {
    --green: #0F4C2A;
    --green-deep: #0a3520;
    --orange: #E8621A;
    --cream: #FAF5EC;
    --cream-muted: #f2e9d8;
    --dark: #0A1F10;
    --gold: #C9A227;
    --white: #ffffff;
    --shadow-soft: 0 2px 8px rgba(10,31,16,0.08), 0 8px 24px rgba(10,31,16,0.06);
    --shadow-lift: 0 4px 16px rgba(10,31,16,0.1), 0 16px 40px rgba(10,31,16,0.08);
    --shadow-hard: 4px 4px 0 rgba(10,31,16,0.85);
    --shadow-hard-sm: 2px 2px 0 rgba(10,31,16,0.85);
    --radius-sm: 0.5rem;
    --radius-md: 0.875rem;
    --radius-lg: 1.25rem;
    --radius-xl: 1.625rem;
    --radius-pill: 999px;
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 1rem;
    --space-4: 1.5rem;
    --space-5: 2.5rem;
    --space-6: 4rem;
    --section-y-sm: clamp(2.5rem, 6vw, 3.5rem);
    --section-y-lg: clamp(3.5rem, 8vw, 5.5rem);
    --container-max: min(1200px, 100% - 2.5rem);
    --prose-width: 42rem;
    --font-sans: "DM Sans", system-ui, -apple-system, sans-serif;
    --font-serif: "Playfair Display", Georgia, serif;
    --font-mono: "Space Grotesk", "Space Mono", ui-monospace, monospace;
  }

  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    font-family: var(--font-sans);
    font-size: 1rem;
    line-height: 1.65;
    color: var(--dark);
    background: var(--cream);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    padding-left: env(safe-area-inset-left, 0);
    padding-right: env(safe-area-inset-right, 0);
  }
  h1, h2, h3, h4 { font-family: var(--font-serif); font-weight: 900; line-height: 1.18; margin: 0 0 0.5rem; letter-spacing: -0.02em; }
  p { margin: 0 0 1rem; }
  p:last-child { margin-bottom: 0; }
  a { color: inherit; text-decoration: none; }
  button { font-family: var(--font-sans); }
  .container { width: var(--container-max); margin-inline: auto; }
  .reveal { opacity: 0; transform: translateY(1rem); transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1); }
  .reveal.reveal--visible { opacity: 1; transform: translateY(0); }
  @media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; transition: none; } }

  /* ── NAV ── */
  .site-header { position: sticky; top: 0; z-index: 1000; background: rgba(250,245,236,0.94); border-bottom: 1px solid rgba(10,31,16,0.1); backdrop-filter: saturate(1.4) blur(14px); -webkit-backdrop-filter: saturate(1.4) blur(14px); }
  @supports not (backdrop-filter: blur(1px)) { .site-header { background: var(--cream); } }
  .nav-inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-3); padding: 0.875rem 0; }
  .logo { display: inline-flex; align-items: center; gap: 0.6rem; font-family: var(--font-serif); font-weight: 900; font-size: 1.35rem; letter-spacing: -0.025em; color: var(--dark); }
  .logo-mark { width: 2rem; height: 2rem; flex-shrink: 0; background: linear-gradient(135deg, var(--green) 55%, var(--orange) 45%); border-radius: var(--radius-sm); box-shadow: 0 4px 12px rgba(10,31,16,0.15); }
  .logo span { color: var(--orange); }
  .nav-links { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-2) var(--space-4); list-style: none; margin: 0; padding: 0; }
  .nav-links a { font-size: 0.875rem; font-weight: 600; letter-spacing: 0.01em; padding: 0.25rem 0; border-bottom: 2px solid transparent; transition: color 0.18s, border-color 0.18s; }
  .nav-links a:hover { color: var(--orange); border-bottom-color: var(--orange); }

  /* ── BUTTONS ── */
  .btn { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; height: auto; font-family: var(--font-sans); font-weight: 700; font-size: 0.9375rem; letter-spacing: 0.01em; padding: 0.625rem 1.375rem; border: 1.5px solid rgba(10,31,16,0.15); border-radius: var(--radius-pill); cursor: pointer; transition: background 0.18s, color 0.18s, transform 0.12s, box-shadow 0.18s; white-space: nowrap; background: rgba(255,255,255,0.95); line-height: 1; }
  .btn:hover { transform: translateY(-1px); }
  .btn:active { transform: translateY(0); box-shadow: none !important; }
  .btn-orange { background: var(--orange); color: var(--white); border-color: transparent; box-shadow: 0 4px 14px rgba(232,98,26,0.28); }
  .btn-orange:hover { background: #d14f0e; box-shadow: 0 8px 22px rgba(232,98,26,0.32); }
  .btn-ghost { background: rgba(255,255,255,0.9); color: var(--dark); border-color: rgba(10,31,16,0.18); }
  .btn-ghost:hover { background: var(--dark); color: var(--cream); border-color: var(--dark); }

  /* ── HERO ── */
  .hero { position: relative; background: linear-gradient(155deg, #1a5c3a 0%, var(--green-deep) 45%, #071e10 100%); color: var(--cream); padding: clamp(3.5rem,8vw,6rem) 0; border-bottom: 1px solid rgba(250,245,236,0.15); overflow: hidden; }
  .hero-decor { position: absolute; inset: 0; pointer-events: none; background-image: radial-gradient(ellipse 80% 60% at 70% 40%, rgba(232,98,26,0.08) 0%, transparent 60%), repeating-linear-gradient(-48deg, transparent, transparent 18px, rgba(250,245,236,0.025) 18px, rgba(250,245,236,0.025) 19px); }
  .hero-inner { position: relative; z-index: 1; }
  .hero-grid { display: grid; gap: var(--space-5); align-items: end; margin-bottom: var(--space-5); }
  @media (min-width: 900px) { .hero-grid { grid-template-columns: 1fr minmax(220px,280px); gap: var(--space-6); } }
  .hero-copy .tag { margin-bottom: var(--space-3); }
  .tag--hero { display: inline-flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; padding: 0.4rem 0.75rem 0.4rem 0.625rem; border-radius: var(--radius-pill); border: 1px solid rgba(250,245,236,0.3); background: rgba(250,245,236,0.1); color: var(--cream); }
  .tag--hero::before { content: ""; display: inline-block; width: 0.4rem; height: 0.4rem; border-radius: 50%; background: var(--orange); flex-shrink: 0; }
  .hero h1 { font-size: clamp(2.1rem,4.8vw,3.4rem); max-width: 13em; line-height: 1.06; color: var(--cream); letter-spacing: -0.035em; }
  .hero .lead { max-width: 36rem; opacity: 0.88; margin: var(--space-3) 0 0; font-size: clamp(1rem,1.5vw,1.0625rem); line-height: 1.7; font-weight: 400; }
  .hero-stats-aside { display: grid; grid-template-columns: repeat(3,1fr); gap: var(--space-2); }
  @media (min-width: 900px) { .hero-stats-aside { grid-template-columns: 1fr; } }
  .stat-card--hero { border: 1px solid rgba(250,245,236,0.18); padding: 1.125rem 1rem; background: rgba(250,245,236,0.07); text-align: left; border-radius: var(--radius-md); backdrop-filter: blur(4px); }
  .stat-card--hero .stat-value { font-family: var(--font-serif); font-weight: 900; font-size: clamp(1.4rem,2.8vw,1.75rem); line-height: 1.1; display: block; }
  .stat-card--hero .stat-label { font-family: var(--font-mono); font-size: 0.6rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.75; margin-top: 0.3rem; display: block; }

  /* ── SEARCH PANEL ── */
  .search-panel { border: 1px solid rgba(10,31,16,0.1); padding: 1.375rem; background: var(--white); color: var(--dark); box-shadow: 0 2px 0 rgba(10,31,16,0.06), 0 20px 48px rgba(10,31,16,0.1); border-radius: var(--radius-xl); }
  .search-row { display: flex; flex-wrap: wrap; gap: var(--space-2); align-items: stretch; margin-bottom: var(--space-3); }
  .search-row input[type="search"], .search-row input[type="text"] { flex: 1 1 160px; min-width: 0; min-height: 46px; padding: 0.75rem 1.125rem; border: 1.5px solid rgba(10,31,16,0.14); border-radius: var(--radius-md); font-family: var(--font-sans); font-size: 0.9375rem; background: var(--cream); color: var(--dark); transition: border-color 0.15s, box-shadow 0.15s; outline: none; }
  .search-row input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(15,76,42,0.1); }
  .search-row input::placeholder { color: rgba(10,31,16,0.42); }
  .location-wrap { position: relative; flex: 0 0 auto; }
  .location-select { appearance: none; -webkit-appearance: none; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.01em; min-height: 46px; padding: 0.75rem 2.25rem 0.75rem 0.875rem; border: 1.5px solid rgba(10,31,16,0.14); border-radius: var(--radius-md); background-color: var(--cream); color: var(--dark); cursor: pointer; min-width: 7.5rem; background-image: linear-gradient(45deg, transparent 50%, var(--dark) 50%), linear-gradient(135deg, var(--dark) 50%, transparent 50%); background-position: calc(100% - 14px) calc(50% + 3px), calc(100% - 9px) calc(50% + 3px); background-size: 5px 5px; background-repeat: no-repeat; transition: border-color 0.15s; outline: none; }
  .location-select:focus { border-color: var(--green); }
  .chips { display: flex; flex-wrap: wrap; gap: var(--space-2); margin-top: var(--space-3); }
  .chip { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600; padding: 0.5rem 0.875rem; border: 1.5px solid rgba(10,31,16,0.14); background: var(--cream); color: rgba(10,31,16,0.75); cursor: pointer; transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.1s; min-height: 38px; border-radius: var(--radius-pill); letter-spacing: 0.01em; }
  .chip:hover { background: var(--orange); color: var(--white); border-color: var(--orange); transform: translateY(-1px); }
  .chip:active { transform: none; }
  .search-panel .btn-ghost-hero { border-color: rgba(10,31,16,0.2); color: var(--dark); background: var(--cream-muted); font-size: 0.875rem; }
  .search-panel .btn-ghost-hero:hover { background: var(--green); color: var(--cream); border-color: var(--green); }
  .search-panel .geo-hint.is-visible { color: var(--dark); }
  .search-panel .hero-city-note { color: rgba(10,31,16,0.7); }
  .location-verify-row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
  .loc-status-badge { font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; padding: 0.35rem 0.65rem; border-radius: var(--radius-pill); border: 1.5px solid rgba(10,31,16,0.22); color: rgba(10,31,16,0.6); background: rgba(10,31,16,0.04); line-height: 1.4; }
  .loc-status-badge.verified { background: var(--green); border-color: var(--green); color: var(--white); }
  .loc-status-badge.outside { border-color: var(--orange); color: var(--orange); background: rgba(232,98,26,0.07); }
  .geo-hint { font-family: var(--font-mono); font-size: 0.8125rem; margin: 0 0 0.75rem; max-width: 40rem; opacity: 0; max-height: 0; overflow: hidden; transition: opacity 0.2s, max-height 0.3s; color: var(--dark); }
  .geo-hint.is-visible { opacity: 1; max-height: 5rem; margin-bottom: 0.75rem; }
  .hero-city-note { font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500; margin: 0 0 0.875rem; max-width: 40rem; color: rgba(10,31,16,0.6); letter-spacing: 0.01em; }
  .rest-placeholder { border: 1.5px dashed rgba(10,31,16,0.16); padding: var(--space-5) var(--space-4); background: rgba(255,255,255,0.7); text-align: center; margin-bottom: var(--space-4); border-radius: var(--radius-lg); }
  .rest-meta-line { font-family: var(--font-mono); font-size: 0.8rem; font-weight: 500; margin: -0.5rem 0 var(--space-4); opacity: 0.72; line-height: 1.6; overflow-wrap: anywhere; }
  .rest-status-line { font-family: var(--font-mono); font-size: 0.8125rem; margin: -0.5rem 0 var(--space-3); line-height: 1.55; overflow-wrap: anywhere; color: rgba(10,31,16,0.8); }
  .rest-placeholder[hidden], #rest-grid-wrap[hidden] { display: none !important; }

  /* ── SECTIONS ── */
  section { padding: var(--section-y-lg) 0; border-bottom: 1px solid rgba(10,31,16,0.1); }
  .section-label { font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--orange); margin-bottom: 0.625rem; display: flex; align-items: center; gap: 0.5rem; }
  .section-label::before { content: ""; display: inline-block; width: 1.5rem; height: 1.5px; background: var(--orange); flex-shrink: 0; }
  .section-idx { opacity: 0.5; }
  .section-title { font-size: clamp(1.8rem,3.6vw,2.45rem); margin-bottom: var(--space-4); letter-spacing: -0.025em; line-height: 1.14; }
  .section-title--lg { font-size: clamp(2rem,4vw,2.65rem); }

  /* ── BROWSE ── */
  #browse-dishes { background: var(--cream); }
  .cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(185px,1fr)); gap: 0.75rem; }
  .cat-card { border: 1px solid rgba(10,31,16,0.1); padding: 1.25rem 1.125rem; background: var(--white); cursor: pointer; text-align: left; transition: background 0.2s, color 0.2s, transform 0.18s, box-shadow 0.18s; box-shadow: var(--shadow-soft); border-radius: var(--radius-lg); }
  .cat-card:hover { background: var(--green); color: var(--cream); border-color: transparent; transform: translateY(-3px); box-shadow: var(--shadow-lift); }
  .cat-card:active { transform: translateY(-1px); }
  .cat-card:focus-visible { outline: 3px solid var(--orange); outline-offset: 3px; }
  .cat-card h3 { font-size: 1.1rem; margin-bottom: 0.3rem; letter-spacing: -0.02em; }
  .cat-meta { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; opacity: 0.7; }
  .cat-card:hover .cat-meta { opacity: 0.82; }

  /* ── DISH OF THE DAY ── */
  #dish-of-the-day { background: linear-gradient(170deg, #0d2d1c 0%, #070f09 100%); color: var(--cream); }
  #dish-of-the-day .section-label { color: var(--orange); }
  .section-label--dotd { margin-bottom: 0.5rem; }
  #dish-of-the-day .section-title { color: var(--cream); }
  .dotd-grid { display: grid; gap: var(--space-5); align-items: start; }
  @media (min-width: 900px) { .dotd-grid { grid-template-columns: 1fr 1fr; } }
  .badge { display: inline-flex; align-items: center; font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; padding: 0.35rem 0.75rem; border: 1.5px solid rgba(250,245,236,0.4); border-radius: var(--radius-pill); margin-bottom: 0.875rem; color: var(--cream); }
  .badge-gold { border-color: var(--gold); color: var(--gold); }
  .tag-row { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 1rem 0 1.375rem; }
  .dish-tag { font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500; padding: 0.3rem 0.65rem; border: 1px solid rgba(250,245,236,0.3); border-radius: var(--radius-pill); color: rgba(250,245,236,0.85); }
  .dotd-budget-panel { margin-top: 1.25rem; padding: 1.25rem; border: 1px solid rgba(232,98,26,0.22); background: rgba(232,98,26,0.06); border-radius: var(--radius-md); }
  .budget-label { display: block; font-family: var(--font-mono); font-size: 0.8125rem; font-weight: 500; margin-bottom: 0.875rem; color: rgba(250,245,236,0.85); }
  .budget-input-row { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; margin-bottom: 0.875rem; }
  .budget-select { min-width: 170px; min-height: 44px; padding: 0.7rem 1rem; border: 1.5px solid rgba(250,245,236,0.25); border-radius: var(--radius-md); background: rgba(250,245,236,0.1); font-family: var(--font-sans); font-size: 0.9375rem; color: var(--cream); cursor: pointer; outline: none; }
  .budget-select option { background: #0d2d1c; color: var(--cream); }
  .budget-select:focus { border-color: var(--orange); }

  /* ── HOW IT WORKS ── */
  #how-it-works { background: var(--cream-muted); }
  .steps-grid { display: grid; gap: var(--space-3); }
  @media (min-width: 768px) { .steps-grid { grid-template-columns: repeat(2,1fr); } }
  @media (min-width: 1024px) { .steps-grid { gap: var(--space-4); } }
  .step-card { border: 1px solid rgba(10,31,16,0.1); padding: 1.5rem 1.375rem; background: var(--white); border-left: 3px solid var(--orange); box-shadow: var(--shadow-soft); transition: transform 0.18s, box-shadow 0.18s; border-radius: var(--radius-lg); }
  .step-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lift); }
  .step-num { font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 700; color: var(--orange); margin-bottom: 0.625rem; letter-spacing: 0.08em; text-transform: uppercase; }
  .step-card h3 { font-size: 1.15rem; margin-bottom: 0.625rem; letter-spacing: -0.02em; }
  .step-card p { color: rgba(10,31,16,0.75); font-size: 0.9375rem; line-height: 1.65; }

  /* ── RESTAURANTS ── */
  #restaurants { background: var(--cream); }
  .rest-grid { display: grid; gap: 1rem; grid-template-columns: 1fr; }
  @media (min-width: 900px) { .rest-grid { grid-template-columns: repeat(2,1fr); } }
  .restaurant-filter-bar { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; margin: 0 0 var(--space-4); padding: 0.875rem 1.125rem; border: 1px solid rgba(15,76,42,0.16); background: rgba(15,76,42,0.05); border-radius: var(--radius-lg); }
  .restaurant-filter-bar span, .restaurant-filter-bar strong { font-family: var(--font-mono); font-size: 0.8125rem; font-weight: 600; }
  .rest-card { border: 1px solid rgba(10,31,16,0.09); padding: 1.375rem; background: var(--white); display: flex; flex-direction: column; gap: var(--space-3); box-shadow: var(--shadow-soft); transition: transform 0.18s, box-shadow 0.18s; border-radius: var(--radius-xl); }
  .rest-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lift); }
  .rest-card-body { display: grid; gap: 0.75rem; }
  .rest-meta-text { margin: 0; font-family: var(--font-mono); font-size: 0.875rem; font-weight: 500; color: rgba(10,31,16,0.8); line-height: 1.55; }
  .price-pill { display: inline-flex; align-items: center; justify-content: center; padding: 0.3rem 0.75rem; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; border-radius: var(--radius-pill); border: 1.5px solid var(--orange); color: var(--orange); width: fit-content; background: rgba(232,98,26,0.08); }
  .price-budget { border-color: rgba(10,31,16,0.3); color: rgba(10,31,16,0.6); background: rgba(10,31,16,0.04); }
  .price-mid { border-color: var(--orange); color: var(--orange); }
  .price-premium { border-color: var(--green); color: var(--green); background: rgba(15,76,42,0.07); }
  .dish-tag-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .dish-chip { border: 1.5px solid rgba(232,98,26,0.35); background: rgba(232,98,26,0.06); color: rgba(10,31,16,0.8); font-family: var(--font-mono); font-size: 0.72rem; font-weight: 600; padding: 0.35rem 0.7rem; cursor: pointer; transition: background 0.15s, color 0.15s, border-color 0.15s; border-radius: var(--radius-pill); }
  .dish-chip:hover, .dish-chip:focus-visible { background: var(--orange); color: var(--white); border-color: var(--orange); outline: none; }
  .dish-chip.active { background: var(--green); color: var(--white); border-color: var(--green); }
  .phone-link { display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--font-mono); font-size: 0.875rem; font-weight: 500; color: var(--green-deep); border: 1.5px solid rgba(15,76,42,0.18); padding: 0.6875rem 0.875rem; background: rgba(15,76,42,0.05); width: fit-content; border-radius: var(--radius-md); transition: background 0.15s, color 0.15s; }
  .phone-link:hover { background: var(--green); color: var(--cream); border-color: var(--green); }
  .rest-head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.75rem; align-items: flex-start; }
  .rest-card h3 { font-size: 1.15rem; line-height: 1.22; letter-spacing: -0.02em; }
  .hood { font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.65; margin-top: 0.15rem; display: block; }
  .status { font-family: var(--font-mono); font-size: 0.6rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.3rem 0.6rem; border-radius: var(--radius-pill); width: fit-content; border: 1.5px solid rgba(10,31,16,0.2); color: rgba(10,31,16,0.65); background: rgba(10,31,16,0.04); }
  .status.open { background: rgba(15,76,42,0.1); border-color: rgba(15,76,42,0.3); color: var(--green); }
  .status.closed { background: rgba(10,31,16,0.05); color: rgba(10,31,16,0.5); border-color: rgba(10,31,16,0.14); }
  .rest-meta-days { margin-top: 0.1rem; font-size: 0.875rem; color: rgba(10,31,16,0.6); line-height: 1.5; }

  /* ── AI ── */
  #ai-recommend { background: linear-gradient(155deg, #1a5c3a 0%, var(--green-deep) 100%); color: var(--cream); }
  #ai-recommend .section-title { color: var(--cream); }
  .ai-wrap { position: relative; border: 1px solid rgba(250,245,236,0.2); padding: 3.5rem var(--space-4) var(--space-4); background: rgba(10,31,16,0.4); border-radius: var(--radius-lg); backdrop-filter: blur(8px); }
  .ai-coming { position: absolute; top: 0.75rem; right: 0.75rem; font-family: var(--font-mono); font-size: 0.625rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 0.3rem 0.6rem; border: 1px solid rgba(250,245,236,0.4); border-radius: var(--radius-pill); background: rgba(10,31,16,0.7); color: var(--cream); pointer-events: none; }
  .bubble { max-width: 85%; padding: 0.875rem 1.125rem; border-radius: var(--radius-md); margin-bottom: 0.75rem; font-size: 0.9375rem; line-height: 1.6; }
  .bubble-user { background: rgba(250,245,236,0.95); color: var(--dark); margin-left: auto; }
  .bubble-ai { background: rgba(250,245,236,0.12); color: var(--cream); border: 1px solid rgba(250,245,236,0.14); }
  .bubble-label { font-family: var(--font-mono); font-size: 0.625rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.7; margin-bottom: 0.4rem; }
  .ai-input-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.125rem; }
  .ai-input-row input { flex: 1 1 180px; min-height: 46px; padding: 0.7rem 1rem; border: 1.5px solid rgba(250,245,236,0.25); border-radius: var(--radius-md); font-family: var(--font-sans); font-size: 0.9375rem; background: rgba(250,245,236,0.1); color: var(--cream); outline: none; transition: border-color 0.15s; }
  .ai-input-row input::placeholder { color: rgba(250,245,236,0.4); }
  .ai-input-row input:focus { border-color: rgba(250,245,236,0.55); }

  /* ── CITIES ── */
  #other-cities { background: var(--cream-muted); }
  #other-cities .section-title { margin-bottom: var(--space-2); }
  #other-cities > .container > p { margin: 0 0 var(--space-4); max-width: var(--prose-width); opacity: 0.8; font-size: 0.9375rem; }
  .city-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(135px,1fr)); gap: 0.75rem; }
  .city-card { position: relative; border: 1px solid rgba(10,31,16,0.12); padding: var(--space-3); min-height: 88px; background: var(--white); cursor: pointer; display: flex; flex-direction: column; justify-content: center; transition: background 0.18s, transform 0.18s, box-shadow 0.18s; box-shadow: var(--shadow-soft); border-radius: var(--radius-lg); }
  .city-card:hover { background: rgba(232,98,26,0.06); transform: translateY(-2px); box-shadow: var(--shadow-lift); border-color: rgba(232,98,26,0.3); }
  .city-card:active { transform: none; }
  .city-card h3 { font-size: 0.975rem; letter-spacing: -0.015em; }
  .city-card .soon { font-family: var(--font-mono); font-size: 0.6rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; margin-top: 0.35rem; padding: 0.2rem 0.5rem; border: 1px solid rgba(10,31,16,0.18); border-radius: var(--radius-pill); width: fit-content; opacity: 0.65; }

  /* ── LIST RESTAURANT ── */
  #list-restaurant { background: linear-gradient(170deg, var(--green-deep) 0%, #1a5c3a 55%, var(--green-deep) 100%); color: var(--cream); }
  #list-restaurant .section-label { color: var(--orange); }
  #list-restaurant .section-title { color: var(--cream); }
  .list-grid { display: grid; gap: var(--space-5); align-items: start; }
  @media (min-width: 900px) { .list-grid { grid-template-columns: 1fr 1fr; } }
  #list-restaurant .list-grid > div:first-child > p:not(.section-label) { max-width: var(--prose-width); opacity: 0.88; line-height: 1.7; }
  .perks { list-style: none; margin: 1.125rem 0 1.375rem; padding: 0; display: grid; gap: 0.25rem; }
  .perks li { padding: 0.4rem 0 0.4rem 1.375rem; position: relative; font-size: 0.9375rem; opacity: 0.9; line-height: 1.55; }
  .perks li::before { content: "→"; position: absolute; left: 0; color: var(--orange); font-weight: 700; font-size: 0.875rem; }
  .mini-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: 0.75rem; }
  .mini-stat { border: 1px solid rgba(250,245,236,0.18); padding: 1.375rem var(--space-3); background: rgba(250,245,236,0.06); border-radius: var(--radius-lg); backdrop-filter: blur(4px); }
  .mini-stat .stat-value { font-family: var(--font-serif); font-size: 1.5rem; font-weight: 900; color: var(--cream); display: block; line-height: 1.1; letter-spacing: -0.025em; }
  .mini-stat .stat-label { font-family: var(--font-mono); font-size: 0.6rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(250,245,236,0.65); margin-top: 0.35rem; display: block; }

  /* ── FOOTER ── */
  .site-footer { background: #040c06; color: var(--cream); padding: var(--space-6) 0 0; border-top: 2px solid var(--orange); }
  .footer-top { padding-bottom: var(--space-5); }
  .footer-brand .logo { color: var(--cream); }
  .footer-tag { margin: var(--space-2) 0 0; max-width: 22rem; opacity: 0.72; font-size: 0.9375rem; line-height: 1.6; }
  .footer-made { font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500; margin-top: var(--space-4); opacity: 0.55; }
  .footer-cols { display: grid; grid-template-columns: repeat(2,1fr); gap: var(--space-5) var(--space-4); margin-top: var(--space-5); }
  @media (min-width: 768px) { .footer-cols { grid-template-columns: repeat(4,1fr); } }
  .footer-col h4 { font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--orange); margin-bottom: 0.75rem; }
  .footer-col ul { list-style: none; margin: 0; padding: 0; }
  .footer-col a { font-size: 0.875rem; display: block; padding: 0.3rem 0; opacity: 0.62; transition: color 0.15s, opacity 0.15s; line-height: 1.55; }
  .footer-col a:hover { color: var(--orange); opacity: 1; }
  .footer-bottom { border-top: 1px solid rgba(250,245,236,0.08); padding: var(--space-4) 0; margin-top: var(--space-5); display: flex; flex-wrap: wrap; gap: var(--space-2) var(--space-4); justify-content: space-between; font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500; opacity: 0.55; }

  /* ── UTILS ── */
  .visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .skip-link { position: absolute; left: -9999px; top: 0; padding: 0.5rem 1rem; background: var(--orange); color: var(--white); z-index: 2000; border-radius: 0 0 var(--radius-sm) 0; }
  .skip-link:focus { left: 0.5rem; top: 0.5rem; }
  :focus-visible { outline: 2.5px solid var(--orange); outline-offset: 3px; border-radius: 3px; }

  /* ── MOBILE NAV ── */
  .nav-cta-wrap { display: flex; align-items: center; gap: 0.5rem; }
  .nav-toggle { display: none; flex-direction: column; justify-content: center; align-items: center; gap: 5px; width: 44px; height: 44px; padding: 0; margin-left: auto; border: 1.5px solid rgba(10,31,16,0.18); border-radius: var(--radius-md); background: var(--cream); cursor: pointer; flex-shrink: 0; transition: background 0.15s; }
  .nav-toggle:hover { background: var(--cream-muted); }
  .nav-toggle-bar { display: block; width: 1.1rem; height: 1.5px; background: var(--dark); border-radius: 2px; transition: transform 0.22s cubic-bezier(0.22,1,0.36,1), opacity 0.18s; }
  .nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(2) { opacity: 0; }
  .nav-toggle[aria-expanded="true"] .nav-toggle-bar:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
  @media (prefers-reduced-motion: reduce) { .nav-toggle-bar { transition: none; } }
  .nav-shell { display: contents; }
  @media (max-width: 639px) {
    .nav-inner { flex-direction: row; flex-wrap: wrap; align-items: center; justify-content: flex-start; gap: var(--space-2); }
    .nav-toggle { display: inline-flex; }
    .nav-shell { display: none; width: 100%; flex-basis: 100%; margin-top: var(--space-2); padding: var(--space-3); border: 1px solid rgba(10,31,16,0.12); border-radius: var(--radius-lg); background: var(--white); box-shadow: var(--shadow-lift); }
    .nav-shell.is-open { display: block; }
    .nav-links { flex-direction: column; align-items: stretch; gap: 0; }
    .nav-links li { border-bottom: 1px solid rgba(10,31,16,0.07); }
    .nav-links li:last-child { border-bottom: none; }
    .nav-links a { display: block; padding: 0.875rem 0; font-size: 0.9375rem; }
    .nav-cta-wrap { width: 100%; margin-top: var(--space-3); padding-top: var(--space-3); border-top: 1px solid rgba(10,31,16,0.1); }
    .nav-cta-wrap .btn { width: 100%; }
  }
  @media (max-width: 480px) {
    .hero h1 { max-width: 100%; }
    .hero-stats-aside { grid-template-columns: repeat(3, minmax(0,1fr)); }
    .stat-card--hero { padding: 0.75rem 0.625rem; }
    .stat-card--hero .stat-value { font-size: 1.3rem; }
    .search-row .btn.btn-orange { flex: 1 1 100%; width: 100%; }
    .location-wrap, .location-select { flex: 1 1 100%; width: 100%; }
    .location-select { min-width: 0; }
    .location-verify-row { flex-direction: column; align-items: stretch; }
    .location-verify-row .btn-ghost-hero { width: 100%; justify-content: center; }
    .bubble { max-width: 100%; font-size: 0.9rem; }
    .rest-placeholder, .rest-status-line, .rest-meta-line, .hero-city-note { overflow-wrap: anywhere; }
  }
  @media (min-width: 481px) and (max-width: 639px) {
    .search-row .btn.btn-orange { flex: 1 1 auto; min-width: 8rem; }
  }

  /* ── LOCATION FEATURE ── */
  .btn-change-location { font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 600; background: none; border: none; color: var(--orange); cursor: pointer; padding: 0; text-decoration: underline; text-underline-offset: 2px; line-height: 1; letter-spacing: 0.01em; }
  #area-select-wrap { margin-top: 0.625rem; }
  #area-select-wrap select { appearance: none; -webkit-appearance: none; font-family: var(--font-mono); font-size: 0.8125rem; font-weight: 600; min-height: 44px; padding: 0.7rem 2.25rem 0.7rem 0.875rem; border: 1.5px solid rgba(10,31,16,0.16); border-radius: var(--radius-md); background-color: var(--cream); color: var(--dark); cursor: pointer; width: 100%; max-width: 320px; background-image: linear-gradient(45deg, transparent 50%, var(--dark) 50%), linear-gradient(135deg, var(--dark) 50%, transparent 50%); background-position: calc(100% - 14px) calc(50% + 3px), calc(100% - 9px) calc(50% + 3px); background-size: 5px 5px; background-repeat: no-repeat; outline: none; transition: border-color 0.15s; }
  #area-select-wrap select:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(15,76,42,0.1); }
  #area-select-wrap p { font-size: 0.8125rem; font-weight: 500; margin: 0 0 0.5rem; color: rgba(10,31,16,0.7); }
`;

function initLandingScripts() {
  var dishInput = document.getElementById("dish-search");
  var locationSelect = document.getElementById("location-select");
  var geoHint = document.getElementById("geo-hint");
  var locBadge = document.getElementById("loc-status-badge");
  var restPlaceholder = document.getElementById("rest-placeholder");
  var restGridWrap = document.getElementById("rest-grid-wrap");
  var restStatus = document.getElementById("restaurants-status");
  var restHeading = document.getElementById("rest-heading");
  var aiReply = document.getElementById("ai-reply-copy");
  var STORAGE_VERIFIED = "chowHereVerified";
  var STORAGE_LABEL = "chowHereVerifiedLabel";
  var locationVerified = false;
  var verifiedLabel = "";

  var COVERED_AREAS = ["Wuse 2","Maitama","Garki","Area 11","Gwarinpa","Utako","Asokoro","Mabushi","Jabi","Kado","Life Camp","Kubwa"];
  var STORAGE_AREA = "chowHereVerifiedArea";
  var verifiedArea = "";
  var verifiedStatus = "";
  var areaSelectWrap = document.getElementById("area-select-wrap");
  var verifyRow = document.getElementById("location-verify-row");
  var btnChangeLocation = document.getElementById("btn-change-location");

  var aiCopyVerified = "Try pepper soup with goat meat + a side of agidi, or ofe nsala with pounded yam. <strong>Nearest restaurants (preview)</strong> are sorted from your verified position. Full rankings on the results page next.";

  var stateNames = { lagos: "Lagos", enugu: "Enugu", ph: "Port Harcourt", ibadan: "Ibadan", kano: "Kano", benin: "Benin City", owerri: "Owerri", kaduna: "Kaduna" };

  function hideGeoHint() { geoHint.textContent = ""; geoHint.classList.remove("is-visible"); }
  function showGeoHint(msg) { geoHint.textContent = msg; geoHint.classList.add("is-visible"); }

  function normalise(s) { return s.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim(); }

  function matchArea(address) {
    var candidates = [address.suburb, address.city_district, address.neighbourhood, address.quarter, address.town, address.village];
    var inAbuja = /abuja|fct|federal capital/i.test([address.city, address.state, address.county, address.state_district].join(" "));
    for (var i = 0; i < candidates.length; i++) {
      if (!candidates[i]) continue;
      var norm = normalise(candidates[i]);
      for (var j = 0; j < COVERED_AREAS.length; j++) {
        if (norm.indexOf(normalise(COVERED_AREAS[j])) !== -1 || normalise(COVERED_AREAS[j]).indexOf(norm) !== -1) {
          return { status: "covered", area: COVERED_AREAS[j] };
        }
      }
    }
    return inAbuja ? { status: "abuja", area: "" } : { status: "outside", area: "" };
  }

  function applyAreaFilter(area, status) {
    var allCards = Array.from(document.querySelectorAll("#rest-grid-wrap .rest-card"));
    allCards.forEach(function(card) {
      if (!area || status !== "covered") {
        card.style.display = "";
      } else {
        card.style.display = (card.dataset.area === area) ? "" : "none";
      }
    });
    var visible = allCards.filter(function(c){ return c.style.display !== "none"; }).length;
    if (restStatus) {
      if (status === "covered") restStatus.textContent = "Showing " + visible + " restaurant" + (visible !== 1 ? "s" : "") + " in " + area + ".";
      else if (status === "abuja") restStatus.textContent = "You're in Abuja — we're expanding to your area soon. Showing all Abuja results.";
      else restStatus.textContent = "You're outside Abuja — showing all Abuja results. We're launching in more cities soon.";
    }
  }

  function applyVerifiedUI(opts) {
    opts = opts || {};
    var scroll = !!opts.scroll;
    locBadge.classList.remove("verified", "outside");
    if (verifiedStatus === "covered") {
      locBadge.textContent = "📍 " + verifiedArea;
      locBadge.classList.add("verified");
    } else if (verifiedStatus === "abuja") {
      locBadge.textContent = "📍 Abuja (all results)";
      locBadge.classList.add("verified");
    } else {
      locBadge.textContent = "📍 Outside Abuja";
      locBadge.classList.add("outside");
    }
    if (btnChangeLocation) btnChangeLocation.style.display = "inline";
    if (verifyRow) verifyRow.style.display = "none";
    if (areaSelectWrap) areaSelectWrap.style.display = "none";
    hideGeoHint();
    if (aiReply) aiReply.innerHTML = aiCopyVerified;
    if (restPlaceholder) restPlaceholder.hidden = true;
    if (restGridWrap) restGridWrap.hidden = false;
    applyAreaFilter(verifiedArea, verifiedStatus);
    try {
      localStorage.setItem(STORAGE_VERIFIED, "1");
      localStorage.setItem(STORAGE_LABEL, verifiedArea || verifiedStatus);
      localStorage.setItem(STORAGE_AREA, JSON.stringify({ area: verifiedArea, status: verifiedStatus }));
    } catch (e) {}
    if (scroll) {
      var smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("restaurants").scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      setTimeout(function () { restHeading.focus({ preventScroll: true }); }, smooth ? 450 : 0);
    }
  }

  function setVerified(area, status, scroll) {
    locationVerified = true;
    verifiedArea = area;
    verifiedStatus = status;
    verifiedLabel = area || status;
    applyVerifiedUI({ scroll: scroll });
  }

  function showManualDropdown(msg) {
    if (msg) showGeoHint(msg);
    if (!areaSelectWrap) return;
    areaSelectWrap.innerHTML = "";
    var p = document.createElement("p");
    p.textContent = "Select your area in Abuja:";
    var sel = document.createElement("select");
    sel.setAttribute("aria-label", "Select your area");
    var defaultOpt = document.createElement("option");
    defaultOpt.value = ""; defaultOpt.textContent = "— Choose your area —";
    sel.appendChild(defaultOpt);
    COVERED_AREAS.forEach(function(area) {
      var opt = document.createElement("option");
      opt.value = area; opt.textContent = area;
      sel.appendChild(opt);
    });
    var otherOpt = document.createElement("option");
    otherOpt.value = "other"; otherOpt.textContent = "Other area in Abuja";
    sel.appendChild(otherOpt);
    sel.addEventListener("change", function() {
      if (!sel.value) return;
      if (sel.value === "other") {
        setVerified("", "abuja", true);
      } else {
        setVerified(sel.value, "covered", true);
      }
    });
    areaSelectWrap.appendChild(p);
    areaSelectWrap.appendChild(sel);
    areaSelectWrap.style.display = "block";
  }

  function resetLocation() {
    locationVerified = false;
    verifiedArea = "";
    verifiedStatus = "";
    verifiedLabel = "";
    locBadge.textContent = "Location not verified";
    locBadge.classList.remove("verified", "outside");
    if (btnChangeLocation) btnChangeLocation.style.display = "none";
    if (verifyRow) verifyRow.style.display = "";
    if (areaSelectWrap) { areaSelectWrap.innerHTML = ""; areaSelectWrap.style.display = "none"; }
    hideGeoHint();
    var allCards = Array.from(document.querySelectorAll("#rest-grid-wrap .rest-card"));
    allCards.forEach(function(c){ c.style.display = ""; });
    if (restStatus) restStatus.textContent = "Showing 13 Abuja restaurants. Tap a dish tag to filter by a popular menu item.";
    try { localStorage.removeItem(STORAGE_VERIFIED); localStorage.removeItem(STORAGE_LABEL); localStorage.removeItem(STORAGE_AREA); } catch(e) {}
  }

  try {
    var saved = localStorage.getItem(STORAGE_AREA);
    if (saved) {
      var parsed = JSON.parse(saved);
      if (parsed && parsed.status) {
        verifiedArea = parsed.area || "";
        verifiedStatus = parsed.status;
        verifiedLabel = verifiedArea || verifiedStatus;
        locationVerified = true;
        applyVerifiedUI({ scroll: false });
      }
    }
  } catch(e) {}

  if (btnChangeLocation) {
    btnChangeLocation.style.display = locationVerified ? "inline" : "none";
    btnChangeLocation.addEventListener("click", resetLocation);
  }

  document.getElementById("btn-verify-location").addEventListener("click", function () {
    hideGeoHint();
    if (areaSelectWrap) { areaSelectWrap.innerHTML = ""; areaSelectWrap.style.display = "none"; }
    if (!navigator.geolocation) { showManualDropdown("Location isn't available in this browser. Please select your area."); return; }
    showGeoHint("Detecting your location…");
    var timer = setTimeout(function() {
      showManualDropdown("Could not detect location — please select your area");
    }, 5000);
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        clearTimeout(timer);
        hideGeoHint();
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        fetch("https://nominatim.openstreetmap.org/reverse?lat=" + lat + "&lon=" + lon + "&format=json", { headers: { "Accept-Language": "en" } })
          .then(function(r) { return r.json(); })
          .then(function(data) {
            var addr = data.address || {};
            var result = matchArea(addr);
            setVerified(result.area, result.status, true);
          })
          .catch(function() { showManualDropdown("Location lookup failed — please select your area"); });
      },
      function(err) {
        clearTimeout(timer);
        var msg = err && err.code === 1
          ? "Permission denied — please select your area"
          : "Could not detect location — please select your area";
        showManualDropdown(msg);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
    );
  });

  document.getElementById("btn-verify-fallback").addEventListener("click", function () { showManualDropdown(""); });

  document.querySelectorAll(".chip[data-fill]").forEach(function (chip) {
    chip.addEventListener("click", function () { dishInput.value = chip.getAttribute("data-fill"); dishInput.focus(); });
  });

  document.getElementById("btn-find-dish").addEventListener("click", function () {
    if (!locationVerified) { alert("Verify your location first. Then you can see nearest restaurants for your search. (Full results page coming soon!)"); return; }
    alert("Results page coming soon!");
  });

  document.querySelectorAll(".cat-card[data-category]").forEach(function (card) {
    card.addEventListener("click", function () { alert("Browsing " + card.getAttribute("data-category") + " coming soon!"); });
  });

  document.getElementById("btn-find-onugbu").addEventListener("click", function () {
    if (!locationVerified) { alert("Verify your location first. Then we can show the nearest spots serving the daily highlight. (Full results page coming soon!)"); return; }
    if (currentDotdDish) { applyRestaurantFilter(currentDotdDish); document.getElementById("restaurant-filter-active").textContent = currentDotdDish; restaurantFilterBar.hidden = false; return; }
    alert("Results page coming soon!");
  });

  document.getElementById("btn-budget-suggest").addEventListener("click", function () {
    var budget = document.getElementById("budget-select").value;
    if (!budget) { document.getElementById("budget-suggestion").textContent = "Choose a budget above to receive a food recommendation from Abuja menus."; return; }
    suggestBudgetDish(budget);
  });

  document.getElementById("ai-send").addEventListener("click", function () { alert("AI recommendations coming soon!"); });
  document.getElementById("ai-input").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); alert("AI recommendations coming soon!"); } });

  locationSelect.addEventListener("change", function () {
    var v = locationSelect.value;
    if (v !== "abuja") { alert((stateNames[v] || "This location") + " coming soon!"); locationSelect.value = "abuja"; }
  });

  document.querySelectorAll(".city-card[data-city]").forEach(function (card) {
    card.addEventListener("click", function () { alert(card.getAttribute("data-city") + " coming soon!"); });
  });

  document.getElementById("btn-list-cta").addEventListener("click", function () { alert("Restaurant onboarding coming soon! No website tier: first year free, then subscription. Pricing details in dashboard."); });

  document.getElementById("btn-notify-me").addEventListener("click", function () {
    var emailInput = document.getElementById("email-notify");
    var confirmMsg = document.getElementById("email-confirm");
    if (emailInput.value.trim()) { emailInput.style.display = "none"; document.getElementById("btn-notify-me").style.display = "none"; confirmMsg.style.display = "block"; }
    else { alert("Please enter a valid email address."); }
  });

  document.getElementById("email-notify").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); document.getElementById("btn-notify-me").click(); } });

  document.getElementById("year").textContent = String(new Date().getFullYear());

  (function initReveal() {
    var motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var revealEls = document.querySelectorAll(".reveal:not(.reveal--visible)");
    if (motion || !("IntersectionObserver" in window)) { revealEls.forEach(function (el) { el.classList.add("reveal--visible"); }); return; }
    var revObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) { if (!entry.isIntersecting) return; entry.target.classList.add("reveal--visible"); obs.unobserve(entry.target); });
    }, { threshold: 0.06, rootMargin: "0px 0px -28px 0px" });
    revealEls.forEach(function (el) { revObs.observe(el); });
  })();

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCount(el, target, duration, formatter) {
    var start = performance.now();
    function frame(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = formatter(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(frame); else el.textContent = formatter(target);
    }
    requestAnimationFrame(frame);
  }

  function formatCount(el, n) { return (el.getAttribute("data-prefix") || "") + n + (el.getAttribute("data-suffix") || ""); }

  var countElements = document.querySelectorAll(".count-up");
  if ("IntersectionObserver" in window && countElements.length) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-target"), 10);
        if (isNaN(target)) return;
        obs.unobserve(el);
        var duration = reducedMotion ? 0 : 1200;
        if (duration === 0) { el.textContent = formatCount(el, target); return; }
        animateCount(el, target, duration, function (n) { return formatCount(el, n); });
      });
    }, { threshold: 0.2, rootMargin: "0px" });
    countElements.forEach(function (el) { observer.observe(el); });
  } else {
    countElements.forEach(function (el) { var t = parseInt(el.getAttribute("data-target"), 10); if (!isNaN(t)) el.textContent = formatCount(el, t); });
  }


  var restaurantCards = Array.from(document.querySelectorAll("#rest-grid-wrap .rest-card"));
  var restaurantFilterBar = document.getElementById("restaurant-filter-bar");
  var restaurantFilterActive = document.getElementById("restaurant-filter-active");
  var currentDotdDish = null;
  var dotdHeading = document.getElementById("dotd-heading");
  var dotdCopy = document.getElementById("dotd-copy");
  var dotdTagRow = document.getElementById("dotd-tag-row");
  var dotdSourceBadge = document.getElementById("dotd-source-badge");
  var budgetSuggestion = document.getElementById("budget-suggestion");

  function parseTimeString(value) {
    var match = value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
    if (!match) return null;
    var hours = parseInt(match[1], 10); var minutes = parseInt(match[2] || "0", 10); var period = match[3].toLowerCase();
    if (period === "pm" && hours < 12) hours += 12;
    if (period === "am" && hours === 12) hours = 0;
    return { hours: hours, minutes: minutes };
  }

  function parseWorkingDays(value) {
    if (!value || !value.trim()) return [0,1,2,3,4,5,6];
    var normalized = value.trim().toLowerCase().replace(/[–—]/g, "-").replace(/every\s*day|everyday|daily/, "mon-sun");
    if (/^mon[-\s]*sun$/.test(normalized) || /^sun[-\s]*sat$/.test(normalized) || /^all\s*days$/.test(normalized)) return [0,1,2,3,4,5,6];
    var dayMap = { mon:1, monday:1, tue:2, tues:2, tuesday:2, wed:3, wednesday:3, thu:4, thur:4, thurs:4, thursday:4, fri:5, friday:5, sat:6, saturday:6, sun:0, sunday:0 };
    var parts = normalized.split(/[,;]+/).map(function(p){return p.trim();}).filter(Boolean);
    var allowed = [];
    function addDay(day) { if (dayMap.hasOwnProperty(day)) { var idx = dayMap[day]; if (allowed.indexOf(idx) === -1) allowed.push(idx); } }
    parts.forEach(function(part) {
      if (part.indexOf("-") >= 0) {
        var range = part.split("-").map(function(t){return t.trim();});
        if (range.length === 2 && dayMap.hasOwnProperty(range[0]) && dayMap.hasOwnProperty(range[1])) {
          var start = dayMap[range[0]], end = dayMap[range[1]], current = start;
          while (true) { if (allowed.indexOf(current) === -1) allowed.push(current); if (current === end) break; current = (current + 1) % 7; }
          return;
        }
      }
      addDay(part);
    });
    return allowed.length ? allowed : [0,1,2,3,4,5,6];
  }

  function getRestaurantOpenState(card) {
    var metaText = card.querySelector(".rest-meta-text");
    var dayText = card.dataset.openDays || (card.querySelector(".rest-meta-days") ? card.querySelector(".rest-meta-days").textContent : "");
    if (!metaText) return null;
    var match = metaText.textContent.match(/open\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s+to\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i);
    if (!match) return null;
    var openTime = parseTimeString(match[1]), closeTime = parseTimeString(match[2]);
    if (!openTime || !closeTime) return null;
    var now = new Date();
    var allowedDays = parseWorkingDays(dayText);
    if (allowedDays.indexOf(now.getDay()) === -1) return "closedToday";
    var openDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), openTime.hours, openTime.minutes, 0, 0);
    var closeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), closeTime.hours, closeTime.minutes, 0, 0);
    if (closeDate <= openDate) closeDate.setDate(closeDate.getDate() + 1);
    return now >= openDate && now < closeDate ? "open" : "closed";
  }

  function updateRestaurantStatus(card) {
    var statusEl = card.querySelector(".status");
    if (!statusEl) return;
    var state = getRestaurantOpenState(card);
    if (!state) return;
    var isOpen = state === "open";
    statusEl.classList.toggle("open", isOpen);
    statusEl.classList.toggle("closed", !isOpen);
    statusEl.textContent = isOpen ? "Open now" : state === "closedToday" ? "Closed today" : "Closed now";
  }

  function updateAllRestaurantStatuses() { restaurantCards.forEach(updateRestaurantStatus); }
  updateAllRestaurantStatuses();
  setInterval(updateAllRestaurantStatuses, 60000);

  function getUniqueDishes() {
    var dishes = [];
    restaurantCards.forEach(function(card) { card.dataset.dishes.split(",").forEach(function(dish) { var name = dish.trim(); if (name && dishes.indexOf(name) === -1) dishes.push(name); }); });
    return dishes;
  }

  function getRestaurantsForDish(dish) {
    return restaurantCards.filter(function(card) { return card.dataset.dishes.split(",").some(function(d) { return d.trim().toLowerCase() === dish.toLowerCase(); }); });
  }

  function chooseDishForToday(dishes) {
    if (!dishes.length) return "Ofe Onugbu";
    var dateKey = new Date().toISOString().slice(0, 10);
    var hash = 0;
    for (var i = 0; i < dateKey.length; i++) hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
    return dishes[hash % dishes.length];
  }

  function updateDishOfTheDay() {
    var uniqueDishes = getUniqueDishes();
    currentDotdDish = chooseDishForToday(uniqueDishes);
    var dishRestaurants = getRestaurantsForDish(currentDotdDish);
    var sourceName = dishRestaurants.length ? dishRestaurants[0].querySelector("h3").textContent : "local Abuja chefs";
    dotdHeading.textContent = currentDotdDish;
    dotdCopy.textContent = "A rotating daily pick sourced from real Abuja restaurant menus. Today's highlight comes from " + sourceName + ".";
    dotdTagRow.innerHTML = '<span class="dish-tag">Daily pick</span><span class="dish-tag">' + sourceName + '</span><span class="dish-tag">' + dishRestaurants.length + ' venues</span>';
    dotdSourceBadge.textContent = "Based on Abuja menus";
    budgetSuggestion.textContent = "Select a budget to get a tailored dish recommendation.";
  }
  updateDishOfTheDay();

  function suggestBudgetDish(budget) {
    var tally = {};
    restaurantCards.forEach(function(card) {
      if (!card.querySelector(".price-" + budget.toLowerCase())) return;
      card.dataset.dishes.split(",").forEach(function(dish) { var name = dish.trim(); if (!name) return; tally[name] = (tally[name] || 0) + 1; });
    });
    var best = Object.keys(tally).sort(function(a,b){ return tally[b]-tally[a]; })[0];
    if (!best) { budgetSuggestion.textContent = "No matches found for that budget yet. Try another option."; return; }
    var venues = getRestaurantsForDish(best).slice(0,2).map(function(card){ return card.querySelector("h3").textContent; });
    budgetSuggestion.textContent = "Best for " + budget + ": " + best + ". Served at " + venues.join(" and ") + ".";
  }

  function refreshRestaurantFilter(dish) {
    var visibleCards = restaurantCards.filter(function(card){ return card.style.display !== "none"; }).length;
    if (dish) { restaurantFilterBar.hidden = false; restaurantFilterActive.textContent = dish; restStatus.textContent = "Showing " + visibleCards + " restaurants serving " + dish + "."; }
    else { restaurantFilterBar.hidden = true; restaurantFilterActive.textContent = ""; restStatus.textContent = "Showing 13 Abuja restaurants. Tap a dish tag to filter by a popular menu item."; }
  }

  function clearRestaurantFilter() {
    restaurantCards.forEach(function(card){ card.style.display = ""; });
    document.querySelectorAll(".dish-chip.active").forEach(function(chip){ chip.classList.remove("active"); });
    refreshRestaurantFilter(null);
  }

  function applyRestaurantFilter(dish) {
    restaurantCards.forEach(function(card) {
      var dishes = card.dataset.dishes.split(",").map(function(v){ return v.trim().toLowerCase(); });
      card.style.display = dishes.indexOf(dish.toLowerCase()) !== -1 ? "" : "none";
    });
    document.querySelectorAll(".dish-chip.active").forEach(function(chip){ chip.classList.remove("active"); });
    document.querySelectorAll('.dish-chip[data-dish="' + dish.replace(/"/g, '\\"') + '"]').forEach(function(chip){ chip.classList.add("active"); });
    refreshRestaurantFilter(dish);
  }

  document.getElementById("rest-grid-wrap").addEventListener("click", function(event) {
    var chip = event.target.closest(".dish-chip");
    if (!chip) return;
    applyRestaurantFilter(chip.dataset.dish);
  });

  document.getElementById("clear-restaurant-filter").addEventListener("click", function() { clearRestaurantFilter(); });
  refreshRestaurantFilter(null);
}

export default function LandingPage() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    initLandingScripts();
  }, []);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") setNavOpen(false); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function closeNav() { setNavOpen(false); }

  return (
    <>
      <style>{landingCSS}</style>
      <a className="skip-link font-mono" href="#browse-dishes">Skip to dishes</a>

      <header className="site-header">
        <div className="container nav-inner">
          <a className="logo" href="#"><span className="logo-mark" aria-hidden="true"></span> Chow<span>Here</span></a>
          <button
            type="button"
            className="nav-toggle"
            id="nav-toggle"
            aria-expanded={navOpen ? "true" : "false"}
            aria-controls="nav-mobile-shell"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            onClick={() => setNavOpen(o => !o)}
          >
            <span className="nav-toggle-bar" aria-hidden="true"></span>
            <span className="nav-toggle-bar" aria-hidden="true"></span>
            <span className="nav-toggle-bar" aria-hidden="true"></span>
          </button>
          <div className={`nav-shell${navOpen ? " is-open" : ""}`} id="nav-mobile-shell">
            <nav aria-label="Primary">
              <ul className="nav-links">
                <li><a href="#browse-dishes" onClick={closeNav}>Browse Dishes</a></li>
                <li><a href="#how-it-works" onClick={closeNav}>How It Works</a></li>
                <li><a href="#restaurants" onClick={closeNav}>Restaurants</a></li>
                <li><a href="#list-restaurant" onClick={closeNav}>List Your Place</a></li>
              </ul>
            </nav>
            <div className="nav-cta-wrap">
              <a className="btn btn-orange btn-nav" href="#list-restaurant" onClick={closeNav}>Get Started</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero reveal reveal--visible" id="hero" aria-labelledby="hero-title">
          <div className="hero-decor" aria-hidden="true"></div>
          <div className="container hero-inner">
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="tag tag--hero">Nigeria's #1 Food Discovery Platform</p>
                <h1 id="hero-title">Find the exact dish you're craving, right now</h1>
                <p className="lead">Search 500+ Nigerian dishes and see which Abuja restaurants serve them. Verified, accurate, and updated daily. Verify your location so we can show the <strong>nearest</strong> matches sorted by distance.</p>
              </div>
              <div className="hero-stats-aside" aria-label="Platform stats">
                <div className="stat-card stat-card--hero"><span className="stat-value">Abuja</span><span className="stat-label">First</span></div>
                <div className="stat-card stat-card--hero"><span className="stat-value">Coming</span><span className="stat-label">Launching Soon</span></div>
                <div className="stat-card stat-card--hero"><span className="stat-value">100%</span><span className="stat-label">Free to Search</span></div>
              </div>
            </div>
            <div className="search-panel">
              <div className="search-row">
                <label className="visually-hidden" htmlFor="dish-search">Dish name</label>
                <input type="search" id="dish-search" name="dish" placeholder="Eg. egusi soup, jollof rice…" autoComplete="off" />
                <div className="location-wrap">
                  <label className="visually-hidden" htmlFor="location-select">Location</label>
                  <select className="location-select" id="location-select" aria-label="Location">
                    <option value="abuja">📍 Abuja</option>
                    <option value="lagos">Lagos</option>
                    <option value="enugu">Enugu</option>
                    <option value="ph">Port Harcourt</option>
                    <option value="ibadan">Ibadan</option>
                    <option value="kano">Kano</option>
                    <option value="benin">Benin City</option>
                    <option value="owerri">Owerri</option>
                    <option value="kaduna">Kaduna</option>
                  </select>
                </div>
                <button type="button" className="btn btn-orange" id="btn-find-dish">Find Dish</button>
              </div>
              <p className="hero-city-note">Serving <strong>Abuja</strong> first. Use the menu next to search to peek at other states (coming soon).</p>
              <div className="location-verify-row" id="location-verify-row">
                <span className="loc-status-badge" id="loc-status-badge" aria-live="polite">Location not verified</span>
                <button type="button" className="btn-change-location" id="btn-change-location" style={{display:"none"}}>Change location</button>
                <button type="button" className="btn btn-ghost-hero" id="btn-verify-location">Verify my location</button>
                <button type="button" className="btn btn-ghost-hero" id="btn-verify-fallback">I'm in Abuja (no GPS)</button>
              </div>
              <div id="area-select-wrap" style={{display:"none"}}></div>
              <p className="geo-hint font-mono" id="geo-hint" role="status"></p>
              <div style={{marginTop: "var(--space-4)", paddingTop: "var(--space-4)", borderTop: "1px solid rgba(250,245,236,0.25)"}}>
                <p style={{margin: "0 0 var(--space-2)", fontSize: "0.95rem"}}>No results in your area yet? Get notified when we launch near you.</p>
                <div style={{display: "flex", gap: "var(--space-2)", flexWrap: "wrap"}}>
                  <input type="email" id="email-notify" placeholder="Enter your email" style={{flex: "1 1 200px", minWidth: 0, minHeight: "44px", padding: "0.65rem 0.85rem", border: "2px solid var(--dark)", fontFamily: "'DM Sans', sans-serif", background: "var(--cream)"}} />
                  <button type="button" className="btn btn-orange" id="btn-notify-me">Notify Me</button>
                </div>
                <p id="email-confirm" style={{display: "none", marginTop: "var(--space-2)", color: "var(--gold)", fontSize: "0.9rem"}}>You're on the list. We'll reach out soon!</p>
              </div>
              <div className="chips" role="group" aria-label="Quick searches">
                <button type="button" className="chip" data-fill="Egusi Soup">Egusi Soup</button>
                <button type="button" className="chip" data-fill="Jollof Rice">Jollof Rice</button>
                <button type="button" className="chip" data-fill="Suya">Suya</button>
                <button type="button" className="chip" data-fill="Pounded Yam">Pounded Yam</button>
                <button type="button" className="chip" data-fill="Pepper Soup">Pepper Soup</button>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal" id="browse-dishes" aria-labelledby="cat-heading">
          <div className="container">
            <p className="section-label"><span className="section-idx">01</span> · Browse by Category</p>
            <h2 className="section-title" id="cat-heading">What are you in the mood for?</h2>
            <div className="cat-grid">
              {[["Soups","45"],["Swallows","12"],["Rice Dishes","18"],["Grilled & BBQ","22"],["Snacks","30"],["Street Food","25"],["Breakfast","14"],["Drinks","16"]].map(([name, count]) => (
                <button key={name} type="button" className="cat-card" data-category={name}>
                  <h3>{name}</h3>
                  <span className="cat-meta">{count} dishes</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal" id="dish-of-the-day" aria-labelledby="dotd-heading">
          <div className="container dotd-grid">
            <div>
              <p className="section-label section-label--dotd"><span className="section-idx">02</span> · Today</p>
              <span className="badge">Dish of the Day</span>
              <h2 className="section-title" id="dotd-heading">Ofe Onugbu (Bitter Leaf Soup)</h2>
              <p id="dotd-copy">A rotating daily menu highlight drawn from the dishes served by Abuja restaurants in the ChowHere database.</p>
              <div className="tag-row" id="dotd-tag-row">
                <span className="dish-tag">Daily pick</span>
                <span className="dish-tag">From Abuja menus</span>
                <span className="dish-tag">Rotates daily</span>
              </div>
              <span className="badge badge-gold" id="dotd-source-badge">Abuja menus</span>
              <div className="dotd-budget-panel">
                <label htmlFor="budget-select" className="budget-label">Optional: choose your budget to get a best-food suggestion</label>
                <div className="budget-input-row">
                  <select id="budget-select" aria-label="Budget" className="budget-select">
                    <option value="">Choose budget</option>
                    <option value="Budget">Budget</option>
                    <option value="Mid">Mid</option>
                    <option value="Premium">Premium</option>
                  </select>
                  <button type="button" className="btn btn-orange" id="btn-budget-suggest">Recommend food</button>
                </div>
                <p id="budget-suggestion" className="rest-meta-text">Leave this blank if you just want the daily highlight.</p>
              </div>
              <p style={{marginTop: "1rem"}}>
                <button type="button" className="btn btn-orange" id="btn-find-onugbu">Find restaurants serving this</button>
              </p>
            </div>
          </div>
        </section>

        <section className="reveal" id="how-it-works" aria-labelledby="how-heading">
          <div className="container">
            <p className="section-label"><span className="section-idx">03</span> · How It Works</p>
            <h2 className="section-title" id="how-heading">Four steps to your next plate</h2>
            <div className="steps-grid">
              <article className="step-card"><p className="step-num">Step 01</p><h3>Search your dish</h3><p>Type what you're craving, from ofada to okra soup, and we match it to real menus.</p></article>
              <article className="step-card"><p className="step-num">Step 02</p><h3>Verify your location</h3><p>Allow location access or confirm you're in Abuja. We don't assume proximity until you explicitly verify.</p></article>
              <article className="step-card"><p className="step-num">Step 03</p><h3>See verified results</h3><p>Nearest matches appear after verification, plus accuracy scores and daily menu checks so you don't arrive disappointed.</p></article>
              <article className="step-card"><p className="step-num">Step 04</p><h3>Leave a review</h3><p>Help the community stay sharp. Was the pepper soup worth the drive?</p></article>
            </div>
          </div>
        </section>

        <section className="reveal" id="restaurants" aria-labelledby="rest-heading">
          <div className="container">
            <p className="section-label"><span className="section-idx">04</span> · Featured</p>
            <h2 className="section-title" id="rest-heading" tabIndex="-1">Restaurants in Abuja</h2>
            <p id="restaurants-status" className="rest-status-line" aria-live="polite">Showing 13 Abuja restaurants. Tap a dish tag to filter by a popular menu item.</p>
            <p className="rest-meta-line">Neighbourhoods we cover: Wuse 2 · Maitama · Garki · Gwarinpa · Jabi · Utako · Asokoro</p>
            <div className="restaurant-filter-bar" id="restaurant-filter-bar" hidden>
              <span>Filtering by dish:</span>
              <strong id="restaurant-filter-active"></strong>
              <button type="button" className="btn btn-ghost" id="clear-restaurant-filter">Clear filter</button>
            </div>
            <div className="rest-placeholder" id="rest-placeholder" style={{display: "none"}}><strong>No listings yet</strong>. Go to the hero and tap <em>Verify my location</em> or <em>I'm in Abuja (no GPS)</em>. Your nearest picks will appear here.</div>
            <div className="rest-grid" id="rest-grid-wrap">
              {[
                {name:"The Abuja Chop Bar",hood:"Wuse 2",price:"Mid",priceClass:"price-mid",dishes:"Egusi Soup,Jollof Rice,Pounded Yam",hours:"8am to 10pm",days:"Mon–Sun",phone:"+2347012345678",phoneDisplay:"+234 701 234 5678"},
                {name:"Suya Central Abuja",hood:"Maitama",price:"Budget",priceClass:"price-budget",dishes:"Suya,Kilishi,Pepper Soup",hours:"3pm to 11pm",days:"Mon–Sun",phone:"+2348098765432",phoneDisplay:"+234 809 876 5432"},
                {name:"Jabi Jollof Junction",hood:"Jabi",price:"Budget",priceClass:"price-budget",dishes:"Jollof Rice,Fried Plantain,Chicken Stew",hours:"10am to 9pm",days:"Mon–Sun",phone:"+2348033456677",phoneDisplay:"+234 803 345 6677"},
                {name:"Garki Grill House",hood:"Garki",price:"Mid",priceClass:"price-mid",dishes:"Ofada Rice,Efo Riro,Goat Meat",hours:"11am to 10pm",days:"Mon–Sun",phone:"+2348055567788",phoneDisplay:"+234 805 556 7788"},
                {name:"Utako Urban Kitchen",hood:"Utako",price:"Premium",priceClass:"price-premium",dishes:"Ofe Onugbu,Fufu,Okra Soup",hours:"9am to 10pm",days:"Mon–Sun",phone:"+2348078899001",phoneDisplay:"+234 807 889 9001"},
                {name:"Asokoro Eats",hood:"Asokoro",price:"Premium",priceClass:"price-premium",dishes:"Edikang Ikong,Pounded Yam,Afang Soup",hours:"10am to 10pm",days:"Mon–Sun",phone:"+2347023344556",phoneDisplay:"+234 702 334 4556"},
                {name:"Wuse 1 Spice Hub",hood:"Wuse 1",price:"Budget",priceClass:"price-budget",dishes:"Ogbono Soup,Eba,Suya",hours:"8am to 9pm",days:"Mon–Sun",phone:"+2348065522110",phoneDisplay:"+234 806 552 2110"},
                {name:"Gwarinpa Garden",hood:"Gwarinpa",price:"Mid",priceClass:"price-mid",dishes:"Banga Soup,Starch,Seafood Okro",hours:"11am to 11pm",days:"Mon–Sun",phone:"+2347012233445",phoneDisplay:"+234 701 223 3445"},
                {name:"Maitama Market Kitchen",hood:"Maitama",price:"Mid",priceClass:"price-mid",dishes:"Amala,Gbegiri,Ewedu",hours:"10am to 9:30pm",days:"Mon–Sun",phone:"+2348076543210",phoneDisplay:"+234 807 654 3210"},
                {name:"City Bowl Chop Shop",hood:"Central Area",price:"Premium",priceClass:"price-premium",dishes:"Pepper Soup,Goat Meat,White Rice",hours:"11am to 10pm",days:"Mon–Sun",phone:"+2348091122334",phoneDisplay:"+234 809 112 2334"},
                {name:"Green Leaf Bistro",hood:"Asokoro",price:"Mid",priceClass:"price-mid",dishes:"Efo Riro,Jollof Rice,Egusi Soup",hours:"9am to 10pm",days:"Mon–Sun",phone:"+2348079988776",phoneDisplay:"+234 807 998 8776"},
                {name:"Palm & Pepper Kitchen",hood:"Jabi",price:"Mid",priceClass:"price-mid",dishes:"Okra Soup,Pepper Soup,Catfish Stew",hours:"10am to 10pm",days:"Mon–Sun",phone:"+2348031122445",phoneDisplay:"+234 803 112 2445"},
                {name:"Bello's Suya & More",hood:"Garki",price:"Budget",priceClass:"price-budget",dishes:"Suya,Kilishi,Asun",hours:"12pm to 11pm",days:"Mon–Sun",phone:"+2348056677889",phoneDisplay:"+234 805 667 7889"},
              ].map((r) => (
                <article key={r.name} className="rest-card" data-open-days={r.days} data-dishes={r.dishes} data-area={r.hood}>
                  <div className="rest-head">
                    <div><h3>{r.name}</h3><span className="hood">{r.hood}</span></div>
                    <span className="status open">Open today</span>
                  </div>
                  <div className="rest-card-body">
                    <div className={`price-pill ${r.priceClass}`}>{r.price}</div>
                    <div className="dish-tag-row">
                      {r.dishes.split(",").map((d) => <button key={d} type="button" className="dish-chip" data-dish={d.trim()}>{d.trim()}</button>)}
                    </div>
                    <p className="rest-meta-text">Open {r.hours}</p>
                    <p className="rest-meta-days">{r.days}</p>
                    <a className="phone-link" href={`tel:${r.phone}`}>{r.phoneDisplay}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal" id="ai-recommend" aria-labelledby="ai-heading" style={{display: "none"}}>
          <div className="container">
            <p className="section-label"><span className="section-idx">05</span> · Smart picks</p>
            <h2 className="section-title" id="ai-heading">Not sure what to eat? Just tell us how you feel</h2>
            <div className="ai-wrap">
              <span className="ai-coming">Coming Soon</span>
              <div className="bubble bubble-user"><div className="bubble-label font-mono">You</div>I'm tired but I want something spicy and filling, not rice.</div>
              <div className="bubble bubble-ai"><div className="bubble-label font-mono">ChowHere</div><p id="ai-reply-copy" style={{margin: 0}}>Try pepper soup with goat meat + a side of agidi, or ofe nsala with pounded yam. We don't rank venues by distance until you <strong>verify your location</strong>. Then nearest matches surface automatically.</p></div>
              <div className="ai-input-row">
                <input type="text" id="ai-input" placeholder="Describe your mood or craving…" autoComplete="off" />
                <button type="button" className="btn btn-orange" id="ai-send">Send</button>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal" id="other-cities" aria-labelledby="cities-heading">
          <div className="container">
            <p className="section-label"><span className="section-idx">06</span> · Expansion</p>
            <h2 className="section-title section-title--lg" id="cities-heading">Coming to your city soon</h2>
            <p>We're starting in Abuja. Next stops:</p>
            <div className="city-grid" role="list">
              {["Lagos","Enugu","Port Harcourt","Ibadan","Kano","Benin City","Owerri","Kaduna"].map((city) => (
                <button key={city} type="button" className="city-card" data-city={city}><h3>{city}</h3><span className="soon">Coming Soon</span></button>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal" id="list-restaurant" aria-labelledby="list-heading">
          <div className="container list-grid">
            <div>
              <p className="section-label"><span className="section-idx">07</span> · For owners</p>
              <h2 className="section-title" id="list-heading">List your restaurant</h2>
              <p><strong>No website?</strong> You can still get listed: <strong>first year free</strong>, then a simple <strong>subscription</strong> so diners can find your dishes. Chop bars and neighbourhood kitchens welcome.</p>
              <ul className="perks">
                <li>No website? First year free, then a subscription listing</li>
                <li>Tag your dishes</li>
                <li>Appear in search</li>
                <li>Collect reviews</li>
                <li>Simple dashboard</li>
              </ul>
              <button type="button" className="btn btn-orange" id="btn-list-cta">Claim your listing</button>
            </div>
            <div className="mini-stats">
              <div className="mini-stat"><span className="stat-value">Abuja</span><span className="stat-label">Open Now</span></div>
              <div className="mini-stat"><span className="stat-value">First</span><span className="stat-label">Year Free</span></div>
              <div className="mini-stat"><span className="stat-value">More</span><span className="stat-label">Cities Coming</span></div>
              <div className="mini-stat"><span className="stat-value">Dish</span><span className="stat-label">Level Search</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <div className="footer-brand">
            <p className="logo">Chow<span>Here</span></p>
            <p className="footer-tag">Find the dish. Book the table. Fight for the last piece of meat.</p>
            <p className="footer-made">Made with in 🇳🇬</p>
          </div>
          <div className="footer-cols">
            <div className="footer-col"><h4>Discover</h4><ul><li><a href="#browse-dishes">Browse dishes</a></li><li><a href="#dish-of-the-day">Dish of the day</a></li><li><a href="#ai-recommend">AI picks</a></li><li><a href="#">Diet filters</a></li></ul></div>
            <div className="footer-col"><h4>Restaurants</h4><ul><li><a href="#restaurants">Abuja listings</a></li><li><a href="#list-restaurant">Claim listing</a></li><li><a href="#">Accuracy programme</a></li><li><a href="#">Partner support</a></li></ul></div>
            <div className="footer-col"><h4>Company</h4><ul><li><a href="#">About</a></li><li><a href="#">Careers</a></li><li><a href="#">Press</a></li><li><a href="#">Contact</a></li></ul></div>
            <div className="footer-col"><h4>Cities</h4><ul><li><a href="#hero">Abuja (live)</a></li><li><a href="#other-cities">Coming soon</a></li><li><a href="#">For investors</a></li><li><a href="#">API</a></li></ul></div>
          </div>
          <div className="footer-bottom">
            <span>© <span id="year"></span> ChowHere. All rights reserved.</span>
            <span>Built for every Nigerian, everywhere</span>
          </div>
        </div>
      </footer>
    </>
  );
}
