import SearchIcon from '@mui/icons-material/Search';
import { Paper, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import InputBase from '@mui/material/InputBase';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { alpha, styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Router, { withRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getCookie, isAuth } from '../../actions/auth';
import { singleBlog, updateBlog } from '../../actions/blog';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { API } from '../../config';
import '../../node_modules/react-quill/dist/quill.snow.css';
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


const BlogUpdate = ({ router }) => {
    const [body, setBody] = useState('');
    const [jsondata,setjsondata]=useState(null)

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [dummycat,setdummycat]=useState([])
    const [dummytag,setdummytag]=useState([])

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags

    const [imagename,setimagename]=useState('')

    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: '',
        title: '',
        body: '',
        jsonbody:''
    });

    const { error, success, formData, title } = values;
    const token = getCookie('token');
 
    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initBlog();
        initCategories();
        initTags();
    }, [router]);

    const initBlog = () => {
        if (router.query.slug) {
            singleBlog(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    console.log(JSON.parse(data.body))
                    setValues({ ...values, title: data.title });
                    setBody(data.body);
                    setCategoriesArray(data.categories);
                    setTagsArray(data.tags);
                    setjsondata(JSON.parse(data.body))
                }
            });
        }
    };

    const setCategoriesArray = blogCategories => {
        let ca = [];
        blogCategories.map((c, i) => {
            ca.push(c._id);
        });
        setChecked(ca);
    };

    const setTagsArray = blogTags => {
        let ta = [];
        blogTags.map((t, i) => {
            ta.push(t._id);
        });
        setCheckedTag(ta);
    };

    const initCategories = () => {
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
        const clickedTag = checkedTag.indexOf(t);
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

    const findOutCategory = c => {
        const result = checked.indexOf(c);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const findOutTag = t => {
        const result = checkedTag.indexOf(t);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };


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
                      checked={findOutCategory(c._id)}
                     
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': i }}
                    />
                  </ListItemIcon>
                  <ListItemText  primary={c.name} />
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
                <ListItemButton role={undefined} onClick={handleTagsToggle(t._id)}  dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={findOutTag(t._id)}
                     
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': i }}
                    />
                  </ListItemIcon>
                  <ListItemText  primary={t.name} />
                </ListItemButton>
              </ListItem>
            ))
        );
    };

    const handleChange = name => e => {
        // console.log(e.target.value);

        name === 'photo' &&  setimagename(e.target.files[0].name)
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const handleBody = e => {
        console.log(e)
        setBody(e);
        formData.set('body', e);
    };

    const editBlog = e => {
        e.preventDefault();
        updateBlog(formData, token, router.query.slug).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, title: '', success: `Blog titled "${data.title}" is successfully updated` });
                if (isAuth() && isAuth().role === 1) {
                    // Router.replace(`/admin/crud/${router.query.slug}`);
                    Router.replace(`/admin`);
                } else if (isAuth() && isAuth().role === 0) {
                    // Router.replace(`/user/crud/${router.query.slug}`);
                    Router.replace(`/user`);
                }
            }
        });
    };

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

    const updateBlogForm = () => {
        return (


            <Paper style={{borderRadius:'10px'}}> 
                        <form onSubmit={editBlog}  style={{padding:'20px'}}>
                <div className="form-group" >
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>

                <div className="form-group">

                    <Paper>
                    {/* <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder="Write something amazing..."
                        onChange={handleBody}
                    /> */}

 {body.substring(2,6)==="time" ? (<>  <MediumEditor editorjson={handlejsondata} value={jsondata}/> </>):(<><Editor handlechange={handleBody} value={body}/> </>)}






                    </Paper>

                </div>

                <div>
                    <button type="submit" className="btn btn-primary">
                        Update
                    </button>
                </div>
            </form>
            </Paper>

        );
    };

    
    const handlechangefiltercat =(e)=>{
        if(e.target.value!=''||e.target.value.length===0||e.target.value===" " )
        {

            let updatedblogs = dummycat

            updatedblogs = updatedblogs.filter(item => {
                      return item.name.toLowerCase().indexOf(
                        e.target.value.toLowerCase()
                      ) !== -1;
                    });

                    setCategories(updatedblogs)
                   // setfilter(e.target.value)
              
        }      
        else{
         
            setCategories(dummycat)

        }
    }

    const handlechangefiltertag =(e)=>{
        if(e.target.value!=''||e.target.value.length===0||e.target.value===" " )
        {

            let updatedblogs = dummytag

            updatedblogs = updatedblogs.filter(item => {
                      return item.name.toLowerCase().indexOf(
                        e.target.value.toLowerCase()
                      ) !== -1;
                    });

                    setTags(updatedblogs)
                   // setfilter(e.target.value)
              
        }      
        else{
         
            setTags(dummytag)

        }
    }
    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    {updateBlogForm()}

                    <div className="pt-3">
                        {showSuccess()}
                        {showError()}
                    </div>

                    {body && (
                        <img src={`${API}/blog/photo/${router.query.slug}`} alt={title} style={{ width: '100%' }} />
                    )}
                </div>

                <div className="col-md-4">


                <Paper style={{borderRadius:'10px'}}> 
                
                <div style={{padding:'20px'}}>
                        <div className="form-group pb-2">
                            <h5>Featured image</h5>
                            <hr />

                            <small className="text-muted">Max size: 1mb</small>
                            <br />
                            <label className="btn btn-outline-info">
                                Upload featured image
                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                            </label>
                            <Typography>{imagename}</Typography>
                        </div>
                    </div>
                </Paper>

                    <div style={{paddingTop:'20px'}}>




                    <Paper style={{borderRadius:'10px'}}> 
                    <Typography variant='h4' style={{padding:'10px'}}>Categories</Typography>

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

                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul>
                    </Paper>
                    
                    </div>
                    <div>


                        

                    <Paper style={{borderRadius:'10px'}}> 
                    <Typography variant='h4' style={{padding:'10px'}}>Tags</Typography>
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
                        <hr />
                        <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul>
                </Paper>
                                       

                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(BlogUpdate);
