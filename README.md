# Kefir - Frontend

This is the web client for Kefir, a simplified core banking system. Built as a modular Single Page Application (SPA), it enables the management of users, customers, accounts, and loans by interacting directly with the backend REST API.

## Technology Stack

* React
* TypeScript
* React Icons
* ESLint (Strict configuration to prevent cascading re-renders and enforce best practices)

## Key Features

* **System User Management:** List, create, and update system users with frontend pagination support.
* **Customer Management:** Register natural or corporate customers with document type validation (DNI, Passport).
* **Account Management:** Open savings and checking accounts (USD, EUR, ARS), featuring an asynchronous Autocomplete search component for seamless customer assignment.
* **Loan Modules:** View loan details and track amortization schedules.

## Prerequisites

* Node.js (v18 or higher recommended)
* npm or yarn
* The Kefir backend service running locally (defaults to http://localhost:8080)

## Installation & Setup

1. Clone the repository:
   git clone <frontend-repository-url>
   cd kefir-frontend

2. Install the project dependencies:
   npm install


## Frontend Architecture

The codebase follows a modular structure, decoupling UI views from infrastructure and API services:

src/
├── api/           # HTTP clients and API endpoint wrappers (accountsApi, usersApi, etc.)
├── components/    # Reusable UI components (Tables, Autocomplete selectors, layouts)
├── views/         # Main module pages (UserListPage, AccountListPage, NewAccountPage)
├── types/         # TypeScript type and interface definitions (Account, User, Customer)
└── App.tsx        # Application orchestrator and routing handler