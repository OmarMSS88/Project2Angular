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
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})

export class CategoryListComponent implements OnInit, OnDestroy {
  categories: OfferType[] = [];
  categories$: Subscription = new Subscription();
  deleteCategorie$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private offerTypeService: OfferTypeService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.categories$.unsubscribe();
    this.deleteCategorie$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/category/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/category/form'], { state: { id: id, mode: 'edit' } });
  }

  delete(id: number) {
    this.deleteCategorie$ = this.offerTypeService.deleteCategory(id).subscribe({
      next: (v) => this.getCategories(),
      error: (e) => this.errorMessage = e.message
    });
  }

  getCategories() {
    this.categories$ = this.offerTypeService.getCategories().subscribe(result => this.categories = result);
  }

}
