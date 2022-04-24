import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Paper, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { alpha, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getCookie } from '../../actions/auth';
import { createBlog } from '../../actions/blog';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import Toggle from '../Toggle'
//import Parser from 'editorjs-viewer'
import { QuillFormats, QuillModules } from '../../helpers/quill';
import DeleteIcon from '@mui/icons-material/Delete';


import '../../node_modules/react-quill/dist/quill.snow.css';
import { create} from '../../actions/tag';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


const Editor= dynamic(() => import('../../helpers/Editor'), { ssr: false });

const MediumEditor= dynamic(() => import('../../Editor/MediumEditor'), { ssr: false });

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));



const CreateBlog = ({ router }) => {

    const blogFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        } else {
            return false;
        }
    };

    const [categories, setCategories] = useState([]);
    const [editoroptions,setEdiorOption]=useState('Editor')
    const [tags, setTags] = useState([]);

    const [dummycat, setdummycat] = useState([])
    const [dummytag, setdummytag] = useState([])

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags
    const [createtag,setcreatetag]=useState(false)
    const [searchtag,setsearchtag]=useState('')
    const [name,setname]=useState('')
    const [editorState,setEditor]=useState(true)
    const [editorObject,seteditorObject]=useState('')

    const [body, setBody] = useState(blogFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: "",
        title: '',
        hidePublishButton: false,
        loading: false,
        removed: false,
        reload: false


    });

    const [imagename, setimagename] = useState('')

    const { error, sizeError, success, formData, title, hidePublishButton, loading ,reload} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initCategories();
        initTags();
    }, [router]);
    useEffect(() => {
        initTags();
    }, [reload]);

    const initCategories = () => {
        setValues({ ...values, formData: new FormData() });
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
                setdummycat(data)
            }
        });
    };

    const initTags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setTags(data);
                setdummytag(data)
            }
        });
    };

    const publishBlog = e => {
        setValues({ ...values, loading: true });
        e.preventDefault();
        // console.log('ready to publishBlog');
        createBlog(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    loading: false,
                    title: '',
                    error: '',
                    success: `A new blog titled "${data.title}" is created`
                });
                setBody('');
                setCategories([]);
                setTags([]);
            }
        });
    };

    const handleChange = name => e => {
        name === 'photo' && setimagename(e.target.files[0].name)
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBody = e => {
        // console.log(e);
        setBody(e);
        formData.set('body', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e));
        }
    };

   const  handlebodydata =(e)=>{
    setBody(e);
    console.log(e)
    formData.set('body', e);
    if (typeof window !== 'undefined') {
        localStorage.setItem('blog', JSON.stringify(e));
    }
   }
// edior js handlebodydata
   const handlejsondata=(jsondata,htmldata)=>{
  
   const string = JSON.stringify(jsondata)
   console.log(string)
    formData.set('body', string);
    formData.set('html', htmldata);
    if (typeof window !== 'undefined') {
        localStorage.setItem('jsonblog', string);
    }
    
}

const handlequilleditor =()=>{
     setEditor(true)
     formData.delete('body');
}
const handleeditorjs =()=>{
    setEditor(false)
    formData.delete('body');
}

    const handleToggle = c => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    };

    const handleTagsToggle = t => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedTag = checked.indexOf(t);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(t);
        } else {
            all.splice(clickedTag, 1);
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('tags', all);
    };
    const handletagurl =()=>{
       
        setCheckedTag([...checkedTag, searchtag]);

    }

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (

                <ListItem
                    key={i}
                >
                    <ListItemButton role={undefined} onClick={handleToggle(c._id)} dense>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"

                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': i }}
                            />
                        </ListItemIcon>
                        <ListItemText primary={c.name} />
                    </ListItemButton>
                </ListItem>

            ))
        );
    };

    const showTags = () => {
        return (
            tags &&
            tags.map((t, i) => (

                <ListItem
                    key={i}
                >
                    <ListItemButton role={undefined} onClick={handleTagsToggle(t._id)} dense>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': i }}
                            />
                        </ListItemIcon>
                        <ListItemText primary={t.name} />
                    </ListItemButton>
                </ListItem>

            ))
        );
    };

 

const handleselectedtag =(e)=>{
    e.preventDefault();
    // console.log('create category', name);
    const token = getCookie('token');
    create({ name }, token).then(data => {
        if (data.error) {
            setValues({ ...values, error: data.error, success: false });
        } else {
            setValues({ ...values, error: false, success: false, name: '', removed: false, reload: !reload });
        }
    });
}


    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );

    const showLoading = () => (
        <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
            Loading...
        </div>
    );



    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>


                <Paper style={{ borderRadius: '10px' }}>

                    <div style={{ padding: '20px' }}>
                    <div className="form-group" >
                            <Box>
                                <Toggle  handlequill={handlequilleditor}  editorjs={handleeditorjs}/>
                            </Box>
                        </div>

                        <div className="form-group" >
                            <Box>
                                <TextField fullWidth label="Title" id="fullWidth" value={title} onChange={handleChange('title')} />
                            </Box>
                        </div>



                        <div className="form-group">

                            {/* <ReactQuill
                                modules={QuillModules}
                                formats={QuillFormats}
                                value={body}
                                placeholder="Write something amazing..."
                                onChange={handleBody}

                            /> */}
{editorState ? (
                            <Editor handlechange={handlebodydata} value={body} />): ( <MediumEditor editorjson={handlejsondata}/> )}

                           
                        </div>

                        <div>
                            <button type="submit" className="btn btn-primary">
                                Publish
                            </button>
                        </div>


                    </div>


                </Paper>


            </form>
        );
    };


    const handlechangefiltercat = (e) => {
        if (e.target.value != '' || e.target.value.length === 0 || e.target.value === " ") {

            let updatedblogs = dummycat

            updatedblogs = updatedblogs.filter(item => {
                return item.name.toLowerCase().indexOf(
                    e.target.value.toLowerCase()
                ) !== -1;
            });

            setCategories(updatedblogs)
            // setfilter(e.target.value)

        }
        else {

            setCategories(dummycat)

        }
    }

    const handlechangefiltertag = (e) => {
        setname(e.target.value)
        if (e.target.value != '' || e.target.value.length === 0 || e.target.value === " ") {

            let updatedblogs = dummytag

            updatedblogs = updatedblogs.filter(item => {
                return item.name.toLowerCase().indexOf(
                    e.target.value.toLowerCase()
                ) !== -1;
            });
            if(updatedblogs.length===0)
            {
                setcreatetag(true)
            }
            else{
                setcreatetag(false)
            }

            setTags(updatedblogs)
            // setfilter(e.target.value)

        }
        else {

            setTags(dummytag)

        }
    }
    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    {createBlogForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                        {showLoading()}
                    </div>
                </div>

                <div className="col-md-4">
                    <div>
                        <Paper style={{ borderRadius: '10px' }}>
                            <div className="form-group pb-2" style={{ padding: '10px' }}>


                                <Typography variant='h4'>Featured image</Typography>
                                <hr />

                                <small className="text-muted">Max size: 1mb</small>
                                <br />
                                <label className="btn btn-outline-info">
                                    Upload featured image
                                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                                </label>
                                <Typography>{imagename}</Typography>




                            </div>
                        </Paper>
                    </div>
                    <div>

                        <Paper style={{ borderRadius: '10px' }}>

                            <Typography variant='h4' style={{ padding: '10px' }}>Categories</Typography>

                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={handlechangefiltercat}
                                />
                            </Search>


                            <hr />

                            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>

                                <List>
                                    {showCategories()}

                                </List>


                            </ul>

                        </Paper>



                    </div>
                    <div>


                        <Paper style={{ borderRadius: '10px' }}>

                        {/* {showSelectedtags()} */}

                       


                            <Typography variant='h4' style={{ padding: '10px' }}>Tags</Typography>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={handlechangefiltertag}

                                />
                            </Search>
                            {createtag && 
                            <>
                            <div style={{paddingLeft:'38.4%',paddingRight:'20%',paddingTop:'10px'}}>
<Button

sx={{ mt: 3, mb: 2,color:'#ffffff',backgroundColor:'#121212',
"&:hover": {
  backgroundColor:'#121212',
}


}}

variant='contained' onClick={handleselectedtag}>Create Tag</Button>

</div>
  </>}
                           
                            <hr />
                            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul>

                        </Paper>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(CreateBlog);
