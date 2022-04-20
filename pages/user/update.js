import React from 'react';
import Private from '../../components/auth/Private';
import ProfileUpdate from '../../components/auth/ProfileUpdate';
import Layout from '../../components/Layout';


const UserProfileUpdate = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid" style={{paddingTop:'100px'}}>
                    <div className="row">
                        <ProfileUpdate />
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default UserProfileUpdate;
