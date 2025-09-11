// Cookie utility functions for secure client-side storage

/**
 * Set a cookie with security flags
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Expiration in days (default: 7)
 * @param {object} options - Additional cookie options
 */
export function setCookie(name, value, days = 7, options = {}) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  
  const secure = options.secure !== false ? "; Secure" : "";
  const sameSite = options.sameSite || "Strict";
  const httpOnly = options.httpOnly ? "; HttpOnly" : "";
  const path = options.path || "/";
  
  document.cookie = `${name}=${value || ""}${expires}; path=${path}; SameSite=${sameSite}${secure}${httpOnly}`;
}

/**
 * Get a cookie value by name
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null if not found
 */
export function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * Delete a cookie by name
 * @param {string} name - Cookie name
 * @param {object} options - Cookie options (path, domain, etc.)
 */
export function deleteCookie(name, options = {}) {
  const path = options.path || "/";
  const domain = options.domain ? `; domain=${options.domain}` : "";
  const secure = options.secure !== false ? "; Secure" : "";
  const sameSite = options.sameSite || "Strict";
  
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${domain}; SameSite=${sameSite}${secure}`;
}

/**
 * Check if cookies are enabled in the browser
 * @returns {boolean} True if cookies are enabled
 */
export function cookiesEnabled() {
  try {
    setCookie("test_cookie", "test", 1);
    const enabled = getCookie("test_cookie") === "test";
    deleteCookie("test_cookie");
    return enabled;
  } catch (e) {
    return false;
  }
}

/**
 * Get all cookies as an object
 * @returns {object} Object with cookie names as keys
 */
export function getAllCookies() {
  const cookies = {};
  if (document.cookie) {
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      cookies[name] = value;
    });
  }
  return cookies;
}

/**
 * Clear all cookies (only those accessible via JavaScript)
 */
export function clearAllCookies() {
  const cookies = getAllCookies();
  Object.keys(cookies).forEach(name => {
    deleteCookie(name);
  });
}
