/* Adapter only: rewards, storage and locks belong to the shared Hub engine. */
(() => {
  'use strict';
  let previous = null;
  const suspend = () => { previous = null; try { window.CJEngine?.suspend?.(); } catch {} };
  window.CJGameIntegration = Object.freeze({
    suspend,
    tick(now, id) {
      const state = window.getGameState?.();
      if (!state?.running || state.paused || document.hidden || !document.hasFocus() || !window.CJEngine) { suspend(); return 0; }
      if (previous === null) { previous = now; return 0; }
      const delta = now - previous;
      previous = now;
      if (!Number.isFinite(delta) || delta <= 0 || delta > 200) { suspend(); return 0; }
      try { return window.CJEngine.tick(delta, id) || 0; } catch { suspend(); return 0; }
    }
  });
  for (const event of ['blur', 'focus', 'pagehide', 'pageshow']) window.addEventListener(event, suspend);
  document.addEventListener('visibilitychange', suspend);
  const account = document.createElement('script');
  account.src = 'https://cjajlk.github.io/cjajlkGames-V2-test/core/cjAccount.js';
  account.dataset.universal = 'true';
  account.onload = async () => {
    const ready = await window.CJajlkAccount?.ready;
    if (ready && !ready.ok) return;
    const engine = document.createElement('script');
    engine.src = 'https://cjajlk.github.io/cjajlkGames-V2-test/core/cjEngine.js';
    engine.onerror = suspend;
    document.head.appendChild(engine);
  };
  account.onerror = suspend;
  document.head.appendChild(account);
})();

/* Automatic production never renews this activity window. */
(() => {
  'use strict';
  const idleMs = 120000;
  let lastAction = -Infinity;
  const heldMovement = new Set();
  const portrait = matchMedia('(orientation: portrait) and (max-width: 1000px)');
  const gameplayTarget = '#start-game, #farm, #toolbar, #quickbar, #mobile-move-pad, #map-modal, #open-map, #context-actions, .dock, #game-modal';
  function action(event) {
    if (!event.isTrusted || document.hidden || !document.hasFocus()) return;
    if (event.type === 'keydown') {
      if (!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d','z','q','W','A','S','D','Z','Q'].includes(event.key) || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
    } else if (!event.target.closest(gameplayTarget)) return;
    if (event.type === 'pointermove' && !event.buttons) return;
    if (event.type === 'pointerdown' && event.target.closest('#mobile-move-pad')) heldMovement.add(event.pointerId);
    lastAction = performance.now();
  }
  for (const event of ['pointerdown','pointermove','click','keydown','change']) document.addEventListener(event, action, {capture:true});
  for (const event of ['pointerup','pointercancel']) document.addEventListener(event, e => heldMovement.delete(e.pointerId), {capture:true});
  const stop = () => { heldMovement.clear(); lastAction = -Infinity; window.CJGameIntegration.suspend(); };
  portrait.addEventListener('change', stop);
  window.addEventListener('blur', stop);
  window.addEventListener('pagehide', stop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  window.getGameState = () => ({
    running: window.CJajlkAccount?.isIdentityReady?.() !== false && !document.body.classList.contains('start-screen-active') && (heldMovement.size > 0 || performance.now() - lastAction < idleMs),
    paused: document.hidden || !document.hasFocus() || portrait.matches || !!document.querySelector('#game-modal:not(.hidden), #map-modal:not(.hidden)')
  });
  function frame(now) { window.CJGameIntegration.tick(now, 'farm'); requestAnimationFrame(frame); }
  requestAnimationFrame(frame);
})();
