import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LogIn from './Components/LogIn/LogIn';
import { UserProvider } from './Store/user-context';
import Dashboard from "./Components/Account/Dashboard";
import Container from "@mui/material/Container";
import Account from "./Components/Account/Account";
import ViewAppBar from "./Components/ViewOnly/ViewAppBar";

function App() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        role: ''
    });

    const onAction = (action) => {

    }

    return (
        <UserProvider>
            <BrowserRouter>
                <ViewAppBar onAction={onAction()}/>
                <Routes>
                    <Route path="/index" element={<LogIn />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/account" element={<Account />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
