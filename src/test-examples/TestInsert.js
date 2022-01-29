import React, { useContext } from 'react';
import { CrudContext, useInsert } from '../lib';

const TestInsert = () => {

    const [insert, { loading, error }] = useInsert();
    const auth = useContext(CrudContext);

    const insertPlace = () => {
        insert({
            url: `${process.env.REACT_APP_HOST}/api/places/no-img`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                title: "Duomo di Milano",
                description: "Bellissima chiesa del 1500!!",
                coordinates: {"lng": 7.775503019836123, "lat": 43.81708879680269},
                creator: "61f4043ab6504824b0255c42"
            })
        })
            .then(data => console.log("successfully inserted!"));
    }

    if (loading) {
        return <p>loading...</p>
    }

    return <div>
        <h2>Insert Test</h2>
        <button onClick={insertPlace}>Insert</button>
    </div>

}

export default TestInsert;