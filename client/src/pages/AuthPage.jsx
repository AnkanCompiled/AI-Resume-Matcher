import { use, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Paper,
    IconButton,
    InputAdornment
} from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined, Construction } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { loginApi, registerApi } from '../apis/authApi';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage({ type }) {
    const { login } = useAuth();
    const values = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        global: ''
    }
    const [formValues, setFormValues] = useState(values);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(values);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(values);

        const handleLogin = async () => {
            try {
                const formData = new FormData();
                formData.append('username', formValues.email);
                formData.append('password', formValues.password);
                await loginApi(formData);
                await login();
            } catch (err) {
                console.error(err);
                const status = err.response?.status;
                if (status === 401) {
                    setError({ email: 'Invalid email or password', password: 'Invalid email or password' });
                } else if (status === 500) {
                    setError({ global: 'Server error, please try again later' });
                } else {
                    setError({ global: 'An unknown error occurred' });
                }
            }
        };

        const handleRegister = async () => {
            try {
                const name = `${formValues.firstName} ${formValues.lastName}`;
                await registerApi(name, formValues.email, formValues.password);
                await handleLogin();
            } catch (err) {
                const status = err.response?.status;
                if (status === 400) {
                    setError({ email: 'Email already exists' });
                } else if (status === 500) {
                    setError({ global: 'Server error, please try again later' });
                } else {
                    setError({ global: 'An unknown error occurred' });
                }
            }
        };

        if (type === 'login') {
            await handleLogin();
        } else {
            await handleRegister();
        }
    }

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
                        {Object.entries({ firstName: 'First Name', lastName: 'Last Name' }).map(([key, value], index) => (
                            <TextField
                                key={index}
                                label={value}
                                value={formValues[key]}
                                onChange={(e) => setFormValues(prev => ({ ...prev, [key]: e.target.value }))}
                                autoComplete={key === 'firstName' ? 'given-name' : 'family-name'}
                                helperText={error[key]}
                                error={Boolean(error[key])}
                                fullWidth
                                required
                            />
                        ))}
                    </Box>
                )}


                <TextField
                    label="Email"
                    type="email"
                    value={formValues.email}
                    onChange={(e) => setFormValues(prev => ({ ...prev, email: e.target.value }))}
                    autoComplete='email'
                    helperText={error.email}
                    error={Boolean(error.email)}
                    fullWidth
                    required
                />

                <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formValues.password}
                    onChange={(e) => setFormValues(prev => ({ ...prev, password: e.target.value }))}
                    autoComplete='current-password'
                    helperText={error.password}
                    error={Boolean(error.password)}
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
                {error.global && <p className='text-red-600 text-sm'>{error.global}</p>}
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
