import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OfferComponent } from './offer/offer.component';
import { ContactComponent } from './contact/contact.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { OfferTypeListComponent } from './offer-type-list/offer-type-list.component';
import { OfferTypeFormComponent } from './offer-type-form/offer-type-form.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { adminGuard } from './admin.guard';
import { ShopComponent } from './shop/shop.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { ShopGuestComponent } from './shop-guest/shop-guest.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OfferDetailGuestComponent } from './offer-detail-guest/offer-detail-guest.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'offer', component: OfferComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'offer/:id', component: OfferDetailComponent },
    { path: 'offerguest/:id', component: OfferDetailGuestComponent },

    
    // Admin routes with guards
    { path: 'admin/offertype', component: OfferTypeListComponent, canActivate: [AuthGuard, adminGuard] },
    { path: 'admin/offertype/form', component: OfferTypeFormComponent, canActivate: [AuthGuard, adminGuard] },

    // Shop and My Offers routes
    { path: 'shop', component: ShopComponent },
    { path: 'shopguest', component: ShopGuestComponent },
    { path: 'myoffers', component: MyOffersComponent },

    // Offer form routes for adding and editing
    { path: 'myoffers/form', component: OfferFormComponent },


    // Booked Offers and Offers Booked
    { path: 'mybookings', component: MyBookingsComponent },
    { path: 'myjobs', component: MyJobsComponent },

    // User name change
    { path: 'user', component: UserProfileComponent }

];
