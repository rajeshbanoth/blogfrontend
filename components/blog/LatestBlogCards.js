import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Avatar, Card as Card1, Divider, Fab, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import * as React from 'react';
import renderHTML from 'react-render-html';
import ReactRoundedImage from "react-rounded-image";
import { API } from '../../config';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#000000',
      },
    },
  });


  


const Card = ({ blog }) => {

    

    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (

      <Chip  style={{padding:'10px'}} label={c.name} component="a" href={`/categories/${c.slug}`} clickable   color="primary" variant="outlined"/>
   
  
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (

      <Chip style={{padding:'10px'}} label={t.name} component="a" href={`/tags/${t.slug}`}clickable   color="secondary" variant="outlined"/>
   
 
        ));

    return (

        <>


<Grid item xs={12} md={6}>

    <Card1 sx={{ display: 'flex',
     border: 1,
     borderRadius: 4,
    //  borderColor: '#000000',
    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
     color: 'white',
     height:'150px',
    //  backgroundColor: 'transparent',

   
     "&:hover": {
         boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
       } }}>

        <CardMedia  
        sx={{  display: {  sm: 'block' } ,paddingTop:'18px',paddingLeft:'10px',paddingRight:'4px'}}
     
        alt="image"
      >

<ReactRoundedImage
          image={`${API}/blog/photo/${blog.slug}`}
          roundedColor="#66A5CC"
          imageWidth="100"
          imageHeight='100'
         
          roundedSize="0"
          borderRadius="5"
        />

          </CardMedia>

       <CardContent sx={{ flex: 1 }}>
        {/* <Typography gutterBottom style={{color:'#252626',fontSize:'14px'}}  component="div">
        {blog.title}
        </Typography> */}

<Link underline="none" href={`/blogs/${blog.slug}`} gutterBottom style={{color:'#252626',fontSize:'16px'}} >
        {blog.title}
        </Link>
        <Typography sx={{color:'#595855',fontSize:'10px',paddingTop:'10px',  display: { xs: 'none', sm: 'block' }}}     >
              {<EditIcon  style={{color:'#0F9D58'}} fontSize='small'/>}{' '}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                        {blog.postedBy.username}
                    </Link>{' '}
                    | {<AccessTimeIcon   style={{color:'#DB4437'}} fontSize='small' />} {moment(blog.updatedAt).fromNow()}
              </Typography>



        {/* <ThemeProvider theme={darkTheme}>
        <Button sx={{
        //    position: 'absolute',
        //    bottom: 10,
        //    right: 10,
        //    backgroundColor:'#e6e7ed',
           color:'#4285F4'
        }}     href={`/blogs/${blog.slug}`}>Read More  <ArrowRightAltIcon /> </Button>
            </ThemeProvider> */}
       
      </CardContent>


      <CardActions>
     

      </CardActions>
    </Card1>





    </Grid>


        </>
    );
};

export default Card;
