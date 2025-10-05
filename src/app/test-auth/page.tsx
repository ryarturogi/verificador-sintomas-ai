'use client'

import { useAuth, useUser } from '@clerk/nextjs'

export default function TestAuthPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
      
      <div className="space-y-4">
        <div>
          <strong>Is Loaded:</strong> {isLoaded ? 'Yes' : 'No'}
        </div>
        
        <div>
          <strong>Is Signed In:</strong> {isSignedIn ? 'Yes' : 'No'}
        </div>
        
        <div>
          <strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'No user'}
        </div>
      </div>
    </div>
  )
}
