# Site vitrine DINDECOR

Structure HTML/CSS/JS simple et responsive.

## Pages
- Accueil: `index.html`
- Qui sommes-nous: `qui-sommes-nous.html`
- Catalogue: `catalogue.html`

## Démarrage
Ouvrez `index.html` dans votre navigateur. Aucune installation nécessaire.

## Ajouter des produits au catalogue
1. Placez vos images dans `assets/img/samples/` (créez le dossier si nécessaire).
2. Ajoutez une entrée dans `assets/data/catalogue.json` au format:
```json
{
  "id":"unique-id",
  "nom":"Nom du modèle",
  "type":"porte" | "fenetre",
  "collection":"premium" | "classic",
  "image":"assets/img/samples/nom-image.jpg",
  "couleurs":["liste", "de", "couleurs"]
}
```

## Couleurs & thème
Les couleurs principales sont définies dans `:root` (fichier `assets/css/styles.css`).

## Import d'images depuis un PDF
- Exportez des visuels en JPG/PNG depuis le PDF fourni.
- Renommez-les de façon cohérente (ex: `porte-mexus-3201.jpg`).
- Mettez à jour `catalogue.json` avec le bon chemin d'image.

## Contact
Modifiez l'email dans les pages ou reliez un formulaire selon vos besoins.
