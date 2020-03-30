import React from "react";
import {HashRouter as Router, Route, Switch, Link ,useHistory} from "react-router-dom";
import GameList from "./GameList";
import Basketball from "./baskatball/Baskatball";
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  GameContainer: {
    'max-width': '960px'
  }
}));

export default function Game(props: any) {

  const classes = useStyles();

  const history = useHistory();

  return (
    <Container className={classes.GameContainer}>
      <Router basename="/games">
        {
          ["/games/", "/games"].includes(history.location.pathname) ?  "" : <Link to={""}>返回</Link>
        }
        <Switch>
          <Route path="/ball" component={Basketball}></Route>
          <Route>
            <GameList></GameList>
          </Route>
        </Switch>
      </Router>
    </Container>
  )

}