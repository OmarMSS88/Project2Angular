import { Component, Input, OnInit } from '@angular/core';
import { Offer } from '../offer';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShortenContentPipe } from '../shorten-content.pipe';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [CommonModule, ShortenContentPipe],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})
export class OfferComponent implements OnInit {
  @Input() offer: Offer = { id: 0, title: "", subtitle: "", imageUrl: "", imageCaption: "", content: "", author: "", publishDate: "" };

  @Input() isDetail: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  detail(id: number) {
    this.router.navigate(['/offer', id]);
  }
}
