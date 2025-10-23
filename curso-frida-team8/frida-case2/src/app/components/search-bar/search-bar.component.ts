import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
   imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  categories = ['Todos', 'Alimentos', 'Ropa', 'Electrodomésticos'];
  selectedCategory = 'Todos';
  searchText = '';

  search() {
    console.log(`Searching for ${this.searchText} in ${this.selectedCategory}`);
  }
}
