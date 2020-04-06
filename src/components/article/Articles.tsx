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
  const { title } = props;
  const [posts, setPost] = useState(
    [{
      title: 'Breaking News',
      content: 'People load on Mars'
    }, {
      title: 'Lovely Girls',
      content: 'pretty girls in the class'
    }, {
      title: 'Good Time',
      content: 'Every Day is good time'
    },{
      title: 'Pretty Boy',
      content: 'Every Day is good time'
    },{
      title: 'Fish Man',
      content: 'Every Day is good time'
    }]
  );
  const [loading, setLoading] = useState(false);
  const parent = useRef(null);
  // Detect when scrolled to bottom.
  window.onscroll = () => {
    console.log('--------------scrolling---------------')
    if (
      document.body.scrollTop + document.body.clientHeight >=
      document.body.scrollHeight && !loading
    ) {
      setLoading(true);
      setTimeout(()=> {
        loadMore();
        setLoading(false);
      }, 2000);
    }
  }

  useEffect(() => {
    const p: HTMLDivElement = parent.current;
    const children: NodeListOf<ChildNode> = p.childNodes;
    // const childrenn: HTMLElement[] = [];
    // children.forEach(child => {
    //   //tl.from(child, 0.5, {y: 960, ease: Power3.easeOut});
    //   //childrenn.push(child.firstElementChild);
    //   //tl.from(child, 0.8, {rotation:60, transformOrigin:"-1024px -1024px", repeat:0, ease:Power3.easeOut})
    // })
    const last5Children = [];
    const len = children.length;
    last5Children[0] = children[len - 5];
    last5Children[1] = children[len - 4];
    last5Children[2] = children[len - 3];
    last5Children[3] = children[len - 2];
    last5Children[4] = children[len - 1];
    TweenMax.staggerFromTo(last5Children, 2, {y: "100%", opacity:0, ease:Power3.easeIn}, {y: "0%", opacity:1, ease:Power3.easeOut}, .15);

  }, [posts])

  const loadMore = () => {
    setPost([...posts, ...[{
      title: 'Breaking News',
      content: 'People load on Mars'
    }, {
      title: 'Lovely Girls',
      content: 'pretty girls in the class'
    }, {
      title: 'Good Time',
      content: 'Every Day is good time'
    },{
      title: 'Pretty Boy',
      content: 'Every Day is good time'
    },{
      title: 'Fish Man',
      content: 'Every Day is good time'
    }]]);
  } 

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