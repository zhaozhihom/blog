import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link as RouteLink } from 'react-router-dom';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../styles/Header.css';
import gsap, { TimelineLite, Power3, TweenMax, Linear, Power0, Power1, Power2 } from "gsap";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: 'linear-gradient(#ffffff, #3586ff)'
  },
  toolbar: {
    //borderBottom: `1px solid ${theme.palette.divider}`,
    //backgroundImage: 'linear-gradient(#ffffff, #3586ff)'
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
  titleCenter: {
    fontSize: '50px',
    color: '#ffffff',
    textAlign: "center",
    // paddingTop: '5vh'
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;
  const tl = new TimelineLite({paused: false});

  const whale = useRef(null);
  useEffect(() => {
    tl.to(whale.current, 2, 
      {x: '150px', y: '300px', scale: 2,  opacity:1, rotation:30, transformOrigin:"50% 0%", ease:Power2.easeIn})
      .to(whale.current, 3, 
        {x: '500px', y: '100px', scale: 2,  opacity:1, rotation: -30, transformOrigin:"50% top", ease:Power2.easeOut})
        .to(whale.current, 2, 
          {x: '850px', y: '400px', scale: 2,  opacity:1, rotation:40, transformOrigin:"50% 0%", ease:Power2.easeIn})
          .to(whale.current, 0, 
            {x: '0', y: '0', scale: 1,  opacity:1, rotation:0, transformOrigin:"center", ease:Power2.easeIn});
  })

  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        {/* <Button size="small">Subscribe</Button> */}
        <RouteLink to="/" >
          <img ref={whale}          
            src="image/whale-5-removebg-preview.png" 
            height="60px" 
            alt="..."></img>
        </RouteLink>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton color="inherit">
          <TwitterIcon></TwitterIcon>
        </IconButton>
        <IconButton color="inherit">
          <GitHubIcon></GitHubIcon>
        </IconButton>
        {/* <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          Sign up
        </Button> */}
      </Toolbar>
      
     
      <Grid container>
        <section>
          {/* <div className={classes.titleCenter}>{title}</div> */}
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
          <div className="wave wave4"></div>
        </section>
      </Grid>

    </div>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
