import React, {useContext} from 'react';
import ResponsiveAppBar from "../Components/ViewOnly/ResponsiveAppBar";
import {UserContext} from "../Store/user-context";

const ResponsiveAppBarWrapper = ({children}) => {
    const {pages} = useContext(UserContext);

    return (
        <>
            <ResponsiveAppBar pages={pages}/>
            {children}
        </>
    );
}

export default ResponsiveAppBarWrapper;