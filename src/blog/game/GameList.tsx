import React from "react";
import { Link } from 'react-router-dom';
import { Grid, GridList, GridListTile, ListSubheader, GridListTileBar } from "@material-ui/core";

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

export default function GameList(props: any) {

  return (
    <>
    <GridList cellHeight={180} cols={4}>
      <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
        <ListSubheader style={{textAlign: "center", fontSize: "20px"}} color={"inherit"} component="div">游戏列表</ListSubheader>
      </GridListTile>
      {gameList.map((game) => (
        <GridListTile cols={1} key={game.name}>
          <Link to={game.path}>
            <img height={180} src={"image/whale-6-removebg-preview.png"} alt={""} />
          </Link>
          {/* <img src={tile.img} alt={tile.title} /> */}
          {/* <GridListTileBar
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
            actionIcon={
              <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                <InfoIcon />
              </IconButton>
            }
          /> */}
        </GridListTile>
        ))}
    </GridList>
    </>
  )

}