import { useState, useEffect, useCallback } from 'react';
import fetchFn from './fetchFn';

const useUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const defaultVars = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
    }

    const clearError = () => {
        setError(null);
    }

    const httpAbortCtrl = new AbortController();
    const update = useCallback((variables) => fetchFn({ 
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

    return [update, {loading, error, clearError}];
}

export default useUpdate;