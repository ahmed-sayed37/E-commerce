# React E-commerce Project

A modern React e-commerce application with complete authentication system including password reset functionality.

## Features

### Authentication System
- **User Registration** - Complete registration form with validation
- **User Login** - Secure login with email and password
- **Password Reset** - Complete password reset flow with email verification

### Password Reset Flow
1. **Forgot Password Page** (`/forgot-password`)
   - User enters their email address
   - System sends a 6-digit reset code to their email
   - Uses real email service (Gmail compatible)

2. **Reset Code Verification** (`/reset-code`)
   - User enters the 6-digit code received via email
   - System verifies the code validity
   - Secure code validation

3. **New Password Setup** (`/new-password`)
   - User enters new password and confirmation
   - Password validation with security requirements
   - Automatic redirect to login after successful reset

## API Endpoints Used

The application uses the following API endpoints for password reset:

- `POST /api/v1/auth/forgotPasswords` - Send reset code to email
- `POST /api/v1/auth/verifyResetCode` - Verify the reset code
- `PUT /api/v1/auth/resetPassword` - Set new password

## Password Requirements

- Must start with a capital letter
- Must be at least 6 characters long
- Can contain letters and numbers
- Example: `Password123`

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── pages/
│   ├── Login/
│   │   └── Login.jsx
│   ├── Register/
│   │   └── Register.jsx
│   ├── ForgotPassword/
│   │   └── ForgotPassword.jsx
│   ├── ResetCode/
│   │   └── ResetCode.jsx
│   ├── NewPassword/
│   │   └── NewPassword.jsx
│   └── Home/
│       └── Home.jsx
├── component/
│   ├── Layout/
│   ├── Navbar/
│   └── Footer/
└── App.jsx
```

## Technologies Used

- React 18
- React Router DOM
- Formik (Form handling)
- Yup (Validation)
- Axios (HTTP requests)
- React Hot Toast (Notifications)
- Tailwind CSS (Styling)

## Security Features

- Email validation
- Password strength requirements
- Secure code verification
- Session management
- Error handling
- Loading states

## User Experience

- Responsive design
- Loading indicators
- Success/error notifications
- Intuitive navigation
- Form validation feedback
- Consistent styling across all pages
