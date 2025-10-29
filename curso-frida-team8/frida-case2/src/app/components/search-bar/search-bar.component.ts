import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface SearchFilter {
  searchText: string;
  category: string;
}

@Component({
  selector: 'app-search-bar',
  standalone: true,
   imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Output() searchChanged = new EventEmitter<SearchFilter>();

  categories = ['Todos', 'Alimentación', 'Ropa', 'Electrodomésticos'];
  selectedCategory = 'Todos';
  searchText = '';

  ngOnInit() {
    // Emit initial empty search on component load
    this.emitSearchChange();
  }

  onSearchTextChange() {
    // Emit search change on text input (real-time filtering)
    this.emitSearchChange();
  }

  onCategoryChange() {
    // Emit search change when category dropdown changes
    this.emitSearchChange();
  }

  search() {
    // Explicit search button click - also emit the change
    this.emitSearchChange();
  }

  private emitSearchChange() {
    const filter: SearchFilter = {
      searchText: this.searchText.trim().toLowerCase(),
      category: this.selectedCategory
    };
    this.searchChanged.emit(filter);
  }
}
