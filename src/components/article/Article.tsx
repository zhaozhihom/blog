import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  area: {
    display: 'flex',
  },
  root: {
    marginTop: '20px'
  },
  content: {
    flex: 1,
  },
  cover: {
    width: 100,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  actionButton: {
    display: 'block',
    textAlign: 'right'
  },
}));

export default function Article(props: any) {

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.area}>
        <CardMedia
          className={classNames(classes.content, classes.cover)}
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="image/whale-6-removebg-preview.png"
          title="Contemplative Reptile"
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.post.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actionButton}>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )

}