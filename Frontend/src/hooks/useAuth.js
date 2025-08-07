import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, getUserInfoFromCookies, clearAuthData } from '../utils/auth';
import { setUserInfo, resetUserState } from '../redux/userSlice';

/**
 * Custom hook for authentication state management
 * Provides current auth state and common auth operations
 */
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  const authState = useSelector(state => ({
    isAuthenticated: state.user.isAuthenticated,
    userRole: state.user.userRole,
    email: state.user.loggedInEmail
  }));

  // Load user info from cookies/API
  const loadUserInfo = async (forceRefresh = false) => {
    setLoading(true);
    try {
      let userInfo;
      
      if (forceRefresh) {
        // Force API call
        userInfo = await getUserInfo();
      } else {
        // Try cookies first, then API
        userInfo = getUserInfoFromCookies();
        if (!userInfo.isAuthenticated) {
          userInfo = await getUserInfo();
        }
      }
      
      dispatch(setUserInfo(userInfo));
      return userInfo;
    } catch (error) {
      console.error('Failed to load user info:', error);
      return { email: null, role: null, isAuthenticated: false };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    dispatch(resetUserState());
    clearAuthData();
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return authState.userRole === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(authState.userRole);
  };

  // Load user info on hook initialization
  useEffect(() => {
    if (!authState.isAuthenticated) {
      loadUserInfo();
    }
  }, []);

  return {
    ...authState,
    loading,
    loadUserInfo,
    logout,
    hasRole,
    hasAnyRole,
    isClient: authState.userRole === 'customer',
    isVendor: authState.userRole === 'vendor',
    isAdmin: authState.userRole === 'admin'
  };
};
