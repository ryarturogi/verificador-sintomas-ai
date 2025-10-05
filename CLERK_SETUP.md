# Clerk Authentication Setup

## 1. Create Clerk Account and Application

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Choose "Next.js" as your framework
4. Copy the API keys from your dashboard

## 2. Set Environment Variables

Create or update your `.env.local` file with the following variables:

```bash
# Clerk Environment Variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Optional: Customize Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/patient-portal
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/patient-portal
```

## 3. Test Authentication

1. Visit `/test-auth` to see if Clerk is working
2. Visit `/sign-in` to test the sign-in flow
3. Visit `/patient-portal` to test protected routes

## 4. Troubleshooting

If you're getting "User not authenticated" errors:

1. **Check environment variables** - Make sure they're in `.env.local` and restart the dev server
2. **Check Clerk dashboard** - Make sure your application is active
3. **Check browser console** - Look for any Clerk-related errors
4. **Test the auth page** - Visit `/test-auth` to see the authentication state

## 5. Clerk Configuration

The app is configured to:
- Redirect to `/sign-in` for authentication
- Redirect to `/patient-portal` after successful sign-in
- Protect all `/patient-portal/*` routes
- Use Clerk's built-in authentication components
