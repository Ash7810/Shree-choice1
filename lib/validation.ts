/**
 * Form validation utilities
 */

export type ValidationError = {
    [key: string]: string;
};

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (flexible format)
 */
export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^[0-9]{10,}$/;
    return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
}

/**
 * Validate required field
 */
export function isRequired(value: string | undefined | null): boolean {
    return Boolean(value && value.trim().length > 0);
}

/**
 * Validate shipping form
 */
export function validateShippingForm(form: {
    fullName?: string;
    phone?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
}): ValidationError {
    const errors: ValidationError = {};

    if (!isRequired(form.fullName)) {
        errors.fullName = 'Full name is required';
    }

    if (!isRequired(form.phone)) {
        errors.phone = 'Phone number is required';
    } else if (form.phone && !isValidPhone(form.phone)) {
        errors.phone = 'Please enter a valid phone number';
    }

    if (!isRequired(form.street)) {
        errors.street = 'Street address is required';
    }

    if (!isRequired(form.city)) {
        errors.city = 'City is required';
    }

    if (!isRequired(form.state)) {
        errors.state = 'State is required';
    }

    if (!isRequired(form.zipCode)) {
        errors.zipCode = 'ZIP code is required';
    }

    return errors;
}
