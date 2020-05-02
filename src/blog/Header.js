import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link as RouteLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../styles/Header.css';
import gsap, { TimelineLite, Power3, TweenMax, Linear, Power0, Power1, Power2 } from "gsap";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "url('image/Darling.in.the.FranXX.png')",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  toolbar: {
    //borderBottom: `1px solid ${theme.palette.divider}`,
    //backgroundImage: 'linear-gradient(#ffffff, #3586ff)'
  },
  whaleImage1: {
    position: 'absolute',
    marginLeft: '48px',
    transform:'rotate(15deg)',
    opacity: 0
  },
  whaleImage2: {

  },
  toolbarTitle: {
    flex: 1,
    fontSize: '2rem',
    opacity: 1
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;
  const tl = new TimelineLite({paused: false});
  const tl1 = new TimelineLite({paused: false});

  const whale = useRef(null);
  const water = useRef(null);
  const titlee = useRef(null);
  const [showWater, setShowWater] = useState(0);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    console.log('windowWidth: ', windowWidth);
    const deviceType = detectDeviceType();
    const titleDiv: HTMLElement = titlee.current;



    // tl.to(whale.current, 2, 
    //   {x: '7.8vw', y: '26vh', scale: 2,  opacity:1, rotation:30, transformOrigin:"50% 0%", ease:Power2.easeIn})
    //   .to(whale.current, 3, 
    //     {x: '27vw', y: '10vh', scale: 2,  opacity:1, rotation: -20, transformOrigin:"50% top", ease:Power2.easeOut, onComplete: titleTimeLine})
    //     .to(whale.current, 2, 
    //       {x: '44vw', y: '26vh', scale: 2,  opacity:1, rotation:40, transformOrigin:"50% 0%", ease:Power2.easeIn})
    //       .to(whale.current, 0, 
    //         {x: '0', y: '0', scale: 1,  opacity:1, rotation:0, transformOrigin:"center", ease:Power2.easeIn});
    
  })

  const titleTimeLine = () => {
    //setShowWater(1);
    TweenMax.from(water.current, 1, {opacity: 1, ease:Power3.easeIn});
    tl1.to(titlee.current, 2, {opacity:1, scale: 1, ease:Power3.easeOut});
    //setShowWater(0);
  }

  const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';

  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        {/* <Button size="small">Subscribe</Button> */}
        <RouteLink to="/" >
          <div ref={whale} className={classes.whaleBox}>
            {/* <img src="image/water.png"
                  height="20px" 
                  alt="..."
                  className={classes.whaleImage1}
                  style={{ opacity: showWater}}
                  ref={water}
            ></img> */}
            <img           
              src="image/whale-5-removebg-preview.png" 
              height="60px" 
              alt="..."
              className={classes.whaleImage2}
              ></img>
          </div>
        </RouteLink>
        <Typography
          ref={titlee}
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
          {/* <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
          <div className="wave wave4"></div> */}
        </section>
      </Grid>

    </div>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
