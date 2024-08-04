
import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';
import { OfferComponent } from '../offer/offer.component';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from "../login/login.component";
import { SignupButtonComponent } from "../signup/signup.component";
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, OfferComponent, LoginButtonComponent, SignupButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(private auth: AuthService) {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
  }

  ngOnInit(): void {}
}
