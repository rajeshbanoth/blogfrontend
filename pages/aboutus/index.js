
import { withRouter } from 'next/router';

import Head from 'next/head';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import StickyFooter from '../../components/StickyFooter'
import Header from '../../components/Header'

import Gist from "react-gist";


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

 function aboutus() {
  return (

    <>
    <Header/>
  
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth:700,
        flexGrow: 1,
        marginTop:12,
        marginBottom:3,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>

        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h3" component="div">
                About Us
              </Typography>

              <Typography variant="body1" color="text.secondary">
              <p>
Hello guys! I am Rajesh Banoth 
</p>

<p>
Welcome to <b>Gloom</b>, your number one source for all things related to <b>Science,Tech,News,Entertainment and Education</b>. We're dedicated to giving you the very best of Science,Tech,News and Education with a focus on quality and real-world problem solution.
</p>
<p>
Founded in 2022-03-19 by Rajesh Banoth, Gloom has come a long way from its beginnings in <b>Warangal,506381</b> located in <b>India 🇮🇳, Republic of India</b>.
When Rajesh Banoth first started out, our passion for Science, Tech, News, Education
drove us to start our own blog/website.
</p>
<p>
We hope you enjoy our blog as much as We enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
</p>
<p>
Sincerely,
Rajesh Banoth
</p>
              </Typography>
            </Grid>

          </Grid>
          <Grid item>
          <Gist id='5bb5e978fffa609af755474f55c036ac' />



         

          </Grid>
        </Grid>
      </Grid>

    </Paper>
    <StickyFooter/>

    </>
  );
}


export default withRouter(aboutus);