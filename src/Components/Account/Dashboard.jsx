import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../Store/user-context";
import Button from "@mui/material/Button";
import ViewAppBar from "../ViewOnly/ViewAppBar";
import Typography from "@mui/material/Typography";

export default function Dashboard() {
    const { user, updateUser } = useContext(UserContext);
    const {renderedContent, setRenderedContent} = useState('account');
    const navigate = useNavigate();

    const logout = () => {
        updateUser({
            email: '',
            password: '',
            permission: ''
        });

        navigate('/index');
    };

    const account = () => {
        navigate('/dashboard/account');
    }

    const handleAppBarAction = (action) => {
        // Do something based on the action received from the app bar
        if (action === 'logout') {
            logout();
        } else if (action === 'account') {
            account();
        }
    };

    const selectAppBarContent = () => {
        if(user.permission === 'viewOnly') {
            return <ViewAppBar onAction={handleAppBarAction} />;
        }
        else if(user.permission === 'admin') {
            return <ViewAppBar onAction={handleAppBarAction} />;
        }
        else
        {
            return <ViewAppBar onAction={handleAppBarAction} />;
        }
    };

    return (
        <>

            <Typography variant="h3" component="div" sx={{ flexGrow: 1, textAlign: 'center', mt: 2 }}>
                Welcome to your dashboard, {user.email}!
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', mt: 2 }}>
                What would you like to do today?
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', mt: 2 }}>
                Your permission is: {user.permission === 'viewOnly' ? 'viewer' : (user.permission === 'admin' ? 'admin' : 'sender')}!
            </Typography>
        </>
    );
}
