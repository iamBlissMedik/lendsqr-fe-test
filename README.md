# lendsqr-fe-test

A modern React/Next.js application for managing users, displaying user details,
and handling actions like viewing, blacklisting, and activating users. Includes
TypeScript for type safety, SCSS for styling, and testing with Jest & React
Testing Library.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Testing](#testing)
- [Components](#components)
- [API & Services](#api--services)
- [Contributing](#contributing)

---

## Features

- List users in a table with filtering and pagination.
- View detailed user information.
- Manage user status: blacklist or activate.
- Store selected users in IndexedDB.
- Responsive and accessible UI components.
- Unit and integration testing for components.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** SCSS
- **State Management:** React Hooks
- **Icons:** react-icons
- **Storage:** IndexedDB (via custom library)
- **Testing:** Jest, React Testing Library

---

## Project Structure

```
src/
├─ components/              # Reusable UI components
│  ├─ Users/                # Users-related components
│  │  ├─ UserDetails/       # Detailed user page
│  │  ├─ UsersTable/        # Users table with filters
│  │  └─ UserGeneralDetails/
│  ├─ ui/                   # Generic UI components (Table, Button, Spinner, etc.)
├─ lib/                     # Utility functions and IndexedDB interactions
├─ services/                # API hooks and data fetching
├─ types/                   # TypeScript interfaces (e.g., IUser)
└─  app/                    # Next.js app router
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/iamBlissMedik/lendsqr-fe-test.git
cd lendsqr-fe-test
```

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

## Running the App

### Development mode

```bash
npm run dev
# or
yarn dev
```

### Production build

```bash
npm run build && npm start
# or
yarn build && yarn start
```

---

## Testing

### Run tests

```bash
npm run test
# or
yarn test
```

### Example:

```typescript
test("renders personal information correctly", () => {
  render(<UserGeneralDetails user={mockUser} />);
  expect(screen.getByText("Full Name")).toBeInTheDocument();
  expect(screen.getByText("John Doe")).toBeInTheDocument();
});
```

---

## Components

### UsersTable

Displays users in a paginated table.

- Supports filtering by organization, username, email, phone, date, and status.
- Row actions include:
  - **View Details** → routes to `/users/{id}` and saves to IndexedDB.

### UserDetails

Shows detailed information about a user.

- Tabs: General Details, Documents, Bank Details, Loans, Savings, App and
  System.
- Handles loading, error, and empty states.

### StatsCard

Shows statistics with icon, title, and value.

- Handles string and numeric values.
- Handles empty/fallback values.

### UserGeneralDetails

Displays detailed personal info, education/employment, socials, and guarantor.

- Sections are labelled with `aria-label` for accessibility and easier testing.

---

## API & Services

- **useGetUserById**: Custom hook to fetch a user by ID.
- **IndexedDB**: `saveUser` saves selected users locally for offline access.

---

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---
