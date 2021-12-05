import { TableCell, Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import ItemsApi from "../api/item";
import { ACCESS_TOKEN } from "../const/util";

export const Item = (props) => {
    const item = props.item;
    const [dialogDeleteStatus, changeDialogDeleteStatus] = useState(false);
    const [dialogEditStatus, changeDialogEditStatus] = useState(false);
    const [itemEdit, changeItem] = useState({...props.item});
    const [dialogMessageStatus, changeDialogMessageStatus] = useState("");
    const history = useHistory();

    const handleDelete = () => {
        ItemsApi.deleteItem(item.id)
        .then(resp => {
            changeDialogDeleteStatus(false);
            changeDialogMessageStatus("An item is deleted!");
        })
        .catch(err => {
            changeDialogMessageStatus("Had an exception when deleting item!");
            if(err.response.status === 403) {
                localStorage.removeItem(ACCESS_TOKEN);
                history.push("/login");
            }
        })
    }

    const handleEdit = () => {
        ItemsApi.updateItem(item.id, itemEdit)
        .then(resp => {
            changeDialogEditStatus(false);
            changeDialogMessageStatus("Edit item success!");
        })
        .catch(err => {
            changeDialogMessageStatus("Had an exception when edit item!")
            if(err.response.status === 403) {
                localStorage.removeItem(ACCESS_TOKEN);
                history.push("/login");
            }
        })
    }

    return (
        <>
            <TableCell align="left">{item.id}</TableCell>
            <TableCell align="left">{item.name}</TableCell>
            <TableCell align="left">{item.description}</TableCell>
            <TableCell align="center">{item.imageUrl}</TableCell>
            <TableCell align="right">{item.price} VND</TableCell>
            <TableCell align="left">{item.createdAt}</TableCell>
            <TableCell align="center">{item.createdBy}</TableCell>
            <TableCell align="left">{item.modifiedAt}</TableCell>
            <TableCell align="center">{item.modifiedBy}</TableCell>
            <TableCell align="right">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Button variant="contained" sx={{margin: 1}} color="warning" onClick={() => changeDialogEditStatus(true)} >Edit</Button> 
                    <Button variant="contained" sx={{margin: 1}} color="error" onClick={() => changeDialogDeleteStatus(true)} >Delete</Button> 
                </Box>
            </TableCell>

            {/* form confirm delete */}
            <Dialog open={dialogDeleteStatus} onClose={() => changeDialogDeleteStatus(false)}>
                <DialogTitle>Delete?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You want delete item: {item.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => changeDialogDeleteStatus(false)}>No</Button>
                    <Button onClick={() => handleDelete()}>Yes</Button>
                </DialogActions>
            </Dialog>         

            {/* form edit */}
            <Dialog open={dialogEditStatus} onClose={() => changeDialogEditStatus(false)}>
                <DialogTitle>Edit item</DialogTitle>
                <DialogContent sx={{width: 300}}>
                    <TextField margin="dense" id="idItem" label="Name" type="text"
                        required variant="standard" fullWidth value={itemEdit.name} 
                        onChange={(e) => changeItem({...itemEdit, name: e.target.value})}/>

                    <TextField margin="dense" id="descriptItem" label="Description" type="text"
                        variant="standard" fullWidth value={itemEdit.description ? itemEdit.description : ""} 
                        onChange={(e) => changeItem({...itemEdit, description: e.target.value})}/>

                    <TextField margin="dense" id="imageUrlItem" label="Image url" type="text"
                        variant="standard" fullWidth value={itemEdit.imageUrl ? itemEdit.imageUrl : ""} 
                        onChange={(e) => changeItem({...itemEdit, imageUrl: e.target.value})}/>

                    <TextField margin="dense" id="priceItem" label="Price" type="number"
                        required variant="standard" fullWidth value={itemEdit.price ? itemEdit.price : 0} 
                        onChange={(e) => changeItem({...itemEdit, price: e.target.value})}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => changeDialogEditStatus(false)}>Cancel</Button>
                    <Button onClick={() => handleEdit(item.id)}>Save</Button>
                </DialogActions>
            </Dialog>   

            {/* form message */}
            <Dialog open={dialogMessageStatus !== ""} onClose={() =>  props.changeParam({...props.param})} >
                <DialogTitle>Message</DialogTitle>
                <DialogContent sx={{width: 300}}>
                    <Typography>{dialogMessageStatus}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        changeDialogMessageStatus(""); 
                        props.changeParam({...props.param});
                    }}>ok</Button>
                </DialogActions>
            </Dialog>            
        </>
    );
}