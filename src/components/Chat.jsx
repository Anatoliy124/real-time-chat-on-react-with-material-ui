import React, { useContext, useState } from 'react';
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Button, Container, Grid, TextField } from "@mui/material";
import { collection, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "./Loader";

const Chat = () => {
    const { auth, firestore } = useContext(Context);
    const [user] = useAuthState(auth); 
    const [value, setValue] = useState('');

    const messagesRef = collection(firestore, 'messages');
    const messagesQuery = query(messagesRef, orderBy('createdAt'));

    const [messages, loading] = useCollectionData(messagesQuery, { idField: 'id' });

    const sendMessage = async () => {
        if (value.trim()) {
            try {
                await addDoc(messagesRef, {
                    uid: user.uid,
                    displayName: user.displayName, 
                    photoURL: user.photoURL,
                    text: value,
                    createdAt: serverTimestamp()
                });
                setValue('');
            } catch (error) {
                console.error('Error sending message: ', error);
            }
        }
    };

    if (loading) {
        return <Loader />; 
    }

    return (
        <Container>
            <Grid container justifyContent="center" style={{ height: window.innerHeight - 50, marginTop: 20 }}>
                <div style={{ width: '80%', height: '60vh', border: '1px solid gray', overflowY: 'auto' }}>
                    {messages && messages.map(message => (
                        <div
                            key={message.id} 
                            style={{
                                margin: 10,
                                border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
                                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                                width: 'fit-content',
                                padding: 5,
                            }}
                        >
                            <Grid container alignItems="center">
                                <Avatar src={message.photoURL} />
                                <div style={{ marginLeft: '10px' }}>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                    ))}
                </div>
                <Grid container direction="column" alignItems="flex-end" style={{ width: '80%' }}>
                    <TextField
                        fullWidth
                        rowsMax={2}
                        variant="outlined"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button onClick={sendMessage} variant="outlined">Send</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;
