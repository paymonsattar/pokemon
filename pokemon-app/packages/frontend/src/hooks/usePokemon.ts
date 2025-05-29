import { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  favouritePokemon: string;
  whyFavourite: string;
}

interface SubmissionResponse {
  success: boolean;
  message: string;
  submissionId: string;
  favouritePokemon: string;
}

export const usePokemon = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<SubmissionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = "https://50ezyz5vs7.execute-api.eu-west-1.amazonaws.com";
      if (!apiUrl) {
        throw new Error('API URL not configured');
      }

      const response = await fetch(`${apiUrl}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (data.success) {
        setSubmissionData(data);
        setIsSubmitted(true);
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSubmissionData(null);
    setError(null);
  };

  return {
    isLoading,
    isSubmitted,
    submissionData,
    error,
    submitForm,
    resetForm,
  };
};