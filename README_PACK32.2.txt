NOCTURNE FARM — PACK 32.2
Correctif persistance du cycle jour/nuit.
Cause : renderAll appliquait le filtre AVANT renderFarm ; renderFarm reconstruisait ensuite les classes du terrain et supprimait nf-night/nf-day/etc.
Correction : renderFarm puis applyDayNight, avec garde supplémentaire à la fermeture de la fenêtre.
Aucun changement économie/timers. Aucun commit/push.
Test : NFV1.validatePack322()
