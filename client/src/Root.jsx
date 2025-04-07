// src/Root.jsx
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Root() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseUrl = import.meta.env.PROD
      ? 'https://your-backend-url.vercel.app'
      : 'http://localhost:3000';

    fetch(`${baseUrl}/api/user`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.loggedIn);
        setLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return <Outlet context={{ isAuthenticated }} />;
}
