import React, { useState } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { useNavigate, Link as Lk } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const customTheme = extendTheme({ defaultColorScheme: 'dark' });

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleUserLogin = async () => {
    try {
      const resp = await axios.post('/user/login', { email, password });
      if (resp.status === 201) {
        toast.success('Login successful');
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (error) {
      if (error.response && error.response.status !== 201) {
        toast.error('Invalid Credentials');
      } else {
        toast.error('Internal server error');
      }
      navigate('/login');
    }
  };

  const handleAdminLogin = async () => {
    try {
      const resp = await axios.post('/admin/login', { email, password });
      if (resp.status === 201) {
        toast.success('Admin Login successful');
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (error) {
      if (error.response && error.response.status !== 201) {
        toast.error('Invalid Credentials');
      } else {
        toast.error('Internal server error');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'admin') handleAdminLogin();
    else handleUserLogin();
  };

  return (
    <CssVarsProvider theme={customTheme} disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s',
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(1px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            px: 3,
            py: 4,
            width: 400,
            maxWidth: '90%',
            borderRadius: '50px',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            '& form': {
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            },
          }}
        >
          <Box
            component="header"
            sx={{ py: 2, display: 'flex', justifyContent: 'center' }}
          >
            <Typography component="h1" level="h4">
              Sign In
            </Typography>
          </Box>
          <Divider />
          <Box component="main">
            <form onSubmit={handleSubmit}>
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Checkbox size="sm" label="Remember me" name="persistent" />
                <Lk to="/forgot-password" style={{ textDecoration: 'none' }}>
                  <Typography level="body-sm" color="primary">
                    Forgot your password?
                  </Typography>
                </Lk>
              </Box>
              <Button type="submit" fullWidth>
                Sign in
              </Button>
            </form>
          </Box>
          <Box component="footer" sx={{ py: 3, textAlign: 'center' }}>
            <Typography level="body-xs">
              New to the company?{' '}
              <Lk to="/signup" style={{ textDecoration: 'none' }}>
                Sign up!
              </Lk>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: '100%',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          backgroundImage: 'url("../../assets/signin.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // filter: 'blur(2px)',
        }}
      />
    </CssVarsProvider>
  );
}
