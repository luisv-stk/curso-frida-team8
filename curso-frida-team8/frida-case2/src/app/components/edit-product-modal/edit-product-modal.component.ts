import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-edit-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product-modal.component.html',
  styleUrl: './edit-product-modal.component.css'
})
export class EditProductModalComponent {
  @Input() product: Product | null = null;
  @Input() isVisible: boolean = false;
  @Output() save = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  // Working copy of the product for editing
  editingProduct: Product = {
    referencia: '',
    nombre: '',
    marca: '',
    descripcion: '',
    precio: '',
    disponible: 0,
    departamento: ''
  };

  // Available departments for dropdown
  departamentos = [
    'Alimentación',
    'Ropa',
    'Electrodomésticos',
    'Hogar',
    'Deportes',
    'Libros',
    'Juguetes'
  ];

  ngOnChanges() {
    if (this.product) {
      // Create a copy of the product for editing
      this.editingProduct = { ...this.product };
    }
  }

  onSave() {
    if (this.isFormValid()) {
      this.save.emit(this.editingProduct);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  private isFormValid(): boolean {
    return !!(
      this.editingProduct.referencia &&
      this.editingProduct.nombre &&
      this.editingProduct.marca &&
      this.editingProduct.descripcion &&
      this.editingProduct.precio &&
      this.editingProduct.disponible >= 0 &&
      this.editingProduct.departamento
    );
  }

  // Helper method to check if form is valid for UI
  get isFormInvalid(): boolean {
    return !this.isFormValid();
  }
}
