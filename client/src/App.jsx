// src/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/Landingpage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ProtectedRoute from './components/ProtectedRoute';
import Root from './Root'; // layout component with auth check logic

const App = createBrowserRouter([
  {
    path: '/',
    element: <Root />, // Handles loading and auth
    children: [
      { path: '', element: <LandingPage /> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'about',
        element: (
          <ProtectedRoute>
            <AboutPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default App;
