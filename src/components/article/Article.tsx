import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IconButton, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { coverTime } from '../../common/time';


const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0
  },
  content: {
    display: 'flex',
  },
  title: {
    flex: 1,
    'text-align': 'initial',
  },
  cover: {
    width: 100,
  },
  actionButton: {
    flex: 1,
    display: 'block',
    textAlign: 'right'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  postContent:{
    'text-align': 'initial'
  },
  time: {
    'font-family': "楷体",
    'text-align': 'initial'
  }
}));

export default function Article(props: any) {

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {post} = props

  return (
    <Card className={classes.root}>

      <CardContent>
        <Typography className={classes.time}>
            {coverTime(post.postTime, 'yyyy年MM月dd日')}
        </Typography>
      </CardContent>
      <CardContent className={classes.content}>

        <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
          {post.title}
        </Typography>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>

      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph className={classes.postContent} dangerouslySetInnerHTML={{__html: post.content}}>

            </Typography>
          </CardContent>
      </Collapse>
    </Card>
  )

}