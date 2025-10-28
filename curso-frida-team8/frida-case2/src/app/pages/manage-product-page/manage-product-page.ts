import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Standalone component para la página de gestión de productos.
 */
@Component({
  selector: 'app-manage-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-product-page.html',
  styleUrls: ['./manage-product-page.css']
})
export class ManageProductPage {}
