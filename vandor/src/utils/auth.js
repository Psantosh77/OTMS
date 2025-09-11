// Utility to get dashboard path for a given user role
export function getDashboardPathForRole(role) {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'vendor':
      return '/vendor/dashboard';
   
    case 'customer':
      return '/client/dashboard';
   
  }
}
import { apiService } from "../utils/apiService";
import { setCookie, getCookie, deleteCookie, cookiesEnabled } from "./cookies";

// Utility to check if user is logged in by calling backend /auth/check-token API
export async function isUserLoggedIn() {
  try {
    const response = await apiService.post("/auth/check-token", {}, { withCredentials: true });
    // If backend returns status 200, token is valid
    return response && response.status === 200 ? true : false;
  } catch (err) {
    return false;
  }
}

// Utility to get user role from token or API
export async function getUserRole() {
  try {
    const response = await apiService.post("/auth/get-user-role", {}, { withCredentials: true });
    if (response && response.status === 200 && response.data) {
      // Store role in cookie for future use
      if (cookiesEnabled()) {
        setCookie("userRole", response.data.role, 7, { secure: true, sameSite: "Strict" });
      } else {
        localStorage.setItem("userRole", response.data.role);
      }
      return response.data.role; // expecting 'client', 'vendor', or 'admin'
    }
    return null;
  } catch (err) {
    // Fallback: try to get role from cookies first, then localStorage
    if (cookiesEnabled()) {
      return getCookie("userRole") || null;
    } else {
      return localStorage.getItem("userRole") || null;
    }
  }
}

// Utility to get user info including role and email, only calls API once per reload
let _userInfoCache = null;
let _userInfoPromise = null;
export async function getUserInfo() {
  if (_userInfoCache) return _userInfoCache;
  if (_userInfoPromise) return _userInfoPromise;
  _userInfoPromise = (async () => {
    try {
      const response = await apiService.post("/auth/get-user-info", {}, { withCredentials: true });
      if (response && response.status === 200 && response.data) {
        if (cookiesEnabled()) {
          setCookie("loggedInEmail", response.data.data.email, 7, { secure: true, sameSite: "Strict" });
          setCookie("userRole", response.data.role, 7, { secure: true, sameSite: "Strict" });
          setCookie("isAuthenticated", "true", 7, { secure: true, sameSite: "Strict" });
        } else {
          localStorage.setItem("loggedInEmail", response.data.data.email);
          localStorage.setItem("userRole", response.data.data.role);
          localStorage.setItem("isAuthenticated", "true");
        }
        _userInfoCache = {
          email: response.data.data.email,
          role: response.data.data.role,
          isAuthenticated: true
        };
        return _userInfoCache;
      }
      _userInfoCache = {
        email: null,
        role: null,
        isAuthenticated: false
      };
      return _userInfoCache;
    } catch (err) {
      let email, role, isAuth;
      if (cookiesEnabled()) {
        email = getCookie("loggedInEmail");
        role = getCookie("userRole");
        isAuth = getCookie("isAuthenticated") === "true";
      } else {
        email = localStorage.getItem("loggedInEmail");
        role = localStorage.getItem("userRole");
        isAuth = localStorage.getItem("isAuthenticated") === "true";
      }
      _userInfoCache = {
        email: email || null,
        role: role || null,
        isAuthenticated: isAuth && !!(email && role)
      };
      return _userInfoCache;
    } finally {
      _userInfoPromise = null;
    }
  })();
  return _userInfoPromise;
}

// Clear all auth data
export function clearAuthData() {
  // Clear user info cookies
  if (cookiesEnabled()) {
    deleteCookie("loggedInEmail");
    deleteCookie("userRole");
    deleteCookie("isAuthenticated");
    
    // Clear auth token cookies
    deleteCookie("accessToken");
    deleteCookie("access_token");
    deleteCookie("refreshToken");
    deleteCookie("token");
  }
  
  // Also clear localStorage as backup/fallback
  localStorage.removeItem("loggedInEmail");
  localStorage.removeItem("userRole");
  localStorage.removeItem("isAuthenticated");
  localStorage.clear();
}

// Utility to save user info to cookies or localStorage
export function saveUserInfoToCookies(email, role) {
  if (cookiesEnabled()) {
    setCookie("loggedInEmail", email, 7, { secure: true, sameSite: "Strict" });
    setCookie("userRole", role, 7, { secure: true, sameSite: "Strict" });
    setCookie("isAuthenticated", "true", 7, { secure: true, sameSite: "Strict" });
  } else {
    // Fallback to localStorage
    localStorage.setItem("loggedInEmail", email);
    localStorage.setItem("userRole", role);
    localStorage.setItem("isAuthenticated", "true");
  }
}

// Utility to get user info from cookies/localStorage only (faster, no API call)
export function getUserInfoFromCookies() {
  let email, role, isAuth;
  
  if (cookiesEnabled()) {
    email = getCookie("loggedInEmail");
    role = getCookie("userRole");
    isAuth = getCookie("isAuthenticated") === "true";
  } else {
    email = localStorage.getItem("loggedInEmail");
    role = localStorage.getItem("userRole");
    isAuth = localStorage.getItem("isAuthenticated") === "true";
  }
  
  return {
    email: email || null,
    role: role || null,
    isAuthenticated: isAuth && !!(email && role)
  };
}
