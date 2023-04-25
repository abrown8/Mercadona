import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from '../auth.guard';

const AdminRoutes: Routes = [
  { path: 'admin-login', component: AuthentificationComponent},
  { path: 'interdit', component: AuthentificationComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AuthentificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(AdminRoutes)
  ]
})
export class AdminModule { }

