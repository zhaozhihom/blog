import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TimelineLite, Power3, TweenMax, Linear } from "gsap";
import Article from './Article';
import { Card, ButtonGroup, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center"
  },
  header: {
    borderRadius: 0,
    // width: '80%',
    // marginLeft: '10%',
    textAlign: 'left'
  },
  button: {
    margin: '8px'
  }
}));

export default function Articles(props: any) {
  const classes = useStyles();
  const { posts, title } = props;
  const parent = useRef(null);
  const tl = new TimelineLite();

  useEffect(() => {
    const p: HTMLDivElement = parent.current;
    const children: HTMLElement[] = p.childNodes;
    // const childrenn: HTMLElement[] = [];
    // children.forEach(child => {
    //   //tl.from(child, 0.5, {y: 960, ease: Power3.easeOut});
    //   //childrenn.push(child.firstElementChild);
    //   //tl.from(child, 0.8, {rotation:60, transformOrigin:"-1024px -1024px", repeat:0, ease:Power3.easeOut})
    // })
    tl.staggerFromTo(children, 2, {y: "100%", opacity:0, ease:Power3.easeIn}, {y: "0%", opacity:1, ease:Power3.easeOut}, .15)
  }) 

  return (
    <div ref={parent} className={classes.root}>
      <Card className={classes.header}>
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group" className={classes.button}>
          <Button>按时间</Button>
          <Button>按热度</Button>
        </ButtonGroup>
      </Card>
      {posts.map(post => 
        <Article key={post.title} post={post}/>
      )}
    </div>
  );
}