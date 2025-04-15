import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken(); 
    if (!token) {
      return null; 
    }
    return jwtDecode<JwtPayload>(token);
  }

  loggedIn() {
    const token = this.getToken(); 
    return !!token && !this.isTokenExpired(token); 
  }
  
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token); // Decode the token
      if (!decoded.exp) {
        return true; // If the token doesn't have an expiration, consider it expired
      }
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decoded.exp < currentTime; // Check if the token is expired
    } catch (error) {
      return true; // If there's an error decoding the token, consider it expired
    }
  }

  getToken(): string | null {
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken); 
    window.location.assign('/'); 
  }

  logout() {
    localStorage.removeItem('id_token'); 
    window.location.assign('/login'); 
  }
}

export default new AuthService();
