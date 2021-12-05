import { IcecreamOutlined, Menu, PersonOutlined, ShoppingCart } from "@mui/icons-material"
import { AppBar, Badge, Button, Drawer, IconButton, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN } from "../const/util";

const Header = () => {
    const [slideBarStatus, changeSlideBarStatus] = useState(false);
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        history.push("/login");
    }

    return (
        <Box marginBottom={10}>
            <AppBar position="fixed" sx={{ backgroundColor: "#2E3B55" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => changeSlideBarStatus(true)}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Demo
                    </Typography>

                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCart color="white" />
                        </Badge>
                    </IconButton>

                    <Button color="inherit" onClick={logout} sx={{padding: "0 20px"}}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Drawer open={slideBarStatus} onClose={() => changeSlideBarStatus(false)}>
                <ListItem sx={{ backgroundColor: "#2E3B55" }}>
                    <ListItemText primary={"Demo"} sx={{ color: "white" }} />
                </ListItem>
                <ListItem>
                    <ListItemIcon ><IcecreamOutlined /></ListItemIcon>
                    <ListItemText ><Link to="/items" style={{color: "black", textDecoration: "none"}}>Items manager</Link></ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon ><PersonOutlined /></ListItemIcon>
                    <ListItemText ><Link to="/profile" style={{color: "black", textDecoration: "none"}}>Profile setting</Link></ListItemText>
                </ListItem>
            </Drawer>
        </Box>
    )
};

export default Header;