import React, { useState } from 'react';
import { Box, CircularProgress, Stack, circularProgressClasses, colors } from '@mui/material';
import LoginForm from '../common/LoginForm';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
    const { signIn, loading: authLoading } = useAuth();
    const [loginRequest, setLoginRequest] = useState(false);
    const [loginProgress, setLoginProgress] = useState(0);

    console.log({ authLoading })
    const handleLoginSubmit = async (data: { username: string; password: string }) => {
        setLoginRequest(true);
        const interval = setInterval(() => {
            // setLoginProgress((prev) => (prev < 100 ? prev + 10 : prev));
            setLoginProgress(prev => prev + 100 / 40);
        }, 4000);
        try {
            await signIn(data.username, data.password);
        } catch (error) {
            console.error('Login Error:', error);
        } finally {
            setLoginRequest(false);
            clearInterval(interval);
            setLoginProgress(0);
        }
    };

    return (
        <Box
            position="relative"
            height="100vh"
            sx={{
                "::-webkit-scrollbar": { display: "none" }
            }}
        >
            {/* background box */}
            <Box sx={{
                position: "absolute",
                right: 0,
                height: "100%",
                width: "70%",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `images/bg-library.jpeg`
            }} />
            {/* background box */}
            {/* Your background box and other elements */}
            <LoginForm
                onSubmit={handleLoginSubmit}
                onRequest={loginRequest}
                loginProgress={loginProgress}
            />
            {authLoading && (
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bgcolor: colors.common.white,
                        zIndex: 1000
                    }}
                >
                    <Box position="relative">
                        <CircularProgress
                            variant="determinate"
                            sx={{ color: colors.grey[200] }}
                            size={100}
                            value={100}
                        />
                        <CircularProgress
                            variant="determinate"
                            value={loginProgress}
                            size={100}
                            sx={{
                                [`& .${circularProgressClasses.circle}`]: {
                                    strokeLinecap: "round"
                                },
                                position: "absolute",
                                left: 0,
                                color: colors.green[600]
                            }}
                        />
                    </Box>
                </Stack>
            )}
        </Box>
    );
};

export default LoginPage;
