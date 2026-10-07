PACK 32.3 — correctif persistance jour/nuit hors fenêtre
Le filtre visuel est maintenant porté par .game-panel (conteneur stable), et non seulement par #farm qui est reconstruit.
Le mode choisi reste sauvegardé. Aucun effet sur gameplay/timers.
Test: choisir Toujours nuit, fermer Options, puis NFV1.validatePack323().
Aucun commit/push.
