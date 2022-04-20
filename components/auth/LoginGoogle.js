import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import GoogleLogin from 'react-google-login';
import { loginWithGoogle, authenticate, isAuth } from '../../actions/auth';
import { GOOGLE_CLIENT_ID } from '../../config';
import React from 'react';

const LoginGoogle = () => {
    const responseGoogle = response => {
        console.log(response);
        const tokenId = response.tokenId;
        const user = { tokenId };

        if(tokenId!=undefined)
        {
            
        loginWithGoogle(user).then(data => {
            console.log(data)
            if (data.error) {
                console.log(data.error);
            } else {
                authenticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push(`/admin`);
                    } else {
                        Router.push(`/user`);
                    }
                });
            }
        });

        }

    };

    return (
        <div   style={{display:'flex',justifyContent:'center',margin:'1.5rem'}} >
            <GoogleLogin
                clientId={`${GOOGLE_CLIENT_ID}`}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                theme="dark"
          
                
                
            />
        </div>
    );
};

export default LoginGoogle;
