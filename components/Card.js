import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt=""
        height="160"
        image={props.image}
      />
      <CardContent>

        <Typography variant="body2" color="text.secondary" component="div">
{props.body}
        </Typography>
      </CardContent>
      <CardActions>

      </CardActions>
    </Card>
  );
}
