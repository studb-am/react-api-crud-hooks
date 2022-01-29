import React from 'react';
import { CrudProvider } from '../lib';
import TestContext from './TestContext';


const Auth = props => {
    return <CrudProvider enablesToken tokenExpiresIn={1000}>
        <p>Here we go!</p>
        <TestContext />
    </CrudProvider>
}

export default Auth;