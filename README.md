# School Management System (Frontend)

## Overview
This project is the frontend application for a School Management System. It's designed to help educational institutions manage classes, students, grades, schedules, assignments, and other school-related activities. The interface is built to be intuitive for teachers, students, and administrators.

## Technologies Used
The project leverages a modern web development stack:
- **Vite**: For fast frontend build tooling and development server.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: For static typing, improving code quality and maintainability.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **shadcn/ui**: A collection of re-usable UI components built with Radix UI and Tailwind CSS.
- **React Router**: For declarative routing in the React application.
- **React Query**: For data fetching, caching, and state management.
- **Supabase Client (`supabase-js`)**: Suggests integration with Supabase for backend services, database, and authentication.

## Project Structure
The `src` folder is organized as follows:

- `src/`: Contains all the source code for the application.
  - `App.tsx`: The main application component, typically handling routing and global layout.
  - `main.tsx`: The entry point of the React application, responsible for rendering the `App` component into the DOM.
  - `components/`: Contains reusable UI components.
    - `ui/`: Primarily shadcn/ui components.
    - `layout/`: Components related to the overall page structure (e.g., Header, Sidebar).
    - `classes/`, `dashboard/`, `grades/`: Feature-specific components.
  - `pages/`: Contains top-level components that represent different views/pages of the application (e.g., Dashboard, Classes, Students).
  - `hooks/`: Custom React hooks used across the application for shared logic (e.g., `use-auth`, `use-classes`).
  - `lib/`: Utility functions and helper modules (e.g., `utils.ts`).
  - `integrations/`: Modules for integrating with third-party services.
    - `supabase/`: Contains Supabase client setup and related type definitions.
  - `assets/`: Static assets like images and icons (Note: not explicitly listed in `ls` but a common convention).
  - `index.css`, `App.css`: Global styles and Tailwind CSS base styles.

## Available Scripts
The following scripts are available from the `package.json`:

- `npm run dev`: Starts the development server using Vite. The application will be accessible at a local URL (usually `http://localhost:5173`).
- `npm run build`: Builds the application for production. This creates an optimized version of the app in the `dist/` directory.
- `npm run build:dev`: Builds the application in development mode (less optimization, more debugging info).
- `npm run lint`: Lints the codebase using ESLint to identify and fix code style issues and potential errors.
- `npm run preview`: Serves the production build (from `dist/`) locally. This is useful for testing the production build before deployment.

## Setup and Running Locally
To set up and run the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/example/school-management-frontend.git
    ```
    (Replace the URL with the actual repository URL if available.)

2.  **Navigate to the project directory:**
    ```bash
    cd school-management-frontend
    ```
    (Or the name of the directory your repository was cloned into.)

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    - Create a `.env` file in the root of the project.
    - Add the necessary environment variables for Supabase integration. You will need to get these from your Supabase project settings.
      ```env
      VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
      VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
      ```
    - Other environment variables might be required depending on the project's needs.

5.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running on your local machine.

## Backend Integration
This frontend application is designed to work with a backend, and the presence of `supabase-js` indicates that **Supabase** is the chosen backend-as-a-service provider.

Users will need to:
- Have a Supabase project set up.
- Configure the necessary tables, authentication, and storage according to the application's requirements.
- Ensure the environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) in the `.env` file correctly point to their Supabase project.
