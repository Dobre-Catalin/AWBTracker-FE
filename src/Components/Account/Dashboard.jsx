import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../Store/user-context";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Dashboard() {
    const { user, updateUser } = useContext(UserContext);
    const {renderedContent, setRenderedContent} = useState('account');

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
