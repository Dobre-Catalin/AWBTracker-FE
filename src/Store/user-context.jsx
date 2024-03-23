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

    const loggedInPages = [
        {
            uri: '/dashboard',
            text: 'Search AWB',
        },
        {
            uri: '/dashboard/account',
            text: 'Account',
        },
        {
            uri: '/dashboard/apply',
            text: 'Apply for sender'
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
        } else {
            setPages(loggedInPages);
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