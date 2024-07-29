import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offer } from '../models/offer';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  @Input() offer: Offer = { id: 0, title: "", subtitle: "", imageUrl: "", imageCaption: "", content: "", author: "", publishDate: "", categoryId: 0 };

  constructor() { }

  ngOnInit(): void {
  }
}
