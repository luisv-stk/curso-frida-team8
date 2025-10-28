# Componente de Tabla Angular

Un componente de tabla avanzado y reutilizable construido con Angular standalone components y signals, que proporciona funcionalidades completas de ordenamiento, filtrado, paginación y selección.

## 📋 Características

- ✅ **Ordenamiento**: Ordenamiento ascendente/descendente por columnas
- 🔍 **Filtrado**: Filtros por columna en tiempo real
- 📄 **Paginación**: Navegación por páginas con configuración flexible
- ☑️ **Selección**: Selección múltiple de filas con checkbox
- 🎨 **Personalización**: Temas y estilos configurables
- 📱 **Responsivo**: Adaptado para dispositivos móviles
- ♿ **Accesible**: Cumple con estándares de accesibilidad
- ⚡ **Rendimiento**: Optimizado con Angular Signals
- 🌙 **Modo Oscuro**: Soporte automático para modo oscuro
- 🎯 **TypeScript**: Tipado completo con generics

## 🚀 Instalación y Uso

### 1. Importar el Componente

```typescript
import { TableComponent, TableColumn, TableConfig } from './components/table';

@Component({
  selector: 'app-mi-componente',
  standalone: true,
  imports: [TableComponent],
  template: `
    <app-table
      [data]="datos"
      [columns]="columnas"
      [config]="configuracion">
    </app-table>
  `
})
export class MiComponente {
  // ... implementación
}
```

### 2. Definir las Columnas

```typescript
interface MiDato {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
}

const columnas: TableColumn<MiDato>[] = [
  {
    key: 'id',
    label: 'ID',
    width: '80px',
    align: 'center',
    sortable: true
  },
  {
    key: 'nombre',
    label: 'Nombre',
    sortable: true,
    filterable: true
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
    filterable: true
  },
  {
    key: 'activo',
    label: 'Estado',
    sortable: true,
    formatter: (value: boolean) => value ? 'Activo' : 'Inactivo',
    cellClass: (value: boolean) => value ? 'text-success' : 'text-danger'
  }
];
```

### 3. Configurar la Tabla

```typescript
const configuracion: TableConfig = {
  striped: true,
  hoverable: true,
  responsive: true,
  bordered: false,
  dense: false
};
```

## 📚 API Reference

### Props de Entrada (Inputs)

| Propiedad | Tipo | Requerido | Valor por Defecto | Descripción |
|-----------|------|-----------|-------------------|-------------|
| `data` | `T[]` | ✅ | `[]` | Array de datos a mostrar |
| `columns` | `TableColumn<T>[]` | ✅ | `[]` | Configuración de columnas |
| `config` | `TableConfig` | ��� | `{}` | Configuración visual |
| `loading` | `boolean` | ❌ | `false` | Estado de carga |
| `selectable` | `boolean` | ❌ | `false` | Habilita selección múltiple |
| `pagination` | `PaginationConfig` | ❌ | `undefined` | Configuración de paginación |
| `emptyMessage` | `string` | ❌ | `'No hay datos para mostrar'` | Mensaje cuando no hay datos |
| `loadingMessage` | `string` | ❌ | `'Cargando...'` | Mensaje durante la carga |

### Eventos de Salida (Outputs)

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `onSort` | `TableSortEvent` | Se emite cuando se ordena una columna |
| `onFilter` | `TableFilterEvent` | Se emite cuando se filtra una columna |
| `onSelect` | `TableSelectionEvent<T>` | Se emite cuando se seleccionan filas |
| `onPageChange` | `TablePaginationEvent` | Se emite cuando cambia la página |
| `onRowClick` | `{row: T, index: number}` | Se emite al hacer clic en una fila |
| `onRowDoubleClick` | `{row: T, index: number}` | Se emite al hacer doble clic en una fila |

### Interfaces

#### TableColumn<T>

```typescript
interface TableColumn<T = any> {
  key: string;                                    // Clave del campo en los datos
  label: string;                                  // Texto del encabezado
  sortable?: boolean;                             // Si la columna es ordenable
  filterable?: boolean;                           // Si la columna es filterable
  width?: string;                                 // Ancho de la columna
  align?: 'left' | 'center' | 'right';          // Alineación del contenido
  formatter?: (value: any, row: T) => string;    // Función para formatear el valor
  cellClass?: string | ((value: any, row: T) => string); // Clases CSS para la celda
}
```

#### TableConfig

```typescript
interface TableConfig {
  striped?: boolean;      // Filas alternadas
  bordered?: boolean;     // Bordes en todas las celdas
  hoverable?: boolean;    // Efecto hover en las filas
  dense?: boolean;        // Padding reducido
  responsive?: boolean;   // Comportamiento responsivo
}
```

#### PaginationConfig

```typescript
interface PaginationConfig {
  enabled: boolean;           // Habilita la paginación
  pageSize: number;          // Elementos por página
  showSizeOptions?: boolean; // Muestra selector de tamaño de página
  sizeOptions?: number[];    // Opciones de tamaño disponibles
}
```

## 🎨 Personalización de Estilos

El componente utiliza CSS custom properties para fácil personalización:

```css
.table-container {
  --table-bg: #ffffff;
  --table-border-color: #dee2e6;
  --table-hover-bg: #f8f9fa;
  --table-selected-bg: #e7f3ff;
  --table-header-bg: #f8f9fa;
  --table-text-color: #212529;
}

/* Modo oscuro */
@media (prefers-color-scheme: dark) {
  .table-container {
    --table-bg: #2d3748;
    --table-border-color: #4a5568;
    --table-hover-bg: #4a5568;
    --table-selected-bg: #2b6cb0;
    --table-header-bg: #4a5568;
    --table-text-color: #e2e8f0;
  }
}
```

## 📱 Comportamiento Responsivo

El componente se adapta automáticamente a diferentes tamaños de pantalla:

- **Desktop**: Vista completa con todas las funcionalidades
- **Tablet**: Ajuste de controles de paginación
- **Mobile**: Diseño compacto con navegación adaptada

## ♿ Accesibilidad

- Soporte completo para navegación por teclado
- Roles ARIA apropiados
- Indicadores de estado para lectores de pantalla
- Soporte para modo de alto contraste
- Respeto por la configuración de reducción de movimiento

## 🔧 Ejemplos Avanzados

### Con Formateo de Datos

```typescript
{
  key: 'fechaCreacion',
  label: 'Fecha',
  formatter: (fecha: Date) => fecha.toLocaleDateString('es-ES'),
  sortable: true
}
```

### Con Clases Dinámicas

```typescript
{
  key: 'estado',
  label: 'Estado',
  cellClass: (valor: string) => {
    switch(valor) {
      case 'activo': return 'badge bg-success';
      case 'inactivo': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }
}
```

### Con Paginación Avanzada

```typescript
<app-table
  [pagination]="{
    enabled: true,
    pageSize: 25,
    showSizeOptions: true,
    sizeOptions: [10, 25, 50, 100]
  }">
</app-table>
```

### Manejo de Eventos

```typescript
onSelectionChange(event: TableSelectionEvent<Usuario>) {
  console.log('Usuarios seleccionados:', event.selectedRows);
  console.log('Todos seleccionados:', event.allSelected);
}

onSortChange(event: TableSortEvent) {
  console.log(`Ordenar por ${event.column} en dirección ${event.direction}`);
}

onFilterChange(event: TableFilterEvent) {
  console.log(`Filtrar ${event.column} por: ${event.value}`);
}
```

## 🔍 Troubleshooting

### Problema: Las fechas no se muestran correctamente
**Solución**: Usar un formatter para convertir las fechas:

```typescript
formatter: (fecha: string | Date) => {
  const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
  return date.toLocaleDateString('es-ES');
}
```

### Problema: Los estilos no se aplican
**Solución**: Verificar que Bootstrap esté incluido o añadir estilos personalizados.

### Problema: La paginación no funciona
**Solución**: Asegurarse de que `pagination.enabled` esté en `true` y que haya suficientes datos.

## 📈 Rendimiento

- Utiliza Angular Signals para updates eficientes
- Computed values para cálculos optimizados
- Virtual scrolling recomendado para datasets muy grandes
- Lazy loading compatible

## 🔄 Versionado

- **v1.0.0**: Versión inicial con funcionalidades básicas
- Sigue [Semantic Versioning](https://semver.org/)

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.
