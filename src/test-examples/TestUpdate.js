import React, { useContext } from 'react';
import { CrudContext, useUpdate } from '../lib';

const TestUpdate = () => {

    const [update, { loading, error }] = useUpdate();
    const auth = useContext(CrudContext);

    const updatePlace = () => {
        update({
            url: `${process.env.REACT_APP_HOST}/api/places/place/61f531d2c325e1b040d02f62`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                title: "Duomo di Milano",
                description: "Bellissima chiesa del 1500!!"
            })
        })
            .then(data => console.log("successfully updated!"));
    }

    if (loading) {
        return <p>loading...</p>
    }

    return <div>
        <h2>Update Test</h2>
        <button onClick={updatePlace}>Test Update</button>
    </div>

}

export default TestUpdate;