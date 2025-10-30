
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  products = [
    {
      price: '5,65 €',
      name: 'Bonito del Norte ORTIZ',
      weight: '125 Gr.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://placehold.co/400x400/jpg'
    },
    {
      price: '5,65 €',
      name: 'Nombre',
      weight: 'Cantidad',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://placehold.co/400x400/jpg'
    },
    {
      price: '5,65 €',
      name: 'Nombre',
      weight: 'Cantidad',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://placehold.co/400x400/jpg'
    },
    {
      price: '5,65 €',
      name: 'Nombre',
      weight: 'Cantidad',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://placehold.co/400x400/jpg'
    }
  ];
}