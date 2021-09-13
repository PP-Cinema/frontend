import React, {useCallback, useMemo, useState} from "react";
import axios from "axios";
import { UserService } from "../services";
import { displayNotification } from "../miscellanous";
import { ENDPOINT } from "../strings";


const DefaultState =
({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    role: localStorage.getItem('role') 
});

if(DefaultState.accessToken)
{
    console.log(DefaultState.accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${DefaultState.accessToken}`;
}

const UserContext = React.createContext(DefaultState);

const UserContextProvider = ({children}) => 
{

    const [state,setState] = useState(DefaultState);
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
            displayNotification('success','Success','Login successful');
            return true;
        }
        displayNotification('error','Error','Authorization failed');
        return false;
    },[]);

    const signOut = useCallback(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('role');
        axios.defaults.headers.common.Authorization = undefined;
        DefaultState.accessToken='';
        DefaultState.refreshToken='';
        DefaultState.role='';
        setState(DefaultState);
        displayNotification('success','Success','Successfully signed out!');
    },[]);

    const refresh = useCallback(async()=>
    {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const {data} = await UserService.refresh(accessToken,refreshToken);
        if(data)
        {
            localStorage.setItem('accessToken',data.accessToken);
            localStorage.setItem('refreshToken',data.refreshToken);
        }
    },[])

    useMemo(()=>{
        axios.interceptors.response.use((response)=> response,async error=>{
            const originalRequest = error.config;
            if(error.response.status===401 && originalRequest.url.includes(ENDPOINT.refresh)) {
                signOut()
                return;
            };
            if(error.response.status===401) {
                refresh();
                originalRequest.headers.Authorization=`Bearer ${localStorage.getItem('accessToken')}`;
                axios.defaults.headers.common.Authorization=`Bearer ${localStorage.getItem('accessToken')}`;
                return axios(originalRequest);
            }
            throw error;
        })
    },[])

    return (
        <UserContext.Provider value={{...state,signIn,signOut}}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContextProvider,UserContext};

