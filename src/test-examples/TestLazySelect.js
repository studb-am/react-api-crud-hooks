import React from 'react';
import { useLazySelect } from '../lib';

const TestSelect = props => {
    const [runQuery, { data, loading, error }] = useLazySelect()

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error.message}</p>
    }

    return <div>
        <button onClick={() => runQuery({
            url: 'https://locomovolt.com/api/backend/places/search-places'
        })}>Fetch Data</button>
        {data && <p>{JSON.stringify(data, undefined, 2)}</p>}
    </div>

}

export default TestSelect;