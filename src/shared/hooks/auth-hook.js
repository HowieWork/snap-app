import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  // NOTE ISLOGGEDIN IS REPLACED BY WHETHER TOKEN EXISTS
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    // REACT WILL BATCH ALL THE FOLLOWING SET STATE TOGETHER
    setToken(token);
    setUserId(uid);

    // NOTE STORE TOKEN IN LOCAL STORAGE
    // PASS EXISTING EXPIRATION DATE OR GENERATE A DATE OBJECT: NOW + 1 HOUR
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        // ISO STRING CAN BE CONVERTED BACK TO A DATE OBJECT
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    // REMORE USERDATA STORED LOCALLY
    localStorage.removeItem('userData');
  }, []);

  // IMPLEMENT AUTO-LOGOUT
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
    // FIXME PUT BELOW BACK
    // if (!token || !tokenExpirationDate) {
    //   clearTimeout(logoutTimer);
    // }
  }, [token, logout, tokenExpirationDate]);

  // IMPLEMENT AUTO-LOGIN
  useEffect(() => {
    // TODO(OPTIONAL) FIX 'HICCUP' WHEN FIRST RENDER IS NOT LOGGED IN
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId };
};
