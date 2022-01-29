import React, { useContext } from 'react';
import { CrudContext, useDelete } from '../lib';

const TestDelete = () => {

    const [deleteFn, { loading, error }] = useDelete();
    const auth = useContext(CrudContext);

    const deletePlace = () => {
        deleteFn({
            url: `${process.env.REACT_APP_HOST}/api/places/place/61f531d2c325e1b040d02f62`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`
            }
        })
            .then(data => console.log("successfully deleted!"));
    }

    if (loading) {
        return <p>loading...</p>
    }

    return <div>
        <h2>Delete Test</h2>
        <button onClick={deletePlace}>Test Delete</button>
    </div>

}

export default TestDelete;