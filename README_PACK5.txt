NOCTURNE FARM — PACK 5 — RESSOURCES NATURELLES

Base : PACK 4 Zone de pêche.

Ce pack reste volontairement prudent :
- Bois, pierre, fer et champignons conservent leurs boucles actuelles déjà fonctionnelles.
- Diamant désormais impossible avant le niveau 35.
- Rubis désormais impossible avant le niveau 40.
- Charbon préparé dans le Stock, le lexique et les assets avec son asset existant ore_coal.png.
- Charbon indiqué niveau 20, conformément au tableau maître.
- Le charbon n'est PAS encore injecté dans le tirage aléatoire : aucune probabilité n'a été inventée.
- Les timers/XP naturels existants ne sont PAS modifiés dans ce pack, car leurs valeurs exactes n'étaient pas verrouillées dans le tableau maître.
- Aucun commit / push.

CONSOLE :
NFV1.validate()
NFV1.validatePack2()
NFV1.validatePack3()
NFV1.validatePack4()
NFV1.validatePack5()

Attendu : PASS pour les cinq validations.

À TESTER EN JEU SI ACCESSIBLE :
- Bois : plantation -> attente -> arbre prêt -> coupe -> Stock.
- Mine : extraction -> attente -> ressource prête -> collecte -> Stock.
- Champignon : spore -> attente -> prêt -> collecte -> Stock.
Les ressources rares seront surtout validables plus tard avec la progression réelle.
