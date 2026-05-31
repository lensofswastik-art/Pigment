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
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@300;400;500;600&family=Geist:wght@300;400;500&display=swap" rel="stylesheet">
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
    height: 100%;
    overflow: hidden;
  }

  /* ── Screens ──────────────────────────────────────── */
  .screen { display: none; flex-direction: column; height: 100%; overflow: hidden; }
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

  .upload-container {
    border-bottom: 1px solid #E9ECEF;
    flex-shrink: 0;
    margin: 0 -18px;
    padding: 0 18px 20px;
  }
  .upload-zone {
    background: #F8F9FA;
    border: 1px dashed #D9D9D9;
    border-radius: 10px;
    padding: 30px 91px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 10px; text-align: center; cursor: pointer; flex-shrink: 0;
    transition: border-color 0.2s, background 0.2s;
  }
  .upload-zone.drag-over {
    border-color: var(--purple); background: var(--purple-bg);
  }

  .file-icon-wrap {
    position: relative; width: 102px; height: 63px; flex-shrink: 0;
    transition: transform 0.25s ease;
  }
  .upload-zone:hover .file-icon-wrap { transform: translateY(-3px); }
  .file-icon-wrap .fi-default,
  .file-icon-wrap .fi-hover,
  .file-icon-wrap .fi-uploaded,
  .file-icon-wrap .fi-uploaded-hover {
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    transition: opacity 0.3s ease;
  }
  .file-icon-wrap .fi-hover { opacity: 0; }
  .file-icon-wrap .fi-uploaded { opacity: 0; }
  .file-icon-wrap .fi-uploaded-hover { opacity: 0; }
  /* No file: hover shows hover state */
  .upload-zone:not(.has-file):hover .file-icon-wrap .fi-hover { opacity: 1; }
  .upload-zone:not(.has-file):hover .file-icon-wrap .fi-default { opacity: 0; }
  /* File loaded at rest: show uploaded state */
  .upload-zone.has-file:not(:hover) .file-icon-wrap .fi-uploaded { opacity: 1; }
  .upload-zone.has-file .file-icon-wrap .fi-default { opacity: 0; }
  /* File loaded + hover: show uploaded-hover state */
  .upload-zone.has-file:hover .file-icon-wrap .fi-uploaded-hover { opacity: 1; }
  .upload-zone.has-file:hover .file-icon-wrap .fi-uploaded { opacity: 0; }

  .upload-zone-text-area {
    position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .upload-zone-label {
    font-family: 'IBM Plex Serif', Georgia, serif;
    font-size: 14px; font-weight: 500; color: #6C757D; letter-spacing: -0.03em;
    transition: opacity 0.3s ease;
  }
  .upload-zone-loaded {
    position: absolute;
    display: flex; align-items: center; gap: 8px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .upload-zone-loaded span {
    font-family: 'IBM Plex Serif', Georgia, serif;
    font-size: 14px; font-weight: 500; color: #6C757D; letter-spacing: -0.03em;
  }
  .upload-zone.has-file .upload-zone-label { opacity: 0; }
  .upload-zone.has-file .upload-zone-loaded { opacity: 1; pointer-events: auto; }

  .btn-clear-file {
    width: 24px; height: 24px; border-radius: 12px; flex-shrink: 0;
    background: linear-gradient(180deg, #E9ECEF 0%, #EFF1F3 100%);
    border: 0.8px solid #CED4DA;
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    box-shadow:
      0px -1px 1px 0px rgba(254, 254, 255, 0.6),
      inset 0px -1px 0px 0.16px #ADB5BD,
      inset 0px 1px 0.49px 0px #FFFFFF;
    transition: opacity 0.15s;
  }
  .btn-clear-file:hover { opacity: 0.75; }

  .file-loaded { display: none; }

  .paste-section {
    flex: 1; display: flex; flex-direction: column; gap: 14px;
    min-height: 0; overflow: hidden;
  }

  .paste-label {
    font-family: 'IBM Plex Serif', Georgia, serif;
    font-size: 12px; font-weight: 500; color: #6C757D;
    letter-spacing: -0.03em; text-align: center; flex-shrink: 0;
  }

  textarea {
    width: 100%; flex: 1; min-height: 0;
    background: #F8F9FA; border: 1px solid #D9D9D9;
    border-radius: var(--radius); padding: 12px 14px;
    font-family: 'Geist', -apple-system, sans-serif;
    font-size: 12px; font-weight: 400; color: #1E1E1E;
    letter-spacing: -0.03em; resize: none; outline: none;
    line-height: 1.65; display: block;
    transition: border-color 0.2s;
  }
  textarea:focus { border-color: var(--purple); }
  textarea::placeholder {
    font-family: 'Geist', -apple-system, sans-serif;
    font-size: 12px; font-weight: 400;
    letter-spacing: -0.03em; color: #ADB5BD;
  }

  .error-box {
    display: none; flex-shrink: 0;
    background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25);
    border-radius: var(--radius-sm); padding: 9px 13px;
    font-size: 11px; color: #FCA5A5; line-height: 1.5;
  }

  /* ── Load button ───────────────────────────────────── */
  .btn-load {
    display: inline-flex; align-items: center; gap: 4px;
    background: linear-gradient(180deg, #E9ECEF 0%, #EFF1F3 100%);
    color: #14100C; border: 0.8px solid #CED4DA;
    border-radius: 8px; padding: 10px 20px; line-height: 1;
    font-family: 'Geist', -apple-system, sans-serif;
    font-size: 12px; font-weight: 500; letter-spacing: -0.04em;
    cursor: pointer; overflow: hidden;
    box-shadow:
      0px -1px 1px 0px rgba(254, 254, 255, 0.6),
      inset 0px -1px 0px 0.156px #ADB5BD,
      inset 0px 1px 0.487px 0px #FFFFFF;
    transition: background 0.15s;
  }
  .btn-load:hover {
    background: linear-gradient(180deg, #DEE2E6 0%, #E4E7EB 100%);
  }
  .btn-load:focus { outline: none; }

  /* ── Bottom bar ─────────────────────────────────────── */
  .bottom-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 18px; border-top: 1px solid #E9ECEF;
    background: #FEFEFF; flex-shrink: 0;
  }
  .btn-secondary {
    background: var(--surface2); color: var(--text-sec);
    border: 1px solid var(--border2); border-radius: var(--radius-sm);
    padding: 9px 18px; font-size: 12px; font-weight: 500;
    cursor: pointer; font-family: inherit; transition: all 0.15s;
  }
  .btn-secondary:hover { color: var(--text); background: var(--surface3); }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 6px;
    background: linear-gradient(180deg, #212529 0%, #14100C 100%);
    color: #FEFCFB; border: none; outline: none;
    border-radius: 8px; padding: 10px 20px; line-height: 1;
    font-family: 'Geist', -apple-system, sans-serif;
    font-size: 12px; font-weight: 500; letter-spacing: -0.04em;
    cursor: pointer;
    box-shadow:
      0px 2px 4px -1px rgba(12, 10, 8, 0.50),
      0px 0px 0px 1px rgba(12, 10, 8, 0.10),
      inset 0px -1px 1.2px 0.35px #0C0A09,
      inset 0px 0.5px 1px 0px rgba(254, 252, 251, 0.20);
    transition: background 0.15s;
  }
  .btn-primary:hover {
    background:
      linear-gradient(rgba(255,255,255,0.15), rgba(255,255,255,0.15)),
      linear-gradient(180deg, #212529 0%, #14100C 100%);
  }
  .btn-primary:focus { outline: none; }

  /* ── Screen 2 — Token Map ─────────────────────────── */

  /* Stats banner cards */
  .stats-row {
    display: flex; gap: 10px;
    padding: 20px; position: relative; z-index: 1;
  }
  .stat-card {
    flex: 1; height: 110px;
    background: #FEFEFF; border: 0.5px solid #CED4DA;
    border-radius: 8px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 10px; overflow: hidden;
  }
  .stat-num {
    font-family: 'IBM Plex Serif', Georgia, serif;
    font-size: 40px; font-weight: 600;
    letter-spacing: -0.04em; line-height: 1;
    color: #1E1E1E;
  }
  .stat-label {
    font-family: 'Geist', -apple-system, sans-serif;
    font-size: 12px; font-weight: 400;
    letter-spacing: -0.03em; color: #6C757D;
  }

  .banner-deco-left {
    position: absolute; left: -70px; bottom: -68px;
    width: 140px; height: 140px; pointer-events: none; z-index: 2;
  }
  .banner-deco-right {
    position: absolute; right: -70px; bottom: -68px;
    width: 140px; height: 140px; pointer-events: none; z-index: 2;
  }

  /* Tab switcher */
  .tab-row-wrap {
    display: flex; flex-direction: column; gap: 14px;
    padding: 20px; border-bottom: 1px solid #E9ECEF;
    background: #FEFEFF; flex-shrink: 0;
  }
  .tab-row {
    position: relative; display: flex;
    background: #E9ECEF; border-radius: 14px;
    padding: 4px; height: 50px; flex-shrink: 0;
  }
  .tab-slider {
    position: absolute; top: 4px; left: 4px;
    width: calc(50% - 4px); height: 42px;
    background: #FEFEFF; border: 0.5px solid #CED4DA;
    border-radius: 8px;
    transition: left 0.22s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }
  .tab-slider.right { left: calc(50%); }
  .tab {
    flex: 1; position: relative; z-index: 1;
    border: none; background: none; cursor: pointer;
    font-family: 'IBM Plex Serif', Georgia, serif;
    font-size: 14px; font-weight: 500;
    letter-spacing: -0.03em; color: #6C757D;
    transition: color 0.15s;
  }
  .tab-hint {
    font-family: 'Geist', -apple-system, sans-serif;
    font-size: 12px; font-weight: 400;
    letter-spacing: -0.03em; color: #6C757D;
    text-align: center;
  }

  /* Token list */
  .token-list {
    flex: 1; overflow-y: auto; min-height: 0;
    padding: 16px 20px; background: #FEFEFF;
    display: flex; flex-direction: column; gap: 16px;
  }
  .token-list::-webkit-scrollbar { width: 4px; }
  .token-list::-webkit-scrollbar-track { background: transparent; }
  .token-list::-webkit-scrollbar-thumb { background: #DEE2E6; border-radius: 99px; }

  .token-section { display: flex; flex-direction: column; gap: 10px; }

  .group-label {
    font-family: 'IBM Plex Serif', Georgia, serif;
    font-size: 14px; font-weight: 500;
    letter-spacing: -0.03em; color: #6C757D; flex-shrink: 0;
  }

  .token-group { display: flex; flex-direction: column; gap: 8px; }

  .token-row {
    display: flex; align-items: center; justify-content: space-between;
    height: 42px; background: #FEFEFF;
    border: 0.5px solid #CED4DA; border-radius: 14px;
    padding: 6px; overflow: hidden; flex-shrink: 0;
    box-shadow: inset 0px -1px 0px 0.156px #f3f3f3, inset 0px 1px 0.487px 0px #ffffff;
  }

  .token-left { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

  .token-swatch { width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0; }

  .token-name {
    font-family: 'Geist', -apple-system, sans-serif;
    font-size: 12px; font-weight: 500; color: #6C757D;
    letter-spacing: -0.03em; white-space: nowrap;
  }

  .token-right { display: flex; align-items: center; gap: 12px; height: 100%; flex-shrink: 0; }

  .token-hex {
    font-family: 'Geist', -apple-system, sans-serif;
    font-size: 12px; font-weight: 500; color: #6C757D;
    letter-spacing: -0.03em; white-space: nowrap;
  }

  .btn-alpha {
    display: inline-flex; align-items: center; justify-content: center; gap: 4px;
    width: 77px; height: 30px; padding: 0; cursor: pointer; overflow: hidden;
    background: linear-gradient(180deg, #E9ECEF 0%, #EFF1F3 100%);
    border: 0.8px solid #CED4DA; border-radius: 8px; flex-shrink: 0;
    box-shadow: 0px -1px 1px 0px rgba(254,254,255,0.6), inset 0px -1px 0px 0.156px #ADB5BD, inset 0px 1px 0.487px 0px #ffffff;
    font-family: 'Geist', -apple-system, sans-serif;
    font-size: 12px; font-weight: 500; color: #14100C;
    letter-spacing: -0.04em; white-space: nowrap;
    transition: background 0.15s;
  }
  .btn-alpha svg { pointer-events: none; }
  .btn-alpha:hover { background: linear-gradient(180deg, #DEE2E6 0%, #E4E7EB 100%); }
  .btn-alpha.active {
    background: transparent; border: 0.8px solid #CED4DA;
    color: #14100C; box-shadow: none;
  }

  /* Token card — single container for expanded alpha state */
  .token-card {
    display: flex; flex-direction: column; gap: 10px;
    padding: 6px; border-radius: 14px;
    background: #FBFBFB; border: 0.5px solid #CED4DA;
    flex-shrink: 0;
    box-shadow: inset 0px -1px 0px 0.156px #f3f3f3, inset 0px 1px 0.487px 0px #ffffff;
  }
  .token-card-row {
    display: flex; align-items: center; justify-content: space-between;
  }
  .token-card-divider {
    border: none; border-top: 0.5px solid #CED4DA; flex-shrink: 0;
  }
  .alpha-content { display: flex; flex-direction: column; gap: 10px; }

  .alpha-preset-header { display: flex; align-items: center; justify-content: space-between; }
  .alpha-preset-label {
    font-family: 'Geist', -apple-system, sans-serif;
    font-size: 12px; font-weight: 500; color: #6C757D; letter-spacing: -0.03em;
  }
  .alpha-preset-pills { display: flex; gap: 4px; }
  .alpha-preset-pill {
    font-family: 'Geist', -apple-system, sans-serif;
    font-size: 11px; font-weight: 500; color: #6C757D; letter-spacing: -0.03em;
    padding: 4px 10px; background: #FEFEFF; border: 0.5px solid #CED4DA;
    border-radius: 99px; cursor: pointer; outline: none; transition: all 0.15s;
  }
  .alpha-preset-pill.active { background: #1E1E1E; color: #FEFEFF; border-color: #1E1E1E; }
  .alpha-track-wrap { display: flex; flex-direction: column; gap: 5px; }
  .alpha-gradient-strip {
    height: 30px; border-radius: 12px; border: 0.5px solid #CED4DA; overflow: hidden;
    display: flex; align-items: center; justify-content: space-between; padding: 3px;
  }
  .alpha-stop-labels-row { display: flex; justify-content: space-between; padding: 0 3px; }
  .alpha-stop-label {
    font-family: 'Geist', -apple-system, sans-serif;
    font-size: 12px; font-weight: 500; color: #6C757D;
    letter-spacing: -0.03em; text-align: center; width: 24px; line-height: 1;
  }
  .stop-tile {
    width: 24px; height: 24px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0; transition: all 0.12s;
  }
  .stop-tile.off {
    background: linear-gradient(180deg, #E9ECEF 0%, #EFF1F3 100%);
    border: 0.8px solid #CED4DA;
    box-shadow: inset 0px -1px 0px 0.156px #ADB5BD, inset 0px 1px 0.487px 0px #ffffff;
  }
  .stop-tile.on {
    box-shadow: inset 0px -1px 0px 0.156px rgba(255,255,255,0.30), inset 0px 1px 0.487px 0px rgba(255,255,255,0.60);
  }
  .stop-tile-inner { width: 12.69px; height: 12.69px; border-radius: 2px; flex-shrink: 0; pointer-events: none; }
  .stop-tile.off .stop-tile-inner {
    background: #FEFEFF; border: 0.5px solid #CED4DA;
    box-shadow: inset 0 0 1px 0 rgba(0,0,0,0.25);
  }
  .stop-tile.on .stop-tile-inner {
    border: 0.5px solid rgba(0,0,0,0.12);
    box-shadow: inset 0px -1px 1px 0px rgba(0,0,0,0.20), inset 0px 1px 1px 0px rgba(254,254,255,0.26);
  }
  .alpha-preview-row { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 16px; }
  .alpha-preview-item {
    display: inline-flex; align-items: center; gap: 4px;
    height: 24px; padding: 0 6px; flex-shrink: 0;
    background: linear-gradient(180deg, #E9ECEF 0%, #EFF1F3 100%);
    border: 0.8px solid #CED4DA; border-radius: 99px; overflow: hidden;
    box-shadow: 0px -1px 1px 0px rgba(254,254,255,0.6), inset 0px -1px 0px 0.156px #ADB5BD, inset 0px 1px 0.487px 0px #ffffff;
  }
  .alpha-preview-dot {
    width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0;
  }
  .alpha-preview-label {
    font-family: 'Geist', -apple-system, sans-serif;
    font-size: 12px; font-weight: 500; color: #6C757D; letter-spacing: -0.03em;
  }

  /* ── Screen 3 — Loading ───────────────────────────── */
  .loading-body {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 14px;
    background: #E9ECEF;
  }
  .loading-logo { width: 100px; height: 100px; flex-shrink: 0; }
  .loading-logo svg { width: 100px; height: 100px; display: block; }
  .loading-label {
    font-family: 'IBM Plex Serif', Georgia, serif;
    font-size: 14px; font-weight: 500; color: #6C757D;
    letter-spacing: 0; text-align: center;
  }
  .progress-track { width: 250px; height: 8px; background: #F5F3F4; border-radius: 100px; overflow: hidden; }
  .progress-fill  { height: 100%; background: #1F1F1F; border-radius: 100px; width: 0%; transition: width 0.4s ease; }

  /* ── Screen 4 — Success ───────────────────────────── */
  .success-body {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 20px;
    background: #E9ECEF; padding: 20px; text-align: center;
  }
  .success-title {
    font-family: 'IBM Plex Serif', Georgia, serif;
    font-size: 20px; font-weight: 500; color: #1E1E1E; letter-spacing: -0.02em;
  }
  .success-counts-row { display: flex; gap: 10px; width: 100%; }
  .skipped-note { font-size: 11px; color: #6C757D; min-height: 16px; }
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
    <div class="upload-container">
    <div id="uploadZone" class="upload-zone">
      <div class="file-icon-wrap">
        <svg class="fi-default" width="89" height="63" viewBox="0 0 89 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#fi-f0)">
            <path d="M1 19.0994C1 12.4737 1 9.16081 2.27228 6.62263C3.43208 4.30886 5.30886 2.43208 7.62263 1.27228C10.1608 0 13.4737 0 20.0994 0H20.5283C22.7629 0 23.8802 0 24.9484 0.194909C26.3874 0.457461 27.7661 0.980867 29.0168 1.73931C29.9453 2.30235 30.7811 3.04379 32.4528 4.52666C34.1245 6.00953 34.9603 6.75096 35.8888 7.314C37.1394 8.07245 38.5182 8.59585 39.9571 8.85841C41.0253 9.05331 42.1426 9.05331 44.3772 9.05331H68.76C75.4807 9.05331 78.841 9.05331 81.4079 10.3612C83.6659 11.5117 85.5016 13.3475 86.6521 15.6054C87.96 18.1724 87.96 21.5327 87.96 28.2533V39.1998C87.96 45.9204 87.96 49.2807 86.6521 51.8477C85.5016 54.1056 83.6659 55.9414 81.4079 57.0919C78.841 58.3998 75.4807 58.3998 68.76 58.3998H20.2C13.4794 58.3998 10.1191 58.3998 7.55211 57.0919C5.29417 55.9414 3.4584 54.1056 2.30792 51.8477C1 49.2807 1 45.9204 1 39.1998V19.0994Z" fill="url(#fi-g0)"/>
          </g>
          <path d="M20.0996 0.400391H20.5283C22.7773 0.400391 23.8526 0.401961 24.877 0.588867C26.2678 0.842691 27.6007 1.34796 28.8096 2.08105C29.6999 2.62098 30.5051 3.33378 32.1875 4.82617C33.8483 6.29939 34.7151 7.07012 35.6816 7.65625C36.9739 8.43988 38.399 8.98067 39.8857 9.25195C40.9976 9.45478 42.1572 9.45313 44.377 9.45312H68.7598C72.1267 9.45312 74.6284 9.45338 76.6094 9.61523C78.5855 9.77671 80.0089 10.0974 81.2266 10.7178C83.4091 11.8299 85.1838 13.6045 86.2959 15.7871C86.9163 17.0048 87.236 18.4281 87.3975 20.4043C87.5593 22.3852 87.5596 24.8862 87.5596 28.2529V39.2002C87.5596 42.5669 87.5593 45.068 87.3975 47.0488C87.236 49.025 86.9163 50.4484 86.2959 51.666C85.1838 53.8486 83.4091 55.6232 81.2266 56.7354C80.0089 57.3558 78.5855 57.6764 76.6094 57.8379C74.6284 57.9997 72.1267 58 68.7598 58H20.2002C16.8333 58 14.3315 57.9997 12.3506 57.8379C10.3745 57.6764 8.951 57.3558 7.7334 56.7354C5.55085 55.6232 3.77614 53.8486 2.66406 51.666C2.04368 50.4484 1.72396 49.025 1.5625 47.0488C1.40066 45.068 1.40039 42.5669 1.40039 39.2002V19.0996C1.40039 15.7803 1.40018 13.3143 1.55762 11.3604C1.71469 9.41101 2.02637 8.00576 2.62988 6.80176C3.75101 4.56519 5.56519 2.75101 7.80176 1.62988C9.00576 1.02637 10.411 0.714689 12.3604 0.557617C14.3143 0.400181 16.7803 0.400391 20.0996 0.400391Z" stroke="#CED4DA" stroke-width="0.8"/>
          <g filter="url(#fi-f1)">
            <rect x="1" y="22.5277" width="86.96" height="39.7162" rx="12" fill="url(#fi-g1)"/>
            <rect x="1.4" y="22.9277" width="86.16" height="38.9162" rx="11.6" stroke="#CED4DA" stroke-width="0.8"/>
          </g>
          <defs>
            <filter id="fi-f0" x="1" y="-0.155806" width="86.96" height="59.0425" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="0.243447"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
              <feBlend mode="normal" in2="shape" result="fi-is1"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="0.155806" operator="erode" in="SourceAlpha" result="fi-is2"/>
              <feOffset dy="-1"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.678431 0 0 0 0 0.709804 0 0 0 0 0.741176 0 0 0 1 0"/>
              <feBlend mode="normal" in2="fi-is1" result="fi-is2"/>
            </filter>
            <filter id="fi-f1" x="0" y="20.5277" width="88.96" height="42.2031" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="-1"/>
              <feGaussianBlur stdDeviation="0.5"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.996078 0 0 0 0 0.996078 0 0 0 0 1 0 0 0 0.6 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="fi-ds1"/>
              <feBlend mode="normal" in="SourceGraphic" in2="fi-ds1" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="0.243447"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
              <feBlend mode="normal" in2="shape" result="fi-is3"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="0.155806" operator="erode" in="SourceAlpha" result="fi-is4"/>
              <feOffset dy="-1"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.678431 0 0 0 0 0.709804 0 0 0 0 0.741176 0 0 0 1 0"/>
              <feBlend mode="normal" in2="fi-is3" result="fi-is4"/>
            </filter>
            <linearGradient id="fi-g0" x1="44.48" y1="0" x2="44.48" y2="58.3998" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E9ECEF"/>
              <stop offset="1" stop-color="#EFF1F3"/>
            </linearGradient>
            <linearGradient id="fi-g1" x1="44.48" y1="22.5277" x2="44.48" y2="62.2439" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E9ECEF"/>
              <stop offset="1" stop-color="#EFF1F3"/>
            </linearGradient>
          </defs>
        </svg>
        <svg class="fi-hover" width="100" height="63" viewBox="0 0 100 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#fih-f0)">
            <path d="M6.08728 19.0994C6.08728 12.4737 6.08728 9.16081 7.35956 6.62263C8.51936 4.30886 10.3961 2.43208 12.7099 1.27228C15.2481 0 18.5609 0 25.1867 0H25.6156C27.8502 0 28.9675 0 30.0357 0.194909C31.4746 0.457461 32.8534 0.980867 34.1041 1.73931C35.0325 2.30235 35.8684 3.04379 37.5401 4.52666C39.2118 6.00953 40.0476 6.75096 40.976 7.314C42.2267 8.07245 43.6055 8.59585 45.0444 8.85841C46.1126 9.05331 47.2299 9.05331 49.4645 9.05331H73.8473C80.5679 9.05331 83.9282 9.05331 86.4952 10.3612C88.7531 11.5117 90.5889 13.3475 91.7394 15.6054C93.0473 18.1724 93.0473 21.5327 93.0473 28.2533V39.1998C93.0473 45.9204 93.0473 49.2807 91.7394 51.8477C90.5889 54.1056 88.7531 55.9414 86.4952 57.0919C83.9282 58.3998 80.5679 58.3998 73.8473 58.3998H25.2873C18.5667 58.3998 15.2063 58.3998 12.6394 57.0919C10.3814 55.9414 8.54568 54.1056 7.3952 51.8477C6.08728 49.2807 6.08728 45.9204 6.08728 39.1998V19.0994Z" fill="url(#fih-g0)"/>
          </g>
          <path d="M25.1869 0.400391H25.6156C27.8646 0.400391 28.9399 0.401961 29.9642 0.588867C31.355 0.842691 32.688 1.34796 33.8969 2.08105C34.7872 2.62098 35.5924 3.33378 37.2748 4.82617C38.9356 6.29939 39.8024 7.07012 40.7689 7.65625C42.0612 8.43988 43.4863 8.98067 44.973 9.25195C46.0849 9.45478 47.2444 9.45313 49.4642 9.45312H73.847C77.214 9.45312 79.7157 9.45338 81.6967 9.61523C83.6728 9.77671 85.0962 10.0974 86.3138 10.7178C88.4964 11.8299 90.2711 13.6045 91.3832 15.7871C92.0036 17.0048 92.3233 18.4281 92.4847 20.4043C92.6466 22.3852 92.6469 24.8862 92.6469 28.2529V39.2002C92.6469 42.5669 92.6466 45.068 92.4847 47.0488C92.3233 49.025 92.0036 50.4484 91.3832 51.666C90.2711 53.8486 88.4964 55.6232 86.3138 56.7354C85.0962 57.3558 83.6728 57.6764 81.6967 57.8379C79.7157 57.9997 77.214 58 73.847 58H25.2875C21.9206 58 19.4188 57.9997 17.4379 57.8379C15.4618 57.6764 14.0383 57.3558 12.8207 56.7354C10.6381 55.6232 8.86342 53.8486 7.75134 51.666C7.13096 50.4484 6.81124 49.025 6.64978 47.0488C6.48794 45.068 6.48767 42.5669 6.48767 39.2002V19.0996C6.48767 15.7803 6.48746 13.3143 6.6449 11.3604C6.80197 9.41101 7.11365 8.00576 7.71716 6.80176C8.83829 4.56519 10.6525 2.75101 12.889 1.62988C14.093 1.02637 15.4983 0.714689 17.4476 0.557617C19.4015 0.400181 21.8676 0.400391 25.1869 0.400391Z" stroke="#CED4DA" stroke-width="0.8"/>
          <g filter="url(#fih-f1)">
            <path d="M2.88744 48.4055C1.37785 41.8769 0.623056 38.6126 1.18659 35.9941C1.97444 32.3332 4.42606 29.2501 7.81528 27.6578C10.2395 26.5188 13.59 26.5188 20.2908 26.5188H78.8437C85.5446 26.5188 88.895 26.5188 91.3192 27.6578C94.7085 29.2501 97.1601 32.3332 97.9479 35.9941C98.5115 38.6126 97.7567 41.8769 96.2471 48.4055C95.2485 52.724 94.7492 54.8833 93.7015 56.5717C92.2376 58.9304 90.0013 60.7086 87.3734 61.6035C85.4924 62.244 83.2762 62.244 78.8437 62.244H20.2908C15.8583 62.244 13.6421 62.244 11.7611 61.6035C9.13324 60.7086 6.8969 58.9304 5.43307 56.5717C4.38528 54.8833 3.886 52.724 2.88744 48.4055Z" fill="url(#fih-g1)"/>
            <path d="M20.2905 26.9192H78.8433C82.1996 26.9192 84.6962 26.9187 86.6567 27.0598C88.6149 27.2008 90.0018 27.4809 91.1489 28.0198C94.4252 29.559 96.7955 32.5396 97.5571 36.0784C97.8237 37.3174 97.7838 38.7317 97.48 40.6711C97.1758 42.6131 96.6131 45.0456 95.8569 48.3157C94.8516 52.6634 94.366 54.7424 93.3618 56.3606C91.9468 58.6407 89.7849 60.3598 87.2446 61.2249C85.4417 61.8388 83.3061 61.844 78.8433 61.844H20.2905C15.8279 61.844 13.693 61.8387 11.8901 61.2249C9.34987 60.3599 7.18798 58.6407 5.77295 56.3606C4.76869 54.7423 4.28221 52.6636 3.27686 48.3157C2.52073 45.0456 1.95899 42.6131 1.65479 40.6711C1.35098 38.7316 1.311 37.3174 1.57764 36.0784C2.33923 32.5396 4.7096 29.559 7.98584 28.0198C9.13301 27.4809 10.5199 27.2007 12.478 27.0598C14.4385 26.9187 16.9344 26.9192 20.2905 26.9192Z" stroke="#CED4DA" stroke-width="0.8"/>
          </g>
          <defs>
            <filter id="fih-f0" x="6.08728" y="-0.155806" width="86.96" height="59.0425" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="0.243447"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
              <feBlend mode="normal" in2="shape" result="fih-is1"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="0.155806" operator="erode" in="SourceAlpha" result="fih-is2"/>
              <feOffset dy="-1"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.678431 0 0 0 0 0.709804 0 0 0 0 0.741176 0 0 0 1 0"/>
              <feBlend mode="normal" in2="fih-is1" result="fih-is2"/>
            </filter>
            <filter id="fih-f1" x="0" y="24.5188" width="99.1345" height="38.212" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="-1"/>
              <feGaussianBlur stdDeviation="0.5"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.996078 0 0 0 0 0.996078 0 0 0 0 1 0 0 0 0.6 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="fih-ds1"/>
              <feBlend mode="normal" in="SourceGraphic" in2="fih-ds1" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="0.243447"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
              <feBlend mode="normal" in2="shape" result="fih-is3"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="-1"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.678431 0 0 0 0 0.709804 0 0 0 0 0.741176 0 0 0 1 0"/>
              <feBlend mode="normal" in2="fih-is3" result="fih-is4"/>
            </filter>
            <linearGradient id="fih-g0" x1="49.5673" y1="0" x2="49.5673" y2="58.3998" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E9ECEF"/>
              <stop offset="1" stop-color="#EFF1F3"/>
            </linearGradient>
            <linearGradient id="fih-g1" x1="49.5673" y1="26.5188" x2="49.5673" y2="62.244" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E9ECEF"/>
              <stop offset="1" stop-color="#EFF1F3"/>
            </linearGradient>
          </defs>
        </svg>
        <svg class="fi-uploaded" width="89" height="63" viewBox="0 0 89 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#fiu-f0)">
            <path d="M1 19.0994C1 12.4737 1 9.16081 2.27228 6.62263C3.43208 4.30886 5.30886 2.43208 7.62263 1.27228C10.1608 0 13.4737 0 20.0994 0H20.5283C22.7629 0 23.8802 0 24.9484 0.194909C26.3874 0.457461 27.7661 0.980867 29.0168 1.73931C29.9453 2.30235 30.7811 3.04379 32.4528 4.52666C34.1245 6.00953 34.9603 6.75096 35.8888 7.314C37.1394 8.07245 38.5182 8.59585 39.9571 8.85841C41.0253 9.05331 42.1426 9.05331 44.3772 9.05331H68.76C75.4807 9.05331 78.841 9.05331 81.4079 10.3612C83.6659 11.5117 85.5016 13.3475 86.6521 15.6054C87.96 18.1724 87.96 21.5327 87.96 28.2533V39.1998C87.96 45.9204 87.96 49.2807 86.6521 51.8477C85.5016 54.1056 83.6659 55.9414 81.4079 57.0919C78.841 58.3998 75.4807 58.3998 68.76 58.3998H20.2C13.4794 58.3998 10.1191 58.3998 7.55211 57.0919C5.29417 55.9414 3.4584 54.1056 2.30792 51.8477C1 49.2807 1 45.9204 1 39.1998V19.0994Z" fill="url(#fiu-g0)"/>
          </g>
          <path d="M20.0996 0.400391H20.5283C22.7773 0.400391 23.8526 0.401961 24.877 0.588867C26.2678 0.842691 27.6007 1.34796 28.8096 2.08105C29.6999 2.62098 30.5051 3.33378 32.1875 4.82617C33.8483 6.29939 34.7151 7.07012 35.6816 7.65625C36.9739 8.43988 38.399 8.98067 39.8857 9.25195C40.9976 9.45478 42.1572 9.45313 44.377 9.45312H68.7598C72.1267 9.45312 74.6284 9.45338 76.6094 9.61523C78.5855 9.77671 80.0089 10.0974 81.2266 10.7178C83.4091 11.8299 85.1838 13.6045 86.2959 15.7871C86.9163 17.0048 87.236 18.4281 87.3975 20.4043C87.5593 22.3852 87.5596 24.8862 87.5596 28.2529V39.2002C87.5596 42.5669 87.5593 45.068 87.3975 47.0488C87.236 49.025 86.9163 50.4484 86.2959 51.666C85.1838 53.8486 83.4091 55.6232 81.2266 56.7354C80.0089 57.3558 78.5855 57.6764 76.6094 57.8379C74.6284 57.9997 72.1267 58 68.7598 58H20.2002C16.8333 58 14.3315 57.9997 12.3506 57.8379C10.3745 57.6764 8.951 57.3558 7.7334 56.7354C5.55085 55.6232 3.77614 53.8486 2.66406 51.666C2.04368 50.4484 1.72396 49.025 1.5625 47.0488C1.40066 45.068 1.40039 42.5669 1.40039 39.2002V19.0996C1.40039 15.7803 1.40018 13.3143 1.55762 11.3604C1.71469 9.41101 2.02637 8.00576 2.62988 6.80176C3.75101 4.56519 5.56519 2.75101 7.80176 1.62988C9.00576 1.02637 10.411 0.714689 12.3604 0.557617C14.3143 0.400181 16.7803 0.400391 20.0996 0.400391Z" stroke="#CED4DA" stroke-width="0.8"/>
          <rect x="5.25" y="13.9612" width="78.46" height="46.03" rx="7.75" fill="#FEFEFF" stroke="#CED4DA" stroke-width="0.5"/>
          <g filter="url(#fiu-f1)">
            <rect x="1" y="22.5277" width="86.96" height="39.7162" rx="12" fill="url(#fiu-g1)"/>
            <rect x="1.4" y="22.9277" width="86.16" height="38.9162" rx="11.6" stroke="#CED4DA" stroke-width="0.8"/>
          </g>
          <g filter="url(#fiu-f2)">
            <path d="M40.9835 36.0046C40.9835 37.1844 40.0271 38.1409 38.8473 38.1409C37.6675 38.1409 36.7111 37.1844 36.7111 36.0046C36.7111 34.8248 37.6675 33.8684 38.8473 33.8684C40.0271 33.8684 40.9835 34.8248 40.9835 36.0046Z" fill="#ADB5BD"/>
            <path d="M40.9835 36.0046C40.9835 34.8248 40.0271 33.8684 38.8473 33.8684C37.6675 33.8684 36.7111 34.8248 36.7111 36.0046C36.7111 37.1844 37.6675 38.1409 38.8473 38.1409C40.0271 38.1409 40.9835 37.1844 40.9835 36.0046ZM41.4106 36.0046C41.4106 37.4204 40.263 38.568 38.8473 38.568C37.4315 38.568 36.2839 37.4204 36.2839 36.0046C36.2839 34.5889 37.4315 33.4413 38.8473 33.4413C40.263 33.4413 41.4106 34.5889 41.4106 36.0046Z" fill="white"/>
            <path d="M53.1686 38.1409C53.1686 39.3207 52.2121 40.2771 51.0323 40.2771C49.8525 40.2771 48.8961 39.3207 48.8961 38.1409C48.8961 36.9611 49.8525 36.0046 51.0323 36.0046C52.2121 36.0046 53.1686 36.9611 53.1686 38.1409Z" fill="#ADB5BD"/>
            <path d="M53.1686 38.1409C53.1686 36.9611 52.2121 36.0046 51.0323 36.0046C49.8525 36.0046 48.8961 36.9611 48.8961 38.1409C48.8961 39.3207 49.8525 40.2771 51.0323 40.2771C52.2121 40.2771 53.1686 39.3207 53.1686 38.1409ZM53.5957 38.1409C53.5957 39.5566 52.4481 40.7042 51.0323 40.7042C49.6166 40.7042 48.469 39.5566 48.469 38.1409C48.469 36.7251 49.6166 35.5775 51.0323 35.5775C52.4481 35.5775 53.5957 36.7251 53.5957 38.1409Z" fill="white"/>
            <path d="M43.8022 48.7669C43.8022 49.9467 42.8458 50.9031 41.666 50.9031C40.4862 50.9031 39.5298 49.9467 39.5298 48.7669C39.5298 47.5871 40.4862 46.6307 41.666 46.6307C42.8458 46.6307 43.8022 47.5871 43.8022 48.7669Z" fill="#ADB5BD"/>
            <path d="M43.8022 48.7669C43.8022 47.5871 42.8458 46.6307 41.666 46.6307C40.4862 46.6307 39.5298 47.5871 39.5298 48.7669C39.5298 49.9467 40.4862 50.9031 41.666 50.9031C42.8458 50.9031 43.8022 49.9467 43.8022 48.7669ZM44.2294 48.7669C44.2294 50.1826 43.0818 51.3302 41.666 51.3302C40.2502 51.3302 39.1026 50.1826 39.1026 48.7669C39.1026 47.3511 40.2502 46.2035 41.666 46.2035C43.0818 46.2035 44.2294 47.3511 44.2294 48.7669Z" fill="white"/>
            <path d="M48.1442 37.0728C48.1442 38.8425 46.7095 40.2771 44.9398 40.2771C43.1701 40.2771 41.7355 38.8425 41.7355 37.0728C41.7355 35.3031 43.1701 33.8684 44.9398 33.8684C46.7095 33.8684 48.1442 35.3031 48.1442 37.0728Z" fill="#ADB5BD"/>
            <path d="M48.1442 37.0728C48.1442 35.3031 46.7095 33.8684 44.9398 33.8684C43.1701 33.8684 41.7355 35.3031 41.7355 37.0728C41.7355 38.8425 43.1701 40.2771 44.9398 40.2771C46.7095 40.2771 48.1442 38.8425 48.1442 37.0728ZM48.5713 37.0728C48.5713 39.0784 46.9455 40.7042 44.9398 40.7042C42.9342 40.7042 41.3084 39.0784 41.3084 37.0728C41.3084 35.0671 42.9342 33.4413 44.9398 33.4413C46.9455 33.4413 48.5713 35.0671 48.5713 37.0728Z" fill="white"/>
            <path d="M52.9507 45.0836C52.9507 47.7381 50.7987 49.8901 48.1442 49.8901C45.4896 49.8901 43.3377 47.7381 43.3377 45.0836C43.3377 42.429 45.4896 40.2771 48.1442 40.2771C50.7987 40.2771 52.9507 42.429 52.9507 45.0836Z" fill="#ADB5BD"/>
            <path d="M52.9507 45.0836C52.9507 42.429 50.7987 40.2771 48.1442 40.2771C45.4896 40.2771 43.3377 42.429 43.3377 45.0836C43.3377 47.7381 45.4896 49.8901 48.1442 49.8901C50.7987 49.8901 52.9507 47.7381 52.9507 45.0836ZM53.3778 45.0836C53.3778 47.9741 51.0347 50.3172 48.1442 50.3172C45.2536 50.3172 42.9105 47.9741 42.9105 45.0836C42.9105 42.1931 45.2536 39.8499 48.1442 39.8499C51.0347 39.8499 53.3778 42.1931 53.3778 45.0836Z" fill="white"/>
            <path d="M43.2682 42.5571C43.2682 44.6217 41.5944 46.2954 39.5298 46.2954C37.4651 46.2954 35.7914 44.6217 35.7914 42.5571C35.7914 40.4924 37.4651 38.8187 39.5298 38.8187C41.5944 38.8187 43.2682 40.4924 43.2682 42.5571Z" fill="#ADB5BD"/>
            <path d="M43.2682 42.5571C43.2682 40.4924 41.5944 38.8187 39.5298 38.8187C37.4651 38.8187 35.7914 40.4924 35.7914 42.5571C35.7914 44.6217 37.4651 46.2954 39.5298 46.2954C41.5944 46.2954 43.2682 44.6217 43.2682 42.5571ZM43.6953 42.5571C43.6953 44.8577 41.8304 46.7226 39.5298 46.7226C37.2292 46.7226 35.3643 44.8577 35.3643 42.5571C35.3643 40.2564 37.2292 38.3915 39.5298 38.3915C41.8304 38.3915 43.6953 40.2564 43.6953 42.5571Z" fill="white"/>
          </g>
          <path d="M44.9395 33.1747C46.8724 33.1747 48.4753 34.5812 48.7832 36.4266C49.3003 35.7492 50.1142 35.3105 51.0322 35.3104C52.5953 35.3104 53.8621 36.5774 53.8623 38.1405C53.8623 39.4733 52.9406 40.5871 51.7002 40.8876C52.8896 41.8966 53.6445 43.4019 53.6445 45.0839C53.6444 48.1216 51.1823 50.5837 48.1445 50.5839C46.7291 50.5839 45.4387 50.0491 44.4639 49.1708C44.2676 50.5424 43.0919 51.5975 41.666 51.5975C40.1028 51.5975 38.8359 50.3297 38.8359 48.7665C38.836 48.0924 39.0714 47.4733 39.4648 46.9872C37.0469 46.9524 35.0979 44.9837 35.0977 42.5575C35.0977 40.7916 36.1297 39.2662 37.624 38.5536C36.6742 38.097 36.0166 37.1292 36.0166 36.0048C36.0166 34.4415 37.2844 33.1747 38.8477 33.1747C40.1137 33.1748 41.1852 34.0057 41.5469 35.1522C42.2167 33.9713 43.4848 33.1748 44.9395 33.1747ZM42.6758 45.6786C42.5588 45.7964 42.4352 45.9074 42.3057 46.0116C42.4578 46.0468 42.6054 46.0926 42.7471 46.1512C42.7165 45.996 42.693 45.8383 42.6758 45.6786ZM43.5635 40.7196C43.6949 41.0076 43.7967 41.3117 43.8643 41.6288C44.0625 41.3835 44.2816 41.156 44.5186 40.9481C44.1857 40.9124 43.8659 40.8338 43.5635 40.7196ZM48.332 38.9921C48.212 39.2038 48.0731 39.4031 47.917 39.5878C47.9923 39.5847 48.0684 39.5829 48.1445 39.5829C48.3021 39.5829 48.4581 39.5904 48.6123 39.6034C48.4968 39.4126 48.4003 39.2088 48.332 38.9921ZM41.0947 37.7186C40.9427 37.9176 40.766 38.0954 40.5674 38.2479C40.8249 38.3097 41.0737 38.3934 41.3115 38.4979C41.2138 38.2494 41.1398 37.989 41.0947 37.7186Z" stroke="white" stroke-width="0.534055"/>
          <defs>
            <filter id="fiu-f0" x="1" y="-0.155806" width="86.96" height="59.0425" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="0.243447"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
              <feBlend mode="normal" in2="shape" result="fiu-is1"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="0.155806" operator="erode" in="SourceAlpha" result="fiu-is2"/>
              <feOffset dy="-1"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.678431 0 0 0 0 0.709804 0 0 0 0 0.741176 0 0 0 1 0"/>
              <feBlend mode="normal" in2="fiu-is1" result="fiu-is2"/>
            </filter>
            <filter id="fiu-f1" x="0" y="20.5277" width="88.96" height="42.2031" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="-1"/>
              <feGaussianBlur stdDeviation="0.5"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.996078 0 0 0 0 0.996078 0 0 0 0 1 0 0 0 0.6 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="fiu-ds1"/>
              <feBlend mode="normal" in="SourceGraphic" in2="fiu-ds1" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="0.243447"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
              <feBlend mode="normal" in2="shape" result="fiu-is3"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="0.155806" operator="erode" in="SourceAlpha" result="fiu-is4"/>
              <feOffset dy="-1"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.678431 0 0 0 0 0.709804 0 0 0 0 0.741176 0 0 0 1 0"/>
              <feBlend mode="normal" in2="fiu-is3" result="fiu-is4"/>
            </filter>
            <filter id="fiu-f2" x="34.8302" y="32.9072" width="19.2996" height="20.0251" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1.06811"/>
              <feGaussianBlur stdDeviation="0.801083"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
              <feBlend mode="normal" in2="shape" result="fiu-is5"/>
            </filter>
            <linearGradient id="fiu-g0" x1="44.48" y1="0" x2="44.48" y2="58.3998" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E9ECEF"/>
              <stop offset="1" stop-color="#EFF1F3"/>
            </linearGradient>
            <linearGradient id="fiu-g1" x1="44.48" y1="22.5277" x2="44.48" y2="62.2439" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E9ECEF"/>
              <stop offset="1" stop-color="#EFF1F3"/>
            </linearGradient>
          </defs>
        </svg>
        <svg class="fi-uploaded-hover" width="102" height="63" viewBox="0 0 102 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#fiuh-f0)">
            <path d="M7.11646 19.0994C7.11646 12.4737 7.11646 9.16081 8.38874 6.62263C9.54854 4.30886 11.4253 2.43208 13.7391 1.27228C16.2773 0 19.5901 0 26.2159 0H26.6448C28.8794 0 29.9967 0 31.0649 0.194909C32.5038 0.457461 33.8826 0.980867 35.1333 1.73931C36.0617 2.30235 36.8976 3.04379 38.5692 4.52666C40.2409 6.00953 41.0768 6.75096 42.0052 7.314C43.2559 8.07245 44.6347 8.59585 46.0736 8.85841C47.1418 9.05331 48.2591 9.05331 50.4937 9.05331H74.8765C81.5971 9.05331 84.9574 9.05331 87.5244 10.3612C89.7823 11.5117 91.6181 13.3475 92.7686 15.6054C94.0765 18.1724 94.0765 21.5327 94.0765 28.2533V39.1998C94.0765 45.9204 94.0765 49.2807 92.7686 51.8477C91.6181 54.1056 89.7823 55.9414 87.5244 57.0919C84.9574 58.3998 81.5971 58.3998 74.8765 58.3998H26.3165C19.5958 58.3998 16.2355 58.3998 13.6686 57.0919C11.4106 55.9414 9.57486 54.1056 8.42438 51.8477C7.11646 49.2807 7.11646 45.9204 7.11646 39.1998V19.0994Z" fill="url(#fiuh-g0)"/>
          </g>
          <path d="M26.2161 0.400391H26.6448C28.8937 0.400391 29.9691 0.401961 30.9934 0.588867C32.3842 0.842691 33.7172 1.34796 34.926 2.08105C35.8164 2.62098 36.6215 3.33378 38.304 4.82617C39.9648 6.29939 40.8316 7.07012 41.7981 7.65625C43.0904 8.43988 44.5154 8.98067 46.0022 9.25195C47.1141 9.45478 48.2736 9.45313 50.4934 9.45312H74.8762C78.2431 9.45312 80.7449 9.45338 82.7258 9.61523C84.7019 9.77671 86.1254 10.0974 87.343 10.7178C89.5256 11.8299 91.3003 13.6045 92.4124 15.7871C93.0327 17.0048 93.3525 18.4281 93.5139 20.4043C93.6758 22.3852 93.676 24.8862 93.676 28.2529V39.2002C93.676 42.5669 93.6758 45.068 93.5139 47.0488C93.3525 49.025 93.0327 50.4484 92.4124 51.666C91.3003 53.8486 89.5256 55.6232 87.343 56.7354C86.1254 57.3558 84.7019 57.6764 82.7258 57.8379C80.7449 57.9997 78.2431 58 74.8762 58H26.3167C22.9497 58 20.448 57.9997 18.467 57.8379C16.491 57.6764 15.0675 57.3558 13.8499 56.7354C11.6673 55.6232 9.8926 53.8486 8.78052 51.666C8.16013 50.4484 7.84042 49.025 7.67896 47.0488C7.51711 45.068 7.51685 42.5669 7.51685 39.2002V19.0996C7.51685 15.7803 7.51664 13.3143 7.67407 11.3604C7.83114 9.41101 8.14282 8.00576 8.74634 6.80176C9.86746 4.56519 11.6816 2.75101 13.9182 1.62988C15.1222 1.02637 16.5275 0.714689 18.4768 0.557617C20.4307 0.400181 22.8967 0.400391 26.2161 0.400391Z" stroke="#CED4DA" stroke-width="0.8"/>
          <rect x="8.55085" y="12.6312" width="78.46" height="46.03" rx="7.75" transform="rotate(-7.9814 8.55085 12.6312)" fill="#FEFEFF" stroke="#CED4DA" stroke-width="0.5"/>
          <g filter="url(#fiuh-f1)">
            <path d="M3.46572 48.9393C1.55326 41.9697 0.597027 38.4849 1.16055 35.689C1.88842 32.0777 4.23474 29.0008 7.52474 27.3432C10.0719 26.0599 13.6855 26.0599 20.9128 26.0599H80.2802C87.5075 26.0599 91.1211 26.0599 93.6682 27.3432C96.9582 29.0008 99.3045 32.0777 100.032 35.689C100.596 38.4849 99.6397 41.9697 97.7272 48.9393C96.5544 53.2135 95.968 55.3506 94.8396 57.0051C93.3812 59.1435 91.2706 60.7529 88.8226 61.5935C86.9284 62.2438 84.7124 62.2438 80.2802 62.2438H20.9128C16.4806 62.2438 14.2645 62.2438 12.3703 61.5935C9.92235 60.7529 7.81173 59.1435 6.35339 57.0051C5.22497 55.3506 4.63855 53.2135 3.46572 48.9393Z" fill="url(#fiuh-g1)"/>
            <path d="M20.9132 26.4603H80.2804C83.9002 26.4603 86.5928 26.4605 88.6993 26.6195C90.804 26.7784 92.2835 27.0935 93.4884 27.7006C96.6686 29.3029 98.9371 32.277 99.6407 35.7679C99.9073 37.0905 99.8198 38.6007 99.4161 40.6722C99.012 42.7458 98.2998 45.3427 97.3419 48.8334C96.1611 53.1368 95.5905 55.1937 94.5089 56.7797C93.0992 58.8467 91.0589 60.4027 88.6925 61.2152C86.8769 61.8385 84.7425 61.8441 80.2804 61.8441H20.9132C16.4507 61.8441 14.3158 61.8386 12.5001 61.2152C10.1338 60.4027 8.09343 58.8467 6.68372 56.7797C5.60214 55.1937 5.0325 53.1366 3.85168 48.8334C2.89381 45.3426 2.18158 42.7458 1.77747 40.6722C1.37375 38.6006 1.28628 37.0906 1.55286 35.7679C2.25649 32.277 4.5249 29.3028 7.7052 27.7006C8.9101 27.0936 10.3897 26.7784 12.4943 26.6195C14.6008 26.4605 17.2936 26.4603 20.9132 26.4603Z" stroke="#CED4DA" stroke-width="0.8"/>
          </g>
          <g filter="url(#fiuh-f2)">
            <path d="M48.0618 40.5261C48.0618 41.3814 47.3685 42.0747 46.5132 42.0747C45.658 42.0747 44.9646 41.3814 44.9646 40.5261C44.9646 39.6708 45.658 38.9775 46.5132 38.9775C47.3685 38.9775 48.0618 39.6708 48.0618 40.5261Z" fill="#ADB5BD"/>
            <path d="M48.0618 40.5261C48.0618 39.6708 47.3685 38.9775 46.5132 38.9775C45.658 38.9775 44.9646 39.6708 44.9646 40.5261C44.9646 41.3814 45.658 42.0747 46.5132 42.0747C47.3685 42.0747 48.0618 41.3814 48.0618 40.5261ZM48.3715 40.5261C48.3715 41.5524 47.5395 42.3843 46.5132 42.3843C45.4869 42.3843 44.655 41.5524 44.655 40.5261C44.655 39.4998 45.4869 38.6678 46.5132 38.6678C47.5395 38.6678 48.3715 39.4998 48.3715 40.5261Z" fill="white"/>
            <path d="M56.8951 42.0747C56.8951 42.93 56.2018 43.6233 55.3465 43.6233C54.4912 43.6233 53.7979 42.93 53.7979 42.0747C53.7979 41.2194 54.4912 40.5261 55.3465 40.5261C56.2018 40.5261 56.8951 41.2194 56.8951 42.0747Z" fill="#ADB5BD"/>
            <path d="M56.8951 42.0747C56.8951 41.2194 56.2018 40.5261 55.3465 40.5261C54.4912 40.5261 53.7979 41.2194 53.7979 42.0747C53.7979 42.93 54.4912 43.6233 55.3465 43.6233C56.2018 43.6233 56.8951 42.93 56.8951 42.0747ZM57.2047 42.0747C57.2047 43.101 56.3728 43.9329 55.3465 43.9329C54.3202 43.9329 53.4882 43.101 53.4882 42.0747C53.4882 41.0484 54.3202 40.2164 55.3465 40.2164C56.3728 40.2164 57.2047 41.0484 57.2047 42.0747Z" fill="white"/>
            <path d="M50.1052 49.7778C50.1052 50.633 49.4119 51.3264 48.5566 51.3264C47.7013 51.3264 47.008 50.633 47.008 49.7778C47.008 48.9225 47.7013 48.2292 48.5566 48.2292C49.4119 48.2292 50.1052 48.9225 50.1052 49.7778Z" fill="#ADB5BD"/>
            <path d="M50.1052 49.7778C50.1052 48.9225 49.4119 48.2292 48.5566 48.2292C47.7013 48.2292 47.008 48.9225 47.008 49.7778C47.008 50.633 47.7013 51.3264 48.5566 51.3264C49.4119 51.3264 50.1052 50.633 50.1052 49.7778ZM50.4148 49.7778C50.4148 50.8041 49.5829 51.636 48.5566 51.636C47.5303 51.636 46.6983 50.8041 46.6983 49.7778C46.6983 48.7515 47.5303 47.9195 48.5566 47.9195C49.5829 47.9195 50.4148 48.7515 50.4148 49.7778Z" fill="white"/>
            <path d="M53.2528 41.3004C53.2528 42.5833 52.2128 43.6233 50.9299 43.6233C49.647 43.6233 48.607 42.5833 48.607 41.3004C48.607 40.0175 49.647 38.9775 50.9299 38.9775C52.2128 38.9775 53.2528 40.0175 53.2528 41.3004Z" fill="#ADB5BD"/>
            <path d="M53.2528 41.3004C53.2528 40.0175 52.2128 38.9775 50.9299 38.9775C49.647 38.9775 48.607 40.0175 48.607 41.3004C48.607 42.5833 49.647 43.6233 50.9299 43.6233C52.2128 43.6233 53.2528 42.5833 53.2528 41.3004ZM53.5624 41.3004C53.5624 42.7544 52.3838 43.9329 50.9299 43.9329C49.4759 43.9329 48.2973 42.7544 48.2973 41.3004C48.2973 39.8464 49.4759 38.6678 50.9299 38.6678C52.3838 38.6678 53.5624 39.8464 53.5624 41.3004Z" fill="white"/>
            <path d="M56.7371 47.1077C56.7371 49.032 55.1771 50.592 53.2528 50.592C51.3284 50.592 49.7684 49.032 49.7684 47.1077C49.7684 45.1833 51.3284 43.6233 53.2528 43.6233C55.1771 43.6233 56.7371 45.1833 56.7371 47.1077Z" fill="#ADB5BD"/>
            <path d="M56.7371 47.1077C56.7371 45.1833 55.1771 43.6233 53.2528 43.6233C51.3284 43.6233 49.7684 45.1833 49.7684 47.1077C49.7684 49.032 51.3284 50.592 53.2528 50.592C55.1771 50.592 56.7371 49.032 56.7371 47.1077ZM57.0468 47.1077C57.0468 49.2031 55.3482 50.9017 53.2528 50.9017C51.1574 50.9017 49.4588 49.2031 49.4588 47.1077C49.4588 45.0122 51.1574 43.3137 53.2528 43.3137C55.3482 43.3137 57.0468 45.0122 57.0468 47.1077Z" fill="white"/>
            <path d="M49.718 45.2761C49.718 46.7728 48.5047 47.9862 47.008 47.9862C45.5113 47.9862 44.2979 46.7728 44.2979 45.2761C44.2979 43.7794 45.5113 42.5661 47.008 42.5661C48.5047 42.5661 49.718 43.7794 49.718 45.2761Z" fill="#ADB5BD"/>
            <path d="M49.718 45.2761C49.718 43.7794 48.5047 42.5661 47.008 42.5661C45.5113 42.5661 44.2979 43.7794 44.2979 45.2761C44.2979 46.7728 45.5113 47.9862 47.008 47.9862C48.5047 47.9862 49.718 46.7728 49.718 45.2761ZM50.0277 45.2761C50.0277 46.9439 48.6758 48.2958 47.008 48.2958C45.3402 48.2958 43.9883 46.9439 43.9883 45.2761C43.9883 43.6083 45.3402 42.2564 47.008 42.2564C48.6758 42.2564 50.0277 43.6083 50.0277 45.2761Z" fill="white"/>
          </g>
          <path d="M50.9297 38.4745C52.3318 38.4745 53.4916 39.4958 53.7139 40.8348C54.0886 40.3421 54.6798 40.0233 55.3467 40.0233C56.4798 40.0234 57.3984 40.9419 57.3984 42.0751C57.3983 43.0413 56.7295 43.8487 55.8301 44.0663C56.6923 44.7976 57.2401 45.8881 57.2402 47.1073C57.2402 49.3096 55.4552 51.0955 53.2529 51.0956C52.2265 51.0956 51.2907 50.7072 50.584 50.0702C50.4418 51.0646 49.5904 51.8299 48.5566 51.83C47.4235 51.83 46.5051 50.9112 46.5049 49.7782C46.5049 49.289 46.6762 48.8397 46.9619 48.4872C45.2085 48.4625 43.795 47.0355 43.7949 45.2762C43.7949 43.9959 44.5434 42.8904 45.627 42.3739C44.9382 42.043 44.461 41.3415 44.4609 40.5262C44.4609 39.393 45.3804 38.4745 46.5137 38.4745C47.432 38.4747 48.2091 39.078 48.4707 39.91C48.9561 39.0533 49.8747 38.4746 50.9297 38.4745ZM49.2891 47.5389C49.2039 47.6248 49.1129 47.7043 49.0186 47.7802C49.1296 47.8057 49.2375 47.8389 49.3408 47.8817C49.3187 47.7691 49.3015 47.6548 49.2891 47.5389ZM49.9307 43.9403C50.0267 44.1502 50.1001 44.3722 50.1494 44.6034C50.2932 44.4254 50.4521 44.2601 50.624 44.1093C50.382 44.0832 50.1505 44.0235 49.9307 43.9403ZM53.3887 42.6903C53.3014 42.8444 53.2006 42.9895 53.0869 43.1239C53.1419 43.1217 53.1974 43.12 53.2529 43.12C53.3671 43.12 53.4801 43.1252 53.5918 43.1346C53.5079 42.996 53.4381 42.8478 53.3887 42.6903ZM48.1445 41.7655C48.0341 41.9107 47.9053 42.0401 47.7607 42.1512C47.9481 42.1962 48.1287 42.2586 48.3018 42.3348C48.2303 42.1533 48.1773 41.9631 48.1445 41.7655Z" stroke="white" stroke-width="0.387151"/>
          <defs>
            <filter id="fiuh-f0" x="7.11646" y="-0.155806" width="86.96" height="59.0425" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="0.243447"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
              <feBlend mode="normal" in2="shape" result="fiuh-is1"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="0.155806" operator="erode" in="SourceAlpha" result="fiuh-is2"/>
              <feOffset dy="-1"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.678431 0 0 0 0 0.709804 0 0 0 0 0.741176 0 0 0 1 0"/>
              <feBlend mode="normal" in2="fiuh-is1" result="fiuh-is2"/>
            </filter>
            <filter id="fiuh-f1" x="0" y="24.0599" width="101.193" height="38.6707" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="-1"/>
              <feGaussianBlur stdDeviation="0.5"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.996078 0 0 0 0 0.996078 0 0 0 0 1 0 0 0 0.6 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="fiuh-ds1"/>
              <feBlend mode="normal" in="SourceGraphic" in2="fiuh-ds1" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="0.243447"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
              <feBlend mode="normal" in2="shape" result="fiuh-is3"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="-1"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.678431 0 0 0 0 0.709804 0 0 0 0 0.741176 0 0 0 1 0"/>
              <feBlend mode="normal" in2="fiuh-is3" result="fiuh-is4"/>
            </filter>
            <filter id="fiuh-f2" x="43.6011" y="38.2806" width="13.9908" height="14.5169" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="0.774302"/>
              <feGaussianBlur stdDeviation="0.580726"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
              <feBlend mode="normal" in2="shape" result="fiuh-is5"/>
            </filter>
            <linearGradient id="fiuh-g0" x1="50.5965" y1="0" x2="50.5965" y2="58.3998" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E9ECEF"/>
              <stop offset="1" stop-color="#EFF1F3"/>
            </linearGradient>
            <linearGradient id="fiuh-g1" x1="50.5965" y1="26.0599" x2="50.5965" y2="62.2438" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E9ECEF"/>
              <stop offset="1" stop-color="#EFF1F3"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div class="upload-zone-text-area">
        <div class="upload-zone-label">Drop or upload your tokens.json here</div>
        <div class="upload-zone-loaded">
          <span id="fileNameInZone"></span>
          <button id="btnClearFile" class="btn-clear-file">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 7M7 1L1 7" stroke="#6C757D" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      <input type="file" id="fileInput" accept=".json" style="display:none">
    </div>
    </div>

    <div class="paste-section">
      <div class="paste-label">or Paste JSON directly</div>
      <textarea id="jsonInput" placeholder='Follow this format -
{
  "primitives": {
    "gray": {
      "10": "#F9F9FB",
      "20": "#EFEFEF"
    }
  },
  "semantics": {
    "brand": {
      "primary": "{primitive.purple.500}"
    },
    "neutral": {
      "bg": "{primitive.gray.10}"
    }
  }
}'></textarea>
      <div id="errorBox" class="error-box"></div>
    </div>
  </div>

  <div class="bottom-bar">
    <button id="btnSample" class="btn-load">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.44231 9.99516C4.11908 10.3184 3.68068 10.5 3.22356 10.5C2.76645 10.5 2.32805 10.3184 2.00481 9.99516C1.68159 9.67192 1.5 9.23352 1.5 8.77641C1.5 8.31929 1.68159 7.88089 2.00481 7.55766L8.06247 1.5L10.875 4.3125L9.74997 4.6875L4.44231 9.99516Z" stroke="#15110D" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.41345 6.14906C3.85267 5.97797 4.62189 5.85094 5.62501 6.375C6.62814 6.89906 7.39736 6.77203 7.83658 6.60094" stroke="#15110D" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Load Sample JSON
    </button>
    <button id="btnParse"  class="btn-primary">Parse Tokens &rarr;</button>
  </div>
</div>

<!-- ── Screen 2: Alpha Builder ─────────────────────── -->
<div id="s2" class="screen">
  <div class="hdr">
    <svg class="hdr-logo" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#s2-f0)">
        <rect x="0.486938" y="0.486816" width="29.2136" height="29.2136" rx="6.81651" fill="url(#s2-g0)"/>
        <rect x="0.243492" y="0.24337" width="29.7005" height="29.7005" rx="7.05995" stroke="#DEE2E6" stroke-width="0.486893"/>
        <g filter="url(#s2-f1)">
          <path d="M11.906 9.27596C11.906 10.3516 11.0341 11.2235 9.95847 11.2235C8.88285 11.2235 8.01089 10.3516 8.01089 9.27596C8.01089 8.20034 8.88285 7.32838 9.95847 7.32838C11.0341 7.32838 11.906 8.20034 11.906 9.27596Z" fill="#1E1E1E"/>
          <path d="M11.906 9.27596C11.906 8.20034 11.0341 7.32838 9.95847 7.32838C8.88285 7.32838 8.01089 8.20034 8.01089 9.27596C8.01089 10.3516 8.88285 11.2235 9.95847 11.2235C11.0341 11.2235 11.906 10.3516 11.906 9.27596ZM12.2955 9.27596C12.2955 10.5667 11.2492 11.613 9.95847 11.613C8.66773 11.613 7.62147 10.5667 7.62147 9.27596C7.62147 7.98522 8.66773 6.93896 9.95847 6.93896C11.2492 6.93896 12.2955 7.98522 12.2955 9.27596Z" fill="white"/>
          <path d="M23.015 11.2235C23.015 12.2991 22.1431 13.1711 21.0675 13.1711C19.9919 13.1711 19.1199 12.2991 19.1199 11.2235C19.1199 10.1479 19.9919 9.27596 21.0675 9.27596C22.1431 9.27596 23.015 10.1479 23.015 11.2235Z" fill="#A06CD5"/>
          <path d="M23.015 11.2235C23.015 10.1479 22.1431 9.27596 21.0675 9.27596C19.9919 9.27596 19.1199 10.1479 19.1199 11.2235C19.1199 12.2991 19.9919 13.1711 21.0675 13.1711C22.1431 13.1711 23.015 12.2991 23.015 11.2235ZM23.4045 11.2235C23.4045 12.5143 22.3582 13.5605 21.0675 13.5605C19.7767 13.5605 18.7305 12.5143 18.7305 11.2235C18.7305 9.93279 19.7767 8.88654 21.0675 8.88654C22.3582 8.88654 23.4045 9.93279 23.4045 11.2235Z" fill="white"/>
          <path d="M14.4758 20.9112C14.4758 21.9868 13.6039 22.8587 12.5283 22.8587C11.4527 22.8587 10.5807 21.9868 10.5807 20.9112C10.5807 19.8356 11.4527 18.9636 12.5283 18.9636C13.6039 18.9636 14.4758 19.8356 14.4758 20.9112Z" fill="#ED383F"/>
          <path d="M14.4758 20.9112C14.4758 19.8356 13.6039 18.9636 12.5283 18.9636C11.4527 18.9636 10.5807 19.8356 10.5807 20.9112C10.5807 21.9868 11.4527 22.8587 12.5283 22.8587C13.6039 22.8587 14.4758 21.9868 14.4758 20.9112ZM14.8653 20.9112C14.8653 22.2019 13.819 23.2482 12.5283 23.2482C11.2375 23.2482 10.1913 22.2019 10.1913 20.9112C10.1913 19.6204 11.2375 18.5742 12.5283 18.5742C13.819 18.5742 14.8653 19.6204 14.8653 20.9112Z" fill="white"/>
          <path d="M18.4343 10.2497C18.4343 11.8632 17.1264 13.1711 15.513 13.1711C13.8996 13.1711 12.5916 11.8632 12.5916 10.2497C12.5916 8.63632 13.8996 7.32838 15.513 7.32838C17.1264 7.32838 18.4343 8.63632 18.4343 10.2497Z" fill="#7CB518"/>
          <path d="M18.4343 10.2497C18.4343 8.63632 17.1264 7.32838 15.513 7.32838C13.8996 7.32838 12.5916 8.63632 12.5916 10.2497C12.5916 11.8632 13.8996 13.1711 15.513 13.1711C17.1264 13.1711 18.4343 11.8632 18.4343 10.2497ZM18.8238 10.2497C18.8238 12.0783 17.3415 13.5605 15.513 13.5605C13.6844 13.5605 12.2022 12.0783 12.2022 10.2497C12.2022 8.4212 13.6844 6.93896 15.513 6.93896C17.3415 6.93896 18.8238 8.4212 18.8238 10.2497Z" fill="white"/>
          <path d="M22.8164 17.5531C22.8164 19.9733 20.8545 21.9352 18.4343 21.9352C16.0142 21.9352 14.0523 19.9733 14.0523 17.5531C14.0523 15.133 16.0142 13.1711 18.4343 13.1711C20.8545 13.1711 22.8164 15.133 22.8164 17.5531Z" fill="#1E96FC"/>
          <path d="M22.8164 17.5531C22.8164 15.133 20.8545 13.1711 18.4343 13.1711C16.0142 13.1711 14.0523 15.133 14.0523 17.5531C14.0523 19.9733 16.0142 21.9352 18.4343 21.9352C20.8545 21.9352 22.8164 19.9733 22.8164 17.5531ZM23.2058 17.5531C23.2058 20.1884 21.0696 22.3246 18.4343 22.3246C15.7991 22.3246 13.6629 20.1884 13.6629 17.5531C13.6629 14.9179 15.7991 12.7817 18.4343 12.7817C21.0696 12.7817 23.2058 14.9179 23.2058 17.5531Z" fill="white"/>
          <path d="M13.9889 15.2497C13.9889 17.1321 12.463 18.658 10.5807 18.658C8.69837 18.658 7.17244 17.1321 7.17244 15.2497C7.17244 13.3674 8.69837 11.8415 10.5807 11.8415C12.463 11.8415 13.9889 13.3674 13.9889 15.2497Z" fill="#FE7B02"/>
          <path d="M13.9889 15.2497C13.9889 13.3674 12.463 11.8415 10.5807 11.8415C8.69837 11.8415 7.17244 13.3674 7.17244 15.2497C7.17244 17.1321 8.69837 18.658 10.5807 18.658C12.463 18.658 13.9889 17.1321 13.9889 15.2497ZM14.3784 15.2497C14.3784 17.3472 12.6781 19.0474 10.5807 19.0474C8.48324 19.0474 6.78302 17.3472 6.78302 15.2497C6.78302 13.1523 8.48324 11.4521 10.5807 11.4521C12.6781 11.4521 14.3784 13.1523 14.3784 15.2497Z" fill="white"/>
        </g>
        <path d="M15.5125 6.6958C17.2744 6.6958 18.7363 7.97761 19.0174 9.65967C19.4888 9.04258 20.2307 8.64315 21.0672 8.64307C22.4923 8.64307 23.648 9.79813 23.6483 11.2231C23.6483 12.4385 22.8069 13.4543 21.6756 13.728C22.7601 14.6479 23.449 16.0197 23.449 17.5532C23.449 20.3229 21.2041 22.5678 18.4344 22.5679C17.144 22.5679 15.9676 22.0805 15.0789 21.2798C14.8998 22.5301 13.828 23.4917 12.5281 23.4917C11.1032 23.4916 9.9483 22.3366 9.94806 20.9116C9.94806 20.2967 10.1633 19.7319 10.5223 19.2886C8.31732 19.2573 6.53986 17.4619 6.53986 15.2495C6.53994 13.6399 7.48062 12.2499 8.84259 11.6001C7.97683 11.1837 7.37775 10.3009 7.37775 9.27588C7.37779 7.85073 8.53364 6.6958 9.9588 6.6958C11.1131 6.69595 12.0892 7.45406 12.4188 8.49951C13.0293 7.42244 14.186 6.69597 15.5125 6.6958ZM13.4481 18.0952C13.3413 18.2028 13.2284 18.3039 13.1102 18.3989C13.2495 18.4311 13.3847 18.4731 13.5145 18.5269C13.4865 18.385 13.4637 18.2411 13.4481 18.0952ZM14.2586 13.5757C14.3781 13.8377 14.4705 14.1144 14.532 14.4028C14.7127 14.1793 14.9128 13.9722 15.1287 13.7827C14.8256 13.7501 14.534 13.6796 14.2586 13.5757ZM18.6063 11.9985C18.4966 12.1921 18.3691 12.3737 18.2264 12.5425C18.2954 12.5397 18.3647 12.5386 18.4344 12.5386C18.5782 12.5386 18.7204 12.5453 18.8611 12.5571C18.7556 12.3829 18.6685 12.1965 18.6063 11.9985ZM12.0076 10.8384C11.8691 11.0197 11.7081 11.1818 11.5272 11.3208C11.7613 11.377 11.9876 11.4533 12.2039 11.5483C12.1151 11.3221 12.0487 11.0845 12.0076 10.8384Z" stroke="white" stroke-width="0.486893"/>
      </g>
      <defs>
        <filter id="s2-f0" x="0" y="-0.155806" width="30.1874" height="30.83" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feMorphology radius="0.155806" operator="erode" in="SourceAlpha" result="effect1_innerShadow_110_521"/>
          <feOffset dy="-0.584272"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.807843 0 0 0 0 0.831373 0 0 0 0 0.854902 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_110_521"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.73034"/>
          <feGaussianBlur stdDeviation="0.243447"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="effect1_innerShadow_110_521" result="effect2_innerShadow_110_521"/>
        </filter>
        <filter id="s2-f1" x="6.29608" y="6.45215" width="17.5953" height="18.2567" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.973787"/>
          <feGaussianBlur stdDeviation="0.73034"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_110_521"/>
        </filter>
        <linearGradient id="s2-g0" x1="15.0937" y1="0.486816" x2="15.0937" y2="29.7004" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E9ECEF"/>
          <stop offset="0.635819" stop-color="#F5F3F4"/>
        </linearGradient>
      </defs>
    </svg>
    <span class="hdr-name">pigment</span>
  </div>

  <div class="banner" style="border-bottom:1px solid #E9ECEF;">
    <div class="banner-deco-left">
      <svg width="140" height="140" viewBox="0 0 131.096 129.089" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#s2bdl)">
      <path d="M45.0708 30.7845C45.0708 37.6945 39.4692 43.2961 32.5593 43.2961C25.6493 43.2961 20.0477 37.6945 20.0477 30.7845C20.0477 23.8746 25.6493 18.2729 32.5593 18.2729C39.4692 18.2729 45.0708 23.8746 45.0708 30.7845Z" fill="#1E1E1E"/>
      <path d="M45.0708 30.7845C45.0708 23.8746 39.4692 18.2729 32.5593 18.2729C25.6493 18.2729 20.0477 23.8746 20.0477 30.7845C20.0477 37.6945 25.6493 43.2961 32.5593 43.2961C39.4692 43.2961 45.0708 37.6945 45.0708 30.7845ZM47.5725 30.7845C47.5725 39.0765 40.8512 45.7978 32.5593 45.7978C24.2673 45.7978 17.546 39.0765 17.546 30.7845C17.546 22.4926 24.2673 15.7712 32.5593 15.7712C40.8512 15.7712 47.5725 22.4926 47.5725 30.7845Z" fill="white"/>
      <path d="M116.437 43.2961C116.437 50.206 110.836 55.8077 103.926 55.8077C97.0157 55.8077 91.414 50.206 91.414 43.2961C91.414 36.3861 97.0157 30.7845 103.926 30.7845C110.836 30.7845 116.437 36.3861 116.437 43.2961Z" fill="#A06CD5"/>
      <path d="M116.437 43.2961C116.437 36.3861 110.836 30.7845 103.926 30.7845C97.0157 30.7845 91.414 36.3861 91.414 43.2961C91.414 50.206 97.0157 55.8077 103.926 55.8077C110.836 55.8077 116.437 50.206 116.437 43.2961ZM118.939 43.2961C118.939 51.588 112.218 58.3094 103.926 58.3094C95.6337 58.3094 88.9123 51.588 88.9123 43.2961C88.9123 35.0041 95.6337 28.2828 103.926 28.2828C112.218 28.2828 118.939 35.0041 118.939 43.2961Z" fill="white"/>
      <path d="M61.5797 105.531C61.5797 112.441 55.9781 118.043 49.0681 118.043C42.1582 118.043 36.5566 112.441 36.5566 105.531C36.5566 98.6214 42.1582 93.0198 49.0681 93.0198C55.9781 93.0198 61.5797 98.6214 61.5797 105.531Z" fill="#ED383F"/>
      <path d="M61.5797 105.531C61.5797 98.6214 55.9781 93.0198 49.0681 93.0198C42.1582 93.0198 36.5566 98.6214 36.5566 105.531C36.5566 112.441 42.1582 118.043 49.0681 118.043C55.9781 118.043 61.5797 112.441 61.5797 105.531ZM64.0814 105.531C64.0814 113.823 57.3601 120.545 49.0681 120.545C40.7762 120.545 34.0549 113.823 34.0549 105.531C34.0549 97.2394 40.7762 90.5181 49.0681 90.5181C57.3601 90.5181 64.0814 97.2394 64.0814 105.531Z" fill="white"/>
      <path d="M87.0099 37.0403C87.0099 47.4052 78.6075 55.8077 68.2425 55.8077C57.8776 55.8077 49.4752 47.4052 49.4752 37.0403C49.4752 26.6754 57.8776 18.2729 68.2425 18.2729C78.6075 18.2729 87.0099 26.6754 87.0099 37.0403Z" fill="#7CB518"/>
      <path d="M87.0099 37.0403C87.0099 26.6754 78.6075 18.2729 68.2425 18.2729C57.8776 18.2729 49.4752 26.6754 49.4752 37.0403C49.4752 47.4052 57.8776 55.8077 68.2425 55.8077C78.6075 55.8077 87.0099 47.4052 87.0099 37.0403ZM89.5116 37.0403C89.5116 48.7872 79.9895 58.3094 68.2425 58.3094C56.4956 58.3094 46.9735 48.7872 46.9735 37.0403C46.9735 25.2934 56.4956 15.7712 68.2425 15.7712C79.9895 15.7712 89.5116 25.2934 89.5116 37.0403Z" fill="white"/>
      <path d="M115.161 83.9587C115.161 99.5061 102.557 112.11 87.0099 112.11C71.4625 112.11 58.8589 99.5061 58.8589 83.9587C58.8589 68.4113 71.4625 55.8077 87.0099 55.8077C102.557 55.8077 115.161 68.4113 115.161 83.9587Z" fill="#1E96FC"/>
      <path d="M115.161 83.9587C115.161 68.4113 102.557 55.8077 87.0099 55.8077C71.4625 55.8077 58.8589 68.4113 58.8589 83.9587C58.8589 99.5061 71.4625 112.11 87.0099 112.11C102.557 112.11 115.161 99.5061 115.161 83.9587ZM117.663 83.9587C117.663 100.888 103.939 114.611 87.0099 114.611C70.0805 114.611 56.3571 100.888 56.3571 83.9587C56.3571 67.0293 70.0805 53.306 87.0099 53.306C103.939 53.306 117.663 67.0293 117.663 83.9587Z" fill="white"/>
      <path d="M58.4518 69.1612C58.4518 81.2536 48.649 91.0564 36.5566 91.0564C24.4642 91.0564 14.6613 81.2536 14.6613 69.1612C14.6613 57.0687 24.4642 47.2659 36.5566 47.2659C48.649 47.2659 58.4518 57.0687 58.4518 69.1612Z" fill="#FE7B02"/>
      <path d="M58.4518 69.1612C58.4518 57.0687 48.649 47.2659 36.5566 47.2659C24.4642 47.2659 14.6613 57.0687 14.6613 69.1612C14.6613 81.2536 24.4642 91.0564 36.5566 91.0564C48.649 91.0564 58.4518 81.2536 58.4518 69.1612ZM60.9535 69.1612C60.9535 82.6356 50.031 93.5581 36.5566 93.5581C23.0822 93.5581 12.1596 82.6356 12.1596 69.1612C12.1596 55.6868 23.0822 44.7642 36.5566 44.7642C50.031 44.7642 60.9535 55.6868 60.9535 69.1612Z" fill="white"/>
      <path d="M14.4181 30.784C14.4184 20.7648 22.5422 12.6407 32.5614 12.6407C39.5781 12.6415 45.6489 16.6359 48.6658 22.4652C53.113 16.5016 60.2283 12.6417 68.2395 12.6407C79.2676 12.6407 88.5823 19.9621 91.6025 30.0061C94.8389 27.0037 99.161 25.157 103.924 25.1566C113.942 25.1566 122.066 33.2753 122.067 43.2936C122.067 50.8501 117.444 57.3227 110.875 60.0504C117.001 66.1652 120.794 74.6198 120.794 83.9592C120.793 102.616 105.667 117.736 87.0102 117.736C79.2671 117.736 72.1364 115.129 66.439 110.748C64.1975 118.223 57.2726 123.671 49.0673 123.671C39.0492 123.671 30.9255 115.552 30.924 105.534C30.924 102.242 31.8123 99.1558 33.3456 96.4939C19.657 94.9032 9.02907 83.2752 9.02907 69.1597C9.02957 59.2167 14.3023 50.5019 22.2037 45.665C17.5021 42.3871 14.4181 36.9503 14.4181 30.784ZM56.3571 83.9587C56.3572 87.2378 56.8783 90.395 57.8316 93.3571C55.3641 91.5778 52.3428 90.5181 49.0681 90.5181C48.8049 90.5181 48.5431 90.5394 48.2831 90.5528C51.4869 88.7929 54.2473 86.3341 56.3698 83.382C56.3663 83.5739 56.3571 83.766 56.3571 83.9587ZM55.9997 54.423C59.4617 56.8658 63.6832 58.3087 68.2425 58.3094C68.9679 58.3094 69.6846 58.2706 70.3914 58.1997C66.5621 60.6753 63.3182 63.9793 60.9182 67.8611C60.6538 62.8256 58.8633 58.1951 55.9997 54.423ZM89.0115 41.606C88.9494 42.1602 88.9124 42.7254 88.9123 43.2961C88.9123 47.4697 90.6165 51.244 93.3653 53.965C91.812 53.6375 90.2152 53.4265 88.5849 53.3439L87.0099 53.306C85.0457 53.306 83.125 53.4928 81.2635 53.8458C85.1283 50.8471 87.9293 46.5518 89.0115 41.606ZM47.1664 34.1906C47.0416 35.1224 46.9735 36.0743 46.9735 37.0403C46.9735 41.7003 48.477 46.0066 51.0184 49.5108C47.3086 46.7759 42.7966 45.065 37.9003 44.7993C42.517 43.039 46.0309 39.0801 47.1664 34.1906ZM17.6239 32.321C18.3146 39.1155 23.5384 44.5497 30.2214 45.596C19.8191 48.3854 12.1602 57.8787 12.1596 69.1612C12.1596 82.6356 23.0822 93.5581 36.5566 93.5581C37.8832 93.5581 39.1845 93.4417 40.4536 93.2379C36.5852 95.9536 34.0549 100.446 34.0549 105.531L34.1298 107.065C34.8465 114.131 40.465 119.747 47.5303 120.465L49.0681 120.545C57.3601 120.545 64.0814 113.823 64.0814 105.531C64.0814 105.088 64.0487 104.65 64.0111 104.217C69.3043 110.222 76.9084 114.143 85.4355 114.574L87.0099 114.611C103.411 114.611 116.806 101.731 117.625 85.5339L117.663 83.9587C117.663 73.2169 112.137 63.7675 103.773 58.2938C103.823 58.2943 103.875 58.3094 103.926 58.3094C112.218 58.3094 118.939 51.588 118.939 43.2961C118.939 35.0041 112.218 28.2828 103.926 28.2828C96.8101 28.2836 90.8593 33.2361 89.3126 39.8808C89.4367 38.9511 89.5116 38.0039 89.5116 37.0403C89.5116 25.2934 79.9895 15.7712 68.2425 15.7712C58.0655 15.7727 49.558 22.9217 47.4675 32.4716C47.5296 31.9174 47.5725 31.3553 47.5725 30.7845C47.5723 23.0102 41.6639 16.6142 34.0922 15.8465L32.5593 15.7712C24.2673 15.7712 17.546 22.4926 17.546 30.7845L17.6239 32.321Z" fill="white"/>
      </g>
      <defs>
      <filter id="s2bdl" x="0" y="-2.38419e-07" width="131.096" height="129.089" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="-3.61163"/>
      <feGaussianBlur stdDeviation="4.51453"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="0.973787"/>
      <feGaussianBlur stdDeviation="0.73034"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
      <feBlend mode="normal" in2="shape" result="effect2_innerShadow"/>
      </filter>
      </defs>
      </svg>
    </div>
    <div class="banner-deco-right">
      <svg width="140" height="140" viewBox="0 0 131.096 129.089" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#s2bdr)">
      <path d="M45.0708 30.7845C45.0708 37.6945 39.4692 43.2961 32.5593 43.2961C25.6493 43.2961 20.0477 37.6945 20.0477 30.7845C20.0477 23.8746 25.6493 18.2729 32.5593 18.2729C39.4692 18.2729 45.0708 23.8746 45.0708 30.7845Z" fill="#1E1E1E"/>
      <path d="M45.0708 30.7845C45.0708 23.8746 39.4692 18.2729 32.5593 18.2729C25.6493 18.2729 20.0477 23.8746 20.0477 30.7845C20.0477 37.6945 25.6493 43.2961 32.5593 43.2961C39.4692 43.2961 45.0708 37.6945 45.0708 30.7845ZM47.5725 30.7845C47.5725 39.0765 40.8512 45.7978 32.5593 45.7978C24.2673 45.7978 17.546 39.0765 17.546 30.7845C17.546 22.4926 24.2673 15.7712 32.5593 15.7712C40.8512 15.7712 47.5725 22.4926 47.5725 30.7845Z" fill="white"/>
      <path d="M116.437 43.2961C116.437 50.206 110.836 55.8077 103.926 55.8077C97.0157 55.8077 91.414 50.206 91.414 43.2961C91.414 36.3861 97.0157 30.7845 103.926 30.7845C110.836 30.7845 116.437 36.3861 116.437 43.2961Z" fill="#A06CD5"/>
      <path d="M116.437 43.2961C116.437 36.3861 110.836 30.7845 103.926 30.7845C97.0157 30.7845 91.414 36.3861 91.414 43.2961C91.414 50.206 97.0157 55.8077 103.926 55.8077C110.836 55.8077 116.437 50.206 116.437 43.2961ZM118.939 43.2961C118.939 51.588 112.218 58.3094 103.926 58.3094C95.6337 58.3094 88.9123 51.588 88.9123 43.2961C88.9123 35.0041 95.6337 28.2828 103.926 28.2828C112.218 28.2828 118.939 35.0041 118.939 43.2961Z" fill="white"/>
      <path d="M61.5797 105.531C61.5797 112.441 55.9781 118.043 49.0681 118.043C42.1582 118.043 36.5566 112.441 36.5566 105.531C36.5566 98.6214 42.1582 93.0198 49.0681 93.0198C55.9781 93.0198 61.5797 98.6214 61.5797 105.531Z" fill="#ED383F"/>
      <path d="M61.5797 105.531C61.5797 98.6214 55.9781 93.0198 49.0681 93.0198C42.1582 93.0198 36.5566 98.6214 36.5566 105.531C36.5566 112.441 42.1582 118.043 49.0681 118.043C55.9781 118.043 61.5797 112.441 61.5797 105.531ZM64.0814 105.531C64.0814 113.823 57.3601 120.545 49.0681 120.545C40.7762 120.545 34.0549 113.823 34.0549 105.531C34.0549 97.2394 40.7762 90.5181 49.0681 90.5181C57.3601 90.5181 64.0814 97.2394 64.0814 105.531Z" fill="white"/>
      <path d="M87.0099 37.0403C87.0099 47.4052 78.6075 55.8077 68.2425 55.8077C57.8776 55.8077 49.4752 47.4052 49.4752 37.0403C49.4752 26.6754 57.8776 18.2729 68.2425 18.2729C78.6075 18.2729 87.0099 26.6754 87.0099 37.0403Z" fill="#7CB518"/>
      <path d="M87.0099 37.0403C87.0099 26.6754 78.6075 18.2729 68.2425 18.2729C57.8776 18.2729 49.4752 26.6754 49.4752 37.0403C49.4752 47.4052 57.8776 55.8077 68.2425 55.8077C78.6075 55.8077 87.0099 47.4052 87.0099 37.0403ZM89.5116 37.0403C89.5116 48.7872 79.9895 58.3094 68.2425 58.3094C56.4956 58.3094 46.9735 48.7872 46.9735 37.0403C46.9735 25.2934 56.4956 15.7712 68.2425 15.7712C79.9895 15.7712 89.5116 25.2934 89.5116 37.0403Z" fill="white"/>
      <path d="M115.161 83.9587C115.161 99.5061 102.557 112.11 87.0099 112.11C71.4625 112.11 58.8589 99.5061 58.8589 83.9587C58.8589 68.4113 71.4625 55.8077 87.0099 55.8077C102.557 55.8077 115.161 68.4113 115.161 83.9587Z" fill="#1E96FC"/>
      <path d="M115.161 83.9587C115.161 68.4113 102.557 55.8077 87.0099 55.8077C71.4625 55.8077 58.8589 68.4113 58.8589 83.9587C58.8589 99.5061 71.4625 112.11 87.0099 112.11C102.557 112.11 115.161 99.5061 115.161 83.9587ZM117.663 83.9587C117.663 100.888 103.939 114.611 87.0099 114.611C70.0805 114.611 56.3571 100.888 56.3571 83.9587C56.3571 67.0293 70.0805 53.306 87.0099 53.306C103.939 53.306 117.663 67.0293 117.663 83.9587Z" fill="white"/>
      <path d="M58.4518 69.1612C58.4518 81.2536 48.649 91.0564 36.5566 91.0564C24.4642 91.0564 14.6613 81.2536 14.6613 69.1612C14.6613 57.0687 24.4642 47.2659 36.5566 47.2659C48.649 47.2659 58.4518 57.0687 58.4518 69.1612Z" fill="#FE7B02"/>
      <path d="M58.4518 69.1612C58.4518 57.0687 48.649 47.2659 36.5566 47.2659C24.4642 47.2659 14.6613 57.0687 14.6613 69.1612C14.6613 81.2536 24.4642 91.0564 36.5566 91.0564C48.649 91.0564 58.4518 81.2536 58.4518 69.1612ZM60.9535 69.1612C60.9535 82.6356 50.031 93.5581 36.5566 93.5581C23.0822 93.5581 12.1596 82.6356 12.1596 69.1612C12.1596 55.6868 23.0822 44.7642 36.5566 44.7642C50.031 44.7642 60.9535 55.6868 60.9535 69.1612Z" fill="white"/>
      <path d="M14.4181 30.784C14.4184 20.7648 22.5422 12.6407 32.5614 12.6407C39.5781 12.6415 45.6489 16.6359 48.6658 22.4652C53.113 16.5016 60.2283 12.6417 68.2395 12.6407C79.2676 12.6407 88.5823 19.9621 91.6025 30.0061C94.8389 27.0037 99.161 25.157 103.924 25.1566C113.942 25.1566 122.066 33.2753 122.067 43.2936C122.067 50.8501 117.444 57.3227 110.875 60.0504C117.001 66.1652 120.794 74.6198 120.794 83.9592C120.793 102.616 105.667 117.736 87.0102 117.736C79.2671 117.736 72.1364 115.129 66.439 110.748C64.1975 118.223 57.2726 123.671 49.0673 123.671C39.0492 123.671 30.9255 115.552 30.924 105.534C30.924 102.242 31.8123 99.1558 33.3456 96.4939C19.657 94.9032 9.02907 83.2752 9.02907 69.1597C9.02957 59.2167 14.3023 50.5019 22.2037 45.665C17.5021 42.3871 14.4181 36.9503 14.4181 30.784ZM56.3571 83.9587C56.3572 87.2378 56.8783 90.395 57.8316 93.3571C55.3641 91.5778 52.3428 90.5181 49.0681 90.5181C48.8049 90.5181 48.5431 90.5394 48.2831 90.5528C51.4869 88.7929 54.2473 86.3341 56.3698 83.382C56.3663 83.5739 56.3571 83.766 56.3571 83.9587ZM55.9997 54.423C59.4617 56.8658 63.6832 58.3087 68.2425 58.3094C68.9679 58.3094 69.6846 58.2706 70.3914 58.1997C66.5621 60.6753 63.3182 63.9793 60.9182 67.8611C60.6538 62.8256 58.8633 58.1951 55.9997 54.423ZM89.0115 41.606C88.9494 42.1602 88.9124 42.7254 88.9123 43.2961C88.9123 47.4697 90.6165 51.244 93.3653 53.965C91.812 53.6375 90.2152 53.4265 88.5849 53.3439L87.0099 53.306C85.0457 53.306 83.125 53.4928 81.2635 53.8458C85.1283 50.8471 87.9293 46.5518 89.0115 41.606ZM47.1664 34.1906C47.0416 35.1224 46.9735 36.0743 46.9735 37.0403C46.9735 41.7003 48.477 46.0066 51.0184 49.5108C47.3086 46.7759 42.7966 45.065 37.9003 44.7993C42.517 43.039 46.0309 39.0801 47.1664 34.1906ZM17.6239 32.321C18.3146 39.1155 23.5384 44.5497 30.2214 45.596C19.8191 48.3854 12.1602 57.8787 12.1596 69.1612C12.1596 82.6356 23.0822 93.5581 36.5566 93.5581C37.8832 93.5581 39.1845 93.4417 40.4536 93.2379C36.5852 95.9536 34.0549 100.446 34.0549 105.531L34.1298 107.065C34.8465 114.131 40.465 119.747 47.5303 120.465L49.0681 120.545C57.3601 120.545 64.0814 113.823 64.0814 105.531C64.0814 105.088 64.0487 104.65 64.0111 104.217C69.3043 110.222 76.9084 114.143 85.4355 114.574L87.0099 114.611C103.411 114.611 116.806 101.731 117.625 85.5339L117.663 83.9587C117.663 73.2169 112.137 63.7675 103.773 58.2938C103.823 58.2943 103.875 58.3094 103.926 58.3094C112.218 58.3094 118.939 51.588 118.939 43.2961C118.939 35.0041 112.218 28.2828 103.926 28.2828C96.8101 28.2836 90.8593 33.2361 89.3126 39.8808C89.4367 38.9511 89.5116 38.0039 89.5116 37.0403C89.5116 25.2934 79.9895 15.7712 68.2425 15.7712C58.0655 15.7727 49.558 22.9217 47.4675 32.4716C47.5296 31.9174 47.5725 31.3553 47.5725 30.7845C47.5723 23.0102 41.6639 16.6142 34.0922 15.8465L32.5593 15.7712C24.2673 15.7712 17.546 22.4926 17.546 30.7845L17.6239 32.321Z" fill="white"/>
      </g>
      <defs>
      <filter id="s2bdr" x="0" y="-2.38419e-07" width="131.096" height="129.089" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="-3.61163"/>
      <feGaussianBlur stdDeviation="4.51453"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="0.973787"/>
      <feGaussianBlur stdDeviation="0.73034"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
      <feBlend mode="normal" in2="shape" result="effect2_innerShadow"/>
      </filter>
      </defs>
      </svg>
    </div>
    <div class="stats-row">
      <div class="stat-card">
        <div id="statPrim" class="stat-num">0</div>
        <div class="stat-label">Primitives</div>
      </div>
      <div class="stat-card">
        <div id="statSem" class="stat-num">0</div>
        <div class="stat-label">Semantics</div>
      </div>
      <div class="stat-card">
        <div id="statAlpha" class="stat-num">0</div>
        <div class="stat-label">Alpha Stops</div>
      </div>
    </div>
  </div>

  <div class="tab-row-wrap">
    <div class="tab-row">
      <div id="tabSlider" class="tab-slider"></div>
      <button id="tabPrim" class="tab">Primitives</button>
      <button id="tabSem"  class="tab">Semantics</button>
    </div>
    <div id="tabHint" class="tab-hint">Add alpha stops to get opacity variants</div>
  </div>

  <div id="tokenList" class="token-list"></div>

  <div class="bottom-bar">
    <button id="btnBack"     class="btn-load">&larr; Back</button>
    <button id="btnGenerate" class="btn-primary">Generate Pigments &rarr;</button>
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
    <div class="loading-logo">
      <svg viewBox="0 0 131.096 129.089" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#s3lg-f0)">
      <path d="M45.0708 30.7845C45.0708 37.6945 39.4692 43.2961 32.5593 43.2961C25.6493 43.2961 20.0477 37.6945 20.0477 30.7845C20.0477 23.8746 25.6493 18.2729 32.5593 18.2729C39.4692 18.2729 45.0708 23.8746 45.0708 30.7845Z" fill="#1E1E1E"/>
      <path d="M45.0708 30.7845C45.0708 23.8746 39.4692 18.2729 32.5593 18.2729C25.6493 18.2729 20.0477 23.8746 20.0477 30.7845C20.0477 37.6945 25.6493 43.2961 32.5593 43.2961C39.4692 43.2961 45.0708 37.6945 45.0708 30.7845ZM47.5725 30.7845C47.5725 39.0765 40.8512 45.7978 32.5593 45.7978C24.2673 45.7978 17.546 39.0765 17.546 30.7845C17.546 22.4926 24.2673 15.7712 32.5593 15.7712C40.8512 15.7712 47.5725 22.4926 47.5725 30.7845Z" fill="white"/>
      <path d="M116.437 43.2961C116.437 50.206 110.836 55.8077 103.926 55.8077C97.0157 55.8077 91.414 50.206 91.414 43.2961C91.414 36.3861 97.0157 30.7845 103.926 30.7845C110.836 30.7845 116.437 36.3861 116.437 43.2961Z" fill="#A06CD5"/>
      <path d="M116.437 43.2961C116.437 36.3861 110.836 30.7845 103.926 30.7845C97.0157 30.7845 91.414 36.3861 91.414 43.2961C91.414 50.206 97.0157 55.8077 103.926 55.8077C110.836 55.8077 116.437 50.206 116.437 43.2961ZM118.939 43.2961C118.939 51.588 112.218 58.3094 103.926 58.3094C95.6337 58.3094 88.9123 51.588 88.9123 43.2961C88.9123 35.0041 95.6337 28.2828 103.926 28.2828C112.218 28.2828 118.939 35.0041 118.939 43.2961Z" fill="white"/>
      <path d="M61.5797 105.531C61.5797 112.441 55.9781 118.043 49.0681 118.043C42.1582 118.043 36.5566 112.441 36.5566 105.531C36.5566 98.6214 42.1582 93.0198 49.0681 93.0198C55.9781 93.0198 61.5797 98.6214 61.5797 105.531Z" fill="#ED383F"/>
      <path d="M61.5797 105.531C61.5797 98.6214 55.9781 93.0198 49.0681 93.0198C42.1582 93.0198 36.5566 98.6214 36.5566 105.531C36.5566 112.441 42.1582 118.043 49.0681 118.043C55.9781 118.043 61.5797 112.441 61.5797 105.531ZM64.0814 105.531C64.0814 113.823 57.3601 120.545 49.0681 120.545C40.7762 120.545 34.0549 113.823 34.0549 105.531C34.0549 97.2394 40.7762 90.5181 49.0681 90.5181C57.3601 90.5181 64.0814 97.2394 64.0814 105.531Z" fill="white"/>
      <path d="M87.0099 37.0403C87.0099 47.4052 78.6075 55.8077 68.2425 55.8077C57.8776 55.8077 49.4752 47.4052 49.4752 37.0403C49.4752 26.6754 57.8776 18.2729 68.2425 18.2729C78.6075 18.2729 87.0099 26.6754 87.0099 37.0403Z" fill="#7CB518"/>
      <path d="M87.0099 37.0403C87.0099 26.6754 78.6075 18.2729 68.2425 18.2729C57.8776 18.2729 49.4752 26.6754 49.4752 37.0403C49.4752 47.4052 57.8776 55.8077 68.2425 55.8077C78.6075 55.8077 87.0099 47.4052 87.0099 37.0403ZM89.5116 37.0403C89.5116 48.7872 79.9895 58.3094 68.2425 58.3094C56.4956 58.3094 46.9735 48.7872 46.9735 37.0403C46.9735 25.2934 56.4956 15.7712 68.2425 15.7712C79.9895 15.7712 89.5116 25.2934 89.5116 37.0403Z" fill="white"/>
      <path d="M115.161 83.9587C115.161 99.5061 102.557 112.11 87.0099 112.11C71.4625 112.11 58.8589 99.5061 58.8589 83.9587C58.8589 68.4113 71.4625 55.8077 87.0099 55.8077C102.557 55.8077 115.161 68.4113 115.161 83.9587Z" fill="#1E96FC"/>
      <path d="M115.161 83.9587C115.161 68.4113 102.557 55.8077 87.0099 55.8077C71.4625 55.8077 58.8589 68.4113 58.8589 83.9587C58.8589 99.5061 71.4625 112.11 87.0099 112.11C102.557 112.11 115.161 99.5061 115.161 83.9587ZM117.663 83.9587C117.663 100.888 103.939 114.611 87.0099 114.611C70.0805 114.611 56.3571 100.888 56.3571 83.9587C56.3571 67.0293 70.0805 53.306 87.0099 53.306C103.939 53.306 117.663 67.0293 117.663 83.9587Z" fill="white"/>
      <path d="M58.4518 69.1612C58.4518 81.2536 48.649 91.0564 36.5566 91.0564C24.4642 91.0564 14.6613 81.2536 14.6613 69.1612C14.6613 57.0687 24.4642 47.2659 36.5566 47.2659C48.649 47.2659 58.4518 57.0687 58.4518 69.1612Z" fill="#FE7B02"/>
      <path d="M58.4518 69.1612C58.4518 57.0687 48.649 47.2659 36.5566 47.2659C24.4642 47.2659 14.6613 57.0687 14.6613 69.1612C14.6613 81.2536 24.4642 91.0564 36.5566 91.0564C48.649 91.0564 58.4518 81.2536 58.4518 69.1612ZM60.9535 69.1612C60.9535 82.6356 50.031 93.5581 36.5566 93.5581C23.0822 93.5581 12.1596 82.6356 12.1596 69.1612C12.1596 55.6868 23.0822 44.7642 36.5566 44.7642C50.031 44.7642 60.9535 55.6868 60.9535 69.1612Z" fill="white"/>
      <path d="M14.4181 30.784C14.4184 20.7648 22.5422 12.6407 32.5614 12.6407C39.5781 12.6415 45.6489 16.6359 48.6658 22.4652C53.113 16.5016 60.2283 12.6417 68.2395 12.6407C79.2676 12.6407 88.5823 19.9621 91.6025 30.0061C94.8389 27.0037 99.161 25.157 103.924 25.1566C113.942 25.1566 122.066 33.2753 122.067 43.2936C122.067 50.8501 117.444 57.3227 110.875 60.0504C117.001 66.1652 120.794 74.6198 120.794 83.9592C120.793 102.616 105.667 117.736 87.0102 117.736C79.2671 117.736 72.1364 115.129 66.439 110.748C64.1975 118.223 57.2726 123.671 49.0673 123.671C39.0492 123.671 30.9255 115.552 30.924 105.534C30.924 102.242 31.8123 99.1558 33.3456 96.4939C19.657 94.9032 9.02907 83.2752 9.02907 69.1597C9.02957 59.2167 14.3023 50.5019 22.2037 45.665C17.5021 42.3871 14.4181 36.9503 14.4181 30.784ZM56.3571 83.9587C56.3572 87.2378 56.8783 90.395 57.8316 93.3571C55.3641 91.5778 52.3428 90.5181 49.0681 90.5181C48.8049 90.5181 48.5431 90.5394 48.2831 90.5528C51.4869 88.7929 54.2473 86.3341 56.3698 83.382C56.3663 83.5739 56.3571 83.766 56.3571 83.9587ZM55.9997 54.423C59.4617 56.8658 63.6832 58.3087 68.2425 58.3094C68.9679 58.3094 69.6846 58.2706 70.3914 58.1997C66.5621 60.6753 63.3182 63.9793 60.9182 67.8611C60.6538 62.8256 58.8633 58.1951 55.9997 54.423ZM89.0115 41.606C88.9494 42.1602 88.9124 42.7254 88.9123 43.2961C88.9123 47.4697 90.6165 51.244 93.3653 53.965C91.812 53.6375 90.2152 53.4265 88.5849 53.3439L87.0099 53.306C85.0457 53.306 83.125 53.4928 81.2635 53.8458C85.1283 50.8471 87.9293 46.5518 89.0115 41.606ZM47.1664 34.1906C47.0416 35.1224 46.9735 36.0743 46.9735 37.0403C46.9735 41.7003 48.477 46.0066 51.0184 49.5108C47.3086 46.7759 42.7966 45.065 37.9003 44.7993C42.517 43.039 46.0309 39.0801 47.1664 34.1906ZM17.6239 32.321C18.3146 39.1155 23.5384 44.5497 30.2214 45.596C19.8191 48.3854 12.1602 57.8787 12.1596 69.1612C12.1596 82.6356 23.0822 93.5581 36.5566 93.5581C37.8832 93.5581 39.1845 93.4417 40.4536 93.2379C36.5852 95.9536 34.0549 100.446 34.0549 105.531L34.1298 107.065C34.8465 114.131 40.465 119.747 47.5303 120.465L49.0681 120.545C57.3601 120.545 64.0814 113.823 64.0814 105.531C64.0814 105.088 64.0487 104.65 64.0111 104.217C69.3043 110.222 76.9084 114.143 85.4355 114.574L87.0099 114.611C103.411 114.611 116.806 101.731 117.625 85.5339L117.663 83.9587C117.663 73.2169 112.137 63.7675 103.773 58.2938C103.823 58.2943 103.875 58.3094 103.926 58.3094C112.218 58.3094 118.939 51.588 118.939 43.2961C118.939 35.0041 112.218 28.2828 103.926 28.2828C96.8101 28.2836 90.8593 33.2361 89.3126 39.8808C89.4367 38.9511 89.5116 38.0039 89.5116 37.0403C89.5116 25.2934 79.9895 15.7712 68.2425 15.7712C58.0655 15.7727 49.558 22.9217 47.4675 32.4716C47.5296 31.9174 47.5725 31.3553 47.5725 30.7845C47.5723 23.0102 41.6639 16.6142 34.0922 15.8465L32.5593 15.7712C24.2673 15.7712 17.546 22.4926 17.546 30.7845L17.6239 32.321Z" fill="white"/>
      </g>
      <defs>
      <filter id="s3lg-f0" x="0" y="-2.38419e-07" width="131.096" height="129.089" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="-3.61163"/>
      <feGaussianBlur stdDeviation="4.51453"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_s3"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_s3" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="0.973787"/>
      <feGaussianBlur stdDeviation="0.73034"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
      <feBlend mode="normal" in2="shape" result="effect2_innerShadow_s3"/>
      </filter>
      </defs>
      </svg>
    </div>
    <div class="loading-label">Organising Colour pigments&hellip;</div>
    <div class="progress-track"><div id="progressFill" class="progress-fill"></div></div>
  </div>
</div>

<!-- ── Screen 4: Success ─────────────────────────────── -->
<div id="s4" class="screen">
  <div class="hdr">
    <svg class="hdr-logo" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#s4h-f0)">
        <rect x="0.486816" y="0.486816" width="29.2136" height="29.2136" rx="6.81651" fill="url(#s4h-g0)"/>
        <rect x="0.24337" y="0.24337" width="29.7005" height="29.7005" rx="7.05995" stroke="#DEE2E6" stroke-width="0.486893"/>
        <g filter="url(#s4h-f1)">
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
        <path d="M15.5125 6.6958C17.2744 6.6958 18.7362 7.97761 19.0173 9.65967C19.4888 9.04258 20.2306 8.64315 21.0671 8.64307C22.4922 8.64307 23.648 9.79813 23.6482 11.2231C23.6482 12.4385 22.8068 13.4543 21.6755 13.728C22.76 14.6479 23.449 16.0197 23.449 17.5532C23.4489 20.3229 21.204 22.5678 18.4343 22.5679C17.1439 22.5679 15.9675 22.0805 15.0789 21.2798C14.8998 22.5301 13.8279 23.4917 12.5281 23.4917C11.1031 23.4916 9.94824 22.3366 9.948 20.9116C9.948 20.2967 10.1632 19.7319 10.5222 19.2886C8.31726 19.2573 6.53979 17.4619 6.53979 15.2495C6.53988 13.6399 7.48055 12.2499 8.84253 11.6001C7.97677 11.1837 7.37769 10.3009 7.37769 9.27588C7.37773 7.85073 8.53358 6.6958 9.95874 6.6958C11.1131 6.69595 12.0891 7.45406 12.4187 8.49951C13.0292 7.42244 14.186 6.69597 15.5125 6.6958ZM13.448 18.0952C13.3413 18.2028 13.2283 18.3039 13.1101 18.3989C13.2495 18.4311 13.3847 18.4731 13.5144 18.5269C13.4865 18.385 13.4637 18.2411 13.448 18.0952ZM14.2585 13.5757C14.378 13.8377 14.4705 14.1144 14.532 14.4028C14.7127 14.1793 14.9127 13.9722 15.1287 13.7827C14.8255 13.7501 14.534 13.6796 14.2585 13.5757ZM18.6062 11.9985C18.4966 12.1921 18.369 12.3737 18.2263 12.5425C18.2953 12.5397 18.3647 12.5386 18.4343 12.5386C18.5781 12.5386 18.7204 12.5453 18.8611 12.5571C18.7556 12.3829 18.6685 12.1965 18.6062 11.9985ZM12.0076 10.8384C11.8691 11.0197 11.708 11.1818 11.5271 11.3208C11.7613 11.377 11.9875 11.4533 12.2039 11.5483C12.115 11.3221 12.0486 11.0845 12.0076 10.8384Z" stroke="white" stroke-width="0.486893"/>
      </g>
      <defs>
        <filter id="s4h-f0" x="0" y="-0.155806" width="30.1873" height="30.83" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feMorphology radius="0.155806" operator="erode" in="SourceAlpha" result="s4h-e1"/>
          <feOffset dy="-0.584272"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.807843 0 0 0 0 0.831373 0 0 0 0 0.854902 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="s4h-e1"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.73034"/>
          <feGaussianBlur stdDeviation="0.243447"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="s4h-e1" result="s4h-e2"/>
        </filter>
        <filter id="s4h-f1" x="6.29614" y="6.45215" width="17.5952" height="18.2567" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.973787"/>
          <feGaussianBlur stdDeviation="0.73034"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
          <feBlend mode="normal" in2="shape" result="s4h-e3"/>
        </filter>
        <linearGradient id="s4h-g0" x1="15.0936" y1="0.486816" x2="15.0936" y2="29.7004" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E9ECEF"/>
          <stop offset="0.635819" stop-color="#F5F3F4"/>
        </linearGradient>
      </defs>
    </svg>
    <span class="hdr-name">pigment</span>
  </div>
  <div class="success-body">
    <div class="loading-logo">
      <svg viewBox="0 0 131.096 129.089" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#s4lg-f0)">
      <path d="M45.0708 30.7845C45.0708 37.6945 39.4692 43.2961 32.5593 43.2961C25.6493 43.2961 20.0477 37.6945 20.0477 30.7845C20.0477 23.8746 25.6493 18.2729 32.5593 18.2729C39.4692 18.2729 45.0708 23.8746 45.0708 30.7845Z" fill="#1E1E1E"/>
      <path d="M45.0708 30.7845C45.0708 23.8746 39.4692 18.2729 32.5593 18.2729C25.6493 18.2729 20.0477 23.8746 20.0477 30.7845C20.0477 37.6945 25.6493 43.2961 32.5593 43.2961C39.4692 43.2961 45.0708 37.6945 45.0708 30.7845ZM47.5725 30.7845C47.5725 39.0765 40.8512 45.7978 32.5593 45.7978C24.2673 45.7978 17.546 39.0765 17.546 30.7845C17.546 22.4926 24.2673 15.7712 32.5593 15.7712C40.8512 15.7712 47.5725 22.4926 47.5725 30.7845Z" fill="white"/>
      <path d="M116.437 43.2961C116.437 50.206 110.836 55.8077 103.926 55.8077C97.0157 55.8077 91.414 50.206 91.414 43.2961C91.414 36.3861 97.0157 30.7845 103.926 30.7845C110.836 30.7845 116.437 36.3861 116.437 43.2961Z" fill="#A06CD5"/>
      <path d="M116.437 43.2961C116.437 36.3861 110.836 30.7845 103.926 30.7845C97.0157 30.7845 91.414 36.3861 91.414 43.2961C91.414 50.206 97.0157 55.8077 103.926 55.8077C110.836 55.8077 116.437 50.206 116.437 43.2961ZM118.939 43.2961C118.939 51.588 112.218 58.3094 103.926 58.3094C95.6337 58.3094 88.9123 51.588 88.9123 43.2961C88.9123 35.0041 95.6337 28.2828 103.926 28.2828C112.218 28.2828 118.939 35.0041 118.939 43.2961Z" fill="white"/>
      <path d="M61.5797 105.531C61.5797 112.441 55.9781 118.043 49.0681 118.043C42.1582 118.043 36.5566 112.441 36.5566 105.531C36.5566 98.6214 42.1582 93.0198 49.0681 93.0198C55.9781 93.0198 61.5797 98.6214 61.5797 105.531Z" fill="#ED383F"/>
      <path d="M61.5797 105.531C61.5797 98.6214 55.9781 93.0198 49.0681 93.0198C42.1582 93.0198 36.5566 98.6214 36.5566 105.531C36.5566 112.441 42.1582 118.043 49.0681 118.043C55.9781 118.043 61.5797 112.441 61.5797 105.531ZM64.0814 105.531C64.0814 113.823 57.3601 120.545 49.0681 120.545C40.7762 120.545 34.0549 113.823 34.0549 105.531C34.0549 97.2394 40.7762 90.5181 49.0681 90.5181C57.3601 90.5181 64.0814 97.2394 64.0814 105.531Z" fill="white"/>
      <path d="M87.0099 37.0403C87.0099 47.4052 78.6075 55.8077 68.2425 55.8077C57.8776 55.8077 49.4752 47.4052 49.4752 37.0403C49.4752 26.6754 57.8776 18.2729 68.2425 18.2729C78.6075 18.2729 87.0099 26.6754 87.0099 37.0403Z" fill="#7CB518"/>
      <path d="M87.0099 37.0403C87.0099 26.6754 78.6075 18.2729 68.2425 18.2729C57.8776 18.2729 49.4752 26.6754 49.4752 37.0403C49.4752 47.4052 57.8776 55.8077 68.2425 55.8077C78.6075 55.8077 87.0099 47.4052 87.0099 37.0403ZM89.5116 37.0403C89.5116 48.7872 79.9895 58.3094 68.2425 58.3094C56.4956 58.3094 46.9735 48.7872 46.9735 37.0403C46.9735 25.2934 56.4956 15.7712 68.2425 15.7712C79.9895 15.7712 89.5116 25.2934 89.5116 37.0403Z" fill="white"/>
      <path d="M115.161 83.9587C115.161 99.5061 102.557 112.11 87.0099 112.11C71.4625 112.11 58.8589 99.5061 58.8589 83.9587C58.8589 68.4113 71.4625 55.8077 87.0099 55.8077C102.557 55.8077 115.161 68.4113 115.161 83.9587Z" fill="#1E96FC"/>
      <path d="M115.161 83.9587C115.161 68.4113 102.557 55.8077 87.0099 55.8077C71.4625 55.8077 58.8589 68.4113 58.8589 83.9587C58.8589 99.5061 71.4625 112.11 87.0099 112.11C102.557 112.11 115.161 99.5061 115.161 83.9587ZM117.663 83.9587C117.663 100.888 103.939 114.611 87.0099 114.611C70.0805 114.611 56.3571 100.888 56.3571 83.9587C56.3571 67.0293 70.0805 53.306 87.0099 53.306C103.939 53.306 117.663 67.0293 117.663 83.9587Z" fill="white"/>
      <path d="M58.4518 69.1612C58.4518 81.2536 48.649 91.0564 36.5566 91.0564C24.4642 91.0564 14.6613 81.2536 14.6613 69.1612C14.6613 57.0687 24.4642 47.2659 36.5566 47.2659C48.649 47.2659 58.4518 57.0687 58.4518 69.1612Z" fill="#FE7B02"/>
      <path d="M58.4518 69.1612C58.4518 57.0687 48.649 47.2659 36.5566 47.2659C24.4642 47.2659 14.6613 57.0687 14.6613 69.1612C14.6613 81.2536 24.4642 91.0564 36.5566 91.0564C48.649 91.0564 58.4518 81.2536 58.4518 69.1612ZM60.9535 69.1612C60.9535 82.6356 50.031 93.5581 36.5566 93.5581C23.0822 93.5581 12.1596 82.6356 12.1596 69.1612C12.1596 55.6868 23.0822 44.7642 36.5566 44.7642C50.031 44.7642 60.9535 55.6868 60.9535 69.1612Z" fill="white"/>
      <path d="M14.4181 30.784C14.4184 20.7648 22.5422 12.6407 32.5614 12.6407C39.5781 12.6415 45.6489 16.6359 48.6658 22.4652C53.113 16.5016 60.2283 12.6417 68.2395 12.6407C79.2676 12.6407 88.5823 19.9621 91.6025 30.0061C94.8389 27.0037 99.161 25.157 103.924 25.1566C113.942 25.1566 122.066 33.2753 122.067 43.2936C122.067 50.8501 117.444 57.3227 110.875 60.0504C117.001 66.1652 120.794 74.6198 120.794 83.9592C120.793 102.616 105.667 117.736 87.0102 117.736C79.2671 117.736 72.1364 115.129 66.439 110.748C64.1975 118.223 57.2726 123.671 49.0673 123.671C39.0492 123.671 30.9255 115.552 30.924 105.534C30.924 102.242 31.8123 99.1558 33.3456 96.4939C19.657 94.9032 9.02907 83.2752 9.02907 69.1597C9.02957 59.2167 14.3023 50.5019 22.2037 45.665C17.5021 42.3871 14.4181 36.9503 14.4181 30.784ZM56.3571 83.9587C56.3572 87.2378 56.8783 90.395 57.8316 93.3571C55.3641 91.5778 52.3428 90.5181 49.0681 90.5181C48.8049 90.5181 48.5431 90.5394 48.2831 90.5528C51.4869 88.7929 54.2473 86.3341 56.3698 83.382C56.3663 83.5739 56.3571 83.766 56.3571 83.9587ZM55.9997 54.423C59.4617 56.8658 63.6832 58.3087 68.2425 58.3094C68.9679 58.3094 69.6846 58.2706 70.3914 58.1997C66.5621 60.6753 63.3182 63.9793 60.9182 67.8611C60.6538 62.8256 58.8633 58.1951 55.9997 54.423ZM89.0115 41.606C88.9494 42.1602 88.9124 42.7254 88.9123 43.2961C88.9123 47.4697 90.6165 51.244 93.3653 53.965C91.812 53.6375 90.2152 53.4265 88.5849 53.3439L87.0099 53.306C85.0457 53.306 83.125 53.4928 81.2635 53.8458C85.1283 50.8471 87.9293 46.5518 89.0115 41.606ZM47.1664 34.1906C47.0416 35.1224 46.9735 36.0743 46.9735 37.0403C46.9735 41.7003 48.477 46.0066 51.0184 49.5108C47.3086 46.7759 42.7966 45.065 37.9003 44.7993C42.517 43.039 46.0309 39.0801 47.1664 34.1906ZM17.6239 32.321C18.3146 39.1155 23.5384 44.5497 30.2214 45.596C19.8191 48.3854 12.1602 57.8787 12.1596 69.1612C12.1596 82.6356 23.0822 93.5581 36.5566 93.5581C37.8832 93.5581 39.1845 93.4417 40.4536 93.2379C36.5852 95.9536 34.0549 100.446 34.0549 105.531L34.1298 107.065C34.8465 114.131 40.465 119.747 47.5303 120.465L49.0681 120.545C57.3601 120.545 64.0814 113.823 64.0814 105.531C64.0814 105.088 64.0487 104.65 64.0111 104.217C69.3043 110.222 76.9084 114.143 85.4355 114.574L87.0099 114.611C103.411 114.611 116.806 101.731 117.625 85.5339L117.663 83.9587C117.663 73.2169 112.137 63.7675 103.773 58.2938C103.823 58.2943 103.875 58.3094 103.926 58.3094C112.218 58.3094 118.939 51.588 118.939 43.2961C118.939 35.0041 112.218 28.2828 103.926 28.2828C96.8101 28.2836 90.8593 33.2361 89.3126 39.8808C89.4367 38.9511 89.5116 38.0039 89.5116 37.0403C89.5116 25.2934 79.9895 15.7712 68.2425 15.7712C58.0655 15.7727 49.558 22.9217 47.4675 32.4716C47.5296 31.9174 47.5725 31.3553 47.5725 30.7845C47.5723 23.0102 41.6639 16.6142 34.0922 15.8465L32.5593 15.7712C24.2673 15.7712 17.546 22.4926 17.546 30.7845L17.6239 32.321Z" fill="white"/>
      </g>
      <defs>
      <filter id="s4lg-f0" x="0" y="-2.38419e-07" width="131.096" height="129.089" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="-3.61163"/>
      <feGaussianBlur stdDeviation="4.51453"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="s4lg-ds1"/>
      <feBlend mode="normal" in="SourceGraphic" in2="s4lg-ds1" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="0.973787"/>
      <feGaussianBlur stdDeviation="0.73034"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
      <feBlend mode="normal" in2="shape" result="s4lg-is1"/>
      </filter>
      </defs>
      </svg>
    </div>
    <div class="success-title">Pigments mapped!</div>
    <div class="success-counts-row">
      <div class="stat-card"><div id="cntPrim"  class="stat-num">0</div><div class="stat-label">Primitives</div></div>
      <div class="stat-card"><div id="cntSem"   class="stat-num">0</div><div class="stat-label">Semantics</div></div>
      <div class="stat-card"><div id="cntAlpha" class="stat-num">0</div><div class="stat-label">Alpha stops</div></div>
    </div>
    <div id="skippedNote" class="skipped-note"></div>
    <button id="btnAgain" class="btn-primary">Run Again</button>
  </div>
</div>

<script>
(function() {
  'use strict';

  window.onerror = function(msg, src, line) { console.error('Pigment:', msg, 'line:', line); return true; };

  // ── Get Prompt ────────────────────────────────────────────────────
  var GET_PROMPT_URL = 'https://pigment-prompt.vercel.app/';
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
  var parsedData      = null;
  var alphaSelections = {};   // { tokenName: [stop, ...] }
  var presetSelections = {};  // { tokenName: 'light'|'standard'|'dense'|'custom' }
  var currentTab      = 'primitives';

  // ── Screen 1: Upload ─────────────────────────────────────────────
  var fileInput      = document.getElementById('fileInput');
  var uploadZone     = document.getElementById('uploadZone');
  var jsonInput      = document.getElementById('jsonInput');
  var fileNameInZone = document.getElementById('fileNameInZone');

  function loadFile(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      jsonInput.value = ev.target.result;
      fileNameInZone.textContent = file.name;
      uploadZone.classList.add('has-file');
      fileInput.value = '';
    };
    reader.readAsText(file);
  }

  document.getElementById('btnClearFile').addEventListener('click', function(e) {
    e.stopPropagation();
    uploadZone.classList.remove('has-file');
    fileNameInZone.textContent = '';
    jsonInput.value = '';
    document.getElementById('errorBox').style.display = 'none';
  });

  uploadZone.addEventListener('click', function(e) {
    if (e.target !== fileInput) fileInput.click();
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
    uploadZone.classList.remove('has-file');
    fileNameInZone.textContent = '';
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
  var PRESETS = {
    light:    [10, 20, 30],
    standard: [10, 20, 50, 80],
    dense:    [5, 10, 20, 30, 50, 80, 90],
    custom:   []
  };

  function countAlphaStops() {
    var n = 0;
    var keys = Object.keys(alphaSelections);
    for (var i = 0; i < keys.length; i++) {
      if (alphaSelections[keys[i]]) n += alphaSelections[keys[i]].length;
    }
    return n;
  }

  function hexToRgb(hex) {
    if (!hex || hex.charAt(0) !== '#' || hex.length < 7) return null;
    return { r: parseInt(hex.slice(1,3), 16), g: parseInt(hex.slice(3,5), 16), b: parseInt(hex.slice(5,7), 16) };
  }

  function updateStats() {
    document.getElementById('statPrim').textContent  = Object.keys(parsedData.primitives).length;
    document.getElementById('statSem').textContent   = Object.keys(parsedData.semantics).length;
    document.getElementById('statAlpha').textContent = countAlphaStops();
  }

  function renderAlphaBuilder() {
    updateStats();
    document.getElementById('tabSlider').classList.remove('right');
    renderTokenList();
  }

  var STOP_LABELS = { 5:'5', 10:'10', 20:'20', 30:'30', 40:'40', 50:'50', 60:'60', 70:'70', 80:'80', 90:'90', 95:'solid' };

  function renderTokenList() {
    var list = document.getElementById('tokenList');
    list.innerHTML = '';
    var isSem  = (currentTab === 'semantics');
    var items  = isSem ? parsedData.semantics : parsedData.primitives;
    var keys   = Object.keys(items);
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
      var section = document.createElement('div');
      section.className = 'token-section';
      var grpEl = document.createElement('div');
      grpEl.className = 'group-label';
      grpEl.textContent = grpName.charAt(0).toUpperCase() + grpName.slice(1);
      section.appendChild(grpEl);
      var grpGroup = document.createElement('div');
      grpGroup.className = 'token-group';

      for (var ti = 0; ti < grpKeys.length; ti++) {
        var name        = grpKeys[ti];
        var val         = items[name];
        var hex         = isSem ? (parsedData.primitives[val] || null) : val;
        var hasAlpha    = !isSem && !!(presetSelections[name]);
        var swatchBg    = (hex && hex.charAt(0) === '#') ? hex : '#DEE2E6';
        var hexDisplay  = isSem ? val : (hex || '');
        var activePreset = presetSelections[name] || 'standard';
        var curStops    = alphaSelections[name] || [];
        var rgb         = hexToRgb(swatchBg);

        var plusSvg = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1.5V10.5" stroke="#14100C" stroke-width="1.2" stroke-linecap="round"/><path d="M1.5 6H10.5" stroke="#14100C" stroke-width="1.2" stroke-linecap="round"/></svg>';
        var alphaBtnHtml = '';
        if (!isSem) {
          var sc = curStops.length;
          var btnTxt = hasAlpha ? (sc + ' Stop' + (sc !== 1 ? 's' : '')) : 'Alpha';
          alphaBtnHtml = '<button class="btn-alpha' + (hasAlpha ? ' active' : '') + '" data-action="toggleAlpha" data-name="' + name + '">' + plusSvg + btnTxt + '</button>';
        }

        var rowContentHtml =
          '<div class="token-left">' +
            '<div class="token-swatch" style="background:' + swatchBg + '"></div>' +
            '<span class="token-name">' + name + '</span>' +
          '</div>' +
          '<div class="token-right">' +
            '<span class="token-hex">' + hexDisplay + '</span>' +
            alphaBtnHtml +
          '</div>';

        if (!hasAlpha) {
          var row = document.createElement('div');
          row.className = 'token-row';
          row.innerHTML = rowContentHtml;
          grpGroup.appendChild(row);
        } else {
          var trackBg = rgb
            ? 'linear-gradient(to right,rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0),rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + '))'
            : 'linear-gradient(to right,#DEE2E6,#ADB5BD)';

          var pKeys = ['light','standard','dense','custom'];
          var pLabels = { light:'Light', standard:'Standard', dense:'Dense', custom:'Custom' };
          var pillsHtml = '';
          for (var pi = 0; pi < pKeys.length; pi++) {
            var pk = pKeys[pi];
            pillsHtml += '<button class="alpha-preset-pill' + (activePreset === pk ? ' active' : '') + '" data-action="setPreset" data-name="' + name + '" data-preset="' + pk + '">' + pLabels[pk] + '</button>';
          }

          var tilesHtml = '', labelsHtml = '';
          for (var si = 0; si < STOPS.length; si++) {
            var st = STOPS[si];
            var isOn = curStops.indexOf(st) !== -1;
            var tileStyle = isOn ? ' style="background:#1E1E1E;border:0.8px solid #333434;"' : '';
            var innerStyle = (isOn && rgb) ? ' style="background:rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ');"' : '';
            tilesHtml += '<div class="stop-tile ' + (isOn ? 'on' : 'off') + '"' + tileStyle + ' data-action="toggleStop" data-name="' + name + '" data-stop="' + st + '"><div class="stop-tile-inner"' + innerStyle + '></div></div>';
            var lblStyle = (isOn && rgb) ? ' style="color:rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')"' : '';
            labelsHtml += '<span class="alpha-stop-label"' + lblStyle + '>' + STOP_LABELS[st] + '</span>';
          }

          var previewHtml = '';
          if (curStops.length > 0 && rgb) {
            for (var pvi = 0; pvi < curStops.length; pvi++) {
              var pst = curStops[pvi];
              previewHtml += '<div class="alpha-preview-item"><div class="alpha-preview-dot" style="background:rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (pst/100) + ')"></div><span class="alpha-preview-label">/' + pst + '</span></div>';
            }
          }

          var card = document.createElement('div');
          card.className = 'token-card';

          var cardRow = document.createElement('div');
          cardRow.className = 'token-card-row';
          cardRow.innerHTML = rowContentHtml;

          var divider = document.createElement('div');
          divider.className = 'token-card-divider';

          var alphaContent = document.createElement('div');
          alphaContent.className = 'alpha-content';
          alphaContent.innerHTML =
            '<div class="alpha-preset-header">' +
              '<span class="alpha-preset-label">Preset</span>' +
              '<div class="alpha-preset-pills">' + pillsHtml + '</div>' +
            '</div>' +
            '<div class="alpha-track-wrap">' +
              '<div class="alpha-gradient-strip" style="background:' + trackBg + '">' + tilesHtml + '</div>' +
              '<div class="alpha-stop-labels-row">' + labelsHtml + '</div>' +
            '</div>' +
            (previewHtml ? '<div class="alpha-preview-row">' + previewHtml + '</div>' : '');

          card.appendChild(cardRow);
          card.appendChild(divider);
          card.appendChild(alphaContent);
          grpGroup.appendChild(card);
        }
      }

      section.appendChild(grpGroup);
      list.appendChild(section);
    }
  }

  // Tab switching
  document.getElementById('tabPrim').addEventListener('click', function() {
    currentTab = 'primitives';
    document.getElementById('tabSlider').classList.remove('right');
    document.getElementById('tabHint').textContent = 'Add alpha stops to get opacity variants';
    renderTokenList();
  });
  document.getElementById('tabSem').addEventListener('click', function() {
    currentTab = 'semantics';
    document.getElementById('tabSlider').classList.add('right');
    document.getElementById('tabHint').textContent = 'All Semantics aliased to primitives';
    renderTokenList();
  });

  // Event delegation for token list
  document.getElementById('tokenList').addEventListener('click', function(e) {
    var el = e.target;
    // Walk up to find the element with data-action (handles clicks on SVG children)
    while (el && el !== this) {
      if (el.getAttribute && el.getAttribute('data-action')) break;
      el = el.parentNode;
    }
    if (!el || !el.getAttribute) return;
    var action = el.getAttribute('data-action');
    if (!action) return;
    var name = el.getAttribute('data-name');

    if (action === 'toggleAlpha') {
      if (presetSelections[name]) {
        delete alphaSelections[name];
        delete presetSelections[name];
      } else {
        alphaSelections[name] = PRESETS.standard.slice();
        presetSelections[name] = 'standard';
      }
      updateStats();
      renderTokenList();
    }

    if (action === 'setPreset') {
      var preset = el.getAttribute('data-preset');
      if (preset === 'custom') {
        if (!alphaSelections[name]) alphaSelections[name] = [];
        presetSelections[name] = 'custom';
      } else {
        alphaSelections[name] = PRESETS[preset].slice();
        presetSelections[name] = preset;
      }
      updateStats();
      renderTokenList();
    }

    if (action === 'toggleStop') {
      var stop = parseInt(el.getAttribute('data-stop'), 10);
      if (!alphaSelections[name]) alphaSelections[name] = [];
      var idx = alphaSelections[name].indexOf(stop);
      if (idx === -1) {
        alphaSelections[name].push(stop);
        alphaSelections[name].sort(function(a,b){ return a - b; });
      } else {
        alphaSelections[name].splice(idx, 1);
      }
      presetSelections[name] = 'custom';
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
    parsedData = null; alphaSelections = {}; presetSelections = {}; currentTab = 'primitives';
    document.getElementById('jsonInput').value = '';
    document.getElementById('errorBox').style.display = 'none';
    document.getElementById('uploadZone').classList.remove('has-file');
    document.getElementById('fileNameInZone').textContent = '';
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

figma.showUI(UI_HTML, { width: 460, height: 850, title: 'Pigment' });

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
