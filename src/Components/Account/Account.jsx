    import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../Store/user-context";
import Button from "@mui/material/Button";
import ViewAppBar from "../ViewOnly/ResponsiveAppBar";

export default function Account() {
    const { user, updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        updateUser({
            email: '',
            password: '',
            permission: ''
        });

        navigate('/index');
    };

    return (
        <>
            <h1>Account</h1>
            <h2>Email: {user.email}</h2>
            <h2>Permission: {user.permission}</h2>
            <Button onClick={logout}>Logout</Button>
        </>
    );
}
