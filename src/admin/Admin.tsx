import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SiderMenu from './SiderMenu';
import { IconButton, Toolbar, AppBar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArticleList from './article-list/ArticleList';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import ArticleEditor from './article-editor/AticleEditor';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Axios from 'axios';

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
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
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
  logoutButton: {
    marginRight: '10px'
  }
}));

export default function Admin(props: any) {

  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    Axios.post('/api/public/logout')
      .then(res => {
        console.log(res.data)
        history.push('/login')
      })
      .catch(err => alert(err))
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
            <Typography variant="h6" className={classes.title}>
              宏桑のBlog 
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={logout}
              className={classes.logoutButton}
            >
              <ExitToAppIcon />
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