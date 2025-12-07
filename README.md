# lendsqr-fe-test

A modern Next.js application for managing users, displaying user details,
and handling actions like viewing, blacklisting, and activating users. Includes
TypeScript for type safety, SCSS for styling, and testing with Jest & React
Testing Library.

## Assessment Score: 7.9/10 (B+) - Production Ready

See [ASSESSMENT_REPORT.md](./ASSESSMENT_REPORT.md) for detailed evaluation across 7 criteria.

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
- [Architecture & Best Practices](#architecture--best-practices)
- [Contributing](#contributing)

---

## Features

- List users in a table with filtering and pagination.
- View detailed user information.
- Manage user status: blacklist or activate.
- Store selected users in IndexedDB.
- Responsive and accessible UI components.
- Unit and integration testing for components.
- Optimized state management with useReducer pattern.
- Pixel-perfect design system with responsive typography.
- Comprehensive JSDoc documentation.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** SCSS with design tokens
- **State Management:** React Hooks + useReducer
- **Performance:** useCallback, useMemo optimization
- **Icons:** react-icons
- **Storage:** IndexedDB (via custom library)
- **Testing:** Jest, React Testing Library
- **Validation:** Zod schemas
- **Forms:** React Hook Form

---

## Project Structure

```text
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

## Architecture & Best Practices

### State Management

This project uses a combination of React Hooks patterns for optimal performance:

- **useReducer**: Complex component state (e.g., UsersTable) consolidated from multiple useState calls into a single reducer for predictable state updates
- **useCallback**: Memoized callback functions to prevent unnecessary re-renders of child components
- **useMemo**: Memoized computations (e.g., filtered data, derived state) to optimize performance
- **Context API**: Global sidebar navigation state via SidebarContext

#### Example: UsersTable Optimization

```typescript
// Before: 13+ useState calls scattered throughout
const [users, setUsers] = useState([]);
const [filter, setFilter] = useState({});
const [page, setPage] = useState(1);
// ... many more

// After: Single useReducer with TableState interface
const [state, dispatch] = useReducer(tableReducer, initialState);

// Memoized functions prevent child re-renders
const getUserActions = useCallback((userId) => [...], []);
const getOrganizationOptions = useCallback(() => [...], []);
```

### Design System & Theming

A centralized design token system ensures consistency across the application:

**SCSS Variables** (`src/styles/abstracts/_variables.scss`):

- **Colors**: Status variants (active, inactive, pending, blacklisted)
- **Sizing**: Component constants (button: 48px, input: 40px, table row: 56px)
- **Typography**: Responsive scale with clamp() for fluid sizing
- **Spacing**: Consistent 4px-based scale
- **Breakpoints**: 480px, 768px, 1024px, 1280px, 1536px

**Global Styles** (`src/app/globals.css`):

- Responsive typography using CSS clamp()
- Standardized form inputs with focus states
- Accessibility features (focus-visible, prefers-reduced-motion)
- Mobile-first responsive design

### Component Structure

Components follow these patterns:

1. **UI Components** (`src/components/ui/`): Reusable, presentational components
   - Button, Pagination, Spinner, Table, StatsCard
   - Highly customizable via props
   - Comprehensive JSDoc documentation

2. **Feature Components** (`src/components/Auth/`, `src/components/Users/`): Domain-specific logic
   - Login, UsersTable, UserDetails
   - Manages business logic and data fetching
   - Integrates with custom hooks and services

3. **Layout Components** (`src/components/layouts/`): Page structure
   - AuthLayout, DashboardLayout
   - Server/Client component split for optimal performance

### Performance Optimizations

- **Memoization**: useCallback for event handlers, useMemo for derived state
- **Code Splitting**: Next.js automatic splitting via App Router
- **Image Optimization**: Next.js Image component for static assets
- **Lazy Loading**: React.lazy with Suspense for route-based code splitting
- **CSS Modules**: Scoped styles prevent global namespace pollution

### Testing Strategy

- **Unit Tests**: Individual components tested in isolation
- **Integration Tests**: Complex components (UsersTable) tested with filters, pagination
- **Edge Cases**: Multiple users, empty states, error handling
- **Mocking**: API calls mocked via Jest
- **Target**: 80%+ code coverage (current: 40/40 tests passing)

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
