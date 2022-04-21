import Layout from '../components/Layout';
import Link from 'next/link';
import ContactForm from '../components/form/ContactForm';
import React from 'react';
import { Paper, Typography } from '@mui/material';

const Contact = () => {
    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                       


                        <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth:700,
        flexGrow: 1,
        marginTop:1,
        marginBottom:3,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
                                <Typography variant='h2'>Contact form</Typography>
                        <hr />
          <ContactForm />
        </Paper>
                      
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
