/**
 * External JavaScript file for MS7375 Homework 2
 * Author: Kris Patterson
 * Date: October 20, 2025
 * Description: Form validation and review functionality
 */

// Global variables
let formData = {};

// Initialize form when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayCurrentDate();
    initializeForm();
    setDateRanges();
    setupPainLevelSlider();
    setupPasswordValidation();
});

/**
 * Display current date in the banner
 */
function displayCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        dateElement.textContent = formattedDate;
    }
}

/**
 * Initialize form event listeners
 */
function initializeForm() {
    // Add event listeners for real-time validation
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', validateField);
        input.addEventListener('blur', validateField);
    });

    // Setup button event listeners
    document.getElementById('review-btn').addEventListener('click', reviewForm);
    document.getElementById('patient-form').addEventListener('submit', submitForm);
    
    // Setup close review button
    const closeReviewBtn = document.getElementById('close-review-btn');
    if (closeReviewBtn) {
        closeReviewBtn.addEventListener('click', closeReviewSection);
    }
}

/**
 * Set dynamic date ranges based on current date
 */
function setDateRanges() {
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];
    
    // Birth date: no future dates, max 120 years ago
    const minBirthDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    const minBirthString = minBirthDate.toISOString().split('T')[0];
    
    const dobField = document.getElementById('date-of-birth');
    if (dobField) {
        dobField.setAttribute('min', minBirthString);
        dobField.setAttribute('max', maxDate);
    }
}

/**
 * Setup pain level slider with dynamic display
 */
function setupPainLevelSlider() {
    const painSlider = document.getElementById('pain-level');
    const painDisplay = document.getElementById('pain-display');
    
    if (painSlider && painDisplay) {
        painSlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            painDisplay.textContent = formatPainLevel(value);
        });
        
        // Initialize display
        const initialValue = parseInt(painSlider.value);
        painDisplay.textContent = formatPainLevel(initialValue);
    }
}

/**
 * Format pain level value for display
 */
function formatPainLevel(value) {
    const painDescriptions = {
        1: '1 (No Pain)',
        2: '2 (Minimal)',
        3: '3 (Mild)',
        4: '4 (Moderate)',
        5: '5 (Moderate)',
        6: '6 (Moderate-Severe)',
        7: '7 (Severe)', 
        8: '8 (Very Severe)',
        9: '9 (Extremely Severe)',
        10: '10 (Unbearable)'
    };
    return painDescriptions[value] || value.toString();
}

/**
 * Setup password validation
 */
function setupPasswordValidation() {
    const password = document.getElementById('password');
    const reenterPassword = document.getElementById('re-enter-password');
    
    if (password && reenterPassword) {
        password.addEventListener('input', validatePassword);
        reenterPassword.addEventListener('input', validatePasswordMatch);
    }
}

/**
 * Validate individual field
 */
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    clearFieldError(field);

    switch (field.id) {
        case 'first-name':
        case 'last-name':
            isValid = validateName(value, field.id);
            if (!isValid) errorMessage = 'Names must be 1-30 characters, letters, apostrophes, and dashes only';
            break;
            
        case 'middle-initial':
            isValid = validateMiddleInitial(value);
            if (!isValid) errorMessage = 'Middle initial must be a single letter';
            break;
            
        case 'email-address':
            isValid = validateEmail(value);
            if (!isValid) errorMessage = 'Please enter a valid email address (name@domain.tld)';
            break;
            
        case 'phone-number':
            isValid = validatePhone(value);
            if (!isValid) errorMessage = 'Phone must be in format: 000-000-0000';
            break;
            
        case 'zip-code':
            isValid = validateZipCode(value);
            if (!isValid) errorMessage = 'Zip code must be 5 digits or 5+4 format (12345 or 12345-6789)';
            break;
            
        case 'user-id':
            isValid = validateUserId(value);
            if (!isValid) errorMessage = 'User ID: 5-30 chars, letters/numbers/underscore/dash, no spaces, cannot start with number';
            // Convert to lowercase
            if (isValid) field.value = value.toLowerCase();
            break;
            
        case 'password':
            validatePassword();
            break;
            
        case 're-enter-password':
            validatePasswordMatch();
            break;
    }

    if (!isValid && errorMessage) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

/**
 * Validate name fields (first name, last name)
 */
function validateName(value, fieldType) {
    if (!value || value.length === 0) return false;
    if (value.length > 30) return false;
    
    // Allow letters, apostrophes, dashes, and numbers 2-5 for last names
    const namePattern = fieldType === 'last-name' ? 
        /^[A-Za-z\'\-2-5\s]+$/ : /^[A-Za-z\'\-\s]+$/;
    
    return namePattern.test(value);
}

/**
 * Validate middle initial
 */
function validateMiddleInitial(value) {
    if (value === '') return true; // Optional field
    return /^[A-Za-z]$/.test(value);
}

/**
 * Validate email address
 */
function validateEmail(value) {
    if (!value) return false;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(value);
}

/**
 * Validate phone number
 */
function validatePhone(value) {
    if (!value) return false;
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    return phonePattern.test(value);
}

/**
 * Validate zip code
 */
function validateZipCode(value) {
    if (!value) return false;
    const zipPattern = /^\d{5}(-\d{4})?$/;
    return zipPattern.test(value);
}

/**
 * Validate user ID
 */
function validateUserId(value) {
    if (!value || value.length < 5 || value.length > 30) return false;
    if (/^\d/.test(value)) return false; // Cannot start with number
    if (/\s/.test(value)) return false; // No spaces
    const userIdPattern = /^[A-Za-z][A-Za-z0-9_-]*$/;
    return userIdPattern.test(value);
}

/**
 * Validate password strength
 */
function validatePassword() {
    const password = document.getElementById('password');
    const userId = document.getElementById('user-id');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    
    if (!password) return false;
    
    const value = password.value;
    let errors = [];
    
    // Length check
    if (value.length < 8 || value.length > 30) {
        errors.push('Password must be 8-30 characters');
    }
    
    // Character requirements
    if (!/[A-Z]/.test(value)) errors.push('Must contain uppercase letter');
    if (!/[a-z]/.test(value)) errors.push('Must contain lowercase letter');
    if (!/\d/.test(value)) errors.push('Must contain a number');
    if (!/[!@#%^&*()\-_+=\\/<>.,`~]/.test(value)) errors.push('Must contain special character');
    if (/["']/.test(value)) errors.push('Cannot contain quotes');
    
    // Cannot equal or contain user ID or name
    if (userId && userId.value && value.toLowerCase().includes(userId.value.toLowerCase())) {
        errors.push('Cannot contain user ID');
    }
    if (firstName && firstName.value && value.toLowerCase().includes(firstName.value.toLowerCase())) {
        errors.push('Cannot contain first name');
    }
    if (lastName && lastName.value && value.toLowerCase().includes(lastName.value.toLowerCase())) {
        errors.push('Cannot contain last name');
    }
    
    clearFieldError(password);
    if (errors.length > 0) {
        showFieldError(password, errors.join('; '));
        return false;
    }
    
    return true;
}

/**
 * Validate password match
 */
function validatePasswordMatch() {
    const password = document.getElementById('password');
    const reenterPassword = document.getElementById('re-enter-password');
    
    if (!password || !reenterPassword) return false;
    
    clearFieldError(reenterPassword);
    
    if (password.value !== reenterPassword.value) {
        showFieldError(reenterPassword, 'Passwords do not match');
        return false;
    }
    
    return true;
}

/**
 * Show error message for a field
 */
function showFieldError(field, message) {
    let errorDiv = field.parentNode.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
    field.classList.add('error');
}

/**
 * Clear error message for a field
 */
function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.classList.remove('error');
}

/**
 * Review form - display all entered data
 */
function reviewForm(event) {
    event.preventDefault();
    
    // Collect all form data
    collectFormData();
    
    // Display review section
    displayReview();
    
    // Scroll to review section
    document.getElementById('review-section').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Collect all form data
 */
function collectFormData() {
    formData = {
        firstName: document.getElementById('first-name').value,
        middleInitial: document.getElementById('middle-initial').value,
        lastName: document.getElementById('last-name').value,
        dateOfBirth: document.getElementById('date-of-birth').value,
        socialSecurity: document.getElementById('social-security').value,
        addressLine1: document.getElementById('address-line-1').value,
        addressLine2: document.getElementById('address-line-2').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipCode: document.getElementById('zip-code').value,
        email: document.getElementById('email-address').value,
        phoneNumber: document.getElementById('phone-number').value,
        symptoms: document.getElementById('symptoms').value,
        medicalHistory: getCheckboxValues(),
        gender: getRadioValue('gender'),
        currentlySick: getRadioValue('sick'),
        hasInsurance: getRadioValue('insurance'),
        vaccinated: getRadioValue('vaccinated'),
        painLevel: document.getElementById('pain-level').value,
        userId: document.getElementById('user-id').value,
        password: document.getElementById('password').value
    };
}

/**
 * Get selected checkbox values
 */
function getCheckboxValues() {
    const checkboxes = ['chicken-pox', 'measles', 'covid-19', 'small-pox', 'tetanus'];
    const selected = [];
    
    checkboxes.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox && checkbox.checked) {
            selected.push(checkbox.nextSibling.textContent.trim());
        }
    });
    
    return selected;
}

/**
 * Get selected radio button value
 */
function getRadioValue(name) {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    return radio ? radio.nextSibling.textContent.trim() : 'Not selected';
}

/**
 * Display review section
 */
function displayReview() {
    const reviewContent = document.getElementById('review-content');
    
    // Validate all fields first
    const isValid = validateAllFields();
    
    let html = `
        <h2>PLEASE REVIEW THIS INFORMATION</h2>
        <table class="review-table">
            <tr>
                <td><strong>Name:</strong></td>
                <td>${formData.firstName} ${formData.middleInitial} ${formData.lastName}</td>
                <td>${validateNameFields() ? 'pass' : 'ERROR: Invalid name format'}</td>
            </tr>
            <tr>
                <td><strong>Date of Birth:</strong></td>
                <td>${formatDate(formData.dateOfBirth)}</td>
                <td>${validateDateOfBirth() ? 'pass' : 'ERROR: Invalid date'}</td>
            </tr>
            <tr>
                <td><strong>Email:</strong></td>
                <td>${formData.email}</td>
                <td>${validateEmail(formData.email) ? 'pass' : 'ERROR: Invalid email'}</td>
            </tr>
            <tr>
                <td><strong>Phone:</strong></td>
                <td>${formData.phoneNumber}</td>
                <td>${validatePhone(formData.phoneNumber) ? 'pass' : 'ERROR: Invalid phone'}</td>
            </tr>
            <tr>
                <td><strong>Address:</strong></td>
                <td>${formData.addressLine1}<br>
                    ${formData.addressLine2}<br>
                    ${formData.city}, ${formData.state} ${formData.zipCode}</td>
                <td>${validateAddress() ? 'pass' : 'ERROR: Incomplete address'}</td>
            </tr>
        </table>
        
        <h3>REQUESTED INFO</h3>
        <table class="review-table">
            <tr>
                <td><strong>Medical History:</strong></td>
                <td>${formData.medicalHistory.join(', ') || 'None selected'}</td>
            </tr>
            <tr>
                <td><strong>Gender:</strong></td>
                <td>${formData.gender}</td>
            </tr>
            <tr>
                <td><strong>Currently Sick:</strong></td>
                <td>${formData.currentlySick}</td>
            </tr>
            <tr>
                <td><strong>Has Insurance:</strong></td>
                <td>${formData.hasInsurance}</td>
            </tr>
            <tr>
                <td><strong>Pain Level:</strong></td>
                <td>${formatPainLevel(parseInt(formData.painLevel))}</td>
            </tr>
            <tr>
                <td><strong>Symptoms:</strong></td>
                <td>${formData.symptoms || 'None provided'}</td>
            </tr>
            <tr>
                <td><strong>User ID:</strong></td>
                <td>${formData.userId}</td>
            </tr>
            <tr>
                <td><strong>Password:</strong></td>
                <td>${formData.password.replace(/./g, '*')} (hidden for security)</td>
            </tr>
        </table>
    `;
    
    reviewContent.innerHTML = html;
    document.getElementById('review-section').style.display = 'block';
}

/**
 * Validate all fields
 */
function validateAllFields() {
    const fields = document.querySelectorAll('input[required], select[required]');
    let allValid = true;
    
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            allValid = false;
        }
    });
    
    return allValid;
}

/**
 * Validate name fields for review
 */
function validateNameFields() {
    return validateName(formData.firstName, 'first-name') && 
           validateName(formData.lastName, 'last-name') &&
           (formData.middleInitial === '' || validateMiddleInitial(formData.middleInitial));
}

/**
 * Validate date of birth
 */
function validateDateOfBirth() {
    if (!formData.dateOfBirth) return false;
    
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    return birthDate <= today && age <= 120;
}

/**
 * Validate address completeness
 */
function validateAddress() {
    return formData.addressLine1 && formData.city && formData.state && 
           formData.zipCode && validateZipCode(formData.zipCode);
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
}

/**
 * Handle form submission
 */
function submitForm(event) {
    event.preventDefault();
    
    if (!validateAllFields()) {
        alert('Please correct all errors before submitting.');
        return;
    }
    
    // Check if passwords match
    if (!validatePassword() || !validatePasswordMatch()) {
        alert('Please check your password requirements.');
        return;
    }
    
    alert('Form submitted successfully!');
    // Here you would normally send the data to a server
}

/**
 * Close the review section
 */
function closeReviewSection() {
    const reviewSection = document.getElementById('review-section');
    if (reviewSection) {
        reviewSection.style.display = 'none';
    }
}