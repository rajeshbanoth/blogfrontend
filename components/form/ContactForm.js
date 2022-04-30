import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { emailContactForm } from '../../actions/form';


function Copyright(props) {
    return (

        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Gloom
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}




const theme = createTheme();

export default function ContactForm({ authorEmail }) {
















    const [values, setValues] = useState({
        message: '',
        name: '',
        email: '',
        sent: false,
        buttonText: 'Send Message',
        success: false,
        error: false
    });

    const { message, name, email, sent, buttonText, success, error } = values;


    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Sending...' });
        emailContactForm({ authorEmail, name, email, message }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    sent: true,
                    name: '',
                    email: '',
                    message: '',
                    buttonText: 'Sent',
                    success: data.success
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value, error: false, success: false, buttonText: 'Send Message' });
    };

    const showSuccessMessage = () => success && <div className="alert alert-info">Thank you for contacting us.</div>;

    const showErrorMessage = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    

                    <Box component="form" onSubmit={clickSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="message"
                            onChange={handleChange('message')}
                            label="Message"
                            name="message"
                            rows={6}
                            multiline
                            autoComplete="message"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            onChange={handleChange('name')}
                            label="Name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            onChange={handleChange('email')}
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor:'#121212',
                                "&:hover": {
                                    backgroundColor:'#121212',
                                  }
                             }}
                        >
                            Send
                        </Button>


                        {showSuccessMessage()}
                        {showErrorMessage()}

                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
