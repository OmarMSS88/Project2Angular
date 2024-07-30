import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfferType } from '../models/offer-type';
import { OfferTypeService } from '../services/offer-type.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offer-type-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './offer-type-form.component.html',
  styleUrl: './offer-type-form.component.css'
})

export class OfferTypeFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  offerTypeId: number = 0;

  offerType: OfferType = { id: 0, name: "" };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  offerType$: Subscription = new Subscription();
  postOfferType$: Subscription = new Subscription();
  putOfferType$: Subscription = new Subscription();

  constructor(private router: Router, private offerTypeService: OfferTypeService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.offerTypeId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.offerTypeId != null && this.offerTypeId > 0) {
      this.offerType$ = this.offerTypeService.getOfferTypesById(this.offerTypeId).subscribe(result => this.offerType = result);
    }

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.offerType$.unsubscribe();
    this.postOfferType$.unsubscribe();
    this.putOfferType$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postOfferType$ = this.offerTypeService.postOfferType(this.offerType).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/category"),
        error: (e) => this.errorMessage = e.message
      });
    }
    if (this.isEdit) {
      this.putOfferType$ = this.offerTypeService.putOfferType(this.offerTypeId, this.offerType).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/category"),
        error: (e) => this.errorMessage = e.message
      });
    }
  }

}
