import React from 'react';
import Private from '../../../components/auth/Private';
import BlogUpdate from '../../../components/crud/BlogUpdate';
import Layout from '../../../components/Layout';
const Blog = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid" style={{paddingTop:'40px'}}>
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Update blog</h2>
                        </div>
                        <div className="col-md-12">
                            <BlogUpdate />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default Blog;
