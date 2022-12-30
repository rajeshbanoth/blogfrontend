import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { API } from '../../config';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from '@mui/material';

export default function ImgMediaCard({ blog }) {
  return (
    <Card sx={{ maxWidth: 345,boxShadow:5 }}>
      <CardMedia
        component="img"
        alt={blog.title}
        height="200"
        image={`${API}/blog/photo/${blog.slug}`}
        sx={{padding:'10px',borderRadius:10}}
      />
      <CardContent>
      <Typography sx={{color:'#595855',fontSize:'13px',padding:'10px',  display: { xs: 'none', sm: 'block' }}}     >
              {<EditIcon  style={{color:'#0F9D58'}} fontSize='small'/>}{' '}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                        {blog.postedBy.username}
                    </Link>{' '}
                    | {<AccessTimeIcon   style={{color:'#DB4437'}} fontSize='small' />} {moment(blog.updatedAt).fromNow()}
              </Typography>
        <a href={`/blogs/${blog.slug}`} variant="body1" color="text.secondary" component="div">
        {blog.title}
        </a>
      </CardContent>
      <CardActions>

      </CardActions>
    </Card>
  );
}
