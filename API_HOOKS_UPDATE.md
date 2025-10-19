# API Hooks Update - Full Response Return

✅ **All API hooks now return the full Axios response object instead of just `response.data`**

## 🔄 What Changed

### Before (returned only data):

```typescript
export const useLogin = () => {
  return useSWRMutation('/auth/login', async (url, { arg }) => {
    const response = await authAPI.authControllerLogin(arg);
    return response.data; // ❌ Only returned data
  });
};
```

### After (returns full response):

```typescript
export const useLogin = () => {
  return useSWRMutation('/auth/login', async (url, { arg }) => {
    const response = await authAPI.authControllerLogin(arg);
    return response; // ✅ Returns full response object
  });
};
```

## 📋 Updated Hooks

All the following hooks now return the full Axios response:

### Authentication Hooks

- `useLogin()` - ✅ Already returned full response
- `useRegister()` - 🔄 Updated
- `useProfile()` - 🔄 Updated
- `useCurrentUser()` - 🔄 Updated
- `useRefreshToken()` - 🔄 Updated
- `useLogout()` - 🔄 Updated

### User Management Hooks

- `useUsers()` - 🔄 Updated
- `useUser(id)` - 🔄 Updated
- `useCreateUser()` - 🔄 Updated
- `useUpdateUser()` - 🔄 Updated
- `useDeleteUser()` - 🔄 Updated
- `useMyProfile()` - 🔄 Updated
- `useUpdateMyProfile()` - 🔄 Updated

### Transaction Hooks

- `useTransactions()` - 🔄 Updated
- `useTransaction(id)` - 🔄 Updated
- `useCreateTransaction()` - 🔄 Updated
- `useUpdateTransaction()` - 🔄 Updated
- `useDeleteTransaction()` - 🔄 Updated
- `useMyTransactions()` - 🔄 Updated
- `useCreateMyTransaction()` - 🔄 Updated

## 🎯 How to Use the Updated Hooks

### Data Fetching Hooks (useSWR)

**Before:**

```typescript
const { data: users, error, isLoading } = useUsers();
// users = actual user data array
```

**After:**

```typescript
const { data: userResponse, error, isLoading } = useUsers();
// userResponse = full axios response object
const users = userResponse?.data; // Extract actual data
```

### Mutation Hooks (useSWRMutation)

**Before:**

```typescript
const { trigger: createUser } = useCreateUser();

const handleCreate = async userData => {
  const newUser = await createUser(userData); // Got data directly
  console.log(newUser); // User data
};
```

**After:**

```typescript
const { trigger: createUser } = useCreateUser();

const handleCreate = async userData => {
  const response = await createUser(userData); // Got full response
  console.log(response.data); // User data
  console.log(response.status); // HTTP status
  console.log(response.headers); // Response headers
};
```

## 📊 Full Response Object Structure

The response object includes:

```typescript
{
  data: any,           // The actual API response data
  status: number,      // HTTP status code (200, 201, etc.)
  statusText: string,  // HTTP status text ('OK', 'Created', etc.)
  headers: object,     // Response headers
  config: object,      // Request configuration
  request: object      // Request object
}
```

## 🔧 Component Updates

### Updated Components

1. **TransactionsList.tsx** - Updated to extract data from response
2. **AuthContext.tsx** - Updated to handle full response objects
3. **LoginForm.tsx** - Already handled correctly
4. **RegisterForm.tsx** - Already handled correctly

### Example Usage in Components

```typescript
// ✅ Correct way to use updated hooks
const MyComponent = () => {
  // For data fetching
  const { data: userResponse, error, isLoading } = useCurrentUser();
  const user = userResponse?.data;

  // For mutations
  const { trigger: updateProfile } = useUpdateMyProfile();

  const handleUpdate = async (profileData) => {
    try {
      const response = await updateProfile(profileData);

      // Access response properties
      if (response.status === 200) {
        console.log('Success:', response.data);
        message.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Update failed');
    }
  };

  return (
    <div>
      {isLoading && <Spin />}
      {error && <Alert message="Error loading user" type="error" />}
      {user && <div>Welcome, {user.username}!</div>}
    </div>
  );
};
```

## 🎯 Benefits of Full Response

### 1. **Better Error Handling**

```typescript
const response = await login(credentials);
if (response.status === 200) {
  // Handle success
} else if (response.status === 401) {
  // Handle unauthorized
} else {
  // Handle other errors
}
```

### 2. **Access to Headers**

```typescript
const response = await createUser(userData);
const newUserId = response.headers['x-created-id'];
const rateLimit = response.headers['x-rate-limit-remaining'];
```

### 3. **Status Code Checking**

```typescript
const response = await updateUser(id, userData);
if (response.status === 204) {
  // No content response (successful delete)
} else if (response.status === 200) {
  // Success with content
}
```

### 4. **Debug Information**

```typescript
const response = await fetchData();
console.log('Request URL:', response.config.url);
console.log('Request method:', response.config.method);
console.log('Response time:', response.headers['x-response-time']);
```

## 🚀 Migration Guide

If you have existing components using these hooks:

### Step 1: Update Data Access

```diff
- const { data: users } = useUsers();
+ const { data: userResponse } = useUsers();
+ const users = userResponse?.data;
```

### Step 2: Update Mutation Handling

```diff
  const handleCreate = async (data) => {
-   const result = await createUser(data);
-   console.log('Created:', result);
+   const response = await createUser(data);
+   console.log('Created:', response.data);
+   console.log('Status:', response.status);
  };
```

### Step 3: Enhanced Error Handling

```diff
  try {
    const response = await login(credentials);
+   if (response.status === 200) {
      message.success('Login successful!');
+   }
  } catch (error) {
+   if (error.response?.status === 401) {
+     message.error('Invalid credentials');
+   } else {
+     message.error('Login failed');
+   }
  }
```

This change provides more flexibility and better control over API responses! 🎉
