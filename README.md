# E-Commerce Frontend Application

![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

## 1. Project Overview

This is the frontend application for the E-Commerce platform, built with **Next.js 16 (App Router)**. It provides a modern, responsive user interface for customers to browse products, manage their cart, place orders, and track shipments. The application is designed with performance and SEO in mind, leveraging Server-Side Rendering (SSR) and Client-Side Rendering (CSR) where appropriate.

**Key Features:**

- **Product Browsing**: Dynamic product listings with filtering and sorting capabilities.
- **Shopping Cart**: Real-time cart management powered by Redux Toolkit.
- **Checkout Process**: Secure payment integration using Stripe.
- **User Dashboard**: Order history and profile management.
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **SEO Optimized**: Leveraging Next.js metadata and server components for better search visibility.

---

## 2. Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (React Framework)
- **Language**: TypeScript
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & Redux Persist
- **Styling**: [Sass](https://sass-lang.com/) & [Framer Motion](https://www.framer.com/motion/) (Animations)
- **HTTP Client**: [Axios](https://axios-http.com/) & [SWR](https://swr.vercel.app/) (Data Fetching)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Payment Integration**: [Stripe Elements](https://stripe.com/docs/elements)
- **Linting**: ESLint

---

## 3. Architecture Overview

The project follows the **Next.js App Router** architecture, organizing the application by routes and features:

- **App Directory (`app/`)**: Contains the application routes, layouts, and page components. Utilizes React Server Components by default for improved performance.
- **Components (`components/`)**: Reusable UI components (buttons, forms, modals, etc.) used across pages.
- **Redux Store (`store/`)**: Manages global client-side state (cart, user session) using Redux Toolkit slices.
- **Services (`services/`)**: centralized API calls using Axios instances to communicate with the backend.
- **Hooks (`hooks/`)**: Custom React hooks for shared logic (e.g., `useCart`, `useAuth`).
- **Providers (`providers/`)**: Context providers wrapping the application (Redux Provider, Toast Provider, etc.).

**Data Flow**: Component (UI) → Hook/Service → API (Backend) → Redux Store (State Update) → Component Re-render

---

## 4. Folder Structure

Here is an overview of the main folders in the project:

```
frontend/
├── app/                   # App Router pages and layouts
│   ├── (auth)/            # Authentication routes (login, register)
│   ├── (shop)/            # Shop routes (products, cart, checkout)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
├── public/                # Static assets (images, fonts)
├── services/              # API service modules (auth, products, etc.)
├── store/                 # Redux store configuration and slices
├── types/                 # TypeScript type definitions
├── .env                   # Environment variables (not committed)
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

---

## 5. Environment Variables

Create a `.env` file in the root of the `frontend` directory. You can use the example below:

```ini
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Stripe Payment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

> **Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Make sure not to include sensitive backend secrets here.

---

## 6. Installation & Setup Guide

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone <repository_url>
cd e-commerce/frontend
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Configure Environment Variables

1.  Create a `.env` file in the `frontend` directory based on the example above.
2.  Update `NEXT_PUBLIC_API_URL` to point to your running backend API.
3.  Add your Stripe Publishable Key.

---

## 7. Running the Application

### Development Mode

Runs the application with hot-reload enabled.

```bash
npm run dev
```

The application will start at `http://localhost:3000`.

### Production Build

To build and run the application for production:

```bash
npm run build
npm start
```

This builds the application for production usage and starts the optimized server.

---

## 8. API Integration

The frontend communicates with the backend API using Axios. The base configuration is located in `services/api.ts` (or similar), which handles:

- **Base URL**: Configured via environment variables.
- **Interceptors**: Automatically attaching JWT tokens to requests for authenticated endpoints.
- **Error Handling**: Centralized error management for API responses.

Service modules in `services/` correspond to backend modules (e.g., `auth.service.ts`, `product.service.ts`).

---

## 9. Production Build Guide

To prepare the application for a production environment:

1.  **Build the project**:

    ```bash
    npm run build
    ```

    This creates an optimized production build in the `.next` folder.

2.  **Start the production server**:
    ```bash
    npm start
    ```

Ensure your `.env` file contains the correct production API URL and keys.

---

## 10. Useful Scripts

List of common commands in `package.json`:

| Command         | Description                                     |
| :-------------- | :---------------------------------------------- |
| `npm run dev`   | Starts the development server `localhost:3000`. |
| `npm run build` | Builds the application for production.          |
| `npm run start` | Starts the production server.                   |
| `npm run lint`  | Runs ESLint to check for code quality issues.   |

---

## 11. License

This project is [UNLICENSED](LICENSE).
