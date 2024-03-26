import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper, Checkbox, FormControlLabel } from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const defaultTheme = createTheme();

export default function NewUserForm() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
        isAdmin: false,
        isSender: false,
        isViewOnly: false,
    });
    const [isAdmin, setAdmin] = useState(false);
    const [isSender, setSender] = useState(false);
    const [isViewOnly, setViewOnly] = useState(false);

    const handlePermissionChange = (permission) => {
        if(permission === 'admin') {
            setAdmin(!isAdmin);
            setSender(false);
            setViewOnly(false);
            setUser({...user, isAdmin: true, isSender: false, isViewOnly: false});
        }
        if(permission === 'sender') {
            setSender(!isSender);
            setAdmin(false);
            setViewOnly(false);
            setUser({...user, isAdmin: false, isSender: true, isViewOnly: false});
        }
        if(permission === 'viewOnly') {
            setViewOnly(!isViewOnly);
            setSender(false);
            setAdmin(false);
            setUser({...user, isAdmin: false, isSender: false, isViewOnly: true});
        }
    }

    const handleEmailChange = (event) => {
        setUser({...user, email: event.target.value});
    }

    const handlePasswordChange = (event) => {
        setUser({...user, password: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(user);
        try {
            const response = await axios.post('http://localhost:8080/api/users/create', user);
            console.log('User data sent successfully:', response.data);
            navigate('/dashboard/manage_users');
        } catch (error) {
            console.error('Error sending user data:', error);
            alert('Error sending user data');
        }
    }

    return (
        <>
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <Paper style={{ position: 'relative', padding: '20px', marginTop: '20px', width: '100%' }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Fill in the details
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                value={user.email}
                                onChange={handleEmailChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                value={user.password}
                                onChange={handlePasswordChange}
                            />
                            <FormControlLabel
                                control={<Checkbox name="admin" color="primary" checked={isAdmin === true} onChange={() => handlePermissionChange('admin')} />}
                                label="Admin"
                            />
                            <FormControlLabel
                                control={<Checkbox name="sender" color="primary" checked={isSender === true} onChange={() => handlePermissionChange('sender')} />}
                                label="Sender"
                            />
                            <FormControlLabel
                                control={<Checkbox name="viewOnly" color="primary" checked={isViewOnly === true} onChange={() => handlePermissionChange('viewOnly')} />}
                                label="View Only"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
        </>
    );
}
