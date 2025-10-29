import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePageComponent {
  
  constructor(private router: Router) {}

  navigateToImageUploader(): void {
    this.router.navigate(['/manage-product']);
  }

  navigateToPersonalArea(): void {
    this.router.navigate(['/personal-area']);
  }

  navigateToManageProduct(): void {
    this.router.navigate(['/manage-product']);
  }
}
