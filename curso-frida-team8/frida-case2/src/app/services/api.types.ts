/**
 * TypeScript interfaces for API responses and request/response structures
 */

/**
 * Main interface for the image analysis response structure
 * Based on the backend controller's expected JSON response format
 */
export interface ImageAnalysisResponse {
  type?: string;           // Type of product (e.g., "Fruta", "Verdura", "Carne")
  weight?: string;         // Estimated weight (e.g., "500g", "1kg")
  price?: string;          // Estimated price in Euros (e.g., "2.50€")
  description?: string;    // Product description
  category?: string;       // Product category for supermarket catalogue
  brand?: string;          // Brand name if identifiable
  unit?: string;           // Unit of measurement
  name?: string;           // Product name
  origin?: string;         // Origin information if available
  quality?: string;        // Quality indicators
  nutritionalInfo?: NutritionalInfo;  // Nutritional information if available
  [key: string]: any;      // Allow additional properties for flexible response structure
}

/**
 * Nutritional information structure
 */
export interface NutritionalInfo {
  calories?: string;
  protein?: string;
  carbohydrates?: string;
  fat?: string;
  fiber?: string;
  sugar?: string;
  sodium?: string;
}

/**
 * API Error response structure
 */
export interface ApiError {
  message: string;
  code?: string;
  timestamp?: string;
  path?: string;
  status?: number;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

/**
 * File upload request structure
 */
export interface FileUploadRequest {
  file: File;
  metadata?: {
    originalName?: string;
    size?: number;
    type?: string;
    uploadedAt?: Date;
  };
}

/**
 * Health check response structure
 */
export interface HealthCheckResponse {
  status: 'UP' | 'DOWN';
  timestamp: string;
  version?: string;
  services?: {
    database?: 'UP' | 'DOWN';
    llm?: 'UP' | 'DOWN';
    [key: string]: string | undefined;
  };
}

/**
 * Configuration for API requests
 */
export interface ApiConfig {
  baseUrl: string;
  timeout?: number;
  retryAttempts?: number;
  headers?: { [key: string]: string };
}

/**
 * Product catalogue entry structure for supermarket integration
 */
export interface SupermarketProduct {
  id?: string;
  name: string;
  type: string;
  category: string;
  price: number;
  currency: string;
  weight?: number;
  weightUnit?: string;
  brand?: string;
  description?: string;
  imageUrl?: string;
  barcode?: string;
  availability: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
