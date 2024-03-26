import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Paper} from "@mui/material";
import axios from "axios";

const defaultTheme = createTheme();

export default function SendParcel() {
    const [fastDelivery, setFastDelivery] = React.useState(false);
    const [fragile, setFragile] = React.useState(false);

    const [parcel, setParcel] = React.useState({
        mass: 0,
        height: 0,
        width: 0,
        length: 0,
        fragile: false,
        paidForFastDelivery: false,
        sourceZIP: 0,
        destinationZIP: 0,
        sourceAddress: '',
        destinationAddress: '',
        senderPhoneNumber: '',
        recipientPhoneNumber: '',
        userSendingID: 0
    });

    const handleFastDeliveryChange = (event) => {
        const isChecked = event.target.checked;
        setFastDelivery(isChecked);
        setParcel(prevParcel => ({ ...prevParcel, paidForFastDelivery: isChecked }));
    }

    const handleFragileChange = (event) => {
        const isChecked = event.target.checked;
        setFragile(isChecked);
        setParcel(prevParcel => ({ ...prevParcel, fragile: isChecked }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const parcelCreated = {
            mass: parseFloat(data.get('mass')),
            height: parseFloat(data.get('height')),
            width: parseFloat(data.get('width')),
            length: parseFloat(data.get('length')),
            fragile: fragile,
            paidForFastDelivery: fastDelivery,
            sourceZIP: parseInt(data.get('sourceZIP')),
            destinationZIP: parseInt(data.get('destinationZIP')),
            sourceAddress: data.get('sourceAddress'),
            destinationAddress: data.get('destinationAddress'),
            senderPhoneNumber: data.get('senderPhoneNumber'),
            recipientPhoneNumber: data.get('recipientPhoneNumber'),
            userSendingID: 1
        };
        setParcel(parcelCreated);
        try {
            const response = await axios.post('http://localhost:8080/api/parcels/create', parcel);
            console.log('Parcel data sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending parcel data:', error);
            if(window.confirm("Failed to send parcel data. Do you want to retry?")){
                window.location.reload();
            }
        }
    };

    return (
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
                                id="mass"
                                label="Mass"
                                name="mass"
                                type="number"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="height"
                                label="Height"
                                name="height"
                                type="number"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="width"
                                label="Width"
                                name="width"
                                type="number"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="length"
                                label="Length"
                                name="length"
                                type="number"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="sourceZIP"
                                label="Source ZIP"
                                name="sourceZIP"
                                type="number"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="destinationZIP"
                                label="Destination ZIP"
                                name="destinationZIP"
                                type="number"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="sourceAddress"
                                label="Source Address"
                                name="sourceAddress"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="destinationAddress"
                                label="Destination Address"
                                name="destinationAddress"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="senderPhoneNumber"
                                label="Sender Phone Number"
                                name="senderPhoneNumber"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="recipientPhoneNumber"
                                label="Recipient Phone Number"
                                name="recipientPhoneNumber"
                            />
                            <FormControlLabel
                                control={<Checkbox id="fragile" name="fragile" color="primary" checked={fragile} onChange={handleFragileChange} />}
                                label="Fragile"
                            />
                            <FormControlLabel
                                control={<Checkbox id="fastDelivery" name="fastDelivery" color="primary" checked={fastDelivery} onChange={handleFastDeliveryChange} />}
                                label="Fast Delivery"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Send Parcel
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
