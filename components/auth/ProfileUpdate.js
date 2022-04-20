import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import ReactRoundedImage from "react-rounded-image";
import { getCookie, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { API } from '../../config';


const ProfileUpdate = () => {
    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        about: '',
        password: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: ''
    });

    const token = getCookie('token');
    const { username, name, email, about, password, error, success, loading, photo, userData } = values;

    const init = () => {
        getProfile(token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    username: data.username,
                    name: data.name,
                    email: data.email,
                    about: data.about,
                    photo:data.photo

                });
            }
        });
    };

    useEffect(() => {
        init();
        setValues({
            ...values, success: true
        })
    }, []);

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        let userFormData = new FormData();
        userFormData.set(name, value);
        setValues({ ...values, [name]: value, userData: userFormData, error: false, success: false });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true });
        update(token, userData).then(data => {
            if (data.error) {
                console.log('data.error', data.error);
                setValues({ ...values, error: data.error, loading: false });
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        username: data.username,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        password: '',
                       
                        success: true,
                        loading: false
                    });
                });
            }
        });
    };

    const profileUpdateForm = () => (

        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label className="btn btn-outline-info">
                    Profile photo
                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                </label>
            </div>

            <Box

                sx={{
                    '& .MuiTextField-root': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
            >

                <div>
                    <TextField

                        onChange={handleChange('name')}
                        type="text" value={name}
                        label="Name"

                    />
                    <TextField

                        onChange={handleChange('username')}
                        type="text" value={username}
                        label="Username"

                    />


                </div>

                <div>
                    <TextField

                        onChange={handleChange('email')}
                        type="text" value={email}
                        label="Email"

                    />
                    <TextField

                        onChange={handleChange('password')}
                        type="password" value={password}
                        label="Password"

                    />


                </div>



            </Box>

            <Box

                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >

                <div>

                    <TextField

                        fullWidth
                        onChange={handleChange('about')}
                        type="text" value={about}

                        label="About"

                    />

                </div>


            </Box>

            <div>
                {showSuccess()}
                {showError()}
                {showLoading()}
            </div>
            <div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            Profile updated
        </div>
    );

    const showLoading = () => (
        <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
            Loading...
        </div>
    );

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div style={{ justifyContent: 'center', alignItems: 'center' }}>

                            <div >
                                <ReactRoundedImage
                                    image={`${API}/user/photo/${username}`}
                                    roundedColor="#321124"
                                    imageWidth="250"
                                    imageHeight="250"
                                    roundedSize="13"
                                    hoverColor="#DD1144"
                                />
                            </div>


                        </div>

                    </div>

                    <div className="col-md-8 mb-5">{profileUpdateForm()}</div>

                </div>

            </div>
        </React.Fragment>
    );
};

export default ProfileUpdate;
