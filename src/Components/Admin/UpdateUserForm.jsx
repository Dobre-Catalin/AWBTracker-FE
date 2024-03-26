import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';

const defaultTheme = createTheme();

export default function UpdateUserForm() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
        isAdmin: false,
        isSender: false,
        isViewOnly: false,
    });
    const location = useLocation(); // Use useLocation to get the location object
    const { userToChange } = location.state;

    useEffect(() => {
        if (userToChange) {
            setUser({
                email: userToChange.email,
                password: userToChange.password,
                isAdmin: userToChange.isAdmin,
                isSender: userToChange.isSender,
                isViewOnly: userToChange.isViewOnly,
            });
        }
    }, [userToChange]);

    const handlePermissionChange = (permission) => {
        setUser(prevUser => ({
            ...prevUser,
            isAdmin: permission === 'admin' ? !prevUser.isAdmin : prevUser.isAdmin,
            isSender: permission === 'sender' ? !prevUser.isSender : prevUser.isSender,
            isViewOnly: permission === 'viewOnly' ? !prevUser.isViewOnly : prevUser.isViewOnly
        }));
    }

    const handleEmailChange = (event) => {
        setUser({ ...user, email: event.target.value });
    }

    const handlePasswordChange = (event) => {
        setUser({ ...user, password: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/users/update/${userToChange.id}`, user);
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
                                    control={<Checkbox name="admin" color="primary" checked={user.isAdmin} onChange={() => handlePermissionChange('admin')} />}
                                    label="Admin"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="sender" color="primary" checked={user.isSender} onChange={() => handlePermissionChange('sender')} />}
                                    label="Sender"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="viewOnly" color="primary" checked={user.isViewOnly} onChange={() => handlePermissionChange('viewOnly')} />}
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
