
import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-supermarket',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatListModule, MatToolbarModule, MatButtonModule, MatCardModule, MatIconModule, FormsModule],
  templateUrl: './supermarket.html',
  styleUrl: './supermarket.css',
  encapsulation: ViewEncapsulation.None
})
export class Supermarket {
  products = Array.from({ length: 12 }, (_, i) => ({
    price: '5,65 €',
    title: i === 0 ? 'Bonito del Norte ORTIZ 125 Gr.' : 'Nombre',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    quantity: 1
  }));

  decrement(product: any) {
    if (product.quantity > 0) {
      product.quantity--;
    }
  }

  increment(product: any) {
    product.quantity++;
  }
}