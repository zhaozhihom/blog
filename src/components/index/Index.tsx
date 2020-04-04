import React from "react";
import FeaturedPost from "./FeaturedPost";
import { Grid } from "@material-ui/core";
import MainFeaturedPost from "./MainFeaturedPost";
import Sidebar from "./Sidebar";
import Main from "./Main";

export default function Index(props: any){

  const {
    post,
    featuredPosts,
    classes,
    posts,
    sidebar
  } = props;

  return (
    <>
      <MainFeaturedPost post={post} />
      {/* <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid> */}
      <Grid container spacing={5} className={classes.mainGrid}>
        <Main title="From the firehose" posts={posts} />
        {/* <Sidebar
          title={sidebar.title}
          description={sidebar.description}
          archives={sidebar.archives}
          social={sidebar.social}
        /> */}
      </Grid>
    </>
  )

}