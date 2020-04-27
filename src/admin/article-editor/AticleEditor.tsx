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
  const history = useHistory();

  const classes = useStyles();

  const [post, setPost] = useState({ title: '', content: '' })
  const [editor, setEditor] = useState(null)

  useEffect(() => {
    console.log(state)
    if (state) {
      Axios.get(`/api/post/${state.id}`)
        .then(res => res.data)
        .then(res => {
          setPost(res.data)
          setEditor(BraftEditor.createEditorState(res.data.content))
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [])

  function savePost() {
    if (!post.id){
      Axios.post('/api/post', post)
      .then(res => res.data)
      .then(res => {
        history.push("/")
      })
      .catch(err => {
        console.error(err)
      })
    } else {
      Axios.put('/api/post', post)
      .then(res => res.data)
      .then(res => {
        history.push("/")
      })
      .catch(err => {
        console.error(err)
      })
    }
    
  }


  return (
    <Container maxWidth="lg">

      <TextField className={classes.title}
        value={post.title}
        onChange={(e) => {
          //console.log(e.target.value)
          setPost({ ...post, title: e.target.value })
        }} label="标题" />
      <Card className={classes.editor}>
        <BraftEditor
          value={editor}
          onChange={(e) => {
            //console.log(e.toHTML())
            setPost({ ...post, content: e.toHTML() })
            setEditor(e)
          }
          }
        />
      </Card>
      <div className={classes.options}>
        <Button variant="contained" color="primary" onClick={savePost}>保存</Button>
      </div>
    </Container>
  )
}