import { Typography } from '@mui/material';
import React from 'react';
import { isAuth } from '../../../actions/auth';
import Private from '../../../components/auth/Private';
import BlogRead from '../../../components/crud/BlogRead';
import Layout from '../../../components/Layout';


const Blog = () => {
    const username = isAuth() && isAuth().username;
    return (
        <Layout>
            <Private>
                <div className="container" style={{backgroundColor:'#F5F5F5'}}>
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                          

                        <Typography  variant='h2'>Manage blogs</Typography>
                        </div>
                        <div className="col-md-12">
                            <BlogRead username={username} />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default Blog;
