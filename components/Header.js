import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
//import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import React, { useState } from 'react';
import '.././node_modules/nprogress/nprogress.css';
import { isAuth, signout } from '../actions/auth';
import { APP_NAME } from '../config';
import SearchBar from './Search/SearchBar';


Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();




const SearchField = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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
      main: '#ffffff',
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






const Header = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';


  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}

      <MenuItem >
        <Button href="/blogs" >Blogs</Button>

      </MenuItem>
      <MenuItem >
        <Button href='/contact'> Contact Us</Button>

      </MenuItem>

      {!isAuth() && (
        <>
          <MenuItem >
            <Button href='/signin'>Login</Button> </MenuItem>
          <MenuItem >
            <Button href='/signup'>Register</Button> </MenuItem>
        </>
      )}

      {isAuth() && isAuth().role === 0 && (

        <MenuItem >

          <Button href='/user'> {`${isAuth().name}'s Dashboard`}</Button></MenuItem>

      )}

      {isAuth() && isAuth().role === 1 && (
        <MenuItem >

          <Button href='/admin'> {`${isAuth().name}'s Dashboard`}</Button></MenuItem>
      )}

      {isAuth() && (

        <MenuItem >
          <Button onClick={() => signout(() => Router.replace(`/signin`))}>Logout</Button>
        </MenuItem>
      )}
      <MenuItem >
        <Button href='/user/crud/blog'>Write a blog</Button>
      </MenuItem>
    </Menu>
  );



  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (

    <ThemeProvider theme={darkTheme}>
    <React.Fragment>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" >
          <Toolbar style={{padding:11}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              href='/'
            >
              {/* <MenuIcon /> */}


         
        <img  alt='gloom' src='/static/images/favicon32.png'/>
    
            </IconButton>

            <Link
            variant="h6"
             sx={{ display: { xs: 'none', sm: 'block' } }}
             href='/' underline="none">
            { APP_NAME }
</Link>

          


             <SearchField>
              {/* <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              /> */}

<SearchBar/>
            </SearchField> 
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{
              display: { xs: 'none', md: 'flex' },
              flexWrap: 'wrap',
              justifyContent: 'center',
              typography: 'body1',
              '& > :not(style) + :not(style)': {
                ml: 2,
              },
            }}



            >


              <Button  href="/blogs"> Blogs</Button>

              <Button href="/contact">Contact us</Button>

              {!isAuth() && (
                <React.Fragment>
                  <Button href="/signin">
                    Login
                  </Button>
                 <Button href="/signup" >
                   Register
                  </Button >
                </React.Fragment>
              )}

              {isAuth() && isAuth().role === 0 && (

                <Button href="/user">
                  {`${isAuth().name}'s Dashboard`}
                </Button >

              )}

              {isAuth() && isAuth().role === 1 && (

                <Button  onClick={()=>{
                  Router.replace(`/admin`)

                }}>
                  {`${isAuth().name}'s Dashboard`}
                </Button >

              )}

              {isAuth() && (

                <Button style={{ cursor: 'pointer' }} onClick={() => signout(() => Router.replace(`/signin`))}>
                  Signout
                </Button >

              )}

              {/* <Button href="/user/crud/blog" > */}

                
              <Button  onClick={()=>{
                  Router.replace(`/user/crud/blog`)

                }}>

                Write a blog

              </Button >
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon  />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>

    </React.Fragment>
    </ThemeProvider>
  );
};

export default Header;
