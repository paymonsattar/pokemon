import { PokemonSubmission as PokemonSubmissionType, PokemonName as PokemonNameType } from '../schemas/pokemon';
export type PokemonSubmission = PokemonSubmissionType;
export type PokemonName = PokemonNameType;
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
export interface PokemonFormData {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    favouritePokemon: string;
    whyFavourite: string;
}
export interface PokemonSubmissionRecord extends PokemonSubmissionType {
    id: string;
    submittedAt: string;
}
//# sourceMappingURL=index.d.ts.map