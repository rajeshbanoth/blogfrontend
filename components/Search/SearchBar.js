import * as React from 'react';
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

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { API } from '../../config';





const SearchField = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  // },
  backgroundColor:'#F5F4F3',
   '&:hover': {
    backgroundColor: '#F5F4F3',
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
    width: '100%',
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



export default function SearchBar() {
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

  const searchSubmit = e => {
    e.preventDefault();
    listSearch({ search }).then(data => {

      console.log(data)
      setValues({ ...values, results: data, searched: true, message: `${data.length} blogs found` });
    });
  };

  const handleChange = e => {
    // console.log(e.target.value);
    setValues({ ...values, search: e.target.value, searched: false, results: [] });
  };

  const searchedBlogs = (results = []) => {
    return (


      <List sx={{ width: '100%' }}>

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
      <Button  sx={{ display: { xs: 'none',sm:'flex',md:'flex' },color:'#1c1c1c',
      backgroundColor:'#d6d4d4',
      '&:hover': {
        backgroundColor: '#d6d4d4',
      },
      width: '18em'}} variant="outlined"  onClick={handleClickOpen} startIcon={<SearchIcon />}>
        search...
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <SearchField>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
            />
          </SearchField>
          <div style={{ paddingLeft: '38.4%', paddingRight: '20%', paddingTop: '10px' }}>
            <Button variant='contained' sx={{color:'#ffffff',backgroundColor:'#000000'}} onClick={searchSubmit}>Search</Button>

          </div>

        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {searched ? <div >{searchedBlogs(results)}</div> : (<Typography gutterBottom>
              No results
            </Typography>)}
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button  variant='contained' sx={{color:'#ffffff',backgroundColor:'#000000'}} color='secondary' onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment></>




  );
}
