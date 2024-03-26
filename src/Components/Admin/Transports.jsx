import React, { useEffect, useState } from "react";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    TablePagination,
    Button,
    Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Transports() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [listOfTransports, setlistOfTransports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function updateTransport(transport) {
        // Logic to update user
        navigate(`/dashboard/manage_hubs/update/${transport.id}`, { state: { transportToChange: transport } });
    }

    async function removeTransport(transport) {
        if(window.confirm("Are you sure you want to remove this transport?")){
            try {
                console.log("Removing transport:", transport.id);
                const response = await fetch(`http://localhost:8080/api/transports/delete/${transport.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to remove transport');
                }
                window.location.reload();
                console.log("Transport removed successfully");
            } catch (error) {
                console.error("Error removing transport:", error.message);
            }
        }
    }

    useEffect(() => {
        const fetchTransports = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/transports/show/all"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch transports");
                }
                const data = await response.json();
                setlistOfTransports(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransports();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return (
            <Typography variant="body1" color="error">
                Error: {error}
            </Typography>
        );
    }


    return (
        <div>
            <Paper style={{ position: "relative", padding: "20px", marginTop: "20px", width: "100%" }}>
                <Typography variant="h5" component="h2">
                    Transports
                </Typography>
            </Paper>
            <br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ marginBottom: "10px" }}>
                            <TableCell>ID</TableCell>
                            <TableCell>Source Hub ID</TableCell>
                            <TableCell>Destination Hub ID</TableCell>
                            <TableCell>Departure Time</TableCell>
                            <TableCell>Estimated Duration Hours</TableCell>
                            <TableCell>Estimated Fuel Usage</TableCell>
                            <TableCell>Interval Next</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Update</TableCell>
                            <TableCell>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listOfTransports
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((transport, index) => (
                                <TableRow key={index}>
                                    <TableCell>{transport.id}</TableCell>
                                    <TableCell>{transport.sourceHubID}</TableCell>
                                    <TableCell>{transport.destinationHubID}</TableCell>
                                    <TableCell>{transport.departureTime}</TableCell>
                                    <TableCell>{transport.estimatedDurationHours}</TableCell>
                                    <TableCell>{transport.estimatedFuelUsage}</TableCell>
                                    <TableCell>{transport.intervalNext}</TableCell>
                                    <TableCell>{transport.Status}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => updateTransport(transport)}>Update</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => removeTransport(transport)}>Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={listOfTransports.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}
