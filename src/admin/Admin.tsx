import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SiderMenu from './SiderMenu';
import { IconButton, Toolbar, AppBar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArticleList from './article-list/ArticleList';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ArticleEditor from './article-editor/AticleEditor';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export default function Admin(props: any) {

  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <Router basename="/admin">
        <CssBaseline />
        <AppBar color="inherit" position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <SiderMenu
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        >
        </SiderMenu>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route exact path="/">
            <ArticleList></ArticleList>
          </Route>
          <Route path="/createArticles">
            <ArticleEditor></ArticleEditor>
          </Route>
        </main>
      </Router>
    </div>
  );
}