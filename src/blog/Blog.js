import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Footer from './Footer';
import Game from './game/Game';
import Articles from './article/Articles';



const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  }
}));

const sections = [
  { title: 'Home', url: '/' },
  { title: 'Articles', url: '/articles' },
  { title: 'Games', url: '/games' },
  { title: 'About', url: '/about' }
];


export default function Blog() {
  const classes = useStyles();

  return (
    <React.Fragment> 
      <CssBaseline />
        <Container maxWidth="lg">
          <Header title="宏桑のBlog" sections={sections} />
          <main>      
            <Articles />
          </main>
        </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  );
}
