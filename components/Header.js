import MenuIcon from '@mui/icons-material/Menu';
import { Button, Paper, Typography } from '@mui/material';
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
import Fab from '@mui/material/Fab';
import Popover from '@mui/material/Popover';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import ArticleIcon from '@mui/icons-material/Article';
import ChatIcon from '@mui/icons-material/Chat';
import DvrIcon from '@mui/icons-material/Dvr';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HowToRegIcon from '@mui/icons-material/HowToReg';



import Avatar from '@mui/material/Avatar';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();



const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});


const SearchField = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
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
    // mode: 'dark',
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



  //bottom navigatioj
  //more items

  const [anchorE, setAnchorE] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  //account
  //account ifo popover

  const [anchorAccountLabel, setAnchorAccountLabel] = React.useState(null);
  const [openAccountLabel, setOpenAccountLabel] = React.useState(false);

  //more

  const handleClick = (event) => {
    setAnchorE(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);


    if (openAccountLabel) {
      setOpenAccountLabel(false)
    }

  };

  const canBeOpen = open && Boolean(anchorE);
  const id = canBeOpen ? 'transition-popper' : undefined;



  //account
  const handleClickAccountLabel = (event) => {
    setAnchorAccountLabel(event.currentTarget);
    setOpenAccountLabel((previousOpen) => !previousOpen);
    if (open) {
      setOpen(false)
    }

  };

  const canBeOpen1 = openAccountLabel && Boolean(anchorAccountLabel);
  const idAccountLabel = canBeOpen1 ? 'transition-popper' : undefined;





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


      <MenuItem >
        <Button sx={{ color: '#1c1c1c' }} href="/blogs" >Blogs</Button>

      </MenuItem>
      <MenuItem >
        <Button sx={{ color: '#1c1c1c' }} href='/contact'> Contact Us</Button>

      </MenuItem>



      {isAuth() && isAuth().role === 0 && (

        <MenuItem >

          <Button sx={{ color: '#1c1c1c' }} href='/user'> {`${isAuth().name}'s Dashboard`}</Button></MenuItem>

      )}

      {isAuth() && isAuth().role === 1 && (
        <MenuItem >

          <Button sx={{ color: '#1c1c1c' }} href='/admin'> {`${isAuth().name}'s Dashboard`}</Button></MenuItem>
      )}


      <MenuItem >
        <Button sx={{ color: '#1c1c1c' }} href='/user/crud/blog'>Write a blog</Button>
      </MenuItem>
      <MenuItem >
        <Button sx={{ color: '#1c1c1c' }} href='/aboutus'> About Us</Button>

      </MenuItem>
      {isAuth() && (

        <MenuItem >
          <Button fullWidth variant='contained' sx={{ color: '#ffffff', backgroundColor: '#000000' }} onClick={() => signout(() => Router.replace(`/signin`))}>Logout</Button>
        </MenuItem>
      )}

      {!isAuth() && (
        <>
          <MenuItem >
            <Button sx={{ color: '#1c1c1c' }} href='/signin'>Login</Button> </MenuItem>
          <MenuItem >
            <Button fullWidth variant='contained' sx={{ color: '#ffffff', backgroundColor: '#000000' }} href='/signup'>Register</Button> </MenuItem>
        </>
      )}
    </Menu>
  );



  const [isOpen, setIsOpen] = useState(false);



  return (

    <>



      <Box  >

        <AppBar position="fixed" elevation={0} sx={{ top: 'auto', bottom: 40, backgroundColor: 'transparent', display: { xs: 'block', sm: 'none', md: 'none' } }} >

          <Paper sx={{ marginLeft: 3, marginRight: 3, borderRadius: 3 }}>
            <Toolbar >

              <Button color="inherit" href='/' sx={{
                display: "flex",
                flexDirection: "column",
                textTransform: 'none'

              }} >
                <HomeIcon fontSize='medium' color='primary' sx={{ marginLeft: 3, marginRight: 3, textTransform: 'none' }} />
                <Typography>Home</Typography>

              </Button>

              <Box sx={{ flexGrow: 1 }} />

              <Button href='/search' color="inherit" sx={{
                display: "flex",
                flexDirection: "column",
                textTransform: 'none'
              }} >
                <SearchIcon fontSize='medium' color='primary' sx={{ marginLeft: 3, marginRight: 3 }} />
                <Typography>Search</Typography>

              </Button>

              <Box sx={{ flexGrow: 1 }} />

              <Button aria-describedby={idAccountLabel} onClick={handleClickAccountLabel} color="inherit" sx={{
                display: "flex",
                flexDirection: "column",
                textTransform: 'none'
              }} >
                <AccountCircleIcon fontSize='medium' color='primary' sx={{ marginLeft: 3, marginRight: 3 }} />
                <Typography>Account</Typography>

              </Button>



              <Popper id={idAccountLabel} open={openAccountLabel} anchorEl={anchorAccountLabel} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Box sx={{ p: 1, bgcolor: 'transparent', paddingRight: 2 }}>

                      <Paper sx={{ borderRadius: 4, marginBottom: 2 }}>
                        <Button onClick={handleClickAccountLabel} color="inherit" sx={{
                          display: "flex",
                          flexDirection: "column",
                          textTransform: 'none'
                        }} >
                          <CloseIcon fontSize='medium' sx={{ marginLeft: 4, marginRight: 3, color: '#DB4437' }} />
                          <Typography>Close</Typography>

                        </Button>
                      </Paper>



                      {isAuth() && isAuth().role === 0 && (




                        <Paper sx={{ borderRadius: 4, marginBottom: 2 }}>
                          <Button color="inherit" sx={{
                            display: "flex",
                            flexDirection: "column",
                            textTransform: 'none'
                          }} href='/user'>
                            <DashboardIcon fontSize='medium' color='primary' sx={{ marginLeft: 3, marginRight: 3 }} />
                            <Typography>Dashboard</Typography>

                          </Button>
                        </Paper>

                      )}

                      {isAuth() && isAuth().role === 1 && (

                        <Paper sx={{ borderRadius: 4, marginBottom: 2 }}>
                          <Button color="inherit" sx={{
                            display: "flex",
                            flexDirection: "column",
                            textTransform: 'none'
                          }} href='/admin'>
                            <DashboardIcon fontSize='medium' color='primary' sx={{ marginLeft: 3, marginRight: 3 }} />
                            <Typography>Dashboard</Typography>

                          </Button>
                        </Paper>
                      )}






                      {!isAuth() && (
                        <>

                          <Paper sx={{ borderRadius: 4, marginBottom: 2 }}>
                            <Button color="inherit" href='/signin' sx={{
                              display: "flex",
                              flexDirection: "column",
                              textTransform: 'none'

                            }} >
                              <LoginIcon fontSize='medium' color='primary' sx={{ marginLeft: 3, marginRight: 3 }} />
                              <Typography>Login</Typography>

                            </Button>
                          </Paper>

                          <Paper sx={{ borderRadius: 4, marginBottom: 2 }}>
                            <Button href='/signup' color="inherit" sx={{
                              display: "flex",
                              flexDirection: "column",
                              textTransform: 'none'
                            }} >
                              <HowToRegIcon fontSize='medium' color='primary' sx={{ marginLeft: 3, marginRight: 3 }} />
                              <Typography>Register</Typography>

                            </Button>
                          </Paper>
                        </>
                      )}



                      {isAuth() && (




                        <Paper sx={{ borderRadius: 4, marginBottom: 2 }}>
                          <Button color="inherit" sx={{
                            display: "flex",
                            flexDirection: "column",
                            textTransform: 'none'
                          }} onClick={() => signout(() => Router.replace(`/signin`))} >
                            <LogoutIcon fontSize='medium' color='primary' sx={{ marginLeft: 3, marginRight: 3 }} />
                            <Typography>Logout</Typography>

                          </Button>
                        </Paper>

                      )}




                    </Box>
                  </Fade>
                )}
              </Popper>



              <Box sx={{ flexGrow: 1 }} />
              <Button aria-describedby={id} onClick={handleClick} color="inherit" sx={{
                display: "flex",
                flexDirection: "column",
                textTransform: 'none'
              }} >
                <AddIcon fontSize='medium' color='primary' sx={{ marginLeft: 3, marginRight: 3 }} />
                <Typography>More</Typography>

              </Button>

              <Popper id={id} open={open} anchorEl={anchorE} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Box sx={{ p: 1, bgcolor: 'transparent', paddingRight: 2 }}>

                      <Paper sx={{ borderRadius: 4, marginBottom: 2 }}>
                        <Button onClick={handleClick} color="inherit" sx={{
                          display: "flex",
                          flexDirection: "column",
                          textTransform: 'none'
                        }} >
                          <CloseIcon fontSize='medium' sx={{ marginLeft: 4, marginRight: 3, color: '#DB4437' }} />
                          <Typography>Close</Typography>

                        </Button>
                      </Paper>
                      <Paper sx={{ borderRadius: 4, marginBottom: 2 }}>
                        <Button href='/user/crud/blog'  color="inherit" sx={{
                          display: "flex",
                          flexDirection: "column",
                          textTransform: 'none'
                        }} >
                          <ArticleIcon fontSize='medium' color='primary' sx={{ marginLeft: 3, marginRight: 3 }} />
                          <Typography>Create Blog</Typography>

                        </Button>
                      </Paper>

                      <Paper sx={{ borderRadius: 4, marginBottom: 2 }}>
                        <Button href='/contact' color="inherit" sx={{
                          display: "flex",
                          flexDirection: "column",
                          textTransform: 'none'
                        }} >
                          <EmailIcon fontSize='medium' color='primary' sx={{ marginLeft: 3, marginRight: 3 }} />
                          <Typography>Contact Us</Typography>

                        </Button>
                      </Paper>

                      <Paper sx={{ borderRadius: 4, marginBottom: 2}}>
                        <Button color="inherit" href='/aboutus' sx={{
                          display: "flex",
                          flexDirection: "column",
                          textTransform: 'none'
                        }} >
                          <InfoIcon fontSize='medium' color='primary' sx={{ marginLeft: 3, marginRight: 3, }} />
                          <Typography>About Us</Typography>

                        </Button>
                      </Paper>

                      <Paper sx={{ borderRadius: 4, }}>
                        <Button color="inherit" href='/blogs' sx={{
                          display: "flex",
                          flexDirection: "column",
                          textTransform: 'none'
                        }} >
                          <FormatListBulletedIcon fontSize='medium' color='primary' sx={{ marginLeft: 3, marginRight: 3, }} />
                          <Typography>Blogs</Typography>

                        </Button>
                      </Paper>


                    </Box>
                  </Fade>
                )}
              </Popper>




            </Toolbar>

          </Paper>

        </AppBar>

      </Box>



      <ThemeProvider theme={darkTheme}>
        <React.Fragment>







          <Box sx={{
            flexGrow: 1,
            // display: { xs: 'none',sm: 'block',ms:'block' }
          }}
          >
            <AppBar position="fixed" sx={{
              xs: {
                elevation: 0

              }
            }}>
              <Toolbar style={{ padding: 11 }}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                  href='/'
                >
                  {/* <MenuIcon /> */}



                  <img alt='gloom' src='/static/images/favicon32.png' />

                </IconButton>

                <Link
                  variant="h6"
                  sx={{ display: { xs: 'none', sm: 'block' }, color: '#1c1c1c', }}
                  href='/' underline="none">
                  {APP_NAME}
                </Link>


                <Box sx={{ flexGrow: 1 }} />

                <SearchBar />
                <Typography variant='h4' sx={{ display: { xs: 'block', sm: 'none', md: 'none' } }}>Gloom</Typography>
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


                  <Button sx={{ color: '#1c1c1c' }} href="/blogs"> Blogs</Button>

                  <Button sx={{ color: '#1c1c1c' }} href="/contact">Contact us</Button>


                  {isAuth() && isAuth().role === 0 && (

                    <Button sx={{ color: '#1c1c1c' }} href="/user">
                      {`${isAuth().name}'s Dashboard`}
                    </Button >

                  )}

                  {isAuth() && isAuth().role === 1 && (

                    <Button sx={{ color: '#1c1c1c' }} onClick={() => {
                      Router.replace(`/admin`)

                    }}>
                      {`${isAuth().name}'s Dashboard`}
                    </Button >

                  )}



                  {/* <Button href="/user/crud/blog" > */}


                  <Button sx={{ color: '#1c1c1c' }} onClick={() => {
                    Router.replace(`/user/crud/blog`)

                  }}>

                    Write a blog

                  </Button >

                  <Button sx={{ color: '#1c1c1c' }} href='/aboutus'> About Us</Button>

                  {isAuth() && (

                    <Button variant='contained' sx={{ color: '#ffffff', backgroundColor: '#000000' }} onClick={() => signout(() => Router.replace(`/signin`))}>
                      Signout
                    </Button >

                  )}

                  {!isAuth() && (
                    <React.Fragment>
                      <Button sx={{ color: '#1c1c1c' }} href="/signin">
                        Login
                      </Button>
                      <Button variant='contained' sx={{ color: '#ffffff', backgroundColor: '#000000' }} href="/signup" >
                        Register
                      </Button >
                    </React.Fragment>
                  )}

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
                    <MenuIcon />
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
          </Box>




        </React.Fragment>
      </ThemeProvider>
    </>


  );
};

export default Header;
