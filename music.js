// One music player for the whole session, independent of game saves and zones.
const GameplayMusic = (() => {
  const storageKey = "nocturneFarm.musicEnabled";
  const player = new Audio("assets/audio/gameplay-music.wav");
  player.loop = true;
  player.preload = "none";
  player.volume = 0.35;
  let enabled = true;
  let active = false;
  let pending = false;
  try { enabled = localStorage.getItem(storageKey) !== "false"; } catch (_) {}
  const button = document.getElementById("music-toggle");
  function updateButton() {
    button.textContent = `🎵 Musique : ${enabled ? "Activée" : "Désactivée"}`;
    button.setAttribute("aria-pressed", String(enabled));
  }
  function canPlay() {
    return active && enabled && !document.body.classList.contains("start-screen-active");
  }
  function play() {
    if (!canPlay() || !player.paused || pending) return;
    pending = true;
    player.play().then(() => {
      if (!canPlay()) player.pause();
    }).catch(() => {
      // A browser autoplay refusal is retried on the next gameplay interaction.
    }).finally(() => { pending = false; });
  }
  function stop() {
    active = false;
    player.pause();
  }
  button.addEventListener("click", () => {
    enabled = !enabled;
    try { localStorage.setItem(storageKey, String(enabled)); } catch (_) {}
    updateButton();
    if (enabled) play(); else player.pause();
  });
  document.addEventListener("pointerdown", event => {
    if (event.isTrusted && event.target !== button) play();
  });
  document.addEventListener("keydown", event => {
    if (event.isTrusted && event.target !== button) play();
  });
  new MutationObserver(() => {
    if (document.body.classList.contains("start-screen-active")) stop();
  }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
  window.addEventListener("pagehide", stop);
  updateButton();
  return { start() { active = true; play(); }, stop };
})();
