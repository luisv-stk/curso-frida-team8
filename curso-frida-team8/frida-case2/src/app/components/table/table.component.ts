import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent, SearchFilter } from '../search-bar/search-bar.component';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
  imports: [CommonModule, FormsModule, SearchBarComponent, EditProductModalComponent, ConfirmationDialogComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  // Original complete product list
  allProductos: Product[] = [
    {
      referencia: '123-ABCDR',
      nombre: 'Bonito del norte',
      marca: 'Ortiz',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur',
      precio: '5,63',
      disponible: 126,
      departamento: 'Alimentación'
    },
    {
      referencia: '456-DEFGH',
      nombre: 'Camiseta básica',
      marca: 'Zara',
      descripcion: 'Camiseta de algodón 100%',
      precio: '12,99',
      disponible: 45,
      departamento: 'Ropa'
    },
    {
      referencia: '789-HIJKL',
      nombre: 'Microondas',
      marca: 'Samsung',
      descripcion: 'Microondas 800W con grill',
      precio: '89,99',
      disponible: 8,
      departamento: 'Electrodomésticos'
    },
    {
      referencia: '101-MNOPQ',
      nombre: 'Aceite de oliva',
      marca: 'Carbonell',
      descripcion: 'Aceite de oliva virgen extra 1L',
      precio: '4,25',
      disponible: 200,
      departamento: 'Alimentación'
    },
    {
      referencia: '112-RSTUV',
      nombre: 'Pantalón vaquero',
      marca: 'Levis',
      descripcion: 'Pantalón vaquero slim fit',
      precio: '65,00',
      disponible: 23,
      departamento: 'Ropa'
    },
    {
      referencia: '131-WXYZ',
      nombre: 'Tostadora',
      marca: 'Philips',
      descripcion: 'Tostadora 2 rebanadas',
      precio: '35,50',
      disponible: 15,
      departamento: 'Electrodomésticos'
    }
  ];

  // Filtered product list (displayed in table)
  productos: Product[] = [...this.allProductos];
  
  // Current search filter
  currentFilter: SearchFilter = { searchText: '', category: 'Todos' };

  // Edit modal state
  isEditModalVisible: boolean = false;
  productToEdit: Product | null = null;

  // Confirmation dialog state
  isConfirmDialogVisible: boolean = false;
  confirmDialogData: {
    title: string;
    message: string;
    type: 'warning' | 'danger' | 'info';
    action: () => void;
  } | null = null;

  // Success notification state
  successMessage: string = '';
  showSuccessNotification: boolean = false;

  get totalProductos(): number {
    return this.productos.length;
  }

  onSearchChanged(filter: SearchFilter) {
    this.currentFilter = filter;
    this.filterProducts();
  }

  private filterProducts() {
    let filtered = [...this.allProductos];

    // Filter by search text
    if (this.currentFilter.searchText) {
      filtered = filtered.filter(product => 
        product.nombre.toLowerCase().includes(this.currentFilter.searchText) ||
        product.marca.toLowerCase().includes(this.currentFilter.searchText) ||
        product.descripcion.toLowerCase().includes(this.currentFilter.searchText) ||
        product.referencia.toLowerCase().includes(this.currentFilter.searchText)
      );
    }

    // Filter by category/department
    if (this.currentFilter.category && this.currentFilter.category !== 'Todos') {
      filtered = filtered.filter(product => 
        product.departamento === this.currentFilter.category
      );
    }

    this.productos = filtered;
  }

  // Edit functionality - Open modal
  editProduct(producto: Product) {
    console.log('Editando producto:', producto);
    this.productToEdit = { ...producto }; // Create a copy
    this.isEditModalVisible = true;
  }

  // Handle save from edit modal
  onSaveProduct(updatedProduct: Product) {
    // Find and update the product in allProductos
    const index = this.allProductos.findIndex(p => p.referencia === updatedProduct.referencia);
    if (index > -1) {
      this.allProductos[index] = { ...updatedProduct };
      
      // Re-filter to update the displayed list
      this.filterProducts();
      
      console.log('Producto actualizado:', updatedProduct);
      
      // Close modal
      this.closeEditModal();
      
      // Show success message
      this.showSuccessMessage(`"${updatedProduct.nombre}" ha sido actualizado correctamente`);
    } else {
      console.error('Producto no encontrado para actualizar:', updatedProduct);
      this.showErrorMessage('Error: No se pudo encontrar el producto para actualizar');
    }
  }

  // Handle cancel from edit modal
  onCancelEdit() {
    this.closeEditModal();
  }

  // Close edit modal
  private closeEditModal() {
    this.isEditModalVisible = false;
    this.productToEdit = null;
  }

  // Delete functionality with custom confirmation dialog
  deleteProduct(producto: Product) {
    this.confirmDialogData = {
      title: 'Eliminar Producto',
      message: `¿Estás seguro de que deseas eliminar "${producto.nombre}"?\n\nEsta acción no se puede deshacer.`,
      type: 'danger',
      action: () => this.performDelete(producto)
    };
    this.isConfirmDialogVisible = true;
  }

  // Perform the actual delete operation
  private performDelete(producto: Product) {
    try {
      // Remove from all products array
      const allIndex = this.allProductos.findIndex(p => p.referencia === producto.referencia);
      if (allIndex > -1) {
        this.allProductos.splice(allIndex, 1);
        
        // Re-filter the products to update the displayed list
        this.filterProducts();
        
        console.log('Producto eliminado:', producto);
        
        // Show success notification
        this.showSuccessMessage(`"${producto.nombre}" ha sido eliminado correctamente`);
        
      } else {
        console.error('Producto no encontrado para eliminar:', producto);
        this.showErrorMessage('Error: No se pudo encontrar el producto para eliminar');
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      this.showErrorMessage('Error: No se pudo eliminar el producto');
    }
  }

  // Handle confirmation dialog confirm
  onConfirmDialog() {
    if (this.confirmDialogData && this.confirmDialogData.action) {
      this.confirmDialogData.action();
    }
    this.closeConfirmDialog();
  }

  // Handle confirmation dialog cancel
  onCancelDialog() {
    this.closeConfirmDialog();
  }

  // Close confirmation dialog
  private closeConfirmDialog() {
    this.isConfirmDialogVisible = false;
    this.confirmDialogData = null;
  }

  // Show success message with auto-hide
  private showSuccessMessage(message: string) {
    this.successMessage = message;
    this.showSuccessNotification = true;
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      this.showSuccessNotification = false;
      this.successMessage = '';
    }, 3000);
  }

  // Show error message (using alert for now, can be enhanced later)
  private showErrorMessage(message: string) {
    alert(message);
  }
}
