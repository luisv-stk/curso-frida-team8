import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css',
})
export class ImageUploaderComponent implements OnDestroy {
  fileName = 'Bonito_norte_ortiz_oliva.JPG';
  
  // State management
  currentState: 'initial' | 'file-selected' | 'uploading' = 'initial';
  selectedFile: File | null = null;
  private uploadTimeout: any = null;

  constructor(private router: Router) {}

  ngOnDestroy(): void {
    if (this.uploadTimeout) {
      clearTimeout(this.uploadTimeout);
    }
  }

  // State getters
  get isInitialState(): boolean {
    return this.currentState === 'initial';
  }

  get isFileSelectedState(): boolean {
    return this.currentState === 'file-selected';
  }

  get isUploadingState(): boolean {
    return this.currentState === 'uploading';
  }

  // File handling methods
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFileSelection(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.handleFileSelection(file);
    }
  }

  private handleFileSelection(file: File) {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Por favor, selecciona un archivo JPG o PNG.');
      return;
    }

    // Validate file size (2MB max)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      alert('El archivo no puede superar los 2 MB.');
      return;
    }

    this.selectedFile = file;
    this.fileName = file.name;
    this.currentState = 'file-selected';
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }

  onDelete() {
    console.log('Delete action');
    this.selectedFile = null;
    this.fileName = '';
    this.currentState = 'initial';
  }

  onSave() {
    console.log('Save action');
    if (this.selectedFile) {
      this.currentState = 'uploading';
      // Simulate upload process
      this.simulateUpload();
    }
  }

  onCancel() {
    console.log('Cancel action');
    // Clear the upload timeout if it exists
    if (this.uploadTimeout) {
      clearTimeout(this.uploadTimeout);
      this.uploadTimeout = null;
    }
    this.selectedFile = null;
    this.fileName = '';
    this.currentState = 'initial';
  }

  private simulateUpload() {
    // Simulate upload delay and then redirect to personal-area page
    this.uploadTimeout = setTimeout(() => {
      console.log('Upload completed');
      // Navigate to personal-area page with state indicating successful upload
      this.router.navigate(['/personal-area'], { 
        queryParams: { showNotification: 'true', message: 'Producto subido correctamente' }
      });
    }, 5000); // 10 seconds (10000 ms)
  }
}
