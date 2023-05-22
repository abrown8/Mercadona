# MercadonaApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Configuration de la base de données

1. Créez une base de données PostgreSQL appelée "mercadona". Vous pouvez utiliser un outil tel que pgAdmin ou exécuter une commande SQL pour créer la base de données.

2. Ouvrez le fichier mercadona-app/server/src/main/resources/application.properties. Assurez-vous de mettre à jour les valeurs des propriétés spring.datasource.url, spring.datasource.username et spring.datasource.password en fonction de votre configuration PostgreSQL.

## Mise en fonction du serveur

Lancez le serveur en exécutant le fichier `mercadona-app/server/src/main/java/com/mercadona/mercadona/MercadonaApplication.java`. Cela ouvrira le serveur sur `http://localhost:8080/`.

## Utilisation

1. Ouvrez l'URL de l'application dans votre navigateur. [https://mercadona-ab.herokuapp.com]

2. Accédez à l'espace administrateur en cliquant sur le bouton "Espace Admin". Vous serez redirigé vers la page de connexion.

3. Connectez-vous en utilisant l'e-mail "admin1@example.com" et le mot de passe "admin".

4. Une fois connecté, vous pouvez créer un nouvel article en cliquant sur le bouton "Créer un nouvel article".

5. Pour gérer les promotions par catégorie, dans la section "Edition des catégories" sélectionnez la catégorie souhaitée dans la liste déroulante. Puis, cliquez sur le bouton "Ajouter une promotion" (ou "Modifier les promotions") pour ajouter (ou modifier) une promotion pour tous les articles de cette catégorie. Vous pouvez également supprimer toutes les promotions de cette catégorie en utilisant le bouton "Supprimer les promotions".

6. Pour gérer les promotions individuellement pour chaque article, cliquez sur les boutons "Ajouter une promotion", "Modifier la promotion" ou "Supprimer la promotion" sur la carte de l'article correspondant.

7. Pour vous déconnecter, cliquez sur le bouton "Se déconnecter".

N'hésitez pas à explorer l'application et à utiliser ses fonctionnalités pour gérer les promotions des articles Mercadona.
