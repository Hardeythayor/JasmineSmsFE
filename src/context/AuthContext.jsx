import { createContext, useEffect, useState } from "react";
import axiosInstance from "../hooks/axiosInstance";

export const AuthContext = createContext(null)

const AuthContextProvider = ({children}) => {
    const [userData, setUserData] = useState({
        userInfo: null,
        authIsReady: false
    })

    const resetUser = () => {
        setUserData({
            userInfo: null,
            authIsReady: true
        })
    }

    const fetchUserDetails = () => {
        const user = localStorage.getItem('userData')
        if(user) {
            const userInfo = JSON.parse(user)
            const url = '/user/profile'

            axiosInstance.get(url)
              .then(res => {
                setUserData(prevUserData => (
                    {...prevUserData, userInfo: res.data.user, authIsReady: true}
                ))
              })
              .catch(err => {
                console.log('An error occured. Please, try again')
              })
              .finally()
        } else {
            setUserData(prevUserData => (
                {...prevUserData, authIsReady: true}
            ))
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [])

    const value = {
        userData,
        setUserData,
        resetUser,
        fetchUserDetails
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider