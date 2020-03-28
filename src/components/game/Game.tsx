import React from "react";
import { Link } from 'react-router-dom';
import { Grid } from "@material-ui/core";

const gameList = [
  {
    name: "小恐龙",
    path: "/dragon"
  },
  {
    name: "动感弹球",
    path: "/ball"
  },
  {
    name: "坦克世界",
    path: "/tank"
  }
]

export default function Game(props: any) {

  return (
    <>
      <Grid>
        游戏内容
      </Grid>
      <Grid>
        {gameList.map(game => 
          (<Link to={game.path}>
            {game.name}
          </Link>)
        )}
      </Grid>
    </>
  )

}