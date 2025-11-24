# Adonf - Frontend Angular Application

## Overview

This is the frontend application for **Adonf**, a music school, recording studio, and concert venue website. Built with Angular 18+ using standalone components.

## Project Structure

See detailed architecture in the project folders:

- `core/` - Authentication, guards, interceptors, services
- `shared/components/` - Header, Footer, Cookie Consent, Layout
- `features/public/` - All public pages
- `features/backoffice/` - Admin dashboard and editors
- `features/auth/` - Login and authentication

## Key Features

✅ **JWT Authentication** with guards and interceptors  
✅ **Responsive Design** - Mobile-first approach  
✅ **Red Theme** (#dc143c) throughout  
✅ **GDPR Cookie Consent** banner  
✅ **Lazy-loaded Routes** for performance  
✅ **Protected Backoffice** with sidebar navigation

## Development

```bash
# Install dependencies
npm install

# Run dev server
ng serve
# Navigate to http://localhost:4200/

# Build for production
ng build --configuration production
```

## Routes

### Public

- `/` - Homepage
- `/actualites`, `/concerts`, `/agenda` - Content pages
- Various info pages (courses, pricing, studio, etc.)

### Backoffice (Protected)

- `/backoffice` - Dashboard
- `/backoffice/home`, `/backoffice/actualites`, etc. - Content editors

### Auth

- `/auth/login` - Login page

## Next Steps

**Step 2**: Generate home page components  
**Step 3**: Complete all public pages  
**Step 4**: Create .NET backend + PostgreSQL  
**Step 5**: Build backoffice WYSIWYG editors

## Tech Stack

Angular 18+ • TypeScript • SCSS • RxJS • Standalone Components

---

**Version**: 1.0.0 | **Date**: November 2025
