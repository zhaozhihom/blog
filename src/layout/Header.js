import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link as RouteLink } from 'react-router-dom';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
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
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        {/* <Button size="small">Subscribe</Button> */}
        <RouteLink to="/">
          <img src="image/whale-5-removebg-preview.png" 
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
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <RouteLink 
            className={classNames(
            classes.toolbarLink,
            "MuiTypography-root",
            "MuiLink-root",
            "MuiLink-underlineHover",
            "makeStyles-toolbarLink-13",
            "MuiTypography-body2",
            "MuiTypography-colorInherit",
            "MuiTypography-noWrap"
          )} 
            key={section.title} 
            to={section.url}>
            {/* <Link
              key = {section.title}
              color="inherit"
              noWrap
              variant="body2"
              href="javascript:void(0)"
              className={classes.toolbarLink}
            >          
              {section.title}
            </Link> */}
            {section.title}
          </RouteLink>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
