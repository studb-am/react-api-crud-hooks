import React, { useContext } from 'react';
import { CrudContext, useAuthenticate } from '../lib';
//import TestSelect from './TestSelect';
//import TestUpdate from './TestUpdate';
//import TestDelete from './TestDelete';
import TestInsert from './TestInsert';

const TestContext = () => {

    const auth = useContext(CrudContext);
    const [authenticate, { loading, error, clearError }] = useAuthenticate();

    const logUser = () => {
        authenticate({
            url: `${process.env.REACT_APP_HOST}/api/users/login`,
            body: JSON.stringify({
                email: 'mike@gmail.com',
                password: 'abc123'
            })
        })
            .then(user => auth.login({
                uid: user.userId, 
                newToken: user.token,  
                keepDataOnStorage: true
            }))
    }

    return <div>
        <p>UserId: {auth.userId}</p>
        <button onClick={logUser}>Login</button>
        <button onClick={auth.logout}>Logout</button>
        <hr />
        {/*<TestSelect />*/}
        {/*<TestUpdate />*/}
        {/*<TestDelete />*/}
        <TestInsert />
    </div>

}

export default TestContext;