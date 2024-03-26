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

export default function Vehicles() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortByDate, setSortByDate] = useState(false);
    const [listOfVehicles, setListOfVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/vehicles/show/all"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch vehicles");
                }
                const data = await response.json();
                setListOfVehicles(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSortByDate = () => {
        setSortByDate(!sortByDate);
    };

    const handleShowDetails = (vehicle) => {
        setSelectedVehicle(vehicle);
    };

    const sortedVehicles = [...listOfVehicles].sort((a, b) => {
        if (sortByDate) {
            return new Date(b.year) - new Date(a.year);
        } else {
            return new Date(a.year) - new Date(b.year);
        }
    });

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
                    Vehicles
                </Typography>
            </Paper>
            <br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ marginBottom: "10px" }}>
                            <TableCell>ID</TableCell>
                            <TableCell>VIN</TableCell>
                            <TableCell>Registration</TableCell>
                            <TableCell>Make</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Mileage</TableCell>
                            <TableCell>Details</TableCell>
                            <TableCell>Update</TableCell>
                            <TableCell>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedVehicles
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((vehicle, index) => (
                                <TableRow key={index}>
                                    <TableCell>{vehicle.id}</TableCell>
                                    <TableCell>{vehicle.VIN}</TableCell>
                                    <TableCell>{vehicle.registration}</TableCell>
                                    <TableCell>{vehicle.make}</TableCell>
                                    <TableCell>{vehicle.model}</TableCell>
                                    <TableCell>{vehicle.year}</TableCell>
                                    <TableCell>{vehicle.mileage}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleShowDetails(vehicle)}
                                        >
                                            Show Details
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleShowDetails(vehicle)}
                                        >
                                            Show Details
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleShowDetails(vehicle)}
                                        >
                                            Show Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={listOfVehicles.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Button variant="contained" onClick={handleSortByDate}>
                {sortByDate ? "Sort by Oldest" : "Sort by Newest"}
            </Button>
            {selectedVehicle && (
                <div>
                    <Typography variant="h6" component="h2">
                        Vehicle Details
                    </Typography>
                    <Typography variant="body1">
                        VIN: {selectedVehicle.VIN}
                    </Typography>
                    <Typography variant="body1">
                        Registration: {selectedVehicle.registration}
                    </Typography>

                </div>
            )}
        </div>
    );
}
