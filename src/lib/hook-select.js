import { useState, useEffect, useCallback } from "react";
import fetchFn from "./fetchFn";

export const useSelect = (variables) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const defaultVars = {
        method: 'GET',
        headers: {},
        body: null
    }

    const clearError = () => {
        setError(null);
    }

    const httpAbortCtrl = new AbortController();
    const select = useCallback(() => fetchFn({
        ...defaultVars,
        httpAbortCtrl,
        setLoading,
        setError,
        ...variables
    }),[]);

    useEffect(() => {
        select().then(currData => setData(currData));
    }, [select]);

    useEffect(() => {
        return () => {
            httpAbortCtrl.abort();
        }
    },[])

    return { data, loading, error, clearError };

}

export const useLazySelect = (variables) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const defaultVars = {
        method: 'GET',
        headers: {},
        body: null
    }

    const clearError = () => {
        setError(null);
    }

    const httpAbortCtrl = new AbortController();
    const runQuery = useCallback(() => fetchFn({
        ...defaultVars,
        httpAbortCtrl,
        setLoading,
        setError,
        ...variables
    }).then(currData => setData(currData)),[]);

    useEffect(() => {
        return () => {
            httpAbortCtrl.abort();
        }
    },[])

    return [runQuery, { data, loading, error, clearError }];
}
