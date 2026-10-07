NOCTURNE FARM — PACK 2 — CULTURES EXISTANTES
Base validée : PACK 1 / V59.22.

MISSION UNIQUE
Brancher uniquement les 3 cultures dont les assets existent déjà sur les timers et XP globaux V1 verrouillés.

CHANGEMENTS
- Blé : 5 min ; XP global 1 pour 4 récoltes.
- Carotte : 10 min ; XP global 1 pour 2 récoltes.
- Maïs : 20 min ; XP global 1 par récolte.
- Un reliquat cropGlobalXpCarry est sauvegardé pour les XP fractionnaires.
- La maîtrise propre à chaque culture reste intacte.
- Les 7 cultures sans assets ne sont PAS affichées.
- Aucun changement Ville, vente, animaux, bâtiments, jour/nuit, décorations.
- Aucun commit/push.

COMPATIBILITÉ SAUVEGARDE
Les anciennes sauvegardes reçoivent automatiquement un reliquat XP à zéro.
Aucune donnée existante n'est supprimée.

TEST CONSOLE
NFV1.validate()
NFV1.validatePack2()

Attendu : PASS aux deux.
Dans le jeu : Blé 5 min, Carotte 10 min, Maïs 20 min.
