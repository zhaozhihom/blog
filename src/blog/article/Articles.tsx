import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Power3, TweenMax } from "gsap";
import Article from './Article';
import { Card, ButtonGroup, Button } from '@material-ui/core';
import axios from 'axios'
import { throttle } from 'lodash';


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
  },
  anchor: {
    position: "fixed",
    top: "180px",
    left: "calc(85%)",
    zIndex: 10,
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    
  },

}));


export default function Articles(props: any) {
  const size = 5;
  const [animotionSize, setAnimotionSize] = useState(0);
  const classes = useStyles();
  const [page, setPage] = useState(1)
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const parent = useRef(null);
  // Detect when scrolled to bottom.
  
  window.onscroll = throttle(() => {
    console.log('----------scrolling-----------')
    if (
      document.body.scrollTop + document.body.clientHeight >=
      document.body.scrollHeight && !loading && animotionSize > 0
    ) {
        loadMore();
    }
  }, 2000)

  // useEffect(() => {
  //   console.log("---------add scroll----------")
  //   window.addEventListener("scroll", onScroll);
  //   return () => {
  //     window.removeEventListener("scroll", onScroll);
  //     console.log("---------remove scroll----------")
  //   }
  // },[])

  useEffect(() => {
    const p: HTMLDivElement = parent.current;
    const children: NodeListOf<ChildNode> = p.childNodes;
    // const childrenn: HTMLElement[] = [];
    // children.forEach(child => {
    //   //tl.from(child, 0.5, {y: 960, ease: Power3.easeOut});
    //   //childrenn.push(child.firstElementChild);
    //   //tl.from(child, 0.8, {rotation:60, transformOrigin:"-1024px -1024px", repeat:0, ease:Power3.easeOut})
    // })
    if (page === 1 && !loading) {
      loadMore()
    }

    const last5Children = [];
    const len = children.length;
    for (let i = 0; i < animotionSize; i++) {
      last5Children.push(children[len + i - animotionSize]);
    }
    TweenMax.staggerFromTo(last5Children, 2,
      { y: "100%", opacity: 0, ease: Power3.easeIn }, { y: "0%", opacity: 1, ease: Power3.easeOut }, .15);

  }, [posts])

  const loadMore = () => {
    setLoading(true);
    axios.get("/api/public/posts", { params: { page: page, size: size } })
      .then(res => res.data)
      .then(res => {
        setAnimotionSize(res.data.length);
        if (res.data.length > 0) {
          setPost([...posts, ...res.data]);
          setPage(page + 1)
          setLoading(false);
        }
      })
  }

  const orderPosts = (orderField: string) => {
    const newposts = [...posts].sort((post1: any, post2: any) => {
      if (orderField === 'clickTimes') {
        return post2.clickTimes - post1.clickTimes
      } else {
        return (new Date(post2.postTime)).getTime() - (new Date(post1.postTime)).getTime()
      }
    })
    console.log("newposts:", newposts)
    setPost(newposts)
  }

  // function renderRow(props: ListChildComponentProps) {
  //   const { data, index, style } = props;

  //   console.log(style)
  
  //   return (
  //     <ListItem focusVisibleClassName="itemfocus" className={classes.item} button style={style} key={index}>
  //       <ListItemText primary={data[index].title} />
  //     </ListItem>
  //   );
  // }

  return (
    <>
      <Card className={classes.header}>
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group" className={classes.button}>
          <Button onClick={() => orderPosts("postTimes")}>按时间</Button>
          <Button onClick={() => orderPosts("clickTimes")}>按热度</Button>
        </ButtonGroup>
      </Card>
      <div ref={parent} className={classes.root}>
        {posts.map(post =>
          <Article id={post.title} key={post.id} post={post} />
        )}
      </div>
      {/* <div className={classes.anchor}>
        <FixedSizeList height={400} width={120} itemSize={20} itemData={posts} itemCount={posts.length}>
          {renderRow}  
        </FixedSizeList>
      </div> */}
    </>
  );
}