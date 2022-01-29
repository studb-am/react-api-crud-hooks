import React from 'react';
import { useSelect } from '../lib';

const TestSelect = props => {
    const { data, loading, error } = useSelect({
        url: `${process.env.REACT_APP_HOST}/api/users`
    })

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error.message}</p>
    }

    return data && <p>{JSON.stringify(data, undefined, 2)}</p>
}

export default TestSelect;