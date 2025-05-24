import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext'; // Path confirmed as correct

export default function IndexPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/dashboard'); // Use replace to avoid back button to this page
      } else {
        router.replace('/login');    // Use replace
      }
    }
  }, [user, loading, router]);

  // Display a loading message or null while checking auth status
  // This helps prevent a flash of unstyled content or an empty page
  // The condition ensures "Loading..." is shown until the redirect logic in useEffect kicks in.
  if (loading || typeof window === 'undefined') { // Added typeof window check for initial server render
     return <div>Loading...</div>; // Or a more sophisticated loading spinner
  }
  
  // This part should ideally not be reached if redirects work quickly,
  // or only briefly shown. If user status is known, redirect should have happened.
  // If still loading, the above condition handles it.
  // If not loading and user status is known, redirect occurs.
  // This return is a fallback.
  return <div>Loading...</div>; 
}
