import React, {useContext} from 'react'
import { UserContext} from "../../Store/user-context";
import {Link} from "@mui/material";

export default function OopsNoPermission( {expectedPermission} ){
    const { user } = useContext(UserContext);

   ///if permission of user is not expected permission send error
    function checkPermission(expectedPermission, user) {
        if (expectedPermission === 'viewOnly') {
            return true;
        } else if (expectedPermission === 'sender') {
            if (user.permission === 'viewOnly') {
                return false;
            }
            return true;
        } else {
            return user.permission === 'admin';
        }
    }

    if (!checkPermission(expectedPermission, user)) {
        return (
            <div>
                <h1>Oops! You are not allowed to view this page</h1>
                <Link href="/index">Go back to login</Link>
            </div>
        );
    }
    else{
        return true;
    }
}