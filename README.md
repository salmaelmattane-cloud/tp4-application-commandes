# TP4 — Application JavaScript de gestion des commandes

## Description

Cette application frontend permet de consulter des commandes en reliant trois sources de données JSON : les clients, les produits et les commandes.

Elle utilise HTML, CSS, Bootstrap et JavaScript .

## Structure du projet

tp4/
├── index.html
├── README.md
├── css/
│   └── style.css
├── data/
│   ├── customers.json
│   ├── products.json
│   └── orders.json
└── js/
    ├── app.js
    ├── state.js
    ├── dataService.js
    ├── selectors.js
    └── view.js
```

## Fonctionnalités principales

- Chargement des données depuis trois fichiers JSON.
- Relations entre les clients, les produits et les commandes grâce aux identifiants.
- Calcul des montants des lignes et des totaux des commandes.
- Affichage d'indicateurs calculés à partir des données.
- Recherche et filtres sur les commandes.
- Consultation du détail d'une commande.
- Gestion des erreurs de chargement.

## Technologies utilisées

- HTML5
- CSS3
- Bootstrap
- JavaScript 
- JSON
- Git et GitHub

## Lancement du projet

1. Télécharger ou cloner le dépôt.
2. Ouvrir le dossier du projet dans Visual Studio Code.
3. Lancer `index.html` avec l'extension Live Server.
4. Utiliser l'application dans le navigateur.

Le lancement via un serveur local est nécessaire pour permettre le chargement des fichiers JSON avec `fetch()` et l'utilisation des modules JavaScript.

## Organisation du code

- `state.js` : conserve l'état de l'application.
- `dataService.js` : charge les fichiers JSON.
- `selectors.js` : relie, recherche, filtre et calcule les données.
- `view.js` : gère l'affichage dans le DOM.
- `app.js` : initialise l'application et organise les événements.
## Utilisation
Ouvrir `index.html` dans un navigateur web avec un serveur local (Live Server) pour consulter l'application.