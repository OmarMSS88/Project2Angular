import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OfferComponent } from './offer/offer.component';
import { ContactComponent } from './contact/contact.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'offer', component: OfferComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'offer/:id', component: OfferDetailComponent}
];
