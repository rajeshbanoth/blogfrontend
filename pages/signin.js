import { Paper } from '@mui/material';
import { withRouter } from 'next/router';
import React from 'react';
import SigninComponent from '../components/auth/SigninComponent';
import Layout from '../components/Layout';

const Signin = ({ router }) => {
    const showRedirectMessage = () => {
        if (router.query.message) {
            return <div className="alert alert-danger">{router.query.message}</div>;
        } else {
            return;
        }
    };

    return (
        <Layout>


            <div className="container-fluid">
                {/* <h2 className="text-center pt-4 pb-4">Signin</h2> */}

                <div className="row">
                    <div className="col-md-6 offset-md-3">{showRedirectMessage()}</div>
                </div>

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
          <SigninComponent />
        </Paper>
                      
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default withRouter(Signin);
