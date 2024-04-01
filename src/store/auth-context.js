import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn : false,
    logOutFun : ()=>{}
})

export default AuthContext;