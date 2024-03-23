import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import {UserContext} from "../../Store/user-context";
import {useContext} from "react";

const pages = ['Search AWB', 'Account', 'Apply for sender', 'Log out'];

function ResponsiveAppBar({ onAction }) {
    const navigate = useNavigate();
    const { updateUser }  = useContext(UserContext);

    const logout = () => {
        updateUser({
            email: '',
            password: '',
            permission: ''
        });

        navigate('/index');
    };

    const handleClick = (page) => {
        if (page === 'Log out') {
            console.log('Log out');
            //onAction('logout');
        } else if (page === 'Account') {
            //onAction('account');
            navigate('dashboard/account');
        } else if (page === 'Apply for sender') {
            console.log('Apply for sender');
        } else if (page === 'Search AWB') {
            console.log('Search AWB');
        };
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        AWBTRACKER
                    </Typography>

                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        AWBTracker
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleClick(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;