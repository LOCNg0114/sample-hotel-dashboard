import React from 'react';
import { Box, Stack, TextField, Button, FormGroup, FormControlLabel, Checkbox, Typography, Link } from '@mui/material';

interface LoginFormProps {
    onSubmit: (data: { username: string; password: string }) => void;
    onRequest: boolean;
    loginProgress: number;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onRequest, loginProgress }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            username: formData.get('username') as string,
            password: formData.get('password') as string,
        };
        onSubmit(data);
    };

    return (
        <Box
            position="absolute"
            left={0}
            height="100%"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
                "::-webkit-scrollbar": { display: "none" }
            }}
        >
            <Stack spacing={3} component="form" maxWidth={400} width="100%" onSubmit={handleSubmit}>
                <TextField label="Username" name="username" fullWidth />
                <TextField label="Password" type="password" name="password" fullWidth />
                <Button type="submit" size="large" variant="contained" color="success">
                    Sign In
                </Button>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Remember me" />
                    </FormGroup>
                    <Typography color="error" fontWeight="bold">
                        <Link href="#">Forgot password</Link>
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
};

export default LoginForm;
