import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => null);
      const errorMessage = errorDetails?.message || 'Failed to log in';
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();
    return data; // Return the response data (e.g., token or user info)
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Re-throw the error for the caller to handle
  }
}



export { login };
