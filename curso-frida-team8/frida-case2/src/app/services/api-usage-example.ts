/**
 * Example usage of the ApiService in Angular components
 * This file demonstrates how to integrate the API service into your components
 */

import { Component, inject } from '@angular/core';
import { ApiService } from './api.service';
import { ImageAnalysisResponse } from './api.types';

/**
 * Example component showing how to use the ApiService
 */
@Component({
  selector: 'app-image-analysis-example',
  template: `
    <div class="image-upload-example">
      <input type="file" 
             #fileInput 
             (change)="onFileSelected($event)"
             accept="image/jpeg,image/png">
      
      <button (click)="analyzeSelectedImage()" 
              [disabled]="!selectedFile || isAnalyzing">
        {{ isAnalyzing ? 'Analyzing...' : 'Analyze Image' }}
      </button>
      
      <div *ngIf="analysisResult" class="results">
        <h3>Analysis Results:</h3>
        <p><strong>Type:</strong> {{ analysisResult?.type }}</p>
        <p><strong>Weight:</strong> {{ analysisResult?.weight }}</p>
        <p><strong>Price:</strong> {{ analysisResult?.price }}</p>
        <p><strong>Category:</strong> {{ analysisResult?.category }}</p>
      </div>
      
      <div *ngIf="errorMessage" class="error">
        {{ errorMessage }}
      </div>
    </div>
  `
})
export class ImageAnalysisExampleComponent {
  // Modern Angular dependency injection
  private apiService = inject(ApiService);
  
  selectedFile: File | null = null;
  isAnalyzing = false;
  analysisResult: ImageAnalysisResponse | null = null;
  errorMessage: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.errorMessage = '';
    }
  }

  analyzeSelectedImage(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file first';
      return;
    }

    this.isAnalyzing = true;
    this.errorMessage = '';
    this.analysisResult = null;

    this.apiService.analyzeImage(this.selectedFile).subscribe({
      next: (result: ImageAnalysisResponse) => {
        this.analysisResult = result;
        this.isAnalyzing = false;
        console.log('Analysis completed:', result);
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.isAnalyzing = false;
        console.error('Analysis failed:', error);
      }
    });
  }

  // Alternative method using the raw string response
  analyzeImageRaw(): void {
    if (!this.selectedFile) return;

    this.apiService.analyzeImageRaw(this.selectedFile).subscribe({
      next: (rawResponse: string) => {
        try {
          // Parse the JSON response manually
          const parsed = JSON.parse(rawResponse);
          this.analysisResult = parsed;
          console.log('Raw analysis result:', rawResponse);
        } catch (parseError) {
          this.errorMessage = 'Failed to parse response';
          console.error('Parse error:', parseError);
        }
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        console.error('Raw analysis failed:', error);
      }
    });
  }

  // Health check example
  checkApiHealth(): void {
    this.apiService.healthCheck().subscribe({
      next: (health) => {
        console.log('API Health Status:', health);
      },
      error: (error) => {
        console.error('Health check failed:', error);
      }
    });
  }
}

/**
 * Example service usage in the image-uploader component
 * How to integrate with existing components
 */
export class ImageUploaderIntegrationExample {
  private apiService = inject(ApiService);

  // Method to be called when image is ready for analysis
  onSaveImage(file: File): void {
    // Show uploading state (existing functionality)
    this.setUploadingState();

    // Call the API to analyze the image
    this.apiService.analyzeImage(file).subscribe({
      next: (analysis: ImageAnalysisResponse) => {
        // Handle successful analysis
        console.log('Product analysis:', analysis);
        
        // You can now use the analysis data to:
        // 1. Pre-fill product forms
        // 2. Show product suggestions
        // 3. Store in local state for later use
        
        // Navigate to personal area after analysis
        setTimeout(() => {
          this.navigateToPersonalArea(analysis);
        }, 10000); // 10 seconds as requested
      },
      error: (error: Error) => {
        // Handle analysis error
        console.error('Analysis failed:', error);
        
        // Still navigate to personal area even if analysis fails
        setTimeout(() => {
          this.navigateToPersonalArea(null);
        }, 10000);
      }
    });
  }

  private setUploadingState(): void {
    // Existing implementation
  }

  private navigateToPersonalArea(analysisData?: ImageAnalysisResponse | null): void {
    // Navigate to personal-area-page
    // Pass analysis data if available
  }
}
