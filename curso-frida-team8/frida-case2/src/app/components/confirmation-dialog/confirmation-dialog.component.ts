import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  @Input() isVisible: boolean = false;
  @Input() title: string = 'Confirmar acción';
  @Input() message: string = '¿Estás seguro de que deseas continuar?';
  @Input() confirmText: string = 'Confirmar';
  @Input() cancelText: string = 'Cancelar';
  @Input() type: 'warning' | 'danger' | 'info' = 'warning';
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  get iconName(): string {
    switch (this.type) {
      case 'danger':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'help_outline';
    }
  }

  get iconColor(): string {
    switch (this.type) {
      case 'danger':
        return 'text-danger';
      case 'info':
        return 'text-info';
      default:
        return 'text-warning';
    }
  }

  get confirmButtonClass(): string {
    switch (this.type) {
      case 'danger':
        return 'btn-danger';
      case 'info':
        return 'btn-info';
      default:
        return 'btn-warning';
    }
  }
}
