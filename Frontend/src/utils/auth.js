import { apiService } from "../utils/apiService";

// Utility to check if user is logged in by calling backend /auth/check-token API
export async function isUserLoggedIn() {
  try {
    const response = await apiService.post("/auth/check-token", {}, { withCredentials: true });
    // If backend returns status 200, token is valid
    return response && response.status === 200 ?  true : false;
  } catch (err) {
    return false;
  }
}
