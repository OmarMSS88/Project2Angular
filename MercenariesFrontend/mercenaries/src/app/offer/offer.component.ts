import { Component, Input, OnInit } from '@angular/core';
import { Offer } from '../models/offer';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShortenContentPipe } from '../shorten-content.pipe';
import { CustomDatePipe } from '../custom-date.pipe';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  detail(id: number) {
    this.router.navigate(['/offer', id]);
  }
}
