import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Paper,
    IconButton,
    InputAdornment
} from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';

import { Link } from 'react-router-dom';

export default function AuthPage({ type }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log(firstName, lastName, email, password);
    };

    return (
        <Box
            component={Paper}
            elevation={4}
            sx={{
                maxWidth: 500,
                mx: 'auto',
                mt: 8,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                borderRadius: 2
            }}
        >
            {type === 'login' ? (
                <h2 className='text-4xl/snug font-bold'>Login to your JobHub account.</h2>
            ) : (
                <h2 className='text-4xl/snug font-bold'>Create your JobHub account.</h2>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                {type === 'register' && (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            fullWidth
                            required
                        />
                    </Box>
                )}


                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                />

                <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                />

                <Button type="submit" variant="contained" size="large" >
                    {type === 'login' ? 'Login' : 'Register'}
                </Button>
            </Box>

            {type === 'login' ? (
                <p>Don't have an account?{' '}
                    <Link to={'/auth/register'} className='text-blue-500 hover:underline'>
                        Sign Up
                    </Link>
                </p>
            )
                : (
                    <p>Already have an account?{' '}
                        <Link to={'/auth/login'} className='text-blue-500 hover:underline'>
                            Sign In'
                        </Link>
                    </p>
                )
            }
        </Box >
    );
}
