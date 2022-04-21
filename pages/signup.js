import Layout from '../components/Layout';
import SignupComponent from '../components/auth/SignupComponent';
import Link from 'next/link';
import React from 'react';
import Paper from '@mui/material/Paper'
const Signup = () => {
    return (
        <Layout>
            <div className="container-fluid">
                {/* <h2 className="text-center pt-4 pb-4">Signup</h2> */}
                <div className="row">
                    <div className="col-md-6 offset-md-3">

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
            <SignupComponent />
        </Paper>
                    
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Signup;
