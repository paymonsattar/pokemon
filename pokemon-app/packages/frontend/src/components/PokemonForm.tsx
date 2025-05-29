import React, { useState } from 'react';
import { PokemonDropdown } from './PokemonDropdown';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  favouritePokemon: string;
  whyFavourite: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  favouritePokemon?: string;
  whyFavourite?: string;
}

interface PokemonFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  error?: string | null;
}

export const PokemonForm: React.FC<PokemonFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    favouritePokemon: '',
    whyFavourite: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showWhyField, setShowWhyField] = useState(false);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        if (value.length > 30) return `${name === 'firstName' ? 'First' : 'Last'} name must be no more than 30 characters`;
        if (!/^[A-Za-z\s\-]+$/.test(value)) return `${name === 'firstName' ? 'First' : 'Last'} name can only contain letters, spaces, and hyphens`;
        return undefined;

      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return undefined;

      case 'dateOfBirth':
        if (!value.trim()) return 'Date of birth is required';
        if (!/^(\d{2})\/(\d{2})\/(\d{4})$/.test(value)) return 'Date must be in DD/MM/YYYY format';
        
        const [day, month, year] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        
        if (date.getDate() !== day || date.getMonth() !== (month - 1) || date.getFullYear() !== year) {
          return 'Please enter a valid date';
        }
        
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        if (date > today) return 'Date of birth cannot be in the future';
        
        return undefined;

      case 'favouritePokemon':
        if (!value.trim()) return 'Please select your favourite Pokémon';
        return undefined;

      case 'whyFavourite':
        if (formData.favouritePokemon && !value.trim()) return 'Please tell us why this Pokémon is your favourite';
        return undefined;

      default:
        return undefined;
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Show/hide why field based on Pokemon selection
    if (name === 'favouritePokemon') {
      setShowWhyField(!!value);
      if (!value) {
        setFormData(prev => ({ ...prev, whyFavourite: '' }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);

    // If no errors, submit
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const formatDateInput = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Add slashes
    if (digits.length >= 5) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    } else if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else {
      return digits;
    }
  };

  return (
    <div className="pokemon-card rounded-2xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="pokemon-title text-4xl text-purple-600 mb-2">
          Pokémon Trainer Registration! 🎮
        </h1>
        <p className="text-gray-600 text-lg">
          Tell us about yourself and your favourite Pokémon!
        </p>
      </div>

      {error && (
        <div className="alert alert-error mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                👤 First Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              className={`input input-bordered w-full bg-white ${
                errors.firstName ? 'input-error' : 'focus:border-yellow-400'
              }`}
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              maxLength={30}
            />
            {errors.firstName && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.firstName}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                👤 Last Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className={`input input-bordered w-full bg-white ${
                errors.lastName ? 'input-error' : 'focus:border-yellow-400'
              }`}
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              maxLength={30}
            />
            {errors.lastName && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.lastName}</span>
              </label>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-gray-700">
              📧 Email Address
            </span>
          </label>
          <input
            type="email"
            placeholder="trainer@pokemon.com"
            className={`input input-bordered w-full bg-white ${
              errors.email ? 'input-error' : 'focus:border-yellow-400'
            }`}
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          {errors.email && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.email}</span>
            </label>
          )}
        </div>

        {/* Date of Birth Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-gray-700">
              🎂 Date of Birth
            </span>
          </label>
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            className={`input input-bordered w-full bg-white ${
              errors.dateOfBirth ? 'input-error' : 'focus:border-yellow-400'
            }`}
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', formatDateInput(e.target.value))}
            maxLength={10}
          />
          {errors.dateOfBirth && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.dateOfBirth}</span>
            </label>
          )}
        </div>

        {/* Pokémon Dropdown */}
        <PokemonDropdown
          value={formData.favouritePokemon}
          onChange={(value) => handleInputChange('favouritePokemon', value)}
          error={errors.favouritePokemon}
        />

        {/* Why Favourite Field - Conditional */}
        {showWhyField && (
          <div className="form-control animate-bounce-in">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                💭 Why is {formData.favouritePokemon} your favourite?
              </span>
            </label>
            <textarea
              placeholder={`Tell us what makes ${formData.favouritePokemon} so special to you!`}
              className={`textarea textarea-bordered h-24 w-full bg-white resize-none ${
                errors.whyFavourite ? 'textarea-error' : 'focus:border-yellow-400'
              }`}
              value={formData.whyFavourite}
              onChange={(e) => handleInputChange('whyFavourite', e.target.value)}
            />
            {errors.whyFavourite && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.whyFavourite}</span>
              </label>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="form-control mt-8">
          <button
            type="submit"
            className={`pokemon-button btn border-none text-lg py-4 h-auto ${
              isLoading ? 'loading' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner"></span>
                Catching your Pokémon...
              </>
            ) : (
              <>
                🚀 Submit Registration!
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};