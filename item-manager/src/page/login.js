import { Box, Typography, TextField, Button, Alert } from '@mui/material'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AuthApi } from '../api/auth';
import { ACCESS_TOKEN } from '../const/util';

export default function Login(){
    const [userInfo, changUserInfo] = useState({});
    const [loginStatus, changLoginStatus] = useState({});
    const [signUpStatus, changSignUpStatus] = useState({});
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem(ACCESS_TOKEN) !== null){
            history.push("/items");
        }
    }, [history]);

    const login = () => {
        AuthApi.login(userInfo)
            .then(resp => {
                console.log(resp);
                localStorage.setItem(ACCESS_TOKEN, resp.data.accessToken);
                changLoginStatus({status: resp.status, message: "Login success!" });
                history.push("/items");
            })
            .catch(err => {
                console.log(err.response);
                changLoginStatus({status: err.response.data.code, message: "Login fail!" });
            })
            .finally(() => setTimeout(() => changLoginStatus({}), 3000));
    }

    const signUp = () => {
        AuthApi.signUp(userInfo)
            .then(resp => {
                console.log(resp);
                changSignUpStatus({status: resp.status, message: "Sign-up success!" });
            })
            .catch(err => {
                console.log(err.response);
                changSignUpStatus({status: err.response.data.code, message: "Sign-up fail!" });
            })
            .finally(() => setTimeout(() => changSignUpStatus({}), 3000));
    }

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Typography component="h1" variant="h5" mb={3}>
                Login
            </Typography>

            {
                loginStatus.status !== undefined && loginStatus.status !== 200 ?
                <Alert severity="error">{loginStatus.message}</Alert>
                : (loginStatus.status !== undefined ? <Alert severity="success">{loginStatus.message}</Alert> : <></>)
            }

            {
                signUpStatus.status !== undefined && signUpStatus.status !== 201 ?
                <Alert severity="error">{signUpStatus.message}</Alert>
                : (signUpStatus.status !== undefined ? <Alert severity="success">{signUpStatus.message}</Alert> : <></>)
            }

            <TextField 
                label="Username" 
                name="username"
                required
                sx={{margin: 1}} 
                onChange={(e) => changUserInfo({...userInfo, username: e.target.value})} />
            <TextField 
                label="Password"
                name="password"
                type="password" autoComplete="current-password" 
                required 
                sx={{margin: 1}} 
                onChange={(e) => {changUserInfo({...userInfo, password: e.target.value})}} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Button sx={{margin: 1}} variant="outlined" onClick={signUp}>SignUp</Button>
                <Button sx={{margin: 1}} variant="contained" onClick={login}>Login</Button>
            </Box>
        </Box>
    )
}