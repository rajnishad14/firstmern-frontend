import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { TextField, Button, Paper, Typography } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import { useSelector } from 'react-redux'

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostDate] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  })
  const user = JSON.parse(localStorage.getItem('profile'))
  const post = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  )
  const dispatch = useDispatch()
  const classes = useStyles()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }))
    }
    clear()
  }
  const clear = () => {
    setCurrentId(null)
    setPostDate({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
  }

  useEffect(() => {
    if (post) {
      setPostDate(post)
    }
  }, [post])
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create memory
        </Typography>
      </Paper>
    )
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {post ? `Editing` : `Creating`} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostDate({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostDate({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostDate({ ...postData, tags: e.target.value.split(',') })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setPostDate({ ...postData, selectedFile: base64 })
            }}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          varient="contained"
          color="primary"
          fullWidth
          type="submit"
          size="large"
        >
          {post ? `Update` : `Create`}
        </Button>
        <Button
          className={classes.buttonSubmit}
          varient="contained"
          color="secondary"
          fullWidth
          onClick={clear}
          size="large"
        >
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default Form
