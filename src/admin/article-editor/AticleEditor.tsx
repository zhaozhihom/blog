import React, { useState, useEffect } from 'react';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { Card, makeStyles, Container, TextField, Typography, ButtonGroup, Button } from '@material-ui/core';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  title: {
    width: '100%',
    maxWidth: '800px'
  },
  editor: {
    maxWidth: '800px',
    margingTop: '15px'
  },
  options: {
    width: '100%',
    maxWidth: '800px',
    textAlign: 'center'
  }
}));

export default function ArticleEditor(props: any) {

  const { state } = useLocation();

  const classes = useStyles();

  const [post, setPost] = useState({title:'', content: ''})

  useEffect(() => {
    if (state) {
      setPost(state.post)
    }
  }, [])

  function savePost() {
    Axios.post('/api/post', post)
    .then(res => res.data)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err)
    })
  }

  return (
    <Container maxWidth="lg">

      <TextField className={classes.title}
        onChange={(e) => {
          //console.log(e.target.value)
          setPost({ ...post, title: e.target.value })
        }} label="标题" />
      <Card className={classes.editor}>
        <BraftEditor
          value={post.content}
          onChange={(e) => {
            //console.log(e.toHTML())
            setPost({ ...post, content: e.toHTML() })
            }
          }
        />
      </Card>
      <div className={classes.options}>
        <Button color="primary" onClick={savePost}>保存</Button>
      </div>
    </Container>
  )
}