import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TimelineLite, Power3, TweenMax, Linear } from "gsap";
import Article from './Article';
import { Card, ButtonGroup, Button } from '@material-ui/core';
import axios from 'axios' 

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
  const size = 5;
  const [animotionSize, setAnimotionSize] = useState(0);
  const classes = useStyles();
  const { title } = props;
  const [page, setPage] = useState(1)
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const parent = useRef(null);
  // Detect when scrolled to bottom.
  window.onscroll = () => {
    console.log('--------------scrolling---------------')
    if (
      document.body.scrollTop + document.body.clientHeight >=
      document.body.scrollHeight && !loading && animotionSize > 0
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
    if (page === 1 && !loading){
      loadMore()
    }
    
    const last5Children = [];
    const len = children.length;
    console.log("len:", len, "animotionSize", animotionSize)
    for (let i = 0; i < animotionSize; i++) {
      last5Children.push(children[len + i - animotionSize]);
    }
    TweenMax.staggerFromTo(last5Children, 2, 
      {y: "100%", opacity:0, ease:Power3.easeIn}, {y: "0%", opacity:1, ease:Power3.easeOut}, .15);
  }, [posts])

  const loadMore = () => {
    setLoading(true);
    axios.get("/api/posts", {params: {page: page, size: size}})
      .then(res => res.data)
      .then(res => {
        setAnimotionSize(res.data.length);
        if (res.data.length > 0){
          setPost([...posts, ...res.data]);
          setPage(page + 1)
          setLoading(false);
          console.log("posts:", posts)
          console.log("res.data", res.data)
        }
      })
  } 

  //loadMore();

  return (
    <>
      <Card className={classes.header}>
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group" className={classes.button}>
          <Button>按时间</Button>
          <Button>按热度</Button>
        </ButtonGroup>
      </Card>
      <div ref={parent} className={classes.root}>
        {posts.map(post => 
          <Article key={post.title} post={post}/>
        )}
      </div>
    </>
  );
}