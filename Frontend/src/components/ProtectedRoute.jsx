import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserInfo, getUserInfoFromCookies, saveUserInfoToCookies } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles = [], requireAuth = true }) => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchUser() {
      const info = await getUserInfo();
      if (isMounted) {
        setUserInfo(info);
        setLoading(false);
      }
    }
    fetchUser();
    return () => { isMounted = false; };
  }, []);

  if (loading || !userInfo) {
    // Optionally render a spinner or null while loading
    return null;
  }

  let redirectPath = null;
  if (allowedRoles.length > 0 && userInfo.isAuthenticated && !allowedRoles.includes(userInfo.role)) {
    switch (userInfo.role) {
      case 'admin':
        redirectPath = '/admin/dashboard';
        break;
      case 'vendor':
        redirectPath = '/vendor/dashboard';
        break;
      case 'customer':
        redirectPath = '/client/dashboard';
        break;
      default:
        redirectPath = '/';
    }
  } else if (requireAuth && !userInfo.isAuthenticated) {
    redirectPath = '/';
  }

  if (redirectPath) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
