import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BorderCardDirective } from './border-card.directive';

@NgModule({
  declarations: [
    AppComponent,
    ListArticleComponent,
    DetailArticleComponent,
    PageNotFoundComponent,
    BorderCardDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
