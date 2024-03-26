    import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../Store/user-context";
import Button from "@mui/material/Button";
import ViewAppBar from "../ViewOnly/ResponsiveAppBar";
    import Typography from "@mui/material/Typography";
    import Box from "@mui/material/Box";
    import {Paper} from "@mui/material";

export default function Account() {
    const { user, updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const permission = () => {
        if(user.permission === 'viewOnly'){
            return 'viewer';
        } else if(user.permission === 'admin'){
            return 'admin';
        } else {
            return 'sender';
        }
    }

    //show user.email and user.permission
    return (
        <>
            <br></br>
            <Paper style={{margin: 'auto', padding: '20px', width: '50%'}}>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1, textAlign: 'center', mt: 2 }}>
                Welcome to your account, {user.email}!
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', mt: 2 }}>
                Your permission is: {permission()}!
            </Typography>
            </Paper>
        </>
    );
}
