# System Design Specification

## 1. Architecture Overview

### 1.1 High-Level Architecture
The system is built as a client-side Single Page Application (SPA) using Angular with a component-based architecture. The application follows a modular design pattern with reusable components for product management functionality.

### 1.2 Architecture Diagram
```
┌─────────────────────────────────────────┐
���              Frontend (Angular)          │
├─────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────┐   │
│  │   Table     │  │   Search Bar    │   │
│  │ Component   │  │   Component     │   │
│  └─────────────┘  └─────────────────┘   │
│  ┌─────────────┐  ┌─────────────────┐   │
│  │   Edit      │  │    Delete       │   │
│  │   Modal     │  │    Modal        │   │
│  └─────────────┘  └─────────────────┘   │
├─────────────────────────────────────────┤
│           Service Layer                  │
│  ┌─────────────┐  ┌─────────────────┐   │
│  │  Product    │  │   Notification  │   │
│  │  Service    │  │   Service       │   │
│  └─────────────┘  └─────────────────┘   │
├─────────────────────────────────────────┤
│              HTTP Client                 │
└─────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│           Backend API                    │
│      (REST/GraphQL Endpoints)           │
└─────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│            Database                      │
│         (Product Data)                   │
└─────────────────────────────────────────┘
```

### 1.3 Technology Stack

**Frontend Technologies:**
- Angular 15+
- TypeScript
- Bootstrap 5
- Material Icons
- RxJS for reactive programming

**Backend Technologies:**
- Node.js with Express.js / ASP.NET Core / Spring Boot
- RESTful API architecture

**Database Systems:**
- PostgreSQL / MySQL / MongoDB (depending on requirements)

**Third-party Services:**
- None currently required

**Development Tools:**
- Angular CLI
- VS Code / WebStorm
- npm/yarn package manager

## 2. Component Design

### 2.1 Frontend Components

#### Table Component (`table.component.ts`)
**Responsibilities:**
- Display product data in tabular format
- Handle search filtering
- Manage edit/delete operations
- Pagination (future enhancement)

**Key Properties:**
```typescript
export class TableComponent {
  productos: Product[] = [];
  totalProductos: number = 0;
  currentFilter: FilterOptions = { searchText: '', category: 'Todos' };
  isLoading: boolean = false;
}
```

**Key Methods:**
```typescript
onSearchChanged(filter: FilterOptions): void
editProduct(product: Product): void
deleteProduct(productId: string): void
confirmDelete(product: Product): void
loadProducts(): void
```

#### Search Bar Component (`search-bar.component.ts`)
**Responsibilities:**
- Provide search input functionality
- Emit search events to parent component
- Handle category filtering

#### Edit Product Modal Component (New)
**Responsibilities:**
- Display edit form for product
- Validate form input
- Submit updates to service

#### Delete Confirmation Modal Component (New)
**Responsibilities:**
- Show confirmation dialog
- Handle delete confirmation/cancellation

### 2.2 Backend Services

#### Product Service (`product.service.ts`)
**Responsibilities:**
- HTTP operations for product CRUD
- Data transformation and validation
- Error handling

```typescript
@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts(filter?: FilterOptions): Observable<Product[]>
  getProduct(id: string): Observable<Product>
  updateProduct(id: string, product: Partial<Product>): Observable<Product>
  deleteProduct(id: string): Observable<boolean>
  createProduct(product: CreateProductRequest): Observable<Product>
}
```

#### Notification Service (`notification.service.ts`)
**Responsibilities:**
- Display success/error messages
- Toast notifications
- User feedback management

### 2.3 Database Layer
Data access through HTTP client communicating with RESTful API endpoints.

## 3. Data Models

### 3.1 Database Schema

**Products Table:**
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referencia VARCHAR(50) UNIQUE NOT NULL,
  nombre VARCHAR(200) NOT NULL,
  marca VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  disponible INTEGER DEFAULT 0,
  departamento VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_referencia ON products(referencia);
CREATE INDEX idx_products_departamento ON products(departamento);
CREATE INDEX idx_products_marca ON products(marca);
```

### 3.2 TypeScript Interfaces

```typescript
export interface Product {
  id: string;
  referencia: string;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  disponible: number;
  departamento: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProductRequest {
  referencia: string;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  disponible: number;
  departamento: string;
}

export interface UpdateProductRequest {
  nombre?: string;
  marca?: string;
  descripcion?: string;
  precio?: number;
  disponible?: number;
  departamento?: string;
}

export interface FilterOptions {
  searchText: string;
  category: string;
  priceRange?: { min: number; max: number };
}
```

### 3.3 Data Flow
```
User Action → Component → Service → HTTP Client → API → Database
Database → API → HTTP Response → Service → Component → UI Update
```

## 4. API Design

### 4.1 Endpoints

**Get Products**
```
GET /api/products
Query Parameters: 
  - search: string (optional)
  - category: string (optional)
  - page: number (optional, default: 1)
  - limit: number (optional, default: 50)
Response: {
  data: Product[],
  total: number,
  page: number,
  totalPages: number
}
Authentication: Bearer Token
```

**Get Single Product**
```
GET /api/products/:id
Response: Product
Authentication: Bearer Token
```

**Update Product**
```
PUT /api/products/:id
Request: UpdateProductRequest
Response: Product
Authentication: Bearer Token
```

**Delete Product**
```
DELETE /api/products/:id
Response: { success: boolean, message: string }
Authentication: Bearer Token
```

**Create Product**
```
POST /api/products
Request: CreateProductRequest
Response: Product
Authentication: Bearer Token
```

### 4.2 API Patterns
- RESTful conventions with HTTP status codes
- Consistent JSON response format
- Error responses follow RFC 7807 Problem Details format

```typescript
interface ApiResponse<T> {
  data: T;
  message?: string;
  errors?: string[];
}

interface ApiError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
}
```

## 5. Security Design

### 5.1 Authentication Strategy
- JWT Bearer Token authentication
- Token stored in httpOnly cookies or localStorage
- Token refresh mechanism

### 5.2 Authorization
- Role-based access control (RBAC)
- Permissions: `products:read`, `products:write`, `products:delete`
- Route guards for protected pages

### 5.3 Data Protection
- Input validation and sanitization
- XSS protection through Angular's built-in sanitization
- CSRF protection for state-changing operations
- SQL injection prevention through parameterized queries

## 6. Integration Points

### 6.1 External Services
Currently none required, but provision for:
- Email notifications for critical operations
- File upload service for product images
- Analytics service for usage tracking

### 6.2 Internal Integrations
- Components communicate through services and event emitters
- Shared state management through RxJS subjects
- Notification system integration across all CRUD operations

## 7. Performance Considerations

### 7.1 Optimization Strategies
- **Caching**: HTTP interceptor for API response caching
- **Virtual scrolling**: For large product lists (Angular CDK)
- **OnPush change detection**: For performance optimization
- **Lazy loading**: Route-level code splitting
- **Debouncing**: Search input with 300ms delay

### 7.2 Scalability
- Component-based architecture for reusability
- Service abstraction for easy backend switching
- Paginated API responses
- Client-side filtering for small datasets, server-side for large ones

## 8. Error Handling and Logging

### 8.1 Error Handling Strategy
```typescript
// Global error handler
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Global error:', error);
    // Send to logging service
    // Show user-friendly message
  }
}

// HTTP error interceptor  
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle different error types
        return throwError(error);
      })
    );
  }
}
```

### 8.2 Logging and Monitoring
- Console logging in development
- Structured logging to external service in production
- User action tracking
- Performance metrics collection

## 9. Development Workflow

### 9.1 Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── table/
│   │   ├── search-bar/
│   │   ├── edit-product-modal/
│   │   └── delete-confirmation-modal/
│   ├── services/
│   │   ├── product.service.ts
│   │   └── notification.service.ts
│   ├── models/
│   │   └── product.model.ts
│   ├── guards/
│   ├── interceptors/
│   └── shared/
├── assets/
├── environments/
└── styles/
```

### 9.2 Development Environment
**Environment Variables:**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  logLevel: 'debug'
};
```

### 9.3 Testing Strategy
- **Unit Tests**: Jasmine + Karma (>80% coverage)
- **Component Tests**: Angular Testing Utilities
- **Integration Tests**: HTTP client testing with HttpClientTestingModule
- **E2E Tests**: Cypress for critical user flows

## 10. Deployment Architecture

### 10.1 Deployment Strategy
- **Development**: Local development server (`ng serve`)
- **Staging**: Docker container with nginx
- **Production**: CDN deployment (AWS CloudFront, Vercel, Netlify)

### 10.2 Infrastructure
- **Frontend Hosting**: Static file hosting on CDN
- **Backend API**: Container-based deployment
- **Database**: Managed database service (AWS RDS, Azure SQL)
- **CI/CD**: GitHub Actions or Azure DevOps

## Enhanced Table Component Implementation

### Updated Template (`table.component.html`)
```html
<div class="container-fluid min-vh-100">
  <div class="row">
    <div class="col-12 pt-3">
      <h4>Productos en tienda</h4>
      <span class="px-2 py-1 rounded bg-light text-muted">
        {{ totalProductos }} productos 
        {{ currentFilter.searchText || currentFilter.category !== 'Todos' ? 'encontrados' : 'cargados' }}
      </span>
      <div class="float-end">
        <app-search-bar (searchChanged)="onSearchChanged($event)"></app-search-bar>
      </div>
    </div>
    <div class="col-12 mt-3">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr>
              <th>Referencia</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>N° Disp</th>
              <th>Departamento</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let producto of productos; trackBy: trackByProductId">
              <td>{{ producto.referencia }}</td>
              <td>{{ producto.nombre }}</td>
              <td>{{ producto.marca }}</td>
              <td>{{ producto.descripcion }}</td>
              <td>{{ producto.precio | currency:'COP':'symbol':'1.0-0' }}</td>
              <td>
                <span [class]="getStockClass(producto.disponible)">
                  {{ producto.disponible }}
                </span>
              </td>
              <td>{{ producto.departamento }}</td>
              <td class="text-center">
                <button 
                  class="btn btn-sm btn-outline-primary me-2"
                  (click)="editProduct(producto)"
                  [disabled]="isLoading"
                  title="Editar producto">
                  <i class="material-icons">edit</i>
                </button>
                <button 
                  class="btn btn-sm btn-outline-danger"
                  (click)="confirmDelete(producto)"
                  [disabled]="isLoading"
                  title="Eliminar producto">
                  <i class="material-icons">delete</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Loading state -->
      <div *ngIf="isLoading" class="text-center py-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
      
      <!-- Empty state -->
      <div *ngIf="!isLoading && productos.length === 0" class="text-center py-5">
        <i class="material-icons text-muted" style="font-size: 48px;">inventory_2</i>
        <p class="text-muted mt-2">No se encontraron productos</p>
      </div>
    </div>
  </div>
</div>

<!-- Edit Product Modal -->
<app-edit-product-modal 
  [product]="selectedProduct"
  [isVisible]="showEditModal"
  (save)="onProductSaved($event)"
  (cancel)="onEditCancel()">
</app-edit-product-modal>

<!-- Delete Confirmation Modal -->
<app-delete-confirmation-modal
  [item]="productToDelete"
  [isVisible]="showDeleteModal"
  (confirm)="onDeleteConfirm()"
  (cancel)="onDeleteCancel()">
</app-delete-confirmation-modal>
```

### Component Logic (`table.component.ts`)
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Product, FilterOptions } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  productos: Product[] = [];
  totalProductos: number = 0;
  currentFilter: FilterOptions = { searchText: '', category: 'Todos' };
  isLoading: boolean = false;
  
  // Modal states
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  selectedProduct: Product | null = null;
  productToDelete: Product | null = null;
  
  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts(): void {
    this.isLoading = true;
    
    this.productService.getProducts(this.currentFilter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.productos = response.data;
          this.totalProductos = response.total;
          this.isLoading = false;
        },
        error: (error) => {
          this.notificationService.showError('Error al cargar productos');
          this.isLoading = false;
          console.error('Error loading products:', error);
        }
      });
  }

  onSearchChanged(filter: FilterOptions): void {
    this.currentFilter = filter;
    this.loadProducts();
  }

  editProduct(product: Product): void {
    this.selectedProduct = { ...product }; // Create a copy
    this.showEditModal = true;
  }

  confirmDelete(product: Product): void {
    this.productToDelete = product;
    this.showDeleteModal = true;
  }

  onProductSaved(updatedProduct: Product): void {
    this.isLoading = true;
    
    this.productService.updateProduct(updatedProduct.id, updatedProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (product) => {
          // Update local array
          const index = this.productos.findIndex(p => p.id === product.id);
          if (index !== -1) {
            this.productos[index] = product;
          }
          
          this.notificationService.showSuccess('Producto actualizado correctamente');
          this.showEditModal = false;
          this.selectedProduct = null;
          this.isLoading = false;
        },
        error: (error) => {
          this.notificationService.showError('Error al actualizar producto');
          this.isLoading = false;
          console.error('Error updating product:', error);
        }
      });
  }

  onEditCancel(): void {
    this.showEditModal = false;
    this.selectedProduct = null;
  }

  onDeleteConfirm(): void {
    if (!this.productToDelete) return;
    
    this.isLoading = true;
    
    this.productService.deleteProduct(this.productToDelete.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          // Remove from local array
          this.productos = this.productos.filter(p => p.id !== this.productToDelete?.id);
          this.totalProductos--;
          
          this.notificationService.showSuccess('Producto eliminado correctamente');
          this.showDeleteModal = false;
          this.productToDelete = null;
          this.isLoading = false;
        },
        error: (error) => {
          this.notificationService.showError('Error al eliminar producto');
          this.isLoading = false;
          console.error('Error deleting product:', error);
        }
      });
  }

  onDeleteCancel(): void {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }

  trackByProductId(index: number, product: Product): string {
    return product.id;
  }

  getStockClass(stock: number): string {
    if (stock === 0) return 'badge bg-danger';
    if (stock <= 5) return 'badge bg-warning text-dark';
    return 'badge bg-success';
  }
}
```

This comprehensive design provides a solid foundation for implementing the edit and delete functionality with proper error handling, user feedback, and maintainable code architecture.