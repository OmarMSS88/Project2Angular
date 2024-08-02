import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../services/user.service'; // Adjust the path as needed
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'] // Fixed typo in styleUrl
})
export class UserProfileComponent implements OnInit {
  fullName: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user?.sub) {
        this.userService.getUserProfile(user.sub).subscribe(profile => {
          this.fullName = profile.fullName; // Load existing full name
        });
      }
    });
  }

  updateProfile(): void {

    if (this.fullName.trim() === '') {
      this.errorMessage = 'No empty name'; // Set error message if fullName is empty
      this.successMessage = '';
      return;
    }


    this.authService.user$.subscribe(user => {
      if (user?.sub) {
        this.userService.updateUserProfile(user.sub, { fullName: this.fullName }).subscribe(
          () => {
            this.successMessage = 'Display name changed!'; // Set success message on successful update
            this.errorMessage = '';
          },
          error => {
            console.error('Error updating profile:', error);
            this.errorMessage = 'Error updating profile'; // Set error message on failure
            this.successMessage = '';
          }
        );
      }
    });
  }
}
