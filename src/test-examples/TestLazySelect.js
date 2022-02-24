import React from 'react';
import { useLazySelect } from '../lib';

const TestSelect = props => {
    const [runQuery, { data, loading, error }] = useLazySelect({
        url: `${process.env.REACT_APP_HOST}/api/users`
    })

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error.message}</p>
    }

    return <div>
        <button onClick={runQuery}>Fetch Data</button>
        {data && <p>{JSON.stringify(data, undefined, 2)}</p>}
    </div>
    
}

export default TestSelect;