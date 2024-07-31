import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OfferType } from '../models/offer-type';
import { OfferTypeService } from '../services/offer-type.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './offer-type-list.component.html',
  styleUrl: './offer-type-list.component.css'
})

export class OfferTypeListComponent implements OnInit, OnDestroy {
  offerTypes: OfferType[] = [];
  offerTypes$: Subscription = new Subscription();
  deleteOfferType$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private offerTypeService: OfferTypeService, private router: Router) {
  }

  ngOnInit(): void {
    this.getOfferTypes();
  }

  ngOnDestroy(): void {
    this.offerTypes$.unsubscribe();
    this.deleteOfferType$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/offertype/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/offertype/form'], { state: { id: id, mode: 'edit' } });
  }

  delete(id: number) {
    this.deleteOfferType$ = this.offerTypeService.deleteOfferType(id).subscribe({
      next: (v) => this.getOfferTypes(),
      error: (e) => this.errorMessage = e.message
    });
  }

  getOfferTypes() {
    this.offerTypes$ = this.offerTypeService.getOfferTypes().subscribe(result => this.offerTypes = result);
  }

}
