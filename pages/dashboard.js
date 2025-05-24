import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import styles from './DashboardPage.module.css'; // Import CSS module

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout(); // AuthContext's logout should handle clearing user and localStorage
    router.push('/login'); // Redirect to login page after logout
  };

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (!user) {
    // This state should ideally be brief as the useEffect above will redirect.
    return <div className={styles.container}>Loading...</div>; // Or "Redirecting to login..."
  }

  // If loading is false and user exists
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Welcome to your Dashboard</h1>
        <p>User Email: {user.email}</p>
        {user.userId && <p>User ID: {user.userId}</p>}
        <button onClick={handleLogout} className={styles.button}>
          Logout
        </button>
      </div>
    </div>
  );
}
