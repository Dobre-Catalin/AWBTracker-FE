import React from 'react';
import ResponsiveAppBar from "../Components/ViewOnly/ResponsiveAppBar";

const ResponsiveAppBarWrapper = ({children, pages}) => {
    return (
        <>
            <ResponsiveAppBar pages={pages}/>
            {children}
        </>
    );
}

export default ResponsiveAppBarWrapper;