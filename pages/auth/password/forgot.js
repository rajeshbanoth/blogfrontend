import { useState } from 'react';
import Layout from '../../../components/Layout';
import { forgotPassword } from '../../../actions/auth';
import { Button, TextField, Typography } from '@mui/material';

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        showForm: true
    });

    const { email, message, error, showForm } = values;

    const handleChange = name => e => {
        setValues({ ...values, message: '', error: '', [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, message: '', error: '' });
        forgotPassword({ email }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, message: data.message, email: '', showForm: false });
            }
        });
    };

    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : '');

    const passwordForgotForm = () => (
        <form >
            <div className="form-group pt-5">
                {/* <input
                    type="email"
                    onChange={handleChange('email')}
                    className="form-control"
                    value={email}
                    placeholder="Type your email"
                    required
                /> */}

                <TextField fullWidth  label='email'
                                    type="email"
                                    onChange={handleChange('email')}
                                   // className="form-control"

                                   
                                    value={email}
                                    placeholder="Type your email"
                                    required />
            </div>
            <div>
                <Button onClick={handleSubmit}  style={{color:'#ffffff',backgroundColor:'#121212'}} variant='contained'>Send password reset link</Button>
                {/* <button className="btn btn-primary">Send password reset link</button> */}
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="container">
               <Typography variant='h2'>Forgot Password?</Typography>
                <hr />
                {showError()}
                {showMessage()}
                {showForm && passwordForgotForm()}
            </div>
        </Layout>
    );
};

export default ForgotPassword;
