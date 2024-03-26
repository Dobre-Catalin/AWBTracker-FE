import React, {createContext, useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        email:'',
        password:'',
        permission:'',
    });

    const [pages, setPages] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            setUser(user);
        }
    }, []);

    const loggedInViewer = [
        {
            uri: '/dashboard/account',
            text: 'Account',
        },
        {
            uri: '/dashboard/search_awb',
            text: 'Search AWB',
        },
        {
            uri: '/index',
            text: 'Log out',
            action: () => {
                logout();
            }
        }
    ];

    const loggedInSender = [
        {
            uri: '/dashboard/account',
            text: 'Account',
        },
        {
            uri: '/dashboard/search_awb',
            text: 'Search AWB',
        },
        {
            uri: '/dashboard/send_parcel',
            text: 'Send Parcel',
        },
        {
            uri: '/index',
            text: 'Log out',
            action: () => {
                logout();
            }
        }
    ];

    const loggedInAdmin = [
        {
            uri: '/dashboard/account',
            text: 'Account',
        },
        {
            uri: '/dashboard/manage_users',
            text: 'Users',
        },
        {
            uri: '/dashboard/manage_parcels',
            text: 'Parcels',
        },
        {
          uri : '/dashboard/manage_transports',
            text: 'Transports',
        },
        {
          uri: '/dashboard/manage_vehicles',
            text: 'Vehicles',
        },
        {
            uri: '/dashboard/manage_hubs',
            text: 'Hubs',
        },
        {
            uri: '/dashboard/simulate_transport',
            text: 'Simulate Transport',
        },
        {
            uri: '/index',
            text: 'Log out',
            action: () => {
                logout();
            }
        }
    ];

    const loggedOutPages = [];

    useEffect(() => {
        if(user.email === ''){
            setPages(loggedOutPages);
        }
        else if(user.permission === 'sender'){
            setPages(loggedInSender);
        }
        else if(user.permission === 'admin'){
            setPages(loggedInAdmin);
        }
        else {
            setPages(loggedInViewer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const updateUser = (newUser) =>{
        setUser(newUser);
    };

    const logout = () => {
        setUser({
            email: '',
            password: '',
            permission: ''
        });
        sessionStorage.clear();
        navigate('/index');
    }

    return (
        <UserContext.Provider value={{ user, updateUser, pages }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext };