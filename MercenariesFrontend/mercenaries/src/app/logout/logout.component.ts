import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutButtonComponent {
  constructor(private auth: AuthService) {}
  
  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: environment.home_url, // this is where we redirect to when the user is logged out
      },
    });
  }
}
