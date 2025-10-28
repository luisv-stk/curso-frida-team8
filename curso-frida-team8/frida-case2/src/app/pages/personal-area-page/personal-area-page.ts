import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component'; 
import { CartComponent } from '../../components/cart/cart.component'; 


/**
 * Página de área personal que incluye la tabla usando TableComponent.
 */
@Component({
  selector: 'app-personal-area-page',
  standalone: true,
  imports: [CommonModule, TableComponent, CartComponent], // TableComponent incluido
  templateUrl: './personal-area-page.html',
  styleUrls: ['./personal-area-page.css']
})
export class PersonalAreaPage {
  // lógica de la página aquí
}