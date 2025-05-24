import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import styles from './LoginPage.module.css'; // Import CSS module

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, loading, error, setError } = useAuth(); // Added setError to clear previous errors
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  useEffect(() => {
    // Clear any previous errors when the component mounts or route changes
    if (setError) {
      setError(null);
    }
  }, [router.pathname, setError]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setError) setError(null); // Clear previous error before new attempt

    const success = await login(email, password);
    if (success) {
      router.push('/dashboard'); // Redirect on successful login
    }
    // Error state will be updated by AuthContext and displayed
  };

  // If user is already determined and exists, show nothing or a loading indicator
  // while redirecting. This prevents the form from flashing.
  if (user) {
    // Still show loading or null to prevent form flash during redirect
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
