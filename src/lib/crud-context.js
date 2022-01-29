import { createContext } from "react";

const CrudContext = createContext({
    userId: null,
    token: null,
    login: () => { },
    logout: () => { }
});

export default CrudContext;