import axios from 'axios';
import React, { useState,useEffect } from 'react'

export const userContext = React.createContext();
function AuthProvider({children}) {
    const [loggedIn,setLoggedIn] = useState(undefined);
    const [user,setUser] = useState('')
    const getLoggedInState = async () => {
        try{
            const token = localStorage.getItem('authToken')
            if(!token) throw "Login to continue"
            const userdata = await axios.get(`https://server-shortly.herokuapp.com/api/auth/isLoggedIn`,
            {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
                }
            })
            setLoggedIn(userdata.data.success)
            setUser(userdata.data.username)
        }catch(error){
            setLoggedIn(false)
        }
        
    }
    useEffect(() => {
        getLoggedInState();
        return () => {
            <></>
        } 
    }, [])
    return (
        <userContext.Provider value = {{loggedIn,setLoggedIn,getLoggedInState,user}}>
           {children}
        </userContext.Provider>
    )
}

export default AuthProvider
