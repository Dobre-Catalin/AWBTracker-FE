import React, {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Users() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();
    const [listOfUsers, setListOfUsers] = useState([]);


    useEffect(() => {
        const fetchUsers = async () => {
            console.log('Hopefully fetching users');
            try {
                const response = await fetch('http://localhost:8080/api/users/show/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                console.log('Fetched users:', data);
                setListOfUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        fetchUsers(); // Call fetchUsers when the component mounts
    }, []); // Empty dependency array ensures it only runs once when component mounts



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function updateUser(user) {
        // Logic to update user
        navigate(`/dashboard/manage_users/update/${user.id}`, { state: { userToChange: user } });
    }

    async function removeUser(user) {
        if(window.confirm("Are you sure you want to remove this user?")){
            try {
                console.log("Removing user:", user.id);
                const response = await fetch(`http://localhost:8080/api/users/delete/${user.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to remove user');
                }
                window.location.reload();
                console.log("User removed successfully");
            } catch (error) {
                console.error("Error removing user:", error.message);
            }
        }
    }

    function handleAddUser() {
        navigate("/dashboard/manage_users/add");
    }

    const role = (user) => {
        if (user.isAdmin) {
            return "admin";
        } else if (user.isSender) {
            return "sender";
        } else {
            return "viewer";
        }
    };


    return (
        <>
                <div>
                    <Paper style={{ position: 'relative', padding: '20px', marginTop: '20px', width: '100%' }}>
                        <Typography variant="h5" component="h2">
                            Users
                        </Typography>
                    </Paper>
                    <br></br>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ marginBottom: '10px' }}>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Permission</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Update</TableCell>
                                    <TableCell>Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listOfUsers
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{role(user)}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" onClick={() => updateUser(user)}>Update</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" onClick={() => removeUser(user)}>Remove</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={listOfUsers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <Button variant="contained" onClick={handleAddUser}>Add User</Button>
                </div>
        </>
    );
}
