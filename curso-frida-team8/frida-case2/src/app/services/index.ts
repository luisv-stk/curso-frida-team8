/**
 * Barrel exports for services
 * This file makes it easier to import services throughout the application
 */

export * from './api.service';
export * from './api.types';
export * from './image.service';

// Re-export commonly used types for convenience
export type {
  ImageAnalysisResponse,
  ApiResponse,
  HealthCheckResponse,
  SupermarketProduct,
  NutritionalInfo
} from './api.types';
