import { createContext, useEffect, useState } from "react";
import axiosInstance from "../hooks/axiosInstance";

export const AuthContext = createContext(null)

const AuthContextProvider = ({children}) => {
    const [userData, setUserData] = useState({
        userInfo: null,
        authIsReady: false,
        smsCharge: 0,
        smsInfo: null
    })

    const resetUser = () => {
        setUserData({
            userInfo: null,
            authIsReady: true,
            smsInfo: null
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

    const fetchSmsCharge = () => {
        axiosInstance.get("/user/message/charge")
            .then(res => {
                setUserData(prevUserData => (
                    {...prevUserData, smsCharge: res.data.data}
                ))
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    const fetchSmsAnalytics = () => {
        axiosInstance.get('/user/dashboard/me')
        .then(res => {
            setUserData(prevUserData => (
                {...prevUserData, smsInfo: res.data.data}
            ))
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchUserDetails()
    }, [])

    useEffect(() => {
        if(userData.userInfo) {
            fetchSmsCharge()
            fetchSmsAnalytics()
        }
    }, [userData.userInfo])

    const value = {
        userData,
        setUserData,
        resetUser,
        fetchUserDetails,
        fetchSmsAnalytics
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider