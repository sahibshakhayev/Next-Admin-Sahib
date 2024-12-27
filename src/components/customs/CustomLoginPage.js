import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import { TextField, Button } from '@mui/material';

const CustomLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const submit = (e) => {
        e.preventDefault();
        login({ email, password }).catch(() =>
            notify('Invalid email or password')
        );
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
            <form onSubmit={submit} style={{ width: 300 }}>
                <div>
                    <TextField
                        label="Email"
                        fullWidth
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <TextField
                        label="Password"
                        fullWidth
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </div>
            </form>
            <Notification />
        </div>
    );
};

export default CustomLoginPage;
