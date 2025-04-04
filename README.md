# Pokédex - Projet S14

![Pokédex](front/assets/img/25.webp)

Bienvenue sur le projet Pokédex, réalisé dans le cadre de la formation de développeur web. Ce projet consiste à créer une application web complète, comprenant une API RESTful et une interface utilisateur en JavaScript Vanilla, permettant de consulter une encyclopédie de Pokémons et de gérer des équipes de Pokémons.

## Fonctionnalités

Ce projet permet aux utilisateurs de :

- **Consulter la liste de tous les Pokémons :** Affichage de tous les Pokémons disponibles dans le Pokédex.
- **Consulter les détails d'un Pokémon :** Accéder aux informations détaillées d'un Pokémon spécifique.
- **Consulter la liste de tous les types :** Affichage de tous les types de Pokémons disponibles.
- **Consulter les détails d'un type :** Accéder aux informations détaillées d'un type spécifique et voir les pokémons qui lui sont associés.
- **Gérer des équipes de Pokémons :**
  - Créer de nouvelles équipes.
  - Ajouter des Pokémons à une équipe (maximum 6).
  - Supprimer des Pokémons d'une équipe.
  - Consulter les équipes existantes.
  - Consulter les pokémons d'une équipe.
  - Renommer une équipe.
- **API RESTful:** Une API robuste pour gérer les données des Pokémons, des types et des équipes.

## Technologies utilisées

### Back-end

- **Node.js** : Environnement d'exécution JavaScript côté serveur.
- **Express.js** : Framework web minimaliste pour Node.js.
- **Sequelize** : ORM (Object-Relational Mapping) pour interagir avec la base de données.
- **PostgreSQL** : Système de gestion de base de données relationnelle.
- **Joi:** Validation des données.
- **Controller Wrapper:** Gestion centralisée des erreurs.

### Front-end

- **HTML5** : Structure des pages web.
- **CSS3** : Mise en forme et stylisation des pages.
- **JavaScript Vanilla** : Interactivité et gestion des données côté client.

## Installation et lancement

### Prérequis

- Node.js (version recommandée : v18 ou supérieure)
- PostgreSQL (avec une base de données créée)

### Installation du back-end

1. Cloner le dépôt :

   ```bash
   git clone <URL_DU_REPO>
   cd S14-Pokedex-pierre-yvesletraon/back
   ```

2. Installer les dépendances :

   ```bash
   npm install
   ```

3. Créer un fichier `.env` à la racine du dossier `back` en vous inspirant du fichier `.env.example` et en renseignant les informations de connexion à votre base de données.
4. Lancer la base de données avec Sequelize :

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. Lancer le serveur :

   ```bash
   npm run dev
   ```

### Installation du front-end

1. Ouvrir un nouveau terminal et se rendre dans le dossier racine du projet.
2. Ouvrir le fichier `docs/integration/starterPage.html` avec un Live Server.
3. Développer le front-end en utilisant les composants fournis dans `docs/integration/components.html`.

## Points forts du projet

- **API RESTful complète :** Permet de gérer les Pokémons, les types et les équipes.
- **Gestion des erreurs centralisée :** Grâce au `controllerWrapper`, la gestion des erreurs est simplifiée et centralisée.
- **Utilisation de Sequelize :** L'ORM Sequelize facilite l'interaction avec la base de données.
- **Front-end en JavaScript Vanilla :** Permet de pratiquer le développement front-end sans framework.
- **Structure claire et organisée :** Le code est bien structuré et facile à comprendre.
- **Validation des données:** Utilisation de Joi pour valider les données.

## Améliorations possibles

- Ajouter des fonctionnalités supplémentaires (recherche, filtres, etc.).
- Améliorer l'interface utilisateur.
- Ajouter des tests unitaires et d'intégration.
- Implémenter un système d'authentification.

## Roadmap

Consultez le fichier roadmap.md pour voir les étapes du projet.

## Auteurs

- Pierre-Yves Le Traon

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir des issues ou à proposer des pull requests.

## Licence

[MIT](https://opensource.org/licenses/MIT)
