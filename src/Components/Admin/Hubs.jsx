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

export default function Hubs() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [listOfHubs, setlistOfHubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function updateHub(hub) {
        // Logic to update user
        navigate(`/dashboard/manage_hubs/update/${hub.id}`, { state: { hubToChange: hub } });
    }

    function handleAddHub() {
        navigate("/dashboard/manage_hubs/add");
    }

    async function removeHub(hub) {
        if(window.confirm("Are you sure you want to remove this hub?")){
            try {
                console.log("Removing hub:", hub.id);
                const response = await fetch(`http://localhost:8080/api/hubs/delete/${hub.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to remove hub');
                }
                window.location.reload();
                console.log("Hub removed successfully");
            } catch (error) {
                console.error("Error removing hub:", error.message);
            }
        }
    }

    useEffect(() => {
        const fetchhubs = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/hubs/show/all"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch hubs");
                }
                const data = await response.json();
                setlistOfHubs(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchhubs();
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
                    Hubs
                </Typography>
            </Paper>
            <br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ marginBottom: "10px" }}>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>ZIP</TableCell>
                            <TableCell>Update</TableCell>
                            <TableCell>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listOfHubs
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((hub, index) => (
                                <TableRow key={index}>
                                    <TableCell>{hub.id}</TableCell>
                                    <TableCell>{hub.name}</TableCell>
                                    <TableCell>{hub.address}</TableCell>
                                    <TableCell>{hub.zipcode}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => updateHub(hub)}>Update</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => removeHub(hub)}>Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={listOfHubs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Button variant="contained" onClick={handleAddHub}>Add Hub</Button>
        </div>
    );
}
