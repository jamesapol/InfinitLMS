import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import { BASE_URL } from '../config';
import * as Network from 'expo-network';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import { Platform } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // State for checking internet connection
    const [connected, setConnected] = useState(false);

    // State for app theme
    const [appTheme, setAppTheme] = useState();

    // States for authentication
    const [userToken, setUserToken] = useState();
    const [user, setUser] = useState();
    const [userClasses, setUserClasses] = useState();

    //Loading states//
    //for splashscreen
    const [splashLoading, setSplashLoading] = useState(false);

    //for login and logout
    const [loginLoading, setLoginLoading] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);

    //for fetching data again
    const [coursesLoading, setCoursesLoading] = useState(false);
    const [modulesLoading, setModulesLoading] = useState(false);

    //for refreshing
    const [refreshing, setRefreshing] = useState(false);

    //Error states
    const [loginErrorVisible, setLoginErrorVisible] = useState(false);



    const login = async (username, password) => {
        setLoginLoading(true);
        if (connected) {
            await axios.post(`${BASE_URL}/api/login`, {
                username: username,
                password: password,
                deviceName: Device.modelName,
                platform: Platform.OS
            }).then((response) => {
                if (response.data.error) {
                    setLoginErrorVisible(true);
                }
                else if (response.data.user) {
                    SecureStore.setItemAsync('user', JSON.stringify(response.data.user));
                    SecureStore.setItemAsync('userToken', response.data.userToken);
                    // SecureStore.setItemAsync('userClasses', JSON.stringify(response.data.userClasses));
                    setUser(response.data.user);
                    setUserToken(response.data.userToken);
                    setUserClasses(response.data.userClasses);
                    console.log(response.data.userClasses)
                }
                setLoginLoading(false)
            }).catch((error) => {
                console.log(error.response);
                setLoginLoading(false);
            })
        } else {
            console.warn("You have no internet connection!");
        }
    }

    const logout = async () => {
        clearAll()
        setLogoutLoading(true);
        await axios.post(`${BASE_URL}/api/logout`, {}, {
            headers: { Authorization: `Bearer ${userToken}` },
        }).then((response) => {
            console.log(response.data)

            setLogoutLoading(false)
            clearAll();
        }).catch((error) => {
            console.log(error.response)
            setLogoutLoading(false)
        })
    }

    const getStudentCourses = async (user) => {
        setCoursesLoading(true)
        await axios.get(`${BASE_URL}/api/get_student_courses/${user.usrID}/${Platform.OS}`, {
            headers: { Authorization: `Bearer ${userToken}` },
        }).then((response) => {
            console.log(response.data)
            setUserClasses(response.data.userClasses)
            setCoursesLoading(false)
        }).catch((error) => {
            console.log(error)
            setCoursesLoading(false)
        });
    }

    const getCourseModules = async (courseID) => {
        setModulesLoading(true);
        await axios.get(`${BASE_URL}/api/get_course_modules/${user.usrID}/${courseID}`, {
            headers: { Authorization: `Bearer ${userToken}` },
        }).then((response) => {
            console.log(response.data)
            setModulesLoading(false);
        }).catch((error) => {
            console.log(error.response)
            setModulesLoading(false);
        });
    }

    const isLoggedIn = async () => {
        setSplashLoading(true)
        let user = await SecureStore.getItemAsync("user")
        let userToken = await SecureStore.getItemAsync('userToken');
        if (userToken && user) {
            console.log(userToken);
            let userInfo = JSON.parse(user);
            console.log(userInfo)
            setUser(userInfo);
            setUserToken(userToken);
            getStudentCourses(userInfo);
            // setUserClasses(JSON.parse(userClasses));
            setSplashLoading(false)
        } else {
            setSplashLoading(false)
            clearAll();
        }
    }

    const clearAll = async () => {
        //Clear states
        setUser();
        setUserToken();
        setUserClasses();

        //Clear SecureStore values
        SecureStore.deleteItemAsync("userToken")
        SecureStore.deleteItemAsync("user")
        SecureStore.deleteItemAsync("userClasses")
    }

    useEffect(() => {
        const checkNetwork = async () => {
            const networkState = await Network.getNetworkStateAsync();
            const connected = networkState.isConnected;

            setConnected(connected);
            if (!connected) {
                console.error("tanginamo")
                return;
            }
        }
        checkNetwork();
        isLoggedIn();
    }, [])


    return (
        <AuthContext.Provider value={{
            // for global internet state
            connected,
            setConnected,

            // for user authentication
            login,
            user,
            userToken,
            setUserToken,
            userClasses,
            setUserClasses,
            logout,

            // courses functions
            getStudentCourses,
            getCourseModules,

            // loading States
            loginLoading,
            setLoginLoading,
            logoutLoading,
            setLogoutLoading,
            splashLoading,
            setSplashLoading,
            coursesLoading,
            setCoursesLoading,

            // for refreshing
            refreshing,
            setRefreshing,

            // error states
            loginErrorVisible,
            setLoginErrorVisible,

        }}>
            {children}
        </AuthContext.Provider>
    )
}
