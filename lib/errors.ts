/**
 * Error handling utilities
 */

export type ErrorWithMessage = {
  message: string;
};

/**
 * Type guard to check if an error has a message property
 */
export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

/**
 * Safely extract error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
  if (isErrorWithMessage(error)) {
    return error.message;
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }
  
  // Fallback for unknown error types
  return 'An unexpected error occurred';
}

/**
 * Format error for user display
 */
export function formatErrorForUser(error: unknown, context?: string): string {
  const message = getErrorMessage(error);
  return context ? `${context}: ${message}` : message;
}
