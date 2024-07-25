import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OfferComponent } from './offer/offer.component';
import { MenuComponent } from './menu/menu.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment.development';



@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    CategoryFormComponent
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: "dev-omar.eu.auth0.com",
      clientId: 'IJrmgYbTmQRyOQfx6lenbpduRJzfOPRh',
      authorizationParams: {
        redirect_uri: 'https://localhost:4200/'
      }
    }),
    AppRoutingModule,
    MenuComponent,
    HttpClientModule,
    FormsModule,
    LoginButtonComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
