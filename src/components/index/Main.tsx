import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Article from '../article/Article';
import { TimelineLite, Power3, TweenMax, Linear } from "gsap";
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function Main(props: any) {
  const classes = useStyles();
  const { posts, title } = props;
  const [inProp, setInProp] = useState(false);
  const parent = useRef(null);
  const tl = new TimelineLite();

  useEffect(() => {
    const p: HTMLDivElement = parent.current;
    const children: HTMLElement[] = p.childNodes;
    console.log(children);
    const childrenn: HTMLElement[] = [];
    children.forEach(child => {
      //tl.from(child, 0.5, {y: 960, ease: Power3.easeOut});
      //childrenn.push(child.firstElementChild);
      tl.from(child, 1, {rotation:60, transformOrigin:"-1024px -1024px", repeat:0, ease:Power3.easeOut})
    })
    //tl.staggerFrom(childrenn, 0.5, {y: 100, x: 100, ease: Power3.easeOut, delay: .8}, .15)
  }) 

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <div>
        <div ref={parent}>
          {posts.map((post, index) => 
            <div style={{overflow: Hidden}}>
            <Article key={post.title} post={post}/>
            </div>
          )}
        </div>
      <button onClick={() => setInProp(true)}>
        Click to Enter
      </button>
      <button onClick={() => setInProp(false)}>
        Click to Out
      </button>
    </div>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
