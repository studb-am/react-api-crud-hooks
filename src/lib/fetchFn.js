import React from 'react';

const fetchFn = async (state) => {

    const { setLoading, setError, url, method, headers, body, httpAbortCtrl } = state;

    try {
        setLoading(true);

        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: body,
            signal: httpAbortCtrl.signal
        });
        const data = await response.json();
       

        if (!response.ok) {
            const newErr = new Error(data.message || 'An unexpected error occured. Please try again later!');
            setError(newErr);
            throw newErr;
        }
        return data;
    } catch (err) {
        setError(err);
        throw err;
    } finally {
        setLoading(false);
    }
}

export default fetchFn;