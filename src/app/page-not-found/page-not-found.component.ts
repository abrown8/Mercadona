import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="container-fluid py-5">
      <div class="row justify-content-center">
        <div class="col-md-6 text-center">
        <h3>Erreur: cette page n'existe pas</h3>
        <a class="btn btn-secondary mt-3" routerLink="/catalogue"> Retour à l'accueil </a>
      </div>
    </div>
  </div>
  `,
})
export class PageNotFoundComponent {

}
