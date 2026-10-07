NOCTURNE FARM — PACK 4 — ZONE DE PÊCHE

Base : nocturne-farm(9).zip (PACK 3 + fishing-zone-01.png)

- Nouvelle Zone de pêche dédiée, déblocage niveau 9.
- Fond : assets/backgrounds/fishing-zone-01.png.
- 12 visuels poissons existants utilisés.
- Achat poisson : 500 pièces.
- Capacité test actuelle : 12 poissons.
- Production : 30 minutes.
- Le poisson n'entre PLUS automatiquement dans le Stock.
- Production accumulée dans livestockReady.fish.
- Toucher un poisson ouvre le contexte : timer / prêt / collecter.
- Collecte manuelle : +1 poisson Stock par production et +6 XP.
- Sauvegarde compatible : fishPositions et livestockReady.fish ajoutés sans effacer l'existant.
- Aucun commit/push.

TEST CONSOLE :
NFV1.validate()
NFV1.validatePack2()
NFV1.validatePack3()
NFV1.validatePack4()
Attendu : PASS / PASS / PASS / PASS.

TEST VISUEL/FONCTIONNEL :
1. Niveau 9 minimum.
2. Carte/Domaine -> Zone de pêche.
3. Vérifier fishing-zone-01.png.
4. Gestion -> Animaux -> ajouter un poisson.
5. Le poisson doit apparaître sur l'eau.
6. Toucher le poisson : timer.
7. Une fois prêt : Collecter -> Stock.
