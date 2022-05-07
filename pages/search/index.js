import React ,{useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { listSearch } from '../../actions/blog';
import { styled } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';
import moment from 'moment';
import { withRouter } from 'next/router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { API, APP_NAME, DOMAIN, FB_APP_ID } from '../../config';
import SearchHeader from '../../components/Header'
import StickyFooter from '../../components/StickyFooter'
import Head from 'next/head';




const SearchField = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#D3D3D3',

  '&:hover': {
    // backgroundColor: alpha(theme.palette.common.white, 0.25),
    backgroundColor: '#D3D3D3'
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  
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


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 6,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};



const SearchBar=()=>{
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };




  const [values, setValues] = React.useState({
    search: undefined,
    results: [],
    searched: false,
    message: ''
  });

  const { search, results, searched, message } = values;
 
  useEffect(()=>{
       const url = window.location.href;
       console.log(url)
       const spliturl = url.split('?')
       console.log(spliturl)
       const key = spliturl[1]
       console.log(key)
    //    setValues({...values,search: key })
       const search = {search : key}
       console.log(search)

       if(key!==undefined)
       {
        listSearch( search ).then(data => {
          // console.log(data)
          setValues({ ...values, results: data, searched: true, message: `${data.length} blogs found` });
        });

       }
       
  
  },[])

  const searchSubmit = e => {
    e.preventDefault();
    console.log('search is ',search)
    listSearch({ search }).then(data => {
      console.log(data)
      setValues({ ...values, results: data, searched: true, message: `${data.length} blogs found` });
    });
  };

  const handleChange = e => {
    // console.log(e.target.value);
    setValues({ ...values, search: e.target.value, searched: false, results: [] });
  };


  
  const head = () => (
    <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1526259079521468"
 crossorigin="anonymous"></script>
        <title>
            {APP_NAME}|Find What You Want
        </title>
        <meta name="description" content={"Gloom||Search"} />
        <link rel="canonical" href={`${DOMAIN}/search`} />
        <meta property="og:title" content={`Gloom|| ${APP_NAME}`} />
        <meta property="og:description" content={"Gloom|| Search Your Favorite Content "} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}/search`} />
        <meta property="og:site_name" content={`${APP_NAME}:Find What You Want`} />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
);


  const searchedBlogs = (results = []) => {
    return (

      <List sx={{ width: '100%'}}>

        {message && <p className="pt-4 text-muted font-italic">{message}</p>}

        {results.map((blog, i) => {
          return (
            <>
              <ListItem component="a" alignItems="flex-start" href={`/blogs/${blog.slug}`}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={`${API}/blog/photo/${blog.slug}`} />
                </ListItemAvatar>
                <ListItemText

                  primary={blog.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Published {moment(blog.updatedAt).fromNow()}

                      </Typography>

                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />

            </>
          );
        })}

      </List>

    );
  };

  return (




    <> <React.Fragment>
  {head()}

        <div style={{marginTop:'5rem'}}>
     <SearchHeader /> </div>
          <SearchField >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
              style={{width:'100%'}}
            />
          </SearchField>
<div style={{paddingLeft:'38.4%',paddingRight:'20%',paddingTop:'10px'}}>
<Button

sx={{ mt: 3, mb: 2,color:'#ffffff',backgroundColor:'#121212',
"&:hover": {
  backgroundColor:'#121212',
}



}}

variant='contained' onClick={searchSubmit}>Search</Button>

</div>
        
        {/* </DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            {searched ? <div >{searchedBlogs(results)}</div> : (<Typography gutterBottom>
              No results
            </Typography>)}
          </DialogContentText>

        </DialogContent>
        <DialogActions>
     
        </DialogActions>

        <StickyFooter />

        
      {/* </Dialog> */}
    </React.Fragment></>




  );
}

export default withRouter(SearchBar);