import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LogIn from './Components/LogIn/LogIn';
import { UserProvider } from './Store/user-context';
import Dashboard from "./Components/Account/Dashboard";
import Account from "./Components/Account/Account";
import ResponsiveAppBarWrapper from "./Containers/AppBarWrapper";

function App() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        role: ''
    });

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
                setUser({
                    email: '',
                    password: '',
                    role: ''
                });
            }
        }
    ];

    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/index" element={<LogIn />} />
                    <Route path="/dashboard" element={<ResponsiveAppBarWrapper pages={loggedInPages}><Dashboard /></ResponsiveAppBarWrapper>} />
                    <Route path="/dashboard/account" element={<ResponsiveAppBarWrapper pages={loggedInPages}><Account /></ResponsiveAppBarWrapper>} />
                    <Route path="*" element={<Navigate to="/index" />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
