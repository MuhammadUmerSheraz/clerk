'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function UserProfile() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const saveUserToDatabase = async () => {
      if (user && isSignedIn) {
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.primaryEmailAddress?.emailAddress,
              fullName: user.fullName,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to save user data');
          }

          console.log('User data saved successfully');
        } catch (error) {
          console.error('Error saving user data:', error);
        }
      }
    };

    saveUserToDatabase();
  }, [user, isSignedIn]);

  if (!user) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-4">
      <div className="text-left">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <div className="space-y-3">
          <p>
            <span className="font-medium">Email v2:</span>{' '}
            {user.primaryEmailAddress?.emailAddress}
          </p>
          <p>
            <span className="font-medium">User ID:</span> {user.id}
          </p>
          <p>
            <span className="font-medium">Full Name:</span>{' '}
            {user.fullName || 'Not provided'}
          </p>
          {user.username && (
            <p>
              <span className="font-medium">Username:</span> {user.username}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
