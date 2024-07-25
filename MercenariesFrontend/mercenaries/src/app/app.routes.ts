import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OfferComponent } from './offer/offer.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'offer', component: OfferComponent},
    {path: 'contact', component: ContactComponent},
];
