// @ts-nocheck
// ============================================================
// Pigment (fka Tokenz) — Figma Color Variable Generator
// Original design restored
// ============================================================

const UI_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@300;400;500&family=Geist:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #FEFEFF;
    --surface:   #16161F;
    --surface2:  #1E1E2E;
    --surface3:  #252535;
    --border:    rgba(255,255,255,0.09);
    --border2:   rgba(255,255,255,0.14);
    --purple:    #8B5CF6;
    --purple-d:  #7C3AED;
    --purple-bg: rgba(139,92,246,0.15);
    --green:     #16A34A;
    --green-bg:  rgba(22,163,74,0.15);
    --text:      #F0F0FA;
    --text-sec:  #888899;
    --text-muted:#4A4A62;
    --radius:    10px;
    --radius-sm: 6px;
  }

  html, body {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
    font-size: 13px;
    line-height: 1.5;
    width: 460px;
    overflow-x: hidden;
  }

  /* ── Screens ──────────────────────────────────────── */
  .screen { display: none; flex-direction: column; height: 580px; }
  .screen.active { display: flex; }

  /* ── Header ───────────────────────────────────────── */
  .hdr {
    display: flex; align-items: center;
    padding: 0 20px; height: 70px; gap: 6px;
    border-bottom: 1px solid #E9ECEF;
    flex-shrink: 0; background: var(--bg);
  }
  .hdr-logo { width: 30px; height: 30px; flex-shrink: 0; display: block; }
  .hdr-logo svg { width: 30px; height: 30px; display: block; }
  .hdr-name {
    font-family: 'IBM Plex Serif', Georgia, serif;
    font-size: 16px; font-weight: 500; color: #1E1E1E; letter-spacing: -0.02em;
  }

  /* ── Banner ────────────────────────────────────────── */
  .banner {
    position: relative; overflow: hidden;
    background: #E9ECEF; flex-shrink: 0;
    border-bottom: 1px solid #E9ECEF;
  }
  .banner-content {
    padding: 24px 0 24px 24px;
    display: flex; flex-direction: column;
    position: relative; z-index: 1;
  }
  .banner-heading {
    font-family: 'IBM Plex Serif', Georgia, serif;
    font-size: 20px; font-weight: 500;
    letter-spacing: -0.02em; line-height: 1.0;
    color: #1E1E1E; margin: 0;
  }
  .banner-sub {
    font-family: 'Geist', -apple-system, sans-serif;
    font-size: 12px; font-weight: 400;
    letter-spacing: -0.03em; color: #6C757D;
    margin: 12px 0 0 0;
  }
  .btn-get-prompt {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 24px; align-self: flex-start;
    background: linear-gradient(180deg, #212529 0%, #14100C 100%);
    color: #FEFCFB; border: none; outline: none;
    border-radius: 8px; padding: 10px 14px; line-height: 1;
    font-family: 'Geist', -apple-system, sans-serif;
    font-size: 12px; font-weight: 500; letter-spacing: -0.04em;
    cursor: pointer;
    box-shadow:
      0px 2px 4px -1px rgba(12, 10, 8, 0.50),
      0px 0px 0px 1px rgba(12, 10, 8, 0.10),
      inset 0px -1px 1.2px 0.35px #0C0A09,
      inset 0px 0.5px 1px 0px rgba(254, 252, 251, 0.20);
  }
  .btn-get-prompt:hover {
    background:
      linear-gradient(rgba(255,255,255,0.15), rgba(255,255,255,0.15)),
      linear-gradient(180deg, #212529 0%, #14100C 100%);
  }
  .btn-get-prompt:focus { outline: none; }
  .banner-logo-wrap {
    position: absolute; right: 20px; bottom: 0px;
    width: 130px; pointer-events: none;
  }
  .banner-logo-wrap svg { width: 130px; height: auto; display: block; }

  /* ── Screen 1 — Upload ─────────────────────────────── */
  .s1-body { flex: 1; display: flex; flex-direction: column; padding: 20px 18px; gap: 14px; overflow: hidden; }

  .upload-zone {
    border: 1.5px dashed var(--border2);
    border-radius: var(--radius);
    padding: 28px 20px 20px;
    display: flex; flex-direction: column; align-items: center;
    gap: 10px; text-align: center;
    transition: border-color 0.2s, background 0.2s;
    flex-shrink: 0;
  }
  .upload-zone.drag-over {
    border-color: var(--purple); background: var(--purple-bg);
    border-style: solid;
  }
  .upload-zone-icon { color: var(--text-muted); margin-bottom: 2px; }
  .upload-zone-title { font-size: 14px; font-weight: 600; color: var(--text); }
  .upload-zone-sub { font-size: 11px; color: var(--text-sec); }
  .btn-browse {
    background: var(--surface2); color: var(--text);
    border: 1px solid var(--border2); border-radius: var(--radius-sm);
    padding: 8px 22px; font-size: 12px; font-weight: 500;
    cursor: pointer; font-family: inherit;
    transition: background 0.15s; margin-top: 2px;
  }
  .btn-browse:hover { background: var(--surface3); }

  .file-loaded {
    display: none;
    width: 100%; background: var(--green); border-radius: var(--radius-sm);
    padding: 9px 14px; font-size: 12px; font-weight: 600; color: #fff;
    align-items: center; gap: 8px; margin-top: 4px;
  }
  .file-loaded.visible { display: flex; }

  .or-divider {
    display: flex; align-items: center; gap: 10px;
    color: var(--text-muted); font-size: 11px; flex-shrink: 0;
  }
  .or-divider::before, .or-divider::after {
    content: ""; flex: 1; height: 1px; background: var(--border);
  }

  textarea {
    width: 100%; flex: 1; min-height: 0;
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: var(--radius); padding: 12px 14px;
    font-family: "Menlo", "Monaco", "Courier New", monospace;
    font-size: 11px; color: var(--text-sec); resize: none; outline: none;
    line-height: 1.65; display: block;
    transition: border-color 0.2s;
  }
  textarea:focus { border-color: var(--purple); }
  textarea::placeholder { color: var(--text-muted); }

  .error-box {
    display: none; flex-shrink: 0;
    background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25);
    border-radius: var(--radius-sm); padding: 9px 13px;
    font-size: 11px; color: #FCA5A5; line-height: 1.5;
  }

  /* ── Bottom bar ─────────────────────────────────────── */
  .bottom-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 18px; border-top: 1px solid var(--border);
    background: var(--bg); flex-shrink: 0;
  }
  .btn-secondary {
    background: var(--surface2); color: var(--text-sec);
    border: 1px solid var(--border2); border-radius: var(--radius-sm);
    padding: 9px 18px; font-size: 12px; font-weight: 500;
    cursor: pointer; font-family: inherit; transition: all 0.15s;
  }
  .btn-secondary:hover { color: var(--text); background: var(--surface3); }
  .btn-primary {
    background: var(--purple); color: #fff; border: none;
    border-radius: var(--radius-sm); padding: 9px 20px;
    font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit;
    transition: background 0.15s;
  }
  .btn-primary:hover { background: var(--purple-d); }

  /* ── Screen 2 — Alpha Builder ─────────────────────── */

  /* Stats card */
  .stats-card {
    margin: 16px 18px 0; background: var(--surface);
    border: 1px solid var(--border2); border-radius: var(--radius);
    display: flex; flex-shrink: 0;
  }
  .stat-col {
    flex: 1; padding: 14px 0; text-align: center;
    border-right: 1px solid var(--border);
  }
  .stat-col:last-child { border-right: none; }
  .stat-num { font-size: 26px; font-weight: 800; color: var(--purple); line-height: 1; margin-bottom: 5px; }
  .stat-label { font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }

  /* Tab switcher */
  .tab-row {
    display: flex; margin: 14px 18px 0;
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: var(--radius-sm); padding: 3px; gap: 3px; flex-shrink: 0;
  }
  .tab {
    flex: 1; padding: 7px 0; font-size: 12px; font-weight: 600;
    text-align: center; cursor: pointer; border: none; border-radius: 5px;
    font-family: inherit; background: none; color: var(--text-muted);
    transition: all 0.15s;
  }
  .tab.active { background: var(--surface3); color: var(--text); }

  /* Token list */
  .list-header {
    padding: 14px 18px 6px;
    font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--text-muted); flex-shrink: 0;
  }

  .token-list { flex: 1; overflow-y: auto; min-height: 0; }
  .token-list::-webkit-scrollbar { width: 4px; }
  .token-list::-webkit-scrollbar-track { background: transparent; }
  .token-list::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 99px; }

  .group-label {
    padding: 10px 18px 4px; font-size: 9px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted);
  }

  .token-row {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 18px; transition: background 0.1s;
  }
  .token-row:hover { background: var(--surface); }

  /* Custom checkbox */
  .t-check {
    width: 16px; height: 16px; border-radius: 4px; flex-shrink: 0;
    border: 1.5px solid var(--border2); background: var(--surface2);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.15s;
  }
  .t-check.checked {
    background: var(--purple); border-color: var(--purple);
  }
  .t-check.checked::after {
    content: "";
    display: block; width: 8px; height: 5px;
    border-left: 1.5px solid #fff; border-bottom: 1.5px solid #fff;
    transform: rotate(-45deg) translateY(-1px);
  }

  .token-name { flex: 1; font-size: 11px; color: var(--text); font-family: "Menlo", monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .token-hex { font-size: 11px; color: var(--text-muted); font-family: "Menlo", monospace; flex-shrink: 0; min-width: 62px; text-align: right; }

  .btn-alpha {
    background: var(--purple); color: #fff; border: none;
    border-radius: 99px; padding: 4px 12px; font-size: 11px; font-weight: 600;
    cursor: pointer; font-family: inherit; flex-shrink: 0;
    transition: background 0.15s; white-space: nowrap;
  }
  .btn-alpha:hover { background: var(--purple-d); }
  .btn-alpha.active { background: var(--purple-d); }

  /* Alpha stop chips */
  .stop-row {
    display: flex; flex-wrap: wrap; gap: 4px;
    padding: 4px 18px 8px 44px;
  }
  .stop-chip {
    background: var(--surface2); color: var(--text-muted);
    border: 1px solid var(--border2); border-radius: 99px;
    padding: 3px 9px; font-size: 10px; cursor: pointer;
    font-family: inherit; transition: all 0.15s;
  }
  .stop-chip.on { background: var(--purple-bg); border-color: var(--purple); color: var(--purple); font-weight: 600; }

  /* ── Screen 3 — Loading ───────────────────────────── */
  .loading-body {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 16px; padding: 40px;
  }
  .spinner {
    width: 44px; height: 44px;
    border: 3px solid var(--border2);
    border-top-color: var(--purple);
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { font-size: 14px; font-weight: 600; color: var(--text); }
  .loading-sub  { font-size: 11px; color: var(--text-muted); }
  .progress-track { width: 140px; height: 3px; background: var(--border2); border-radius: 99px; overflow: hidden; margin-top: 4px; }
  .progress-fill  { height: 100%; background: var(--purple); border-radius: 99px; width: 0%; transition: width 0.4s ease; }

  /* ── Screen 4 — Success ───────────────────────────── */
  .success-body {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 16px;
    padding: 40px; text-align: center;
  }
  .success-icon {
    width: 56px; height: 56px; border-radius: 50%;
    background: rgba(22,163,74,0.12);
    border: 1px solid rgba(22,163,74,0.25);
    display: flex; align-items: center; justify-content: center;
  }
  .success-title { font-size: 17px; font-weight: 700; color: var(--text); }
  .counts-row { display: flex; gap: 10px; margin-top: 4px; }
  .count-card {
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: var(--radius); padding: 14px 20px; text-align: center; min-width: 96px;
  }
  .count-num   { font-size: 26px; font-weight: 800; color: var(--purple); line-height: 1; margin-bottom: 4px; }
  .count-label { font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
  .skipped-note { font-size: 11px; color: var(--text-muted); min-height: 16px; }
</style>
</head>
<body>

<!-- ── Screen 1: Upload ──────────────────────────────── -->
<div id="s1" class="screen active">
  <div class="hdr">
    <svg class="hdr-logo" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#p-f0)">
        <rect x="0.486877" y="0.486816" width="29.2136" height="29.2136" rx="6.81651" fill="url(#p-g0)"/>
        <rect x="0.243431" y="0.24337" width="29.7005" height="29.7005" rx="7.05995" stroke="#DEE2E6" stroke-width="0.486893"/>
        <g filter="url(#p-f1)">
          <path d="M11.906 9.27596C11.906 10.3516 11.034 11.2235 9.9584 11.2235C8.88279 11.2235 8.01083 10.3516 8.01083 9.27596C8.01083 8.20034 8.88279 7.32838 9.9584 7.32838C11.034 7.32838 11.906 8.20034 11.906 9.27596Z" fill="#1E1E1E"/>
          <path d="M11.906 9.27596C11.906 8.20034 11.034 7.32838 9.9584 7.32838C8.88279 7.32838 8.01083 8.20034 8.01083 9.27596C8.01083 10.3516 8.88279 11.2235 9.9584 11.2235C11.034 11.2235 11.906 10.3516 11.906 9.27596ZM12.2954 9.27596C12.2954 10.5667 11.2491 11.613 9.9584 11.613C8.66767 11.613 7.62141 10.5667 7.62141 9.27596C7.62141 7.98522 8.66767 6.93896 9.9584 6.93896C11.2491 6.93896 12.2954 7.98522 12.2954 9.27596Z" fill="white"/>
          <path d="M23.015 11.2235C23.015 12.2991 22.143 13.1711 21.0674 13.1711C19.9918 13.1711 19.1198 12.2991 19.1198 11.2235C19.1198 10.1479 19.9918 9.27596 21.0674 9.27596C22.143 9.27596 23.015 10.1479 23.015 11.2235Z" fill="#A06CD5"/>
          <path d="M23.015 11.2235C23.015 10.1479 22.143 9.27596 21.0674 9.27596C19.9918 9.27596 19.1198 10.1479 19.1198 11.2235C19.1198 12.2991 19.9918 13.1711 21.0674 13.1711C22.143 13.1711 23.015 12.2991 23.015 11.2235ZM23.4044 11.2235C23.4044 12.5143 22.3582 13.5605 21.0674 13.5605C19.7767 13.5605 18.7304 12.5143 18.7304 11.2235C18.7304 9.93279 19.7767 8.88654 21.0674 8.88654C22.3582 8.88654 23.4044 9.93279 23.4044 11.2235Z" fill="white"/>
          <path d="M14.4758 20.9112C14.4758 21.9868 13.6038 22.8587 12.5282 22.8587C11.4526 22.8587 10.5806 21.9868 10.5806 20.9112C10.5806 19.8356 11.4526 18.9636 12.5282 18.9636C13.6038 18.9636 14.4758 19.8356 14.4758 20.9112Z" fill="#ED383F"/>
          <path d="M14.4758 20.9112C14.4758 19.8356 13.6038 18.9636 12.5282 18.9636C11.4526 18.9636 10.5806 19.8356 10.5806 20.9112C10.5806 21.9868 11.4526 22.8587 12.5282 22.8587C13.6038 22.8587 14.4758 21.9868 14.4758 20.9112ZM14.8652 20.9112C14.8652 22.2019 13.8189 23.2482 12.5282 23.2482C11.2375 23.2482 10.1912 22.2019 10.1912 20.9112C10.1912 19.6204 11.2375 18.5742 12.5282 18.5742C13.8189 18.5742 14.8652 19.6204 14.8652 20.9112Z" fill="white"/>
          <path d="M18.4343 10.2497C18.4343 11.8632 17.1263 13.1711 15.5129 13.1711C13.8995 13.1711 12.5916 11.8632 12.5916 10.2497C12.5916 8.63632 13.8995 7.32838 15.5129 7.32838C17.1263 7.32838 18.4343 8.63632 18.4343 10.2497Z" fill="#7CB518"/>
          <path d="M18.4343 10.2497C18.4343 8.63632 17.1263 7.32838 15.5129 7.32838C13.8995 7.32838 12.5916 8.63632 12.5916 10.2497C12.5916 11.8632 13.8995 13.1711 15.5129 13.1711C17.1263 13.1711 18.4343 11.8632 18.4343 10.2497ZM18.8237 10.2497C18.8237 12.0783 17.3415 13.5605 15.5129 13.5605C13.6844 13.5605 12.2021 12.0783 12.2021 10.2497C12.2021 8.4212 13.6844 6.93896 15.5129 6.93896C17.3415 6.93896 18.8237 8.4212 18.8237 10.2497Z" fill="white"/>
          <path d="M22.8163 17.5531C22.8163 19.9733 20.8544 21.9352 18.4343 21.9352C16.0141 21.9352 14.0522 19.9733 14.0522 17.5531C14.0522 15.133 16.0141 13.1711 18.4343 13.1711C20.8544 13.1711 22.8163 15.133 22.8163 17.5531Z" fill="#1E96FC"/>
          <path d="M22.8163 17.5531C22.8163 15.133 20.8544 13.1711 18.4343 13.1711C16.0141 13.1711 14.0522 15.133 14.0522 17.5531C14.0522 19.9733 16.0141 21.9352 18.4343 21.9352C20.8544 21.9352 22.8163 19.9733 22.8163 17.5531ZM23.2057 17.5531C23.2057 20.1884 21.0695 22.3246 18.4343 22.3246C15.799 22.3246 13.6628 20.1884 13.6628 17.5531C13.6628 14.9179 15.799 12.7817 18.4343 12.7817C21.0695 12.7817 23.2057 14.9179 23.2057 17.5531Z" fill="white"/>
          <path d="M13.9889 15.2497C13.9889 17.1321 12.463 18.658 10.5806 18.658C8.69831 18.658 7.17238 17.1321 7.17238 15.2497C7.17238 13.3674 8.69831 11.8415 10.5806 11.8415C12.463 11.8415 13.9889 13.3674 13.9889 15.2497Z" fill="#FE7B02"/>
          <path d="M13.9889 15.2497C13.9889 13.3674 12.463 11.8415 10.5806 11.8415C8.69831 11.8415 7.17238 13.3674 7.17238 15.2497C7.17238 17.1321 8.69831 18.658 10.5806 18.658C12.463 18.658 13.9889 17.1321 13.9889 15.2497ZM14.3783 15.2497C14.3783 17.3472 12.6781 19.0474 10.5806 19.0474C8.48318 19.0474 6.78296 17.3472 6.78296 15.2497C6.78296 13.1523 8.48318 11.4521 10.5806 11.4521C12.6781 11.4521 14.3783 13.1523 14.3783 15.2497Z" fill="white"/>
        </g>
        <path d="M15.5125 6.6958C17.2744 6.6958 18.7362 7.97761 19.0173 9.65967C19.4888 9.04258 20.2306 8.64315 21.0671 8.64307C22.4922 8.64307 23.648 9.79813 23.6482 11.2231C23.6482 12.4385 22.8068 13.4543 21.6755 13.728C22.76 14.6479 23.449 16.0197 23.449 17.5532C23.4489 20.3229 21.204 22.5678 18.4343 22.5679C17.1439 22.5679 15.9675 22.0805 15.0789 21.2798C14.8998 22.5301 13.8279 23.4917 12.5281 23.4917C11.1031 23.4916 9.94824 22.3366 9.948 20.9116C9.948 20.2967 10.1632 19.7319 10.5222 19.2886C8.31726 19.2573 6.53979 17.4619 6.53979 15.2495C6.53988 13.6399 7.48055 12.2499 8.84253 11.6001C7.97677 11.1837 7.37769 10.3009 7.37769 9.27588C7.37773 7.85073 8.53358 6.6958 9.95874 6.6958C11.1131 6.69595 12.0891 7.45406 12.4187 8.49951C13.0292 7.42244 14.186 6.69597 15.5125 6.6958Z" stroke="white" stroke-width="0.486893"/>
      </g>
      <defs>
        <filter id="p-f0" x="0" y="-0.155806" width="30.1874" height="30.83" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feMorphology radius="0.155806" operator="erode" in="SourceAlpha" result="eis1"/>
          <feOffset dy="-0.584272"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.807843 0 0 0 0 0.831373 0 0 0 0 0.854902 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="eis1"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.73034"/>
          <feGaussianBlur stdDeviation="0.243447"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="eis1" result="eis2"/>
        </filter>
        <filter id="p-f1" x="6.29608" y="6.45215" width="17.5952" height="18.2567" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.973787"/>
          <feGaussianBlur stdDeviation="0.73034"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
          <feBlend mode="normal" in2="shape" result="eis1"/>
        </filter>
        <linearGradient id="p-g0" x1="15.0937" y1="0.486816" x2="15.0937" y2="29.7004" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E9ECEF"/>
          <stop offset="0.635819" stop-color="#F5F3F4"/>
        </linearGradient>
      </defs>
    </svg>
    <span class="hdr-name">pigment</span>
  </div>

  <div class="banner">
    <div class="banner-content">
      <h2 class="banner-heading">Don't have a token file?<br>AI can build one</h2>
      <p class="banner-sub">Copy our prompt &rarr; paste into Claude or ChatGPT &rarr; upload the output here</p>
      <button id="btnGetPrompt" class="btn-get-prompt">
        <span>Get Prompt</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.875 6H10.125" stroke="#FDFDFE" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.75 2.625L10.125 6L6.75 9.375" stroke="#FDFDFE" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="banner-logo-wrap">
      <svg viewBox="0 0 93 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#pfav-f0)">
          <path d="M40.6205 27.1332C38.9906 31.2144 34.3609 33.2015 30.2797 31.5717C26.1985 29.9418 24.2114 25.3121 25.8412 21.2309C27.4711 17.1497 32.1008 15.1626 36.182 16.7924C40.2632 18.4223 42.2503 23.052 40.6205 27.1332Z" fill="#1E1E1E"/>
          <path d="M40.6205 27.1332C42.2503 23.052 40.2632 18.4223 36.182 16.7924C32.1008 15.1626 27.4711 17.1497 25.8412 21.2309C24.2114 25.3121 26.1985 29.9418 30.2797 31.5717C34.3609 33.2015 38.9906 31.2144 40.6205 27.1332ZM42.098 27.7233C40.1422 32.6207 34.587 35.0051 29.6896 33.0492C24.7922 31.0934 22.4078 25.5382 24.3637 20.6408C26.3195 15.7434 31.8747 13.359 36.7721 15.3149C41.6695 17.2707 44.0539 22.8259 42.098 27.7233Z" fill="white"/>
          <path d="M79.8199 51.3562C78.19 55.4374 73.5603 57.4246 69.4791 55.7947C65.3979 54.1648 63.4108 49.5351 65.0406 45.454C66.6705 41.3728 71.3002 39.3856 75.3814 41.0155C79.4626 42.6454 81.4497 47.2751 79.8199 51.3562Z" fill="#A06CD5"/>
          <path d="M79.8199 51.3562C81.4497 47.2751 79.4626 42.6454 75.3814 41.0155C71.3002 39.3856 66.6705 41.3728 65.0406 45.454C63.4108 49.5351 65.3979 54.1648 69.4791 55.7947C73.5603 57.4246 78.19 55.4374 79.8199 51.3562ZM81.2974 51.9463C79.3416 56.8437 73.7864 59.2281 68.889 57.2723C63.9916 55.3164 61.6072 49.7613 63.5631 44.8639C65.5189 39.9665 71.0741 37.5821 75.9715 39.5379C80.8689 41.4938 83.2533 47.0489 81.2974 51.9463Z" fill="white"/>
          <path d="M32.7402 75.1743C31.1103 79.2555 26.4806 81.2427 22.3994 79.6128C18.3183 77.9829 16.3311 73.3532 17.961 69.272C19.5908 65.1909 24.2206 63.2037 28.3017 64.8336C32.3829 66.4635 34.3701 71.0932 32.7402 75.1743Z" fill="#ED383F"/>
          <path d="M32.7402 75.1743C34.3701 71.0932 32.3829 66.4635 28.3017 64.8336C24.2206 63.2037 19.5908 65.1909 17.961 69.272C16.3311 73.3532 18.3183 77.9829 22.3994 79.6128C26.4806 81.2427 31.1103 79.2555 32.7402 75.1743ZM34.2178 75.7644C32.2619 80.6618 26.7068 83.0462 21.8093 81.0904C16.9119 79.1345 14.5276 73.5794 16.4834 68.682C18.4392 63.7846 23.9944 61.4002 28.8918 63.356C33.7892 65.3119 36.1736 70.867 34.2178 75.7644Z" fill="white"/>
          <path d="M63.915 40.7203C61.4702 46.8421 54.5256 49.8228 48.4039 47.378C42.2821 44.9332 39.3014 37.9886 41.7462 31.8669C44.191 25.7451 51.1356 22.7644 57.2573 25.2092C63.3791 27.654 66.3598 34.5986 63.915 40.7203Z" fill="#7CB518"/>
          <path d="M63.915 40.7203C66.3598 34.5986 63.3791 27.654 57.2573 25.2092C51.1356 22.7644 44.191 25.7451 41.7462 31.8669C39.3014 37.9886 42.2821 44.9332 48.4039 47.378C54.5256 49.8228 61.4702 46.8421 63.915 40.7203ZM65.3926 41.3104C62.6218 48.2484 54.7518 51.6264 47.8138 48.8556C40.8758 46.0848 37.4978 38.2148 40.2686 31.2768C43.0394 24.3388 50.9094 20.9608 57.8474 23.7316C64.7854 26.5024 68.1634 34.3724 65.3926 41.3104Z" fill="white"/>
          <path d="M69.4749 75.0715C65.8077 84.2541 55.3908 88.7252 46.2081 85.058C37.0255 81.3908 32.5544 70.9739 36.2216 61.7913C39.8888 52.6087 50.3057 48.1375 59.4883 51.8047C68.6709 55.472 73.1421 65.8888 69.4749 75.0715Z" fill="#1E96FC"/>
          <path d="M69.4749 75.0715C73.1421 65.8888 68.6709 55.472 59.4883 51.8047C50.3057 48.1375 39.8888 52.6087 36.2216 61.7913C32.5544 70.9739 37.0255 81.3908 46.2081 85.058C55.3908 88.7252 65.8077 84.2541 69.4749 75.0715ZM70.9524 75.6615C66.9592 85.6604 55.6169 90.5288 45.6181 86.5356C35.6192 82.5424 30.7508 71.2001 34.744 61.2012C38.7372 51.2023 50.0795 46.334 60.0784 50.3272C70.0773 54.3204 74.9456 65.6627 70.9524 75.6615Z" fill="white"/>
          <path d="M39.4715 52.9555C36.6193 60.0976 28.5173 63.5751 21.3752 60.7228C14.2332 57.8706 10.7556 49.7686 13.6079 42.6265C16.4602 35.4845 24.5622 32.0069 31.7042 34.8592C38.8463 37.7115 42.3238 45.8135 39.4715 52.9555Z" fill="#FE7B02"/>
          <path d="M39.4715 52.9555C42.3238 45.8135 38.8463 37.7115 31.7042 34.8592C24.5622 32.0069 16.4602 35.4845 13.6079 42.6265C10.7556 49.7686 14.2332 57.8706 21.3752 60.7228C28.5173 63.5751 36.6193 60.0976 39.4715 52.9555ZM40.9491 53.5456C37.7709 61.5039 28.7434 65.3787 20.7851 62.2004C12.8268 59.0222 8.95207 49.9947 12.1303 42.0364C15.3086 34.0781 24.336 30.2034 32.2943 33.3816C40.2526 36.5599 44.1274 45.5873 40.9491 53.5456Z" fill="white"/>
          <path d="M22.5164 19.9027C24.8798 13.9852 31.5942 11.1031 37.5118 13.4664C41.6558 15.122 44.2991 18.9131 44.706 23.0676C48.7393 20.5943 53.8522 19.9929 58.584 21.8819C65.0975 24.4832 68.872 31.0044 68.2867 37.649C70.9063 36.6392 73.8947 36.5679 76.7078 37.6911C82.6251 40.0542 85.5079 46.7654 83.1456 52.6827C81.3633 57.1458 77.1062 59.8782 72.5828 59.9398C74.7585 64.9962 75.0044 70.8843 72.8015 76.4004C68.4008 87.4193 55.9002 92.7818 44.8811 88.3813C40.3079 86.5549 36.7113 83.333 34.3798 79.4013C31.2927 83.2878 25.9176 84.8722 21.0714 82.9368C15.1546 80.5736 12.2715 73.8623 14.6336 67.9452C15.4102 66.0005 16.6627 64.3875 18.1962 63.177C10.4866 59.0087 6.95224 49.6341 10.2817 41.2972C12.6273 35.4247 17.7971 31.5213 23.6047 30.5282C21.601 27.4832 21.0619 23.5447 22.5164 19.9027ZM34.744 61.2012C33.9706 63.1379 33.5337 65.1256 33.398 67.0999C32.3604 65.467 30.8259 64.1284 28.8918 63.356C28.7363 63.2939 28.5767 63.2448 28.42 63.1914C30.7273 62.9076 32.9376 62.1065 34.8875 60.8636C34.8402 60.9761 34.7895 61.0874 34.744 61.2012ZM41.4996 43.6724C42.9682 45.9318 45.1211 47.7798 47.8138 48.8556C48.2422 49.0267 48.6747 49.1729 49.1088 49.2977C46.2632 49.8566 43.568 51.0428 41.2349 52.7694C42.2665 49.733 42.3012 46.5758 41.4996 43.6724ZM64.0203 43.889C63.8529 44.2017 63.6978 44.5268 63.5631 44.8639C62.5786 47.3289 62.6949 49.9601 63.6766 52.2155C62.8364 51.6557 61.9431 51.1544 60.9996 50.7211L60.0784 50.3272C58.9183 49.8639 57.7398 49.5212 56.5571 49.2906C59.5471 48.4311 62.2145 46.5549 64.0203 43.889ZM41.0548 29.6392C40.7613 30.1601 40.4965 30.7063 40.2686 31.2768C39.1695 34.0291 39.0417 36.9271 39.7162 39.5962C38.1702 37.1059 35.9089 35.0312 33.0797 33.7193C36.2216 33.7686 39.2308 32.2592 41.0548 29.6392ZM24.0473 21.5667C22.8526 25.7426 24.6561 30.1843 28.3564 32.3786C21.5547 31.5725 14.7919 35.3729 12.1303 42.0364C8.95207 49.9947 12.8268 59.0222 20.7851 62.2004C21.5687 62.5133 22.3647 62.7515 23.1624 62.9305C20.237 63.622 17.683 65.6782 16.4834 68.682L16.1659 69.6054C14.9226 73.9478 16.9164 78.5898 20.9197 80.6809L21.8093 81.0904C26.7068 83.0462 32.2619 80.6618 34.2178 75.7644C34.3223 75.5026 34.4062 75.2364 34.4863 74.9714C36.1962 79.7665 39.7624 83.8763 44.6969 86.1424L45.6181 86.5356C55.3049 90.4041 66.2542 85.9562 70.5589 76.5831L70.9524 75.6615C73.4861 69.3172 72.4512 62.4327 68.8027 57.2272C68.8322 57.2393 68.8593 57.2604 68.889 57.2723C73.7864 59.2281 79.3416 56.8437 81.2974 51.9463C83.2533 47.0489 80.8689 41.4938 75.9715 39.5379C71.7687 37.86 67.0859 39.3815 64.6051 42.9411C64.8977 42.4213 65.1653 41.8795 65.3926 41.3104C68.1634 34.3724 64.7854 26.5024 57.8474 23.7316C51.8363 21.332 45.1253 23.5476 41.6381 28.695C41.8054 28.3823 41.9634 28.0604 42.098 27.7233C43.9316 23.1316 41.9507 17.9603 37.6597 15.7209L36.7721 15.3149C31.8747 13.359 26.3195 15.7434 24.3637 20.6408L24.0473 21.5667Z" fill="white"/>
        </g>
        <defs>
          <filter id="pfav-f0" x="-1.43051e-05" y="-6.8903e-05" width="92.9999" height="95.3372" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="-3.61163"/>
            <feGaussianBlur stdDeviation="4.51453"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="ds1"/>
            <feBlend mode="normal" in="SourceGraphic" in2="ds1" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="0.973787"/>
            <feGaussianBlur stdDeviation="0.73034"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
            <feBlend mode="normal" in2="shape" result="is1"/>
          </filter>
        </defs>
      </svg>
    </div>
  </div>

  <div class="s1-body">
    <div id="uploadZone" class="upload-zone">
      <svg class="upload-zone-icon" width="40" height="44" viewBox="0 0 40 44" fill="none">
        <rect x="2" y="2" width="28" height="36" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <path d="M8 10H22M8 16H18M8 22H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <rect x="24" y="22" width="14" height="20" rx="3" fill="currentColor" opacity="0.12"/>
        <path d="M31 28V36M31 36L28 33M31 36L34 33" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="upload-zone-title">Drop your tokens.json here</div>
      <div class="upload-zone-sub">or use the button below to browse</div>
      <button id="btnBrowse" class="btn-browse">Browse file&hellip;</button>
      <div id="fileLoaded" class="file-loaded">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7L5.5 10.5L12 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span id="fileName">tokens.json</span>
      </div>
      <input type="file" id="fileInput" accept=".json" style="display:none">
    </div>

    <div class="or-divider">or paste JSON directly</div>

    <textarea id="jsonInput" placeholder='{
  "primitives": {
    "purple": { "500": "#7C4EF0" },
    "gray":   { "10": "#F9F9FB", "100": "#0D0D0D" }
  },
  "semantics": {
    "brand": { "primary": "{primitive.purple.500}" }
  }
}'></textarea>

    <div id="errorBox" class="error-box"></div>
  </div>

  <div class="bottom-bar">
    <button id="btnSample" class="btn-secondary">Load sample JSON</button>
    <button id="btnParse"  class="btn-primary">Parse Tokens &rarr;</button>
  </div>
</div>

<!-- ── Screen 2: Alpha Builder ─────────────────────── -->
<div id="s2" class="screen">
  <div class="hdr">
    <svg class="hdr-logo" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#p-f0)">
        <rect x="0.486877" y="0.486816" width="29.2136" height="29.2136" rx="6.81651" fill="url(#p-g0)"/>
        <rect x="0.243431" y="0.24337" width="29.7005" height="29.7005" rx="7.05995" stroke="#DEE2E6" stroke-width="0.486893"/>
        <g filter="url(#p-f1)">
          <path d="M11.906 9.27596C11.906 10.3516 11.034 11.2235 9.9584 11.2235C8.88279 11.2235 8.01083 10.3516 8.01083 9.27596C8.01083 8.20034 8.88279 7.32838 9.9584 7.32838C11.034 7.32838 11.906 8.20034 11.906 9.27596Z" fill="#1E1E1E"/>
          <path d="M11.906 9.27596C11.906 8.20034 11.034 7.32838 9.9584 7.32838C8.88279 7.32838 8.01083 8.20034 8.01083 9.27596C8.01083 10.3516 8.88279 11.2235 9.9584 11.2235C11.034 11.2235 11.906 10.3516 11.906 9.27596ZM12.2954 9.27596C12.2954 10.5667 11.2491 11.613 9.9584 11.613C8.66767 11.613 7.62141 10.5667 7.62141 9.27596C7.62141 7.98522 8.66767 6.93896 9.9584 6.93896C11.2491 6.93896 12.2954 7.98522 12.2954 9.27596Z" fill="white"/>
          <path d="M23.015 11.2235C23.015 12.2991 22.143 13.1711 21.0674 13.1711C19.9918 13.1711 19.1198 12.2991 19.1198 11.2235C19.1198 10.1479 19.9918 9.27596 21.0674 9.27596C22.143 9.27596 23.015 10.1479 23.015 11.2235Z" fill="#A06CD5"/>
          <path d="M23.015 11.2235C23.015 10.1479 22.143 9.27596 21.0674 9.27596C19.9918 9.27596 19.1198 10.1479 19.1198 11.2235C19.1198 12.2991 19.9918 13.1711 21.0674 13.1711C22.143 13.1711 23.015 12.2991 23.015 11.2235ZM23.4044 11.2235C23.4044 12.5143 22.3582 13.5605 21.0674 13.5605C19.7767 13.5605 18.7304 12.5143 18.7304 11.2235C18.7304 9.93279 19.7767 8.88654 21.0674 8.88654C22.3582 8.88654 23.4044 9.93279 23.4044 11.2235Z" fill="white"/>
          <path d="M14.4758 20.9112C14.4758 21.9868 13.6038 22.8587 12.5282 22.8587C11.4526 22.8587 10.5806 21.9868 10.5806 20.9112C10.5806 19.8356 11.4526 18.9636 12.5282 18.9636C13.6038 18.9636 14.4758 19.8356 14.4758 20.9112Z" fill="#ED383F"/>
          <path d="M14.4758 20.9112C14.4758 19.8356 13.6038 18.9636 12.5282 18.9636C11.4526 18.9636 10.5806 19.8356 10.5806 20.9112C10.5806 21.9868 11.4526 22.8587 12.5282 22.8587C13.6038 22.8587 14.4758 21.9868 14.4758 20.9112ZM14.8652 20.9112C14.8652 22.2019 13.8189 23.2482 12.5282 23.2482C11.2375 23.2482 10.1912 22.2019 10.1912 20.9112C10.1912 19.6204 11.2375 18.5742 12.5282 18.5742C13.8189 18.5742 14.8652 19.6204 14.8652 20.9112Z" fill="white"/>
          <path d="M18.4343 10.2497C18.4343 11.8632 17.1263 13.1711 15.5129 13.1711C13.8995 13.1711 12.5916 11.8632 12.5916 10.2497C12.5916 8.63632 13.8995 7.32838 15.5129 7.32838C17.1263 7.32838 18.4343 8.63632 18.4343 10.2497Z" fill="#7CB518"/>
          <path d="M18.4343 10.2497C18.4343 8.63632 17.1263 7.32838 15.5129 7.32838C13.8995 7.32838 12.5916 8.63632 12.5916 10.2497C12.5916 11.8632 13.8995 13.1711 15.5129 13.1711C17.1263 13.1711 18.4343 11.8632 18.4343 10.2497ZM18.8237 10.2497C18.8237 12.0783 17.3415 13.5605 15.5129 13.5605C13.6844 13.5605 12.2021 12.0783 12.2021 10.2497C12.2021 8.4212 13.6844 6.93896 15.5129 6.93896C17.3415 6.93896 18.8237 8.4212 18.8237 10.2497Z" fill="white"/>
          <path d="M22.8163 17.5531C22.8163 19.9733 20.8544 21.9352 18.4343 21.9352C16.0141 21.9352 14.0522 19.9733 14.0522 17.5531C14.0522 15.133 16.0141 13.1711 18.4343 13.1711C20.8544 13.1711 22.8163 15.133 22.8163 17.5531Z" fill="#1E96FC"/>
          <path d="M22.8163 17.5531C22.8163 15.133 20.8544 13.1711 18.4343 13.1711C16.0141 13.1711 14.0522 15.133 14.0522 17.5531C14.0522 19.9733 16.0141 21.9352 18.4343 21.9352C20.8544 21.9352 22.8163 19.9733 22.8163 17.5531ZM23.2057 17.5531C23.2057 20.1884 21.0695 22.3246 18.4343 22.3246C15.799 22.3246 13.6628 20.1884 13.6628 17.5531C13.6628 14.9179 15.799 12.7817 18.4343 12.7817C21.0695 12.7817 23.2057 14.9179 23.2057 17.5531Z" fill="white"/>
          <path d="M13.9889 15.2497C13.9889 17.1321 12.463 18.658 10.5806 18.658C8.69831 18.658 7.17238 17.1321 7.17238 15.2497C7.17238 13.3674 8.69831 11.8415 10.5806 11.8415C12.463 11.8415 13.9889 13.3674 13.9889 15.2497Z" fill="#FE7B02"/>
          <path d="M13.9889 15.2497C13.9889 13.3674 12.463 11.8415 10.5806 11.8415C8.69831 11.8415 7.17238 13.3674 7.17238 15.2497C7.17238 17.1321 8.69831 18.658 10.5806 18.658C12.463 18.658 13.9889 17.1321 13.9889 15.2497ZM14.3783 15.2497C14.3783 17.3472 12.6781 19.0474 10.5806 19.0474C8.48318 19.0474 6.78296 17.3472 6.78296 15.2497C6.78296 13.1523 8.48318 11.4521 10.5806 11.4521C12.6781 11.4521 14.3783 13.1523 14.3783 15.2497Z" fill="white"/>
        </g>
        <path d="M15.5125 6.6958C17.2744 6.6958 18.7362 7.97761 19.0173 9.65967C19.4888 9.04258 20.2306 8.64315 21.0671 8.64307C22.4922 8.64307 23.648 9.79813 23.6482 11.2231C23.6482 12.4385 22.8068 13.4543 21.6755 13.728C22.76 14.6479 23.449 16.0197 23.449 17.5532C23.4489 20.3229 21.204 22.5678 18.4343 22.5679C17.1439 22.5679 15.9675 22.0805 15.0789 21.2798C14.8998 22.5301 13.8279 23.4917 12.5281 23.4917C11.1031 23.4916 9.94824 22.3366 9.948 20.9116C9.948 20.2967 10.1632 19.7319 10.5222 19.2886C8.31726 19.2573 6.53979 17.4619 6.53979 15.2495C6.53988 13.6399 7.48055 12.2499 8.84253 11.6001C7.97677 11.1837 7.37769 10.3009 7.37769 9.27588C7.37773 7.85073 8.53358 6.6958 9.95874 6.6958C11.1131 6.69595 12.0891 7.45406 12.4187 8.49951C13.0292 7.42244 14.186 6.69597 15.5125 6.6958Z" stroke="white" stroke-width="0.486893"/>
      </g>
      <defs>
        <filter id="p-f0" x="0" y="-0.155806" width="30.1874" height="30.83" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feMorphology radius="0.155806" operator="erode" in="SourceAlpha" result="eis1"/>
          <feOffset dy="-0.584272"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.807843 0 0 0 0 0.831373 0 0 0 0 0.854902 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="eis1"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.73034"/>
          <feGaussianBlur stdDeviation="0.243447"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="eis1" result="eis2"/>
        </filter>
        <filter id="p-f1" x="6.29608" y="6.45215" width="17.5952" height="18.2567" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.973787"/>
          <feGaussianBlur stdDeviation="0.73034"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
          <feBlend mode="normal" in2="shape" result="eis1"/>
        </filter>
        <linearGradient id="p-g0" x1="15.0937" y1="0.486816" x2="15.0937" y2="29.7004" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E9ECEF"/>
          <stop offset="0.635819" stop-color="#F5F3F4"/>
        </linearGradient>
      </defs>
    </svg>
    <span class="hdr-name">pigment</span>
  </div>

  <div class="stats-card">
    <div class="stat-col"><div id="statPrim" class="stat-num">0</div><div class="stat-label">Primitives</div></div>
    <div class="stat-col"><div id="statSem"  class="stat-num">0</div><div class="stat-label">Semantics</div></div>
    <div class="stat-col"><div id="statAlpha" class="stat-num">0</div><div class="stat-label">Alpha Stops</div></div>
  </div>

  <div class="tab-row">
    <button id="tabPrim" class="tab active">Primitives</button>
    <button id="tabSem"  class="tab">Semantics</button>
  </div>

  <div class="list-header">Select tokens to generate opacity variants</div>

  <div id="tokenList" class="token-list"></div>

  <div class="bottom-bar">
    <button id="btnBack"     class="btn-secondary">&larr; Back</button>
    <button id="btnGenerate" class="btn-primary">Generate Variables &rarr;</button>
  </div>
</div>

<!-- ── Screen 3: Loading ─────────────────────────────── -->
<div id="s3" class="screen">
  <div class="hdr">
    <svg class="hdr-logo" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#p-f0)">
        <rect x="0.486877" y="0.486816" width="29.2136" height="29.2136" rx="6.81651" fill="url(#p-g0)"/>
        <rect x="0.243431" y="0.24337" width="29.7005" height="29.7005" rx="7.05995" stroke="#DEE2E6" stroke-width="0.486893"/>
        <g filter="url(#p-f1)">
          <path d="M11.906 9.27596C11.906 10.3516 11.034 11.2235 9.9584 11.2235C8.88279 11.2235 8.01083 10.3516 8.01083 9.27596C8.01083 8.20034 8.88279 7.32838 9.9584 7.32838C11.034 7.32838 11.906 8.20034 11.906 9.27596Z" fill="#1E1E1E"/>
          <path d="M11.906 9.27596C11.906 8.20034 11.034 7.32838 9.9584 7.32838C8.88279 7.32838 8.01083 8.20034 8.01083 9.27596C8.01083 10.3516 8.88279 11.2235 9.9584 11.2235C11.034 11.2235 11.906 10.3516 11.906 9.27596ZM12.2954 9.27596C12.2954 10.5667 11.2491 11.613 9.9584 11.613C8.66767 11.613 7.62141 10.5667 7.62141 9.27596C7.62141 7.98522 8.66767 6.93896 9.9584 6.93896C11.2491 6.93896 12.2954 7.98522 12.2954 9.27596Z" fill="white"/>
          <path d="M23.015 11.2235C23.015 12.2991 22.143 13.1711 21.0674 13.1711C19.9918 13.1711 19.1198 12.2991 19.1198 11.2235C19.1198 10.1479 19.9918 9.27596 21.0674 9.27596C22.143 9.27596 23.015 10.1479 23.015 11.2235Z" fill="#A06CD5"/>
          <path d="M23.015 11.2235C23.015 10.1479 22.143 9.27596 21.0674 9.27596C19.9918 9.27596 19.1198 10.1479 19.1198 11.2235C19.1198 12.2991 19.9918 13.1711 21.0674 13.1711C22.143 13.1711 23.015 12.2991 23.015 11.2235ZM23.4044 11.2235C23.4044 12.5143 22.3582 13.5605 21.0674 13.5605C19.7767 13.5605 18.7304 12.5143 18.7304 11.2235C18.7304 9.93279 19.7767 8.88654 21.0674 8.88654C22.3582 8.88654 23.4044 9.93279 23.4044 11.2235Z" fill="white"/>
          <path d="M14.4758 20.9112C14.4758 21.9868 13.6038 22.8587 12.5282 22.8587C11.4526 22.8587 10.5806 21.9868 10.5806 20.9112C10.5806 19.8356 11.4526 18.9636 12.5282 18.9636C13.6038 18.9636 14.4758 19.8356 14.4758 20.9112Z" fill="#ED383F"/>
          <path d="M14.4758 20.9112C14.4758 19.8356 13.6038 18.9636 12.5282 18.9636C11.4526 18.9636 10.5806 19.8356 10.5806 20.9112C10.5806 21.9868 11.4526 22.8587 12.5282 22.8587C13.6038 22.8587 14.4758 21.9868 14.4758 20.9112ZM14.8652 20.9112C14.8652 22.2019 13.8189 23.2482 12.5282 23.2482C11.2375 23.2482 10.1912 22.2019 10.1912 20.9112C10.1912 19.6204 11.2375 18.5742 12.5282 18.5742C13.8189 18.5742 14.8652 19.6204 14.8652 20.9112Z" fill="white"/>
          <path d="M18.4343 10.2497C18.4343 11.8632 17.1263 13.1711 15.5129 13.1711C13.8995 13.1711 12.5916 11.8632 12.5916 10.2497C12.5916 8.63632 13.8995 7.32838 15.5129 7.32838C17.1263 7.32838 18.4343 8.63632 18.4343 10.2497Z" fill="#7CB518"/>
          <path d="M18.4343 10.2497C18.4343 8.63632 17.1263 7.32838 15.5129 7.32838C13.8995 7.32838 12.5916 8.63632 12.5916 10.2497C12.5916 11.8632 13.8995 13.1711 15.5129 13.1711C17.1263 13.1711 18.4343 11.8632 18.4343 10.2497ZM18.8237 10.2497C18.8237 12.0783 17.3415 13.5605 15.5129 13.5605C13.6844 13.5605 12.2021 12.0783 12.2021 10.2497C12.2021 8.4212 13.6844 6.93896 15.5129 6.93896C17.3415 6.93896 18.8237 8.4212 18.8237 10.2497Z" fill="white"/>
          <path d="M22.8163 17.5531C22.8163 19.9733 20.8544 21.9352 18.4343 21.9352C16.0141 21.9352 14.0522 19.9733 14.0522 17.5531C14.0522 15.133 16.0141 13.1711 18.4343 13.1711C20.8544 13.1711 22.8163 15.133 22.8163 17.5531Z" fill="#1E96FC"/>
          <path d="M22.8163 17.5531C22.8163 15.133 20.8544 13.1711 18.4343 13.1711C16.0141 13.1711 14.0522 15.133 14.0522 17.5531C14.0522 19.9733 16.0141 21.9352 18.4343 21.9352C20.8544 21.9352 22.8163 19.9733 22.8163 17.5531ZM23.2057 17.5531C23.2057 20.1884 21.0695 22.3246 18.4343 22.3246C15.799 22.3246 13.6628 20.1884 13.6628 17.5531C13.6628 14.9179 15.799 12.7817 18.4343 12.7817C21.0695 12.7817 23.2057 14.9179 23.2057 17.5531Z" fill="white"/>
          <path d="M13.9889 15.2497C13.9889 17.1321 12.463 18.658 10.5806 18.658C8.69831 18.658 7.17238 17.1321 7.17238 15.2497C7.17238 13.3674 8.69831 11.8415 10.5806 11.8415C12.463 11.8415 13.9889 13.3674 13.9889 15.2497Z" fill="#FE7B02"/>
          <path d="M13.9889 15.2497C13.9889 13.3674 12.463 11.8415 10.5806 11.8415C8.69831 11.8415 7.17238 13.3674 7.17238 15.2497C7.17238 17.1321 8.69831 18.658 10.5806 18.658C12.463 18.658 13.9889 17.1321 13.9889 15.2497ZM14.3783 15.2497C14.3783 17.3472 12.6781 19.0474 10.5806 19.0474C8.48318 19.0474 6.78296 17.3472 6.78296 15.2497C6.78296 13.1523 8.48318 11.4521 10.5806 11.4521C12.6781 11.4521 14.3783 13.1523 14.3783 15.2497Z" fill="white"/>
        </g>
        <path d="M15.5125 6.6958C17.2744 6.6958 18.7362 7.97761 19.0173 9.65967C19.4888 9.04258 20.2306 8.64315 21.0671 8.64307C22.4922 8.64307 23.648 9.79813 23.6482 11.2231C23.6482 12.4385 22.8068 13.4543 21.6755 13.728C22.76 14.6479 23.449 16.0197 23.449 17.5532C23.4489 20.3229 21.204 22.5678 18.4343 22.5679C17.1439 22.5679 15.9675 22.0805 15.0789 21.2798C14.8998 22.5301 13.8279 23.4917 12.5281 23.4917C11.1031 23.4916 9.94824 22.3366 9.948 20.9116C9.948 20.2967 10.1632 19.7319 10.5222 19.2886C8.31726 19.2573 6.53979 17.4619 6.53979 15.2495C6.53988 13.6399 7.48055 12.2499 8.84253 11.6001C7.97677 11.1837 7.37769 10.3009 7.37769 9.27588C7.37773 7.85073 8.53358 6.6958 9.95874 6.6958C11.1131 6.69595 12.0891 7.45406 12.4187 8.49951C13.0292 7.42244 14.186 6.69597 15.5125 6.6958Z" stroke="white" stroke-width="0.486893"/>
      </g>
      <defs>
        <filter id="p-f0" x="0" y="-0.155806" width="30.1874" height="30.83" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feMorphology radius="0.155806" operator="erode" in="SourceAlpha" result="eis1"/>
          <feOffset dy="-0.584272"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.807843 0 0 0 0 0.831373 0 0 0 0 0.854902 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="eis1"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.73034"/>
          <feGaussianBlur stdDeviation="0.243447"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="eis1" result="eis2"/>
        </filter>
        <filter id="p-f1" x="6.29608" y="6.45215" width="17.5952" height="18.2567" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.973787"/>
          <feGaussianBlur stdDeviation="0.73034"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
          <feBlend mode="normal" in2="shape" result="eis1"/>
        </filter>
        <linearGradient id="p-g0" x1="15.0937" y1="0.486816" x2="15.0937" y2="29.7004" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E9ECEF"/>
          <stop offset="0.635819" stop-color="#F5F3F4"/>
        </linearGradient>
      </defs>
    </svg>
    <span class="hdr-name">pigment</span>
  </div>
  <div class="loading-body">
    <div class="spinner"></div>
    <div class="loading-text">Generating variables&hellip;</div>
    <div class="loading-sub">Organising colour pigments</div>
    <div class="progress-track"><div id="progressFill" class="progress-fill"></div></div>
  </div>
</div>

<!-- ── Screen 4: Success ─────────────────────────────── -->
<div id="s4" class="screen">
  <div class="hdr">
    <svg class="hdr-logo" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#p-f0)">
        <rect x="0.486877" y="0.486816" width="29.2136" height="29.2136" rx="6.81651" fill="url(#p-g0)"/>
        <rect x="0.243431" y="0.24337" width="29.7005" height="29.7005" rx="7.05995" stroke="#DEE2E6" stroke-width="0.486893"/>
        <g filter="url(#p-f1)">
          <path d="M11.906 9.27596C11.906 10.3516 11.034 11.2235 9.9584 11.2235C8.88279 11.2235 8.01083 10.3516 8.01083 9.27596C8.01083 8.20034 8.88279 7.32838 9.9584 7.32838C11.034 7.32838 11.906 8.20034 11.906 9.27596Z" fill="#1E1E1E"/>
          <path d="M11.906 9.27596C11.906 8.20034 11.034 7.32838 9.9584 7.32838C8.88279 7.32838 8.01083 8.20034 8.01083 9.27596C8.01083 10.3516 8.88279 11.2235 9.9584 11.2235C11.034 11.2235 11.906 10.3516 11.906 9.27596ZM12.2954 9.27596C12.2954 10.5667 11.2491 11.613 9.9584 11.613C8.66767 11.613 7.62141 10.5667 7.62141 9.27596C7.62141 7.98522 8.66767 6.93896 9.9584 6.93896C11.2491 6.93896 12.2954 7.98522 12.2954 9.27596Z" fill="white"/>
          <path d="M23.015 11.2235C23.015 12.2991 22.143 13.1711 21.0674 13.1711C19.9918 13.1711 19.1198 12.2991 19.1198 11.2235C19.1198 10.1479 19.9918 9.27596 21.0674 9.27596C22.143 9.27596 23.015 10.1479 23.015 11.2235Z" fill="#A06CD5"/>
          <path d="M23.015 11.2235C23.015 10.1479 22.143 9.27596 21.0674 9.27596C19.9918 9.27596 19.1198 10.1479 19.1198 11.2235C19.1198 12.2991 19.9918 13.1711 21.0674 13.1711C22.143 13.1711 23.015 12.2991 23.015 11.2235ZM23.4044 11.2235C23.4044 12.5143 22.3582 13.5605 21.0674 13.5605C19.7767 13.5605 18.7304 12.5143 18.7304 11.2235C18.7304 9.93279 19.7767 8.88654 21.0674 8.88654C22.3582 8.88654 23.4044 9.93279 23.4044 11.2235Z" fill="white"/>
          <path d="M14.4758 20.9112C14.4758 21.9868 13.6038 22.8587 12.5282 22.8587C11.4526 22.8587 10.5806 21.9868 10.5806 20.9112C10.5806 19.8356 11.4526 18.9636 12.5282 18.9636C13.6038 18.9636 14.4758 19.8356 14.4758 20.9112Z" fill="#ED383F"/>
          <path d="M14.4758 20.9112C14.4758 19.8356 13.6038 18.9636 12.5282 18.9636C11.4526 18.9636 10.5806 19.8356 10.5806 20.9112C10.5806 21.9868 11.4526 22.8587 12.5282 22.8587C13.6038 22.8587 14.4758 21.9868 14.4758 20.9112ZM14.8652 20.9112C14.8652 22.2019 13.8189 23.2482 12.5282 23.2482C11.2375 23.2482 10.1912 22.2019 10.1912 20.9112C10.1912 19.6204 11.2375 18.5742 12.5282 18.5742C13.8189 18.5742 14.8652 19.6204 14.8652 20.9112Z" fill="white"/>
          <path d="M18.4343 10.2497C18.4343 11.8632 17.1263 13.1711 15.5129 13.1711C13.8995 13.1711 12.5916 11.8632 12.5916 10.2497C12.5916 8.63632 13.8995 7.32838 15.5129 7.32838C17.1263 7.32838 18.4343 8.63632 18.4343 10.2497Z" fill="#7CB518"/>
          <path d="M18.4343 10.2497C18.4343 8.63632 17.1263 7.32838 15.5129 7.32838C13.8995 7.32838 12.5916 8.63632 12.5916 10.2497C12.5916 11.8632 13.8995 13.1711 15.5129 13.1711C17.1263 13.1711 18.4343 11.8632 18.4343 10.2497ZM18.8237 10.2497C18.8237 12.0783 17.3415 13.5605 15.5129 13.5605C13.6844 13.5605 12.2021 12.0783 12.2021 10.2497C12.2021 8.4212 13.6844 6.93896 15.5129 6.93896C17.3415 6.93896 18.8237 8.4212 18.8237 10.2497Z" fill="white"/>
          <path d="M22.8163 17.5531C22.8163 19.9733 20.8544 21.9352 18.4343 21.9352C16.0141 21.9352 14.0522 19.9733 14.0522 17.5531C14.0522 15.133 16.0141 13.1711 18.4343 13.1711C20.8544 13.1711 22.8163 15.133 22.8163 17.5531Z" fill="#1E96FC"/>
          <path d="M22.8163 17.5531C22.8163 15.133 20.8544 13.1711 18.4343 13.1711C16.0141 13.1711 14.0522 15.133 14.0522 17.5531C14.0522 19.9733 16.0141 21.9352 18.4343 21.9352C20.8544 21.9352 22.8163 19.9733 22.8163 17.5531ZM23.2057 17.5531C23.2057 20.1884 21.0695 22.3246 18.4343 22.3246C15.799 22.3246 13.6628 20.1884 13.6628 17.5531C13.6628 14.9179 15.799 12.7817 18.4343 12.7817C21.0695 12.7817 23.2057 14.9179 23.2057 17.5531Z" fill="white"/>
          <path d="M13.9889 15.2497C13.9889 17.1321 12.463 18.658 10.5806 18.658C8.69831 18.658 7.17238 17.1321 7.17238 15.2497C7.17238 13.3674 8.69831 11.8415 10.5806 11.8415C12.463 11.8415 13.9889 13.3674 13.9889 15.2497Z" fill="#FE7B02"/>
          <path d="M13.9889 15.2497C13.9889 13.3674 12.463 11.8415 10.5806 11.8415C8.69831 11.8415 7.17238 13.3674 7.17238 15.2497C7.17238 17.1321 8.69831 18.658 10.5806 18.658C12.463 18.658 13.9889 17.1321 13.9889 15.2497ZM14.3783 15.2497C14.3783 17.3472 12.6781 19.0474 10.5806 19.0474C8.48318 19.0474 6.78296 17.3472 6.78296 15.2497C6.78296 13.1523 8.48318 11.4521 10.5806 11.4521C12.6781 11.4521 14.3783 13.1523 14.3783 15.2497Z" fill="white"/>
        </g>
        <path d="M15.5125 6.6958C17.2744 6.6958 18.7362 7.97761 19.0173 9.65967C19.4888 9.04258 20.2306 8.64315 21.0671 8.64307C22.4922 8.64307 23.648 9.79813 23.6482 11.2231C23.6482 12.4385 22.8068 13.4543 21.6755 13.728C22.76 14.6479 23.449 16.0197 23.449 17.5532C23.4489 20.3229 21.204 22.5678 18.4343 22.5679C17.1439 22.5679 15.9675 22.0805 15.0789 21.2798C14.8998 22.5301 13.8279 23.4917 12.5281 23.4917C11.1031 23.4916 9.94824 22.3366 9.948 20.9116C9.948 20.2967 10.1632 19.7319 10.5222 19.2886C8.31726 19.2573 6.53979 17.4619 6.53979 15.2495C6.53988 13.6399 7.48055 12.2499 8.84253 11.6001C7.97677 11.1837 7.37769 10.3009 7.37769 9.27588C7.37773 7.85073 8.53358 6.6958 9.95874 6.6958C11.1131 6.69595 12.0891 7.45406 12.4187 8.49951C13.0292 7.42244 14.186 6.69597 15.5125 6.6958Z" stroke="white" stroke-width="0.486893"/>
      </g>
      <defs>
        <filter id="p-f0" x="0" y="-0.155806" width="30.1874" height="30.83" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feMorphology radius="0.155806" operator="erode" in="SourceAlpha" result="eis1"/>
          <feOffset dy="-0.584272"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.807843 0 0 0 0 0.831373 0 0 0 0 0.854902 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="eis1"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.73034"/>
          <feGaussianBlur stdDeviation="0.243447"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="eis1" result="eis2"/>
        </filter>
        <filter id="p-f1" x="6.29608" y="6.45215" width="17.5952" height="18.2567" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.973787"/>
          <feGaussianBlur stdDeviation="0.73034"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
          <feBlend mode="normal" in2="shape" result="eis1"/>
        </filter>
        <linearGradient id="p-g0" x1="15.0937" y1="0.486816" x2="15.0937" y2="29.7004" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E9ECEF"/>
          <stop offset="0.635819" stop-color="#F5F3F4"/>
        </linearGradient>
      </defs>
    </svg>
    <span class="hdr-name">pigment</span>
  </div>
  <div class="success-body">
    <div class="success-icon">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M5 13L10.5 18.5L21 8" stroke="#16A34A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="success-title">Variables created!</div>
    <div class="counts-row">
      <div class="count-card"><div id="cntPrim"  class="count-num">0</div><div class="count-label">Primitives</div></div>
      <div class="count-card"><div id="cntAlpha" class="count-num">0</div><div class="count-label">Alpha</div></div>
      <div class="count-card"><div id="cntSem"   class="count-num">0</div><div class="count-label">Semantics</div></div>
    </div>
    <div id="skippedNote" class="skipped-note"></div>
    <button id="btnAgain" class="btn-secondary">Run again</button>
  </div>
</div>

<script>
(function() {
  'use strict';

  window.onerror = function(msg, src, line) { console.error('Pigment:', msg, 'line:', line); return true; };

  // ── Get Prompt ────────────────────────────────────────────────────
  var GET_PROMPT_URL = 'https://placeholder.example.com/pigment-prompt';
  var btnGetPromptEl = document.getElementById('btnGetPrompt');
  if (btnGetPromptEl) {
    btnGetPromptEl.addEventListener('click', function() {
      postMsg({ type: 'open-url', url: GET_PROMPT_URL });
    });
  }


  // ── Utilities ─────────────────────────────────────────────────────
  function show(id) {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) screens[i].classList.remove('active');
    document.getElementById(id).classList.add('active');
  }
  function postMsg(obj) { parent.postMessage({ pluginMessage: obj }, '*'); }
  function showErr(msg) {
    var box = document.getElementById('errorBox');
    box.textContent = msg; box.style.display = 'block';
    setTimeout(function() { box.style.display = 'none'; }, 6000);
  }

  // ── State ─────────────────────────────────────────────────────────
  var parsedData     = null;
  var alphaSelections = {};   // { tokenName: [10, 20, 50, ...] }
  var currentTab     = 'primitives';

  // ── Screen 1: Upload ─────────────────────────────────────────────
  var fileInput  = document.getElementById('fileInput');
  var uploadZone = document.getElementById('uploadZone');
  var jsonInput  = document.getElementById('jsonInput');
  var fileLoaded = document.getElementById('fileLoaded');
  var fileName   = document.getElementById('fileName');

  function loadFile(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      jsonInput.value = ev.target.result;
      fileName.textContent = file.name;
      fileLoaded.classList.add('visible');
      fileInput.value = '';
    };
    reader.readAsText(file);
  }

  document.getElementById('btnBrowse').addEventListener('click', function(e) {
    e.stopPropagation();
    fileInput.click();
  });
  uploadZone.addEventListener('click', function(e) {
    if (e.target !== fileInput && e.target.id !== 'btnBrowse') fileInput.click();
  });
  fileInput.addEventListener('change', function(e) { loadFile(e.target.files[0]); });
  uploadZone.addEventListener('dragover', function(e) { e.preventDefault(); uploadZone.classList.add('drag-over'); });
  uploadZone.addEventListener('dragleave', function() { uploadZone.classList.remove('drag-over'); });
  uploadZone.addEventListener('drop', function(e) {
    e.preventDefault(); uploadZone.classList.remove('drag-over');
    loadFile(e.dataTransfer.files[0]);
  });

  // ── Sample JSON ───────────────────────────────────────────────────
  var SAMPLE = JSON.stringify({
    primitives: {
      gray:   { "10":"#F9F9FB","20":"#EFEFEF","30":"#E0E0E0","50":"#9B9BB8","80":"#3D3D55","100":"#111119" },
      purple: { "100":"#E9DCFC","300":"#B99BF8","500":"#7C4EF0","600":"#6B3FD4","900":"#1E0A4A" },
      green:  { "500":"#22C55E" },
      red:    { "500":"#EF4444" },
      orange: { "500":"#F97316" },
      white:  { "default":"#FFFFFF" }
    },
    semantics: {
      brand: { primary:"{primitive.purple.500}", secondary:"{primitive.purple.300}", hover:"{primitive.purple.600}" },
      neutral: {
        bg:     { default:"{primitive.white.default}", subtle:"{primitive.gray.10}" },
        border: { default:"{primitive.gray.30}", strong:"{primitive.gray.50}" },
        text:   { primary:"{primitive.gray.100}", secondary:"{primitive.gray.80}", disabled:"{primitive.gray.50}" }
      },
      status: { success:"{primitive.green.500}", error:"{primitive.red.500}", warning:"{primitive.orange.500}" }
    }
  }, null, 2);

  document.getElementById('btnSample').addEventListener('click', function() {
    jsonInput.value = SAMPLE;
    fileLoaded.classList.remove('visible');
    document.getElementById('errorBox').style.display = 'none';
  });

  document.getElementById('btnParse').addEventListener('click', function() {
    var raw = jsonInput.value.trim();
    if (!raw) { showErr('Paste or upload a token JSON first.'); return; }
    var parsed;
    try { parsed = JSON.parse(raw); } catch(e) { showErr('Invalid JSON: ' + e.message); return; }
    var result = normalizeTokens(parsed);
    if (result.error) { showErr(result.error); return; }
    parsedData = result;
    alphaSelections = {};
    currentTab = 'primitives';
    renderAlphaBuilder();
    show('s2');
  });

  // ── Helpers ───────────────────────────────────────────────────────
  function findKey(obj, candidates) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      var lower = keys[i].toLowerCase();
      for (var j = 0; j < candidates.length; j++) {
        if (lower === candidates[j]) return obj[keys[i]];
      }
    }
    return null;
  }

  function flattenObj(obj, prefix) {
    var result = {};
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i], val = obj[key];
      var fullKey = prefix ? (prefix + '/' + key) : key;
      if (typeof val === 'string') { result[fullKey] = val; }
      else if (val && typeof val === 'object') {
        var nested = flattenObj(val, fullKey);
        var nkeys = Object.keys(nested);
        for (var k = 0; k < nkeys.length; k++) result[nkeys[k]] = nested[nkeys[k]];
      }
    }
    return result;
  }

  function resolveRef(ref) {
    if (!ref || typeof ref !== 'string') return String(ref || '');
    var s = ref.trim();
    if (s.charAt(0) === '{' && s.charAt(s.length - 1) === '}') {
      var inner = s.slice(1, s.length - 1).trim();
      var firstDot = inner.indexOf('.');
      if (firstDot !== -1) {
        var ns = inner.slice(0, firstDot).toLowerCase();
        var knownNS = ['primitive','primitives','color','colors','token','tokens','prim','palette'];
        for (var ki = 0; ki < knownNS.length; ki++) {
          if (ns === knownNS[ki]) return inner.slice(firstDot + 1).split('.').join('/');
        }
      }
      return inner.split('.').join('/');
    }
    return s;
  }

  function normalizeTokens(parsed) {
    var primRaw = findKey(parsed, ['primitives','primitive','prim','colors','color','palette','tokens']);
    var semRaw  = findKey(parsed, ['semantics','semantic','sem','aliases','alias','theme']);
    if (!primRaw || typeof primRaw !== 'object') return { error: 'No primitive key found. Expected "primitives", "colors", or "palette" at the top level.' };
    if (!semRaw  || typeof semRaw  !== 'object') return { error: 'No semantic key found. Expected "semantics", "aliases", or "theme" at the top level.' };
    var flatPrimitives = flattenObj(primRaw, '');
    var flatSemRaw     = flattenObj(semRaw, '');
    var flatSemantics  = {};
    var skeys = Object.keys(flatSemRaw);
    for (var i = 0; i < skeys.length; i++) flatSemantics[skeys[i]] = resolveRef(flatSemRaw[skeys[i]]);
    return { primitives: flatPrimitives, semantics: flatSemantics };
  }

  // ── Screen 2: Alpha Builder ───────────────────────────────────────
  var STOPS = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95];

  function countAlphaStops() {
    var n = 0;
    var keys = Object.keys(alphaSelections);
    for (var i = 0; i < keys.length; i++) n += alphaSelections[keys[i]].length;
    return n;
  }

  function updateStats() {
    document.getElementById('statPrim').textContent  = Object.keys(parsedData.primitives).length;
    document.getElementById('statSem').textContent   = Object.keys(parsedData.semantics).length;
    document.getElementById('statAlpha').textContent = countAlphaStops();
  }

  function renderAlphaBuilder() {
    updateStats();
    document.getElementById('tabPrim').classList.add('active');
    document.getElementById('tabSem').classList.remove('active');
    renderTokenList();
  }

  function renderTokenList() {
    var list = document.getElementById('tokenList');
    list.innerHTML = '';
    var isSem  = (currentTab === 'semantics');
    var items  = isSem ? parsedData.semantics : parsedData.primitives;
    var keys   = Object.keys(items);

    // Group by prefix (e.g. "gray", "purple")
    var groups = {};
    var groupOrder = [];
    for (var i = 0; i < keys.length; i++) {
      var name = keys[i];
      var slash = name.indexOf('/');
      var grp   = slash !== -1 ? name.slice(0, slash) : name;
      if (!groups[grp]) { groups[grp] = []; groupOrder.push(grp); }
      groups[grp].push(name);
    }

    for (var gi = 0; gi < groupOrder.length; gi++) {
      var grpName = groupOrder[gi];
      var grpKeys = groups[grpName];

      var grpEl = document.createElement('div');
      grpEl.className = 'group-label';
      grpEl.textContent = grpName.toUpperCase();
      list.appendChild(grpEl);

      for (var ti = 0; ti < grpKeys.length; ti++) {
        var name  = grpKeys[ti];
        var val   = items[name];
        var hex   = isSem ? (parsedData.primitives[val] || null) : val;
        var hasAlpha = !isSem && !!(alphaSelections[name] && alphaSelections[name].length > 0);
        var swatchBg = (hex && hex.charAt(0) === '#') ? hex : 'transparent';

        var row = document.createElement('div');
        row.className = 'token-row';

        var checkHtml = '';
        if (!isSem) {
          checkHtml = '<div class="t-check' + (hasAlpha ? ' checked' : '') + '" data-action="toggleAlpha" data-name="' + name + '"></div>';
        }

        var alphaBtnHtml = '';
        if (!isSem) {
          alphaBtnHtml = '<button class="btn-alpha' + (hasAlpha ? ' active' : '') + '" data-action="toggleAlpha" data-name="' + name + '">' + (hasAlpha ? '&#945; On' : '+ alpha') + '</button>';
        }

        row.innerHTML = checkHtml +
          '<div class="swatch" style="width:16px;height:16px;border-radius:4px;background:' + swatchBg + ';border:1px solid rgba(255,255,255,0.1);flex-shrink:0"></div>' +
          '<span class="token-name">' + name + '</span>' +
          '<span class="token-hex">' + (isSem ? val : (hex || '')) + '</span>' +
          alphaBtnHtml;
        list.appendChild(row);

        // Alpha stop chips (shown when alpha is on)
        if (hasAlpha) {
          var stops  = alphaSelections[name] || [];
          var stopEl = document.createElement('div');
          stopEl.className = 'stop-row';
          var html = '';
          for (var si = 0; si < STOPS.length; si++) {
            var stop = STOPS[si];
            var on   = stops.indexOf(stop) !== -1;
            html += '<button class="stop-chip' + (on ? ' on' : '') + '" data-action="toggleStop" data-name="' + name + '" data-stop="' + stop + '">' + stop + '%</button>';
          }
          stopEl.innerHTML = html;
          list.appendChild(stopEl);
        }
      }
    }
  }

  // Tab switching
  document.getElementById('tabPrim').addEventListener('click', function() {
    currentTab = 'primitives';
    document.getElementById('tabPrim').classList.add('active');
    document.getElementById('tabSem').classList.remove('active');
    renderTokenList();
  });
  document.getElementById('tabSem').addEventListener('click', function() {
    currentTab = 'semantics';
    document.getElementById('tabSem').classList.add('active');
    document.getElementById('tabPrim').classList.remove('active');
    renderTokenList();
  });

  // Event delegation for token list
  document.getElementById('tokenList').addEventListener('click', function(e) {
    var el = e.target;
    var action = el.dataset ? el.dataset.action : el.getAttribute('data-action');
    if (!action) return;
    var name = el.dataset ? el.dataset.name : el.getAttribute('data-name');

    if (action === 'toggleAlpha') {
      if (alphaSelections[name] && alphaSelections[name].length > 0) {
        delete alphaSelections[name];
      } else {
        alphaSelections[name] = [10, 20, 50];
      }
      updateStats();
      renderTokenList();
    }
    if (action === 'toggleStop') {
      var stop = parseInt(el.dataset ? el.dataset.stop : el.getAttribute('data-stop'), 10);
      if (!alphaSelections[name]) alphaSelections[name] = [];
      var idx = alphaSelections[name].indexOf(stop);
      if (idx === -1) {
        alphaSelections[name].push(stop);
        alphaSelections[name].sort(function(a,b){ return a - b; });
      } else {
        alphaSelections[name].splice(idx, 1);
      }
      updateStats();
      renderTokenList();
    }
  });

  // Back button
  document.getElementById('btnBack').addEventListener('click', function() { show('s1'); });

  // Generate
  document.getElementById('btnGenerate').addEventListener('click', function() {
    show('s3');
    var fill  = document.getElementById('progressFill');
    var pct   = 0;
    var timer = setInterval(function() {
      pct = Math.min(pct + Math.random() * 16, 88);
      fill.style.width = pct + '%';
    }, 300);
    postMsg({ type: 'generate', data: parsedData, alphaSelections: alphaSelections });
  });

  // Messages back from plugin thread
  window.addEventListener('message', function(ev) {
    var msg = ev.data ? ev.data.pluginMessage : null;
    if (!msg) return;
    if (msg.type === 'done') {
      var fill = document.getElementById('progressFill');
      if (fill) fill.style.width = '100%';
      setTimeout(function() {
        var c = msg.counts || {};
        document.getElementById('cntPrim').textContent  = c.primitives || 0;
        document.getElementById('cntAlpha').textContent = c.alpha      || 0;
        document.getElementById('cntSem').textContent   = c.semantics  || 0;
        var sk = msg.skipped || 0;
        document.getElementById('skippedNote').textContent = sk > 0 ? sk + ' token(s) skipped (unresolved refs)' : '';
        show('s4');
      }, 300);
    }
  });

  // Run again
  document.getElementById('btnAgain').addEventListener('click', function() {
    parsedData = null; alphaSelections = {}; currentTab = 'primitives';
    document.getElementById('jsonInput').value = '';
    document.getElementById('errorBox').style.display = 'none';
    document.getElementById('fileLoaded').classList.remove('visible');
    document.getElementById('progressFill').style.width = '0%';
    show('s1');
  });

})();
</script>
</body>
</html>`;

// ─────────────────────────────────────────────────────────────
// PLUGIN MAIN THREAD
// ─────────────────────────────────────────────────────────────

figma.showUI(UI_HTML, { width: 460, height: 580, title: 'Pigment' });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'close') { figma.closePlugin(); return; }

  if (msg.type === 'open-url') {
    figma.openExternal(msg.url);
    return;
  }

  if (msg.type === 'generate') {
    const { data, alphaSelections } = msg;
    const { primitives, semantics } = data;

    const existing = await figma.variables.getLocalVariableCollectionsAsync();
    let primCol = existing.find(c => c.name === 'Primitives') || null;
    let semCol = existing.find(c => c.name === 'Semantics') || null;
    if (!primCol) primCol = figma.variables.createVariableCollection('Primitives');
    if (!semCol) semCol = figma.variables.createVariableCollection('Semantics');

    const primMode = primCol.modes[0].modeId;
    const semMode = semCol.modes[0].modeId;

    const hex2rgb = (hex: string) => {
      const h = hex.replace('#', '');
      return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255, a: 1 };
    };

    const primVars: Record<string, Variable> = {};
    const semVars: Record<string, Variable> = {};
    let counts = { primitives: 0, alpha: 0, semantics: 0 };
    let skipped = 0;

    // Primitives
    for (const name of Object.keys(primitives)) {
      const hex = primitives[name];
      if (!hex || !hex.startsWith('#')) { skipped++; continue; }
      try {
        const v = figma.variables.createVariable(name, primCol, 'COLOR');
        v.setValueForMode(primMode, hex2rgb(hex));
        primVars[name] = v; counts.primitives++;
      } catch (e) { skipped++; }
    }

    // Alpha variants
    for (const name of Object.keys(alphaSelections)) {
      const hex = primitives[name];
      if (!hex || !hex.startsWith('#')) continue;
      const h = hex.replace('#', '');
      const r = parseInt(h.slice(0, 2), 16) / 255, g = parseInt(h.slice(2, 4), 16) / 255, b = parseInt(h.slice(4, 6), 16) / 255;
      for (const stop of alphaSelections[name] as number[]) {
        const key = name + '/alpha/' + stop;
        try {
          const v = figma.variables.createVariable(key, primCol, 'COLOR');
          v.setValueForMode(primMode, { r, g, b, a: stop / 100 });
          primVars[key] = v; counts.alpha++;
        } catch (e) { }
      }
    }

    // Semantics
    for (const semName of Object.keys(semantics)) {
      const primKey = semantics[semName];
      if (!primVars[primKey]) { skipped++; continue; }
      try {
        const v = figma.variables.createVariable(semName, semCol, 'COLOR');
        v.setValueForMode(semMode, figma.variables.createVariableAlias(primVars[primKey]));
        semVars[semName] = v; counts.semantics++;
      } catch (e) { skipped++; }
    }

    // Semantic alpha auto-propagation
    const prim2sem: Record<string, string[]> = {};
    for (const [sn, pk] of Object.entries(semantics)) {
      if (!prim2sem[pk as string]) prim2sem[pk as string] = [];
      prim2sem[pk as string].push(sn);
    }
    let semAlpha = 0;
    for (const [name, stops] of Object.entries(alphaSelections)) {
      for (const sn of (prim2sem[name] || [])) {
        for (const stop of stops as number[]) {
          const pk = name + '/alpha/' + stop;
          const sk = sn + '/alpha/' + stop;
          if (!primVars[pk]) continue;
          try {
            const v = figma.variables.createVariable(sk, semCol, 'COLOR');
            v.setValueForMode(semMode, figma.variables.createVariableAlias(primVars[pk]));
            semAlpha++;
          } catch (e) { }
        }
      }
    }

    figma.ui.postMessage({ type: 'done', counts, skipped });
    figma.notify(
      `✅ ${counts.primitives + counts.alpha} primitives + ${counts.semantics} semantics created` +
      (semAlpha > 0 ? ` (incl. ${semAlpha} semantic alpha aliases)` : '') + `!`
    );
  }
};
