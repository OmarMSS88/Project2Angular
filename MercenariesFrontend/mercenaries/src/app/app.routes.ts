import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OfferComponent } from './offer/offer.component';
import { ContactComponent } from './contact/contact.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'offer', component: OfferComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'offer/:id', component: OfferDetailComponent},
    {path: 'admin/category', component: CategoryListComponent, canActivate: [AuthGuard]},
    {path: 'admin/category/form', component: CategoryFormComponent, canActivate: [AuthGuard]}
    
];
