import { Component, Input, OnInit } from '@angular/core';
import { Offer } from '../models/offer';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShortenContentPipe } from '../shorten-content.pipe';
import { CustomDatePipe } from '../custom-date.pipe';
import { AuthService } from '@auth0/auth0-angular';
import { BookingService } from '../services/booking.service';
import { CreateBooking } from '../dto/create-booking.dto';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [CommonModule, ShortenContentPipe, CustomDatePipe],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})
export class OfferComponent implements OnInit {
  @Input() offer: Offer = { id: 0, title: "", offerTypeId: 0, offerType: { id: 0, name: ""}, description: "", userId: 0, user: {id: 0, auth0UserId: "", email: "", fullName: ""}, publishDate: ""};
  @Input() isDetail: boolean = false;
  @Input() isShop: boolean = false;

  isAuthenticated: boolean = false;
  userId: string | null = null;
  hasActiveBooking: boolean = false;

  constructor(private router: Router, private authService: AuthService, private bookingService: BookingService) {}

  ngOnInit(): void {
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

  detail(id: number) {
    this.router.navigate(['/offer', id]);
  }

  bookOffer() {
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
  }

  checkActiveBooking() {
    if (this.userId) {
      this.bookingService.getBookingsByUser(this.userId).subscribe(bookings => {
        this.hasActiveBooking = bookings.some(booking => booking.offerId === this.offer.id && !booking.complete);
      });
    }
  }
}
