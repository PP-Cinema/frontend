import React, {useCallback, useState} from "react";
import axios from "axios";
import { UserService } from "../services";

const DefaultState = () =>
({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    role: localStorage.getItem('role') 
});


const UserContext = React.createContext(DefaultState());

const UserContextProvider = ({children}) => 
{
    const [state,setState] = useState(DefaultState());
    const signIn = useCallback(async (login,password) => 
    {
        const result = await UserService.signIn(login,password);
        console.log(result);
        if(result.data)
        {
            console.log(result.data.data.accessToken);
            localStorage.setItem('accessToken',result.data.data.accessToken);
            localStorage.setItem('refreshToken',result.data.data.refreshToken);
            localStorage.setItem('role',result.data.data.role);
            axios.defaults.headers.common.Authorization = `Bearer ${result.data.data.accessToken}`;
            setState(result.data.data);
            return true;
        }
        return false;
    },[]);

    return (
        <UserContext.Provider value={{...state,signIn}}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContextProvider,UserContext};

