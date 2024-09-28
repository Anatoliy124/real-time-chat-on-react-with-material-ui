import { Container, Grid, Box, Button } from '@mui/material';
import React, { useContext } from 'react';
import { Context } from '../index'; 
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
    const { auth } = useContext(Context); 

    const login = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider); 
            const user = result.user;
            console.log(user);
        } catch (error) {
            console.error("Ошибка входа:", error); 
        }
    };

    return (
        <Container>
            <Grid 
                container
                style={{ height: window.innerHeight - 50 }}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Grid 
                    style={{ width: 400, background: 'lightgray' }}
                    container
                    alignItems={"center"}
                    direction={"column"}
                >
                    <Box p={5}> 
                        <Button onClick={login} variant={"outlined"}>
                            Войти с помощью Google
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
