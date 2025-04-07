import { Navigate, useOutletContext } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useOutletContext();

  if (!isAuthenticated) return <Navigate to="/" />;
  return children;
}
