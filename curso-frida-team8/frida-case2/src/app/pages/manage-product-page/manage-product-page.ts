import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from '../../components/image-uploader/image-uploader.component'; 
import { CartComponent } from '../../components/cart/cart.component'; 
/**
 * Standalone component para la página de gestión de productos.
 */
@Component({
  selector: 'app-manage-product-page',
  standalone: true,
  imports: [CommonModule, CartComponent, ImageUploaderComponent],
  templateUrl: './manage-product-page.html',
  styleUrls: ['./manage-product-page.css']
})
export class ManageProductPage {}
