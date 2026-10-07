NOCTURNE FARM — PACK 6.1 — CORRECTIF EXTENSION TERRAIN

Base : PACK 6.

Bug confirmé : avec les grandes parcelles 2×2, certains anciens paliers +1
pouvaient retirer les pièces sans rendre une nouvelle grande parcelle accessible.

Correction :
- les prochains achats d'extension avancent de +2 ;
- plafond 16×16 conservé ;
- une sauvegarde déjà passée à 7×7 avec l'ancien système est convertie
  une seule fois gratuitement en 9×9 : aucun second paiement pour réparer l'achat déjà effectué ;
- argent actuel non modifié ;
- sauvegarde compatible ;
- aucun commit / push.

Console :
NFV1.validatePack61()
Attendu : PASS.

Contrôle visuel important :
Recharge la partie avec ce pack. Si ta Ferme principale était à 7×7,
elle doit passer automatiquement à 9×9 sans nouvelle déduction de pièces,
et de nouvelles grandes parcelles doivent être accessibles.
