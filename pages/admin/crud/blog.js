import { Typography } from '@mui/material';
import React from 'react';
import Admin from '../../../components/auth/Admin';
import BlogCreate from '../../../components/crud/BlogCreate';
import Layout from '../../../components/Layout';

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid" style={{backgroundColor:'#F5F5F5'}} >
                    <div className="row">
                      
                        <div className="col-md-12">
                            <BlogCreate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Blog;
