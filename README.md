# lendsqr-fe-test

A modern Next.js application for managing users, displaying user details,
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
└─ app/                     # Next.js app router
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/iamBlissMedik/lendsqr-fe-test.git
cd lendsqr-fe-test
```

2. Install dependencies:

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

The app will start at `http://localhost:3000`.

> **Note:** To view the authentication/login page after you have logged in, click the **Logout** button
> located in the sidebar.

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

### Test Coverage

The application includes comprehensive tests for key components:

#### Pagination Component (`Pagination.test.ts`)

- ✓ Renders current page button and navigation buttons
- ✓ Clicking Next and page buttons calls callbacks correctly
- ✓ Dropdown toggles and selecting a page size calls the callback

#### Sidebar Component (`Sidebar.test.tsx`)

- ✓ Renders Users link correctly
- ✓ Users link has active class when on /users route
- ✓ Users link does NOT have active class when on different route
- ✓ Displays logout spinner component with correct aria-label

#### Button Component (`Button.test.tsx`)

- ✓ Renders button with correct text
- ✓ Button is disabled when disabled prop is true
- ✓ Shows spinner when loading is true

#### Additional Tests

- StatsCard, Table, Sidebar, and other UI components have unit tests

### Examples

```typescript
test("renders personal information correctly", () => {
  render(<UserGeneralDetails user={mockUser} />);
  expect(screen.getByText("Full Name")).toBeInTheDocument();
  expect(screen.getByText("John Doe")).toBeInTheDocument();
});

// Pagination test with dropdown
test("dropdown toggles and selecting a page size calls callback", () => {
  render(<Pagination {...paginationProps} />);
  const dropdownBtn = screen.getByLabelText("Items per page");
  fireEvent.click(dropdownBtn);

  const option25 = screen.getByRole("option", { name: "25" });
  expect(option25).toBeInTheDocument();

  fireEvent.click(option25);
  expect(setPageSize).toHaveBeenCalledWith(25);
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
