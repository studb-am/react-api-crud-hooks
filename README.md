# A react library with hooks API
*react-api-crud-hooks* is a library that wants to simplify the usage of the most common rest API operation, that are GET, POST, PATCH, and DELETE, the basics and essential operations to be applied on CRUD interactions, plus the authentication method (signin rather then signup) thanks to the usage of a CRUD context.

In order to use this library in the best way, it's essential to create a backend in order to export on specific url paths the needed REST API, that can be easily called and used by the application of this library hooks.

## Table of contents
* [The Crud Provider](#the-crud-provider)
* [The Crud Context](#the-crud-context)
* [The Hook functions](#the-hook-functions)
    * [useAuthenticate](#useAuthenticate)
    * [useSelect](#useSelect)
    * [useLazySelect](#useLazySelect)
    * [useUpdate](#useUpdate)
    * [useDelete](#useDelete)
    * [useInsert](#useInsert)

## The Crud Provider
This is the component that enables a Context within all the children components. In order to use the provider, you can apply the following boilerplate script:

```jsx
    import React from 'react';
    import { CrudProvider } from 'react-api-crud-hooks';

    function App() {
        return <CrudProvider enablesToken tokenExpiresIn={1000}>
            *...add your children components here...*
        </CrudProvider>
    }

    export default App;
```

Crud Provider needs to be passed the following properties:
* **enablesToken**, this is a boolean that states if the login by token needs to be enabled or not
* **tokenExpiresIn**, it states the token validity to be expressed in milliseconds and as a number, otherwise the developer will get an error. In order to correctly use this property, please keep in account to set enablesToke as true.

## The Crud Context
An important concept that is created under the hood is the Crud Context. This is the responsible of keeping the needed information related to the user that authenticates and provide the frontend with easy to use functions, such as login and logout. The Crud Context returns an object that contains in this release:

* **userId**, it's the ID of the user that is retrieved from the backend part,
* **token**, it's the token that the backend generates after the user logged in (or is auto-authenticated if the credentials where stored in the localStorage)
* **userIsLogged**, it's a boolean that let's the user having a shortcut to understand if the user is currently logged or not. This might be useful for example if in our website we want to render particular sections or actions only to logged users
* **login**, it's the function that let's the user authenticate on FE. In order to correctly be logged the FE must provide to login an object with the following properties:
    * *uid*, it's the user identifier that will stored on FE too
    * *newToken*, it's the token that has been generated from BE after the user correctly logs in (or the ones retrieved from local storage if the user previously correctly logged in, didn't apply the logut, and the token expiration date is not passed yet)
    * *expDate*, it's the expiration date associated with the token. This field is only mandatory in case of auto-login, where we retrieve the information from local storage. In case of a new real login, this value is not to be sent, but it's automatically generated from the login function itself, by taking into account the *tokenExpiresIn* property passed to the CrudProvider
    * *keepDataOnStorage*, this is a boolean that will ask the Crud to keep information in memory for the current user or not
* **logout**, it's the function that logs out the user and remove all his information from the localStorage, if memorized

## The hook functions
In this section we are going to describe all the hook available in the package. Please, keep in account that, in order to correctly use this hooks, it's important that the backend rest api has been set correctly.

### useAuthenticate
The useAuthenticate hook is used in order to enable the use to be authenticated. This is valid for both signup and login. Once inovoked, useAuthenticate will return an array made as follow:

* the *authenticate* function, that is the function that will be used in order to dialogue with BE and execute the authentication function. Authenticate is an asyncronuos function, that waits an answer from the backend (so you are free to use with the Promise sintax rathen than async/await). The expected answer is a user object that must contain as required a *user ID* and a *token* because they will be essential for the login function described above (of course developer can add in the backend object whatever else property they think might be useful in FE)
* an object that contains:
    * the *loading* state, a boolean that states whether the client is still waiting for an answer from the BE or not. This can be useful for example to apply conditional rendering on the UI and set a loading spinner once the loading state is true
    * the *error* state, an error variable that will be populate whenever the BE will throw an error. This might be useful for the developer in order to understand what happened during the call and make actions based on the error message itself
    * the *clearError* state, a function that will reset the error. This function might be useful for example once, based on an error, the developer decide to graphically show it to the user with a UI element such as a popup with a close button. Once the user close the error, it will be resetted on the UI

Below an example of useAuthenticate usage:

```jsx
import React, { useContext } from 'react';
import { CrudContext, useAuthenticate } from 'react-api-crud-hooks';

const TestContext = props => {

    const auth = useContext(CrudContext);
    const [authenticate, { loading, error, clearError }] = useAuthenticate();

    const logUser = () => {
        authenticate({
            url: ..enterYourUrlApiHere...,
            body: JSON.stringify({
                email: ...a valid email stored on BE database...,
                password: ...the corresponding password associated with the email above (if you want to test a successful login)...
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
        {loading && <p>Loading...</p>}
    </div>

}

export default TestContext;
```

### useSelect
This hook function is used in order to retrieve information from backend, without any data manipulation on DB. It can be considered as a SELECT operation of a SQL database. UseSelect accepts a variables object once initialiazed that can contain the following arguments:

* **url**, it's the only mandatory field in case of GET request. This represents the url from BE where the API is exposed
* **method**, represent the method to be used once calling the API. If nothing is specified, then the default method is *GET*
* **headers**, represent the headers object of the request. If nothing is specified, then the default value is an empty object
* **body**, represent the body of the request. If nothing is specified, then default value is *null*

Once the hook is called, it returns an object with the following properties:
* the *data* object, it represents the object data that needs to be fetched at the end of the request (the once the developer configured on BE side)
* the *loading* state, a boolean that states whether the client is still waiting for an answer from the BE or not. This can be useful for example to apply conditional rendering on the UI and set a loading spinner once the loading state is true
* the *error* state, an error variable that will be populate whenever the BE will throw an error. This might be useful for the developer in order to understand what happened during the call and make actions based on the error message itself
* the *clearError* state, a function that will reset the error. This function might be useful for example once, based on an error, the developer decide to graphically show it to the user with a UI element such as a popup with a close button. Once the user close the error, it will be resetted on the UI

A boilerplate script as an example on how to apply useSelect:

```jsx
import React from 'react';
import { useSelect } from 'react-api-crud-hooks';

const TestSelect = props => {
    const { data, loading, error } = useSelect({
        url: ..enterYourUrlApiHere...
    })

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error.message}</p>
    }

    return data && <p>{JSON.stringify(data)}</p>
}

export default TestSelect;
```

### useLazySelect
Both *useSelect* and *useLazySelect* are used in order to fetch data from a rest API, the difference is that useSelect is invoked only for render purpose, whereas useLazySelect is used after some trigger is enabled. The characteristics is almost the same, the only differnce is that:
* once it's declared, procedure needs to destructure an array where the first element is the function to execute, the second object is the same object we get with useSelect
* in order to invoke the query and fetch data we will use the runQuery function

Example of how to use it can be seen in the example below:
```jsx
import React from 'react';
import { useLazySelect } from 'react-api-crud-hooks';

const TestSelect = props => {
    const [runQuery, { data, loading, error }] = useLazySelect({
        url: ..enterYourUrlApiHere...
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
```

### useUpdate
This hook is used once we want to update data inside our database. It can be compared to the UPDATE function of a SQL database. UseUpdate, consists of two steps:
* initialization, once we declare useUpate, without any function parameters, in order to get the update function to run and the UI helper (loading, error, clearError)
* usage, once we use the update. The function is asyncronous and returns the updated record (if needed in the application)

An example of the application of useUpdate in a dedicated component (assuming we have a table of place with two fields: title and description):

```jsx
import React, { useContext } from 'react';
import { CrudContext, useUpdate } from 'react-api-crud-hooks';

const TestUpdate = () => {

    const [update, { loading, error }] = useUpdate();
    const auth = useContext(CrudContext);

    const updatePlace = () => {
        update({
            url: ..enterYourUrlApiHere...,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}` //this is an important part if you set the authentication in your BE; note that if you don't login first then you will receive Authentication error if you try to update data
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
```

### useDelete
This hook let's the FE to delete one or more specific records. It's equal to the DELETE operation of a SQL database. UseDelete, consists of two steps:
* initialization, once we declare useDelete, without any function parameters, in order to get the update function to run and the UI helper (loading, error, clearError)
* usage, once we delete the existing record. The function is asyncronous and returns the deleted record (if needed in the application)

An example of the usage:

```jsx
import React, { useContext } from 'react';
import { CrudContext, useDelete } from 'react-api-crud-hooks';

const TestDelete = () => {

    const [deleteFn, { loading, error }] = useDelete();
    const auth = useContext(CrudContext);

    const deletePlace = () => {
        deleteFn({
            url: ...enterYourUrlApiHere...,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}` //if you set an authentication process it's important to authenticate the operation!
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
```

### useInsert
This hook let's the developer creating a new record on the database. The scope of useInsert is similar to the INSERT operation in SQL. As the others, useInsert is characterized by two steps:
* initialization, once we declare useInsert, without any function parameters, in order to get the update function to run and the UI helper (loading, error, clearError)
* usage, once we insert the new record. The function is asyncronous and returns the new record (if needed in the application)

An example of usage:

```jsx
import React, { useContext } from 'react';
import { CrudContext, useInsert } from 'react-api-crud-hooks';

const TestInsert = () => {

    const [insert, { loading, error }] = useInsert();
    const auth = useContext(CrudContext);

    const insertPlace = () => {
        insert({
            url: ...enterYourUrlApiHere...,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}` //important if the insert operation is queued below the authentication middleware
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
```
