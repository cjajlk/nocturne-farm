NOCTURNE FARM — V59.15 — CORRECTIF TEST RÉEL TABLETTE / TÉLÉPHONE

Base : Release Candidate V7 fournie par CJ.
Aucun commit / push effectué.

Corrections :
- Zone d'élevage : rendu des poules/vaches réparé (erreur JS dans la couche animaux).
- Achat d'animaux : rafraîchissement immédiat du panneau et de la carte.
- Poulailler et Étable réintégrés aux choix de la Zone de production avec leurs assets existants.
- Gestion animaux reconnaît les bâtiments d'élevage présents dans le domaine.
- Cases verrouillées Bois/Mine : aucune barre d'action ne s'ouvre ; message « Case non débloquée ».
- Barres contextuelles : fermeture automatique à l'ouverture/fermeture d'un panneau + bouton ✕ dans les parcours de plantation.
- Suppression réelle des anciens raccourcis 1 / 5 / 10 / 25 / Toutes.
- Labour/récolte : quantité exacte via − / nombre / +.
- Choix des cultures et bâtiments de production : cartes tactiles avec assets, prix/stock/état.
- Tablette : réduction des reconstructions DOM pendant un toucher ou une barre contextuelle ouverte pour éviter les blocages intermittents.
- Pinch-to-zoom de la carte : 80 % à 140 %, valeur mémorisée.
- Maîtrises : courbe progressive (398 pts Agriculture n'affiche plus niv.16 ; 112 pts Forêt reste autour du niv.5).
- Zone d'élevage : verrouillage niveau 7 / 1600 appliqué aussi aux sauvegardes migrées sous le niveau requis.

À tester en priorité :
1. Bois enchanté sur tablette : cases vides, arbres prêts et cases verrouillées.
2. Ouvrir une barre puis Stock/Gestion/Édition : aucune barre résiduelle.
3. Acheter poules/vaches : compteur immédiat + animaux visibles.
4. Déplacer/redimensionner les animaux en Édition.
5. Pinch zoom 80–140 % sur téléphone/tablette.
6. Barres cultures et Production : assets et toucher.
