import { Component, Input, OnInit } from '@angular/core';
import { Offer } from '../offer';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})
export class OfferComponent implements OnInit {
  @Input() offer: Offer = { id: 0, title: "", subtitle: "", imageUrl: "", imageCaption: "", content: "", author: "", publishDate: "" };

  constructor() { }

  ngOnInit(): void {
  }
}
