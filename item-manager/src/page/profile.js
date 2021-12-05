import { Avatar, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, TextField, Typography } from "@mui/material";
import { Add, EditSharp } from "@mui/icons-material";
import { Box} from "@mui/system";
import { useEffect, useState } from "react";
import { BASE_URL } from "../const/uri";
import { UserApi } from "../api/user";
import { ACCESS_TOKEN } from "../const/util";
import { useHistory } from "react-router";

const Profile = (props) => {
    const [user, changeUser] = useState({});
    const [userEdit, changeUserEdit] = useState({});
    const [editAvatar, changeEditAvatar] = useState(false);
    // const [editUsernameStatus, changeEditUsernameStatus] = useState(false);
    const [editPhoneNumberStatus, changeEditPhoneNumberStatus] = useState(false);
    const [editEmailStatus, changeEditEmailStatus] = useState(false);
    const [editAddressStatus, changeEditAddressStatus] = useState(false);
    const [editPassworStatus, changeEditPassworStatus] = useState(false);
    const [dialogMessageStatus, changeDialogMessageStatus] = useState("");
    const history = useHistory();

    useEffect(() => {
        UserApi.getUserDetail()
            .then(resp => {
                changeUser(resp.data);
                changeUserEdit(resp.data);
            })
            .catch(err => {
                console.log(err.response);
                changeDialogMessageStatus("Had an exception when loading data!");
                if (err.response.status === 403) {
                    localStorage.removeItem(ACCESS_TOKEN);
                    history.push("/login");
                }
            });
    }, [history])

    const putForm = (form) => {
        UserApi.editUser(user.id , form)
            .then(resp => {
                changeDialogMessageStatus("Success!");
                changeUser(resp.data);
            })
            .catch(err => {
                changeDialogMessageStatus("Had an exception when loading data!");
                if (err.response.status === 403) {
                    localStorage.removeItem(ACCESS_TOKEN);
                    history.push("/login");
                }
            });
    }

    const handleEdit = (name, value, fileName) => {
        if(value == null) return;
        let formUser = new FormData();
        if(fileName != null) formUser.append(name, value, fileName);
        else formUser.append(name, value.toString());
        putForm(formUser);
    }

    const onFileChange = (e) => {
        handleEdit("avatar", e.target.files[0], e.target.files[0].name);
    }

    const handleChangPassword = () => {
        let formUpdatePassword = new FormData();
        formUpdatePassword.append("oldPassword", userEdit.oldPassword);
        formUpdatePassword.append("newPassword", userEdit.newPassword);
        putForm(formUpdatePassword);
        changeEditPassworStatus(false);
    }

    const editPassworDialog = () => {
        return (
            <Dialog open={editPassworStatus} >
                <DialogTitle>Message</DialogTitle>
                <DialogContent sx={{width: 300}}>
                    <TextField margin="dense" id="oldPass" label="Old password" type="password"
                        variant="standard" fullWidth
                        onChange={(e) => changeUserEdit({...userEdit, oldPassword: e.target.value})}/>

                    <TextField margin="dense" id="newPassword" label="New password" type="password"
                        variant="standard" fullWidth 
                        onChange={(e) => changeUserEdit({...userEdit, newPassword: e.target.value})}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => changeEditPassworStatus(false)}>Cancle</Button>
                    <Button onClick={handleChangPassword}>Submit</Button>
                </DialogActions>
            </Dialog>
        )
    }

    const dialogMessage = () => {
        return (
            <Dialog open={dialogMessageStatus !== ""} >
                <DialogTitle>Message</DialogTitle>
                <DialogContent sx={{ width: 300 }}>
                    <Typography>{dialogMessageStatus}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => changeDialogMessageStatus("")}>ok</Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (

        <Container sx={{ width: "70%" }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar alt="Remy Sharp" sx={{ width: 100, height: 100 }}
                        src={editAvatar ? "" : BASE_URL + user.avatar}
                        onMouseOver={() => changeEditAvatar(true)}
                        onMouseOut={() => changeEditAvatar(false)}

                    >
                        {editAvatar ? <Button component="label" sx={{height: 120, width: 120}}>Edit <input type="file" hidden onChange={onFileChange}/></Button> : user.username?.charAt(0)}
                    </Avatar>
                </Box>
                <hr />
                <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
                    <Box sx={{ width: 200, height: 32 }}>
                        <Typography sx={{ lineHeight: "32px" }}>User name: </Typography>
                    </Box>

                    <Box sx={{ width: 250, height: 32 }}>
                        <Typography sx={{ lineHeight: "32px" }}>{user.username} </Typography>
                    </Box>
                    {/* {
                        editUsernameStatus ? (
                            <Box sx={{ width: 250, height: 32 }}>
                                <TextField variant="standard" value={userEdit.username}
                                    onChange={(e) => changeUserEdit({ ...userEdit, username: e.target.value })}
                                />
                                <Button onClick={() => {
                                    handleEdit("username", userEdit.username);
                                    changeEditUsernameStatus(false);
                                }}>Save</Button>
                            </Box>
                        )
                            : (
                                <Box sx={{ display: "flex", flexDirection: "row", width: 250, height: 32 }}>
                                    <Typography sx={{ lineHeight: "32px" }}>{user.username} </Typography>
                                    {!user.username ? <IconButton onClick={() => changeEditUsernameStatus(true)}><Add /></IconButton>
                                        : <IconButton ><EditSharp onClick={() => changeEditUsernameStatus(true)} /></IconButton>}
                                </Box>
                            )
                    } */}

                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
                    <Box sx={{ width: 200, height: 32 }}>
                        <Typography sx={{ lineHeight: "32px" }}>Phone number: </Typography>
                    </Box>
                    {
                        editPhoneNumberStatus ? (
                            <Box sx={{ width: 250, height: 32 }}>
                                <TextField variant="standard" value={userEdit.phoneNumber} type="text"
                                    onChange={(e) => changeUserEdit({ ...userEdit, phoneNumber: e.target.value })}
                                />
                                <Button onClick={() => {
                                    handleEdit("phoneNumber", userEdit.phoneNumber);
                                    changeEditPhoneNumberStatus(false);
                                }}>Save</Button>
                            </Box>
                        )
                            : (
                                <Box sx={{ display: "flex", flexDirection: "row", width: 250, height: 32 }}>
                                    <Typography sx={{ lineHeight: "32px" }}>{user.phoneNumber} </Typography>
                                    {!user.phoneNumber ? <IconButton onClick={() => changeEditPhoneNumberStatus(true)}><Add /></IconButton>
                                        : <IconButton onClick={() => changeEditPhoneNumberStatus(true)} ><EditSharp /></IconButton>}
                                </Box>
                            )
                    }
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
                    <Box sx={{ width: 200, height: 32 }}>
                        <Typography sx={{ lineHeight: "32px" }}>Email: </Typography>
                    </Box>
                    {
                        editEmailStatus ? (
                            <Box sx={{ width: 250, height: 32 }}>
                                <TextField variant="standard" value={userEdit.email} type="email"
                                    onChange={(e) => changeUserEdit({ ...userEdit, email: e.target.value })}
                                />
                                <Button onClick={() => {
                                    handleEdit("email", userEdit.email);
                                    changeEditEmailStatus(false);
                                }}>Save</Button>
                            </Box>
                        )
                            : (
                                <Box sx={{ display: "flex", flexDirection: "row", width: 250, height: 32 }}>
                                    <Typography sx={{ lineHeight: "32px" }}>{user.email} </Typography>
                                    {!user.email ? <IconButton onClick={() => changeEditEmailStatus(true)}><Add /></IconButton>
                                        : <IconButton onClick={() => changeEditEmailStatus(true)} ><EditSharp /></IconButton>}
                                </Box>
                            )
                    }
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
                    <Box sx={{ width: 200, height: 32 }}>
                        <Typography sx={{ lineHeight: "32px" }}>Address: </Typography>
                    </Box>
                    {
                        editAddressStatus ? (
                            <Box sx={{ width: 250, height: 32 }}>
                                <TextField variant="standard" value={userEdit.address} type="email"
                                    onChange={(e) => changeUserEdit({ ...userEdit, address: e.target.value })}
                                />
                                <Button onClick={() => {
                                    handleEdit("address", userEdit.address);
                                    changeEditAddressStatus(false);
                                }}>Save</Button>
                            </Box>
                        )
                            : (
                                <Box sx={{ display: "flex", flexDirection: "row", width: 250, height: 32 }}>
                                    <Typography sx={{ lineHeight: "32px" }}>{user.address} </Typography>
                                    {!user.address ? <IconButton onClick={() => changeEditAddressStatus(true)}><Add /></IconButton>
                                        : <IconButton onClick={() => changeEditAddressStatus(true)} ><EditSharp /></IconButton>}
                                </Box>
                            )
                    }
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", width: 200, height: 32 }}>
                        <Typography sx={{ lineHeight: "32px" }}>Mật khẩu: </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", width: 250, height: 32 }}>
                        <Typography sx={{ lineHeight: "32px" }}>******** </Typography>
                        <IconButton onClick={() => changeEditPassworStatus(true)}><EditSharp  /></IconButton>
                    </Box>
                </Box>
            </Paper>
            {editPassworDialog()}
            {dialogMessage()}
        </Container>
    )
};

export default Profile;
