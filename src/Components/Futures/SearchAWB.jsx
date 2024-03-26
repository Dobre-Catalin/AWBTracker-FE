import React, {useContext, useState} from 'react';

import {UserContext} from "../../Store/user-context";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Divider from '@mui/material/Divider';
import TextField from "@mui/material/TextField";

export default function SearchAWB() {
    const {user, updateUser} = useContext(UserContext);
    const [awbStatus, setAwbStatus] = useState('');
    const [awbDataInput, setAwbDataInput] = useState('');
    const [awbData, setAwbData] = useState({awb: 'why', status: '', location: '', date: ''});

    const dummyAWBForTesting = '1234567890';
    const awbDataForTesting = [{
        awb: '1234567890',
        status: 'Delivered',
        location: 'New York',
        date: '2021-10-10'
    }];

    const handleSearch = () => {
        console.log("awbData: "+awbDataInput + " dummyAWBForTesting: "+dummyAWBForTesting);
        if (awbDataInput === dummyAWBForTesting) {
            console.log("good");
            setAwbData(awbDataForTesting);
            console.log(awbData);
            setAwbStatus('found');
        } else {
            console.log("bad");
            setAwbStatus('not found');
        }
    }

    const handleDataChange = (e) => {
        setAwbDataInput(e.target.value);
    }

    const awbRender = () => {
        if (awbStatus === '') {
            return (
                <>
                    <Divider/>
                    <br/>
                    <TextField onChange={handleDataChange}>
                        <label htmlFor="awb">AWB:</label>
                        <input type="text" id="awb" name="awb"/>
                    </TextField>
                    <Button variant="contained" color="primary" style={{margin: '10px'}} onClick={handleSearch}>
                        Search
                    </Button>
                </>
            );
        } else if (awbStatus === 'not found') {
            return (
                <>
                    <Divider/>
                    <Typography variant="h4" component="div" sx={{flexGrow: 1, textAlign: 'center', mt: 2}}>
                        The AWB you entered was not found.
                    </Typography>
                    <TextField onChange={handleDataChange}>
                        <label htmlFor="awb">AWB:</label>
                        <input type="text" id="awb" name="awb"/>
                    </TextField>
                    <Button variant="contained" color="primary" style={{margin: '10px'}} onClick={handleSearch}>
                        Search again
                    </Button>
                </>
            );
        }
        else{
            return(
            <>
                <Divider/>
                <TableContainer component={Paper}>
                    <Table aria-label="AWB Table">
                        <TableHead>
                            <TableRow>
                                <TableCell>AWB</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{awbData[0].awb}</TableCell>
                                <TableCell>{awbData[0].status}</TableCell>
                                <TableCell>{awbData[0].location}</TableCell>
                                <TableCell>{awbData[0].date}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </>);
        }
    }


    const result = () => {
        if (awbStatus === '') {
            return 'Search for AWB';
        } else if (awbStatus === 'not found') {
            return 'AWB not found!';
        } else {
            return 'Search results for AWB:';
        }

    }

    return (
        <>
            <br/>
            <Paper style={{margin: 'auto', padding: '20px', width: '50%'}}>
                <Typography variant="h3" component="div" sx={{flexGrow: 1, textAlign: 'center', mt: 2}}>
                    {result()}
                </Typography>
                {awbRender()}
            </Paper>
        </>
    );
}
