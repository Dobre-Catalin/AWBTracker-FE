import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from "@mui/material";
import axios from "axios";

const defaultTheme = createTheme();

export default function NewHubForm() {
    const [hub, setHub] = useState({
        name: '',
        ZIP: '',
        address: '',
        countryID: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setHub({ ...hub, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(hub);
        try {
            const response = await axios.post('http://localhost:8080/api/hubs/create', hub);
            console.log('Hub data sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending hub data:', error);
            alert('Error sending hub data');
        }
    };

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
                                    id="name"
                                    label="Name"
                                    name="name"
                                    value={hub.name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="ZIP"
                                    label="ZIP"
                                    name="ZIP"
                                    value={hub.ZIP}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    value={hub.address}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="countryID"
                                    label="Country ID"
                                    name="countryID"
                                    value={hub.countryID}
                                    onChange={handleChange}
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
