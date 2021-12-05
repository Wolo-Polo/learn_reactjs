import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Input, IconButton, Pagination, Select, MenuItem, Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import ItemsApi from '../api/item';
import { Item } from '../component/item';
import { useHistory } from 'react-router';
import { ACCESS_TOKEN } from '../const/util';
import { SwapVert } from '@mui/icons-material';
import { ASC, DESC } from '../const/sort-type';

const Items = () => {
    const [param, changeParam] = useState({});
    const [itemList, changeItemList] = useState([]);
    const [page, changePage] = useState({});
    const [sort, changeSort] = useState({orderBy: null, orderType: null});
    const [itemAdd, changeItemAdd] = useState({});
    const [dialogAddStatus, changeDialogAddStatus] = useState(false);
    const [dialogMessageStatus, changeDialogMessageStatus] = useState("");
    const history = useHistory();

    useEffect(() => {
        ItemsApi.getItems(param)
            .then(resp => {
                changeItemList(resp.data.content);
                changePage({totalPages: resp.data.totalPages});
                
            })
            .catch(err => {
                changeDialogMessageStatus("Had an exception when loading data!");
                if(err.response.status === 403) {
                    localStorage.removeItem(ACCESS_TOKEN);
                    history.push("/login");
                }
            });
    }, [param, history]);

    let delaySearch;
    const changeSearch = (e) => {
        clearTimeout(delaySearch);
        delaySearch = setTimeout(() => {
            changeParam({ ...param, search:  e.target.value});
        }, 1500);
    };

    const handleChangeSort = (orderBy) => {
        switch (sort.orderType) {
            case ASC: 
                changeSort({orderBy: orderBy, orderType: DESC});
                changeParam({...param, orderBy: orderBy, orderType: DESC});
                break;
            case DESC:
                changeSort({orderBy: null, orderType: null});
                changeParam({...param, orderBy: null, orderType: null});
                break;
            default:
                changeSort({orderBy: orderBy, orderType: ASC});
                changeParam({...param, orderBy: orderBy, orderType: ASC});
                break;
        }
    }

    const handleAdd = () => {
        ItemsApi.createItem(itemAdd)
        .then(resp => {
            changeDialogAddStatus(false);
            changeItemAdd({});
            changeParam({...param});
            changeDialogMessageStatus("An item is added!");
        })
        .catch(err => {
            changeDialogMessageStatus("Had an exception when adding item!");
            if(err.response.status === 403) {
                localStorage.removeItem(ACCESS_TOKEN);
                history.push("/login");
            }
        })
    }

    const dialogAddItem = () => {
        return (
            <Dialog open={dialogAddStatus} onClose={() => changeDialogAddStatus(false)}>
                <DialogTitle>Add item</DialogTitle>
                <DialogContent sx={{width: 300}}>
                    <TextField margin="dense" id="idItem" label="Name" type="text"
                        variant="standard" fullWidth
                        onChange={(e) => changeItemAdd({...itemAdd, name: e.target.value})}/>

                    <TextField margin="dense" id="descriptItem" label="Description" type="text"
                        variant="standard" fullWidth 
                        onChange={(e) => changeItemAdd({...itemAdd, description: e.target.value})}/>

                    <TextField margin="dense" id="imageUrlItem" label="Image url" type="text"
                        variant="standard" fullWidth 
                        onChange={(e) => changeItemAdd({...itemAdd, imageUrl: e.target.value})}/>

                    <TextField margin="dense" id="priceItem" label="Price" type="number"
                        variant="standard" fullWidth  
                        onChange={(e) => changeItemAdd({...itemAdd, price: e.target.value})}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => changeDialogAddStatus(false)}>Cancel</Button>
                    <Button onClick={() => handleAdd()}>Save</Button>
                </DialogActions>
            </Dialog>
        )
    }

    const dialogMessage = () => {
        return (
            <Dialog open={dialogMessageStatus !== ""} onClose={() => changeDialogAddStatus(false)}>
                <DialogTitle>Message</DialogTitle>
                <DialogContent sx={{width: 300}}>
                    <Typography>{dialogMessageStatus}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => changeDialogMessageStatus("")}>ok</Button>
                </DialogActions>
            </Dialog>    
        )
    }

    return (
        <Container>
            <Box
                sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography component="h1" variant="h5" mb={3}>
                    Item manager
                </Typography>

                <Box
                    width="100%"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        p: 1,
                        m: 1
                    }}
                >
                    <div style={{marginLeft: "20px"}}>
                        <Button variant="contained" color="success" onClick={() => changeDialogAddStatus(true)}>Add new</Button>
                        {dialogAddItem()}
                        
                    </div>

                    <div>
                        <Input placeholder="Search..." onChange={changeSearch}/>
                        <IconButton aria-label="search" > <SearchIcon /> </IconButton>
                    </div>
                    
                </Box>

                <TableContainer sx={{ width: '100%' }} mt={1}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <Stack>
                                        <div>ID</div>
                                        <IconButton onClick={() => handleChangeSort("id")}><SwapVert/></IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center"> 
                                    <Stack>
                                        <div>NAME</div>
                                        <IconButton onClick={() => handleChangeSort("name")}><SwapVert/></IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center"> 
                                    <Stack>
                                        <div>DESCRIPTION</div>
                                        <IconButton onClick={() => handleChangeSort("description")}><SwapVert/></IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <Stack>
                                        <div>IMAGEURL</div>
                                        <IconButton onClick={() => handleChangeSort("imageUrl")}><SwapVert/></IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <Stack>
                                        <div>PRICE</div>
                                        <IconButton onClick={() => handleChangeSort("price")}><SwapVert/></IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <Stack>
                                        <div>CREATED AT</div>
                                        <IconButton onClick={() => handleChangeSort("createdAt")}><SwapVert/></IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center" sx={{width: 90}}>
                                    <Stack>
                                        <div>CREATED BY </div>
                                        <IconButton onClick={() => handleChangeSort("createdBy")}><SwapVert/></IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                    <Stack>
                                        <div>UPDATED AT</div>
                                        <IconButton onClick={() => handleChangeSort("updatedAt")}><SwapVert/></IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center" sx={{width: 90}}>
                                    <Stack>
                                        <div>CREATED BY</div>
                                        <IconButton onClick={() => handleChangeSort("updatedBy")}><SwapVert/></IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">ACTIONS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {itemList.length === 0 
                                ? <TableRow ><TableCell colSpan={10} align="center">No content!</TableCell></TableRow>
                                : itemList.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <Item item={item} param={param} changeParam={changeParam}/>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{display: "flex", alignItems: "center", marginTop: 2}}>
                    <Select
                        labelId="itemPerPage"
                        id="itemPerPage"
                        sx={{maxHeight: 30}}
                        defaultValue={10}
                        onChange={(e) => changeParam({ ...param, 'size': e.target.value })}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                    <Typography sx={{paddingLeft: 1}}> items/page</Typography>
                </Box>

                <Pagination
                    sx={{ marginTop: 1, marginBottom: 5 }}
                    count={page.totalPages}
                    onChange={(event, pageIndex) => changeParam({ ...param, 'page': pageIndex })}
                />
            
            </Box>
            {dialogMessage()}                
        </Container>
    );
}

export default Items;