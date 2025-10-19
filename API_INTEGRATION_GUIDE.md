# API Client with SWR Integration

This project includes a fully generated TypeScript API client with SWR integration for your Money Tracker API.

## 🛠️ Setup

The following tools have been installed and configured:

- **swagger-typescript-api**: Generates TypeScript API client from OpenAPI/Swagger specs
- **axios**: HTTP client for making API requests
- **swr**: Data fetching library with caching, revalidation, and optimistic updates

## 📁 File Structure

```
src/api/
├── generated/          # Auto-generated API client files
│   ├── Auth.ts        # Authentication endpoints
│   ├── Users.ts       # User management endpoints
│   ├── Transactions.ts # Transaction endpoints
│   ├── Health.ts      # Health check endpoints
│   ├── data-contracts.ts # TypeScript interfaces
│   └── http-client.ts # Base HTTP client
├── client.ts          # API client configuration
└── hooks.ts          # SWR hooks for all endpoints

src/contexts/
└── AuthContext.tsx    # Authentication context with SWR

src/components/
├── auth/
│   └── RegisterForm.tsx # Updated registration form using SWR
├── TransactionsList.tsx # Example component using SWR
└── AuthStatus.tsx     # Authentication status component
```

## 🚀 Usage Examples

### 1. Authentication

```tsx
import { useLogin, useRegister } from '@/api/hooks';

// Login
const { trigger: login, isMutating: isLoggingIn } = useLogin();

const handleLogin = async credentials => {
  try {
    const result = await login(credentials);
    console.log('Login successful:', result);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Register
const { trigger: register, isMutating: isRegistering } = useRegister();

const handleRegister = async userData => {
  try {
    const result = await register(userData);
    console.log('Registration successful:', result);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
```

### 2. Data Fetching

```tsx
import { useMyTransactions, useUsers, useCurrentUser } from '@/api/hooks';

// Fetch current user
const { data: user, error, isLoading } = useCurrentUser();

// Fetch user's transactions
const { data: transactions, mutate: refreshTransactions } = useMyTransactions();

// Fetch all users (admin only)
const { data: users } = useUsers();
```

### 3. Mutations with Optimistic Updates

```tsx
import { useCreateMyTransaction, useDeleteTransaction } from '@/api/hooks';

const { trigger: createTransaction, isMutating } = useCreateMyTransaction();
const { trigger: deleteTransaction } = useDeleteTransaction();

// Create transaction
const handleCreate = async transactionData => {
  try {
    await createTransaction(transactionData);
    // SWR automatically revalidates related queries
  } catch (error) {
    console.error('Failed to create transaction:', error);
  }
};

// Delete transaction
const handleDelete = async id => {
  try {
    await deleteTransaction(id);
    // SWR automatically revalidates related queries
  } catch (error) {
    console.error('Failed to delete transaction:', error);
  }
};
```

### 4. Authentication Context

```tsx
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

// Wrap your app with AuthProvider
function App() {
  return (
    <AuthProvider>
      <YourAppComponents />
    </AuthProvider>
  );
}

// Use authentication in components
function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  // Component logic here
}
```

## 🔧 API Client Configuration

### Setting Base URL

Update the base URL in `src/api/client.ts`:

```typescript
const API_BASE_URL = 'https://your-api-domain.com'; // Update this
```

### Authentication Token Management

The API client automatically handles JWT tokens:

```typescript
import { setAuthToken, clearAuthToken } from '@/api/client';

// Set token (done automatically by AuthContext)
setAuthToken('your-jwt-token');

// Clear token (done automatically on logout)
clearAuthToken();
```

## 🔄 Regenerating API Client

When your API changes, regenerate the client:

```bash
npx swagger-typescript-api generate -p http://localhost:8000/api/json -o src/api/generated -n api.ts --axios --modular --route-types
```

## 📋 Available API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile
- `GET /auth/me` - Get current user info
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

### Users

- `GET /users` - Get all users (admin only)
- `POST /users` - Create user
- `GET /users/{id}` - Get user by ID
- `PATCH /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user
- `GET /users/me/profile` - Get my profile
- `PATCH /users/me/profile` - Update my profile

### Transactions

- `GET /transactions` - Get all transactions
- `POST /transactions` - Create transaction
- `GET /transactions/{id}` - Get transaction by ID
- `PATCH /transactions/{id}` - Update transaction
- `DELETE /transactions/{id}` - Delete transaction
- `GET /transactions/me/transactions` - Get my transactions
- `POST /transactions/me/transactions` - Create my transaction

## 🎯 SWR Features

### Automatic Revalidation

- Revalidates on window focus
- Revalidates on network reconnection
- Periodic revalidation (configurable)

### Caching

- Smart caching with automatic invalidation
- Optimistic updates for better UX
- Background revalidation

### Error Handling

- Automatic retry on failure
- Error boundaries support
- Loading states management

### Performance

- Request deduplication
- Pagination support
- Infinite loading support

## 🔒 Type Safety

All API responses and requests are fully typed with TypeScript interfaces generated from your OpenAPI specification.

```typescript
import type {
  LoginDto,
  UserResponseDto,
  CreateTransactionDto,
  TransactionResponseDto,
} from '@/api/generated/data-contracts';
```

This ensures compile-time type checking and excellent developer experience with IntelliSense support.
