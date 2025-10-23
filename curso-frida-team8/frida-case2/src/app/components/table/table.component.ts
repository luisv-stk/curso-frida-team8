import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  referencia: string;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: string;
  disponible: number;
  departamento: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class AppComponent {
  productos: Product[] = Array(10).fill({
    referencia: '123-ABCDR',
    nombre: 'Bonito del norte',
    marca: 'Ortiz',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur',
    precio: '5,63',
    disponible: 126,
    departamento: 'Alimentación'
  });

  searchText: string = '';
}