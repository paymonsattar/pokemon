import { PokemonSubmission as PokemonSubmissionType, PokemonName as PokemonNameType } from '../schemas/pokemon';

// Re-export types from schemas
export type PokemonSubmission = PokemonSubmissionType;
export type PokemonName = PokemonNameType;

// Additional types for the application
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: any;
}

export interface PokemonSubmissionResponse {
  success: boolean;
  message: string;
  submissionId: string;
  favouritePokemon: string;
}

export interface FormErrors {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  dateOfBirth?: string[];
  favouritePokemon?: string[];
  whyFavourite?: string[];
}

// Form state interface
export interface PokemonFormData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  favouritePokemon: string;
  whyFavourite: string;
}

// Database record interface (includes generated fields)
export interface PokemonSubmissionRecord extends PokemonSubmissionType {
  id: string;
  submittedAt: string;
}