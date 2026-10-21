# Application d'observation de comportements (TER)

Application web utilisée comme matériel expérimental dans le cadre de mon TER (Master Sciences Cognitives pour l'Entreprise, Université de Lille) : comparaison de la collecte de données comportementales en format numérique et en papier-crayon (ABA).

## Fonctionnement

1. **Page préalable** : l'expérimentateur renseigne l'identifiant du participant, le numéro de session (1 à 4) et la complexité de la tâche (TS ou TC).
2. **Observation** : le participant enregistre ses observations pendant la vidéo.
   - **Tâche simple (TS)** : « Hors-Tâche » est enregistré par échantillonnage temporel.
   - **Tâche complexe (TC)** : « Se mordre » est enregistré par occurrence, « Stéréotypie » et « Hors-Tâche » par échantillonnage temporel.
3. **Récapitulatif** : les valeurs collectées s'affichent à la fin, et un fichier CSV est téléchargé automatiquement.

### Échantillonnage temporel

- Intervalles de 10 secondes, gérés par un chronomètre automatique.
- Signal sonore à 8 s dans chaque intervalle.
- L'enregistrement se fait pendant une fenêtre de 3 s au début de l'intervalle suivant, indiquée par la barre de progression.

### Fichier CSV

Nommé `identifiant-session-condition.csv`. Il contient les informations de passation (identifiant, session, condition, début, fin, durée, nombre d'intervalles), les valeurs brutes (0 = comportement absent de l'intervalle, 1 = présent) et les proportions.

## Lancer l'application en local

Il n'y a rien à installer. Les modules JavaScript nécessitent un serveur local (l'ouverture directe de `index.html` ne fonctionne pas) :

```
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000.

## Structure

- `index.html` : les 4 pages (préalable, départ, observation, récapitulatif)
- `js/` : `state.js` (données), `timer.js` (chrono et intervalles), `behaviors.js` (boutons), `stats.js` (proportions), `csv.js` (export), `interface.js` (navigation)
- `css/` : styles
- `assets/` : signal sonore et logo