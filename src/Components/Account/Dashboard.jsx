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
        </>
    );
}
