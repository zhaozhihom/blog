import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Articles from '../article/Articles';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function Main(props: any) {
  const classes = useStyles();
  const { posts, title } = props;

  return (
    <Grid item xs={12}>
      {/* <Typography variant="h6" gutterBottom>
        {title}
      </Typography> */}
      <Divider />
      <Articles posts={posts}/>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
