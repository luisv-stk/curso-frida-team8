import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly assetsPath: string;

  constructor() {
    // In development, use relative path, in production use absolute path
    this.assetsPath = isDevMode() ? 'assets' : '/assets';
  }

  getImageUrl(name: string): string {
    // Ensure name is provided and doesn't start with a slash
    if (!name) {
      throw new Error('Image name is required');
    }
    
    const cleanName = name.startsWith('/') ? name.slice(1) : name;
    return `${this.assetsPath}/${cleanName}`;
  }
}
