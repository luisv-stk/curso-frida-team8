import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  logoUrl: string;

  constructor(
    private router: Router,
    private imageService: ImageService
  ) {
    this.logoUrl = this.imageService.getImageUrl('logo.png');
  }

  navigateToManageProduct(): void {
    this.router.navigate(['/manage-product']);
  }

}
