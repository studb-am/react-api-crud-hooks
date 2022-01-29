import { useState, useEffect, useCallback } from 'react';
import fetchFn from './fetchFn';

const useInsert = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const defaultVars = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: null
    }

    const clearError = () => {
        setError(null);
    }

    const httpAbortCtrl = new AbortController();
    const insert = useCallback((variables) => fetchFn({ 
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

    return [insert, {loading, error, clearError}];
}

export default useInsert;