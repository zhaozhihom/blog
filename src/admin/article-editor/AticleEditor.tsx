import React, { useState, useEffect } from 'react';
import 'braft-editor/dist/index.css'
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { Card, makeStyles, Container, TextField, Typography, ButtonGroup, Button } from '@material-ui/core';
import Axios from 'axios';
import { throttle } from 'lodash';
import Editor from '../../components/editor/Editor';



const useStyles = makeStyles(theme => ({
  title: {
    width: '100%',
    maxWidth: '845px'
  },
  editor: {
    maxWidth: '845px',
    margingTop: '15px'
  },
  options: {
    width: '100%',
    maxWidth: '845px',
    textAlign: 'center'
  }
}));

export default function ArticleEditor(props: any) {

  const { state } = useLocation();
  const history = useHistory();

  const classes = useStyles();

  const [post, setPost] = useState({ title: '', content: '' })
  const [editor, setEditor] = useState(null)

  const handleEditorChange = throttle((e) => {
    setPost({ ...post, content: e.toHTML() })
    setEditor(e)
  }, 1000)

  useEffect(() => {
    if (state) {
      Axios.get(`/api/private/post/${state.id}`)
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
      Axios.post('/api/private/post', post)
      .then(res => res.data)
      .then(res => {
        history.push("/")
      })
      .catch(err => {
        console.error(err)
      })
    } else {
      Axios.put('/api/private/post', post)
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
        <Editor
          value={editor}
          onChange={handleEditorChange}
        />
      </Card>
      <div className={classes.options}>
        <Button variant="contained" color="primary" onClick={savePost}>保存</Button>
      </div>
    </Container>
  )
}