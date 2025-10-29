import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { 
  ImageAnalysisResponse, 
  ApiResponse, 
  HealthCheckResponse, 
  FileUploadRequest,
  SupermarketProduct 
} from './api.types';

/**
 * Angular service for consuming the backend API endpoints
 * Provides methods to interact with the ImagesAnalysisController
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * Base URL pointing to the deployed backend on Railway
   * Replace 'tu-backend' with your actual Railway deployment URL
   */
  private baseUrl = 'https://tu-backend.railway.app/api';
  
  /**
   * Default timeout for API requests (30 seconds)
   */
  private readonly defaultTimeout = 30000;

  constructor(private http: HttpClient) { }

  /**
   * Analyzes an uploaded image by sending it to the backend endpoint
   * 
   * @param file - The image file to analyze (MultipartFile)
   * @returns Observable<ImageAnalysisResponse> - The analyzed product information
   */
  analyzeImage(file: File): Observable<ImageAnalysisResponse> {
    // Validate file before sending
    this.validateImageFile(file);

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ImageAnalysisResponse>(
      `${this.baseUrl}/image/analyze`,
      formData
    ).pipe(
      timeout(this.defaultTimeout),
      retry(2), // Retry up to 2 times on failure
      catchError(this.handleError)
    );
  }

  /**
   * Alternative method that returns raw string response from the backend
   * Useful if you need to handle the JSON parsing manually
   * 
   * @param file - The image file to analyze
   * @returns Observable<string> - Raw JSON string response
   */
  analyzeImageRaw(file: File): Observable<string> {
    this.validateImageFile(file);

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${this.baseUrl}/image/analyze`,
      formData,
      { 
        responseType: 'text'
      }
    ).pipe(
      timeout(this.defaultTimeout),
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Health check method to verify backend connectivity
   * 
   * @returns Observable<HealthCheckResponse> - Health status response
   */
  healthCheck(): Observable<HealthCheckResponse> {
    return this.http.get<HealthCheckResponse>(`${this.baseUrl}/health`)
      .pipe(
        timeout(5000), // Shorter timeout for health checks
        catchError(this.handleError)
      );
  }

  /**
   * Validates the uploaded image file
   * 
   * @param file - File to validate
   * @throws Error if file is invalid
   */
  private validateImageFile(file: File): void {
    if (!file) {
      throw new Error('No file provided');
    }

    // Check file size (2MB limit as mentioned in the controller)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      throw new Error('File size exceeds 2MB limit');
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPG and PNG files are allowed');
    }
  }

  /**
   * Handles HTTP errors
   * 
   * @param error - HttpErrorResponse
   * @returns Observable that throws formatted error
   */
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request: Invalid file or request format';
          break;
        case 401:
          errorMessage = 'Unauthorized: Invalid authentication credentials';
          break;
        case 413:
          errorMessage = 'Payload Too Large: File size exceeds server limits';
          break;
        case 415:
          errorMessage = 'Unsupported Media Type: Invalid file format';
          break;
        case 500:
          errorMessage = 'Internal Server Error: Please try again later';
          break;
        case 503:
          errorMessage = 'Service Unavailable: Server is temporarily down';
          break;
        default:
          errorMessage = `Server Error: ${error.status} - ${error.message}`;
      }
    }

    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Updates the base URL for the API service
   * Useful for switching between development and production environments
   * 
   * @param newBaseUrl - New base URL to use
   */
  public setBaseUrl(newBaseUrl: string): void {
    this.baseUrl = newBaseUrl;
  }

  /**
   * Gets the current base URL
   * 
   * @returns Current base URL
   */
  public getBaseUrl(): string {
    return this.baseUrl;
  }
}
