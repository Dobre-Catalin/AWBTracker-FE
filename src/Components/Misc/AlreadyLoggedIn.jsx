import React, {useContext} from 'react'
import { UserContext} from "../../Store/user-context";
import {Link} from "@mui/material";

export default function OopsLooged(){
    const { user } = useContext(UserContext);

    function checkPermission() {
        if (user.permission !== '') {
            return true;
        }
        return false;
    }

    if (!checkPermission()) {
        return (
            <div>
                <h1>Oops! You are already logged in</h1>
                <Link href="/account">Go back to your account</Link>
            </div>
        );
    }
    else{
        return true;
    }
}