import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LoginButtonComponent } from '../login/login.component';
import { AuthService } from '@auth0/auth0-angular';
import { RoleService } from '../services/role.service';
import { LogoutButtonComponent } from '../logout/logout.component';
import { SignupButtonComponent } from '../signup/signup.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginButtonComponent, LogoutButtonComponent, SignupButtonComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {

  isAuthenticated = signal(false);
  isAdmin = signal(false);

  constructor(private router: Router, private authService: AuthService, public roleService: RoleService) {
    this.authService.isAuthenticated$.subscribe((auth) => {
      this.isAuthenticated.set(auth);
    });

    this.roleService.hasPermission('delete:offertype').subscribe(r => {
      this.isAdmin.set(r);
    })
   }

   

  ngOnInit(): void {
  }

  hamburgerOpen = false;
  adminDropdownOpen = false;

  toggleHamburger(): void {
    this.hamburgerOpen = !this.hamburgerOpen;
  }

  onHamburgerItemClick() {
    if (this.hamburgerOpen) {
      this.hamburgerOpen = false;
    }
  }
  onAdminDropDownClick() {
    this.adminDropdownOpen = !this.adminDropdownOpen;
  }

  closeAdminDropDown() {
    this.adminDropdownOpen = false;
  }

  navigateTo(path: string) {
    this.closeAdminDropDown();
    this.hamburgerOpen = false;
    this.router.navigate([path]);
  }
}