import React, { useState, useCallback } from 'react';
import { useEffect } from 'react/cjs/react.development';
import fetchFn from './fetchFn';

const useAuthenticate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const defaultVars = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }

    const clearError = () => {
        setError(null);
    }

    const httpAbortCtrl = new AbortController();
    const authenticate = useCallback((variables) => fetchFn({ 
        ...defaultVars, 
        httpAbortCtrl, 
        setLoading, 
        setError, 
        ...variables 
    }), []);

    //if the component will be unmounted, then I will fire the query to the server
    useEffect(() => {
        return () => {
            httpAbortCtrl.abort();
        }
    },[])

    return [authenticate, {loading, error, clearError}];
}

export default useAuthenticate;