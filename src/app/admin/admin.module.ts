import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';

import { AuthGuard } from '../auth.guard';
import { EditionComponent } from './edition/edition.component';
import { EditionPromoComponent } from './edition/edition-promo/edition-promo.component';
import { NouvelArticleComponent } from './edition/nouvel-article/nouvel-article.component';
import { FormsModule } from '@angular/forms';
import { EditionPromoCategorieComponent } from './edition/edition-promo/edition-promo-categorie.component';

const AdminRoutes: Routes = [
  { path: 'admin/nouvel-article', component: NouvelArticleComponent, canActivate: [AuthGuard]},
  { path: 'admin/categorie/:id', component: EditionPromoCategorieComponent, canActivate: [AuthGuard]},
  { path: 'admin/:id', component: EditionPromoComponent, canActivate: [AuthGuard]},
  { path: 'admin-login', component: AuthentificationComponent},
  { path: 'admin', component: EditionComponent, canActivate: [AuthGuard]}
  
  
];

@NgModule({
  declarations: [
    AuthentificationComponent,
    EditionComponent,
    EditionPromoComponent,
    EditionPromoCategorieComponent,
    NouvelArticleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(AdminRoutes)
  ]
})
export class AdminModule { }

