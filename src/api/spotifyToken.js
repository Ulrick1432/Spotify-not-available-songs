import { refreshToken } from "./authorization_code_pkce";

// Function to check if the token is still valid
export const isTokenValid = () => {
  console.log(`isTokenValid function is running and returns a boolean`)
  const now = new Date().getTime(); // Current time in milliseconds
  const expirationTime = parseInt(localStorage.getItem('expires'), 10);

  return now < expirationTime // Returns true if the token is still valid and false if expired


//   // Example use case: Before making an API request, check if the token is valid
// if (isTokenValid()) {
//   console.log('Token is still valid, proceed with the API request');
// } else {
//   console.log('Token has expired, refresh token or log out');
//   // Trigger a refresh token process or redirect to login
// }
}

export const setTokenRefreshTimeout = () => {
  const now = new Date().getTime();
  const expirationTime = parseInt(localStorage.getItem('expires'), 10);
  const timeout = expirationTime - now - 60000; // Refresh 1 minute before expiration
  console.log(
    ` setTokenRefreshTimeout is now running:
    now = ${now} 
    AND expirationTime = ${expirationTime} 
    AND timeout = ${timeout}`
  );

  if (timeout > 0) {
    setTimeout(() => {
      refreshToken();
    }, timeout);
  }
};
