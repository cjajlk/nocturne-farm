NOCTURNE FARM — PACK 1 — ARCHITECTURE / DONNÉES

Base : V59.22 grandes parcelles.

MISSION UNIQUE
Préparer les données V1 verrouillées sans modifier le gameplay existant.

FICHIERS MODIFIÉS / AJOUTÉS
- index.html : charge v1-design-data.js avant game.js
- v1-design-data.js : registre V1 indépendant

GARANTIES PACK 1
- aucun prix/timer V59.22 existant remplacé dans game.js
- aucune sauvegarde migrée
- aucune clé localStorage modifiée
- aucune UI modifiée
- aucune mécanique Ville activée
- aucun cycle jour/nuit activé
- aucun asset manquant affiché
- aucun commit/push

TEST CONSOLE
1. Ouvrir le jeu.
2. Ouvrir DevTools > Console.
3. Taper : NFV1.validate()
4. Résultat attendu : status: "PASS", gameplayModified: false,
   crops: 10, animals: 8, largePlots: 64,
   cityActive: false, dayNightActive: false.

Ce pack est volontairement invisible en jeu.
