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

export default function Parcels() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortByDate, setSortByDate] = useState(false);
    const [listOfParcels, setListOfParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParcels = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/parcels/show/all"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch parcels");
                }
                const data = await response.json();
                setListOfParcels(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParcels();
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

    const sortedParcels = [...listOfParcels].sort((a, b) => {
        if (sortByDate) {
            return new Date(b.dateOfSending) - new Date(a.dateOfSending);
        } else {
            return new Date(a.dateOfSending) - new Date(b.dateOfSending);
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
                    Parcels
                </Typography>
            </Paper>
            <br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ marginBottom: "10px" }}>
                            <TableCell>ID</TableCell>
                            <TableCell>Source Address</TableCell>
                            <TableCell>Destination Address</TableCell>
                            <TableCell>Source ZIP</TableCell>
                            <TableCell>Destination ZIP</TableCell>
                            <TableCell>Urgency</TableCell>
                            <TableCell>Fragile</TableCell>
                            <TableCell>Mass</TableCell>
                            <TableCell>Height</TableCell>
                            <TableCell>Width</TableCell>
                            <TableCell>Length</TableCell>
                            <TableCell>Sender Phone Number</TableCell>
                            <TableCell>Recipient Phone Number</TableCell>
                            <TableCell>AWB</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedParcels
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((parcel, index) => (
                                <TableRow key={index}>
                                    <TableCell>{parcel.id}</TableCell>
                                    <TableCell>{parcel.sourceAddress}</TableCell>
                                    <TableCell>{parcel.destinationAddress}</TableCell>
                                    <TableCell>{parcel.sourceZIP}</TableCell>
                                    <TableCell>{parcel.destinationZIP}</TableCell>
                                    <TableCell>{parcel.urgency ? "Yes" : "No"}</TableCell>
                                    <TableCell>{parcel.fragile ? "Yes" : "No"}</TableCell>
                                    <TableCell>{parcel.mass}</TableCell>
                                    <TableCell>{parcel.height}</TableCell>
                                    <TableCell>{parcel.width}</TableCell>
                                    <TableCell>{parcel.length}</TableCell>
                                    <TableCell>{parcel.senderPhoneNumber}</TableCell>
                                    <TableCell>{parcel.recepientPhoneNumber}</TableCell>
                                    <TableCell>{parcel.AWB}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={listOfParcels.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Button variant="contained" onClick={handleSortByDate}>
                {sortByDate ? "Sort by Oldest" : "Sort by Newest"}
            </Button>
        </div>
    );
}
