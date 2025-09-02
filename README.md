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

## Deployment

### Deploying to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push to the main branch.

1. Make sure your repository is set up with GitHub Pages:
   - Go to your repository settings
   - Navigate to Pages section
   - Set source to GitHub Actions

2. Push your changes to the main branch:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

3. The GitHub Action will automatically build and deploy your project.

### Deploying to Vercel

This project includes a workflow for deploying to Vercel:

1. Create a Vercel account and link your GitHub repository

2. Generate a Vercel token:
   - Go to your Vercel account settings
   - Navigate to Tokens section
   - Create a new token

3. Add the token to your GitHub repository secrets:
   - Go to your repository settings
   - Navigate to Secrets and variables > Actions
   - Add a new repository secret named `VERCEL_TOKEN` with your token value

4. Push your changes to the main branch:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

5. The GitHub Action will automatically deploy your project to Vercel.

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
