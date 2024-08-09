import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';
import { ActivatedRoute } from '@angular/router';
import { CustomDatePipe } from '../custom-date.pipe';
import { BookingService } from '../services/booking.service';
import { AuthService } from '@auth0/auth0-angular';
import { CreateBooking } from '../dto/create-booking.dto';

@Component({
  selector: 'app-offer-detail',
  standalone: true,
  imports: [CommonModule, CustomDatePipe],
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  offer: Offer = { id: 0, title: "", offerTypeId: 0, offerType: { id: 0, name: ""}, description: "", userId: 0, user: {id: 0, auth0UserId: "", email: "", fullName: ""}, publishDate: ""};
  
  @Input() isGuest: boolean = false; // Flag to determine if the view is for a guest

  isAuthenticated: boolean = false;
  userId: string | null = null;
  hasActiveBooking: boolean = false;
  
  constructor(private offerService: OfferService, private route: ActivatedRoute, private location: Location, private bookingService: BookingService, private authService: AuthService) { }


  ngOnInit(): void {
    const offerId = this.route.snapshot.paramMap.get('id');
    if (offerId != null) {
      this.offerService.getOfferById(+offerId).subscribe(result => this.offer = result);
    }

    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    this.authService.user$.subscribe(user => {
      if (user?.sub) {
        this.userId = user.sub;
        this.checkActiveBooking();
      }
    });
  }

  goBack(): void {
    this.location.back(); // Navigate to the previous page
  }

  bookOffer(): void {
    // Implement the logic to book the offer
    if (this.userId) {
      const bookingTime = new Date();

      const bookingDto: CreateBooking = {
        bookerAuthId: this.userId,
        offerId: this.offer.id,
        bookingTime: bookingTime,
        completed: false
      };

      this.bookingService.createBooking(bookingDto).subscribe(() => {
        console.log('Booking created successfully');
        this.hasActiveBooking = true;
      });
    }
    console.log('Offer booked!');
  }

  checkActiveBooking() {
    if (this.userId) {
      this.bookingService.getBookingsByUser(this.userId).subscribe(bookings => {
        this.hasActiveBooking = bookings.some(booking => booking.offerId === this.offer.id && !booking.complete);
      });
    }
  }
}
