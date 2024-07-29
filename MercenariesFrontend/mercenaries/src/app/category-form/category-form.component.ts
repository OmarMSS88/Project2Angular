import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfferType } from '../models/offer-type';
import { OfferTypeService } from '../services/offer-type.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})

export class CategoryFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  categoryId: number = 0;

  category: OfferType = { id: 0, name: "" };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  category$: Subscription = new Subscription();
  postCategory$: Subscription = new Subscription();
  putCategory$: Subscription = new Subscription();

  constructor(private router: Router, private offerTypeService: OfferTypeService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.categoryId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.categoryId != null && this.categoryId > 0) {
      this.category$ = this.offerTypeService.getCategoryById(this.categoryId).subscribe(result => this.category = result);
    }

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.category$.unsubscribe();
    this.postCategory$.unsubscribe();
    this.putCategory$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postCategory$ = this.offerTypeService.postCategory(this.category).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/category"),
        error: (e) => this.errorMessage = e.message
      });
    }
    if (this.isEdit) {
      this.putCategory$ = this.offerTypeService.putCategory(this.categoryId, this.category).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/category"),
        error: (e) => this.errorMessage = e.message
      });
    }
  }

}
