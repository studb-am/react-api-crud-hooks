import React, { useState, useEffect, useCallback } from 'react';
import CrudContext from './crud-context';

const CrudProvider = props => {

    const { enablesToken, tokenExpiresIn } = props;

    if (typeof tokenExpiresIn !== 'number') {
        throw new Error('Please insert a value for tokenExpiresIn numeric in milliseconds!');
    }

    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [tokenExpDate, setTokenExpDate] = useState(null);

    const login = useCallback((loginObj) => {

        const {uid, newToken, expDate, keepDataOnStorage } = loginObj;
        const keepData = keepDataOnStorage !== undefined ? keepDataOnStorage : true;
        const currToken = enablesToken && newToken !== undefined ? newToken : null;
        setUserId(uid);
        setToken(newToken);

        let newExpDate;
        if (newToken) {
            newExpDate = expDate || new Date(new Date().getTime() + tokenExpiresIn * 60 * 60).toISOString();
            setTokenExpDate(newExpDate);
        }
        
        if (keepData) {
            localStorage.setItem('userData', JSON.stringify({
                userId: uid,
                token: currToken,
                expirationDate: newExpDate
            }));
        }
        
        console.log('logged In!');
    }, []);

    const logout = useCallback(() => { 
        localStorage.removeItem('userData');
        setToken(null);
        setTokenExpDate(null);
        setUserId(null);
        console.log('logged Out'); 
      }, []);

      //Auto-login, in case the user logged and saved his login data
      ////if there is a valid token, then I log the user automatically
      useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData?.token && new Date(storedUserData.expirationDate) > new Date()) {
          login({
            uid:storedUserData.userId, 
            newToken: storedUserData.token, 
            expDate: storedUserData.expirationDate
          });
        }
      }, []);
      ////if there is the token expiration date to be set
      useEffect(() => {
        let timeoutLogger;
        if (tokenExpDate && token) {
          const remainingTime = new Date(tokenExpDate).getTime() - new Date().getTime();
          timeoutLogger = setTimeout(logout, remainingTime);
        } else {
          clearTimeout(timeoutLogger)
        }
        
      },[token, tokenExpDate])

    return <CrudContext.Provider value={{ 
        userId,
        userIsLogged: !!token,
        token,
        login,
        logout
    }}>
        {props.children}
    </CrudContext.Provider>
}

export default CrudProvider;