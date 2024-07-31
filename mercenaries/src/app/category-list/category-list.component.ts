import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categories$: Subscription = new Subscription();
  deleteCategorie$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private categoryService: CategoryService, private router: Router) {
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
    this.deleteCategorie$ = this.categoryService.deleteCategory(id).subscribe({
      next: (v) => this.getCategories(),
      error: (e) => this.errorMessage = e.message
    });
  }

  getCategories() {
    this.categories$ = this.categoryService.getCategories().subscribe(result => this.categories = result);
  }

}