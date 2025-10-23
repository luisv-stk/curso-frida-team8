import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css',
})
export class ImageUploaderComponent {
  fileName = 'Bonito_norte_ortiz_oliva.JPG';

  onDelete() {
    console.log('Delete action');
  }

  onSave() {
    console.log('Save action');
  }
}
