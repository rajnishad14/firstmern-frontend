import React from 'react'
import useStyles from './styles'
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
  CardContent,
} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size="small"
          onClick={() => {
            setCurrentId(post._id)
          }}
          disabled={
            !(
              user?.result?.googleId === post?.creator ||
              user?.result?._id === post?.creator
            )
          }
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => {
            return `#${tag} `
          })}
        </Typography>
      </div>
      <Typography className={classes.title} gutterBottom varient="h5">
        {post.title}
      </Typography>
      <CardContent>
        <Typography component="p" varient="body2" color="textSecondary">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id))
          }}
          disabled={!user?.result}
        >
          <ThumbUpAltIcon fontSize="small" />
          Like {post.likes.length}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(deletePost(post._id))
          }}
          disabled={
            !(
              user?.result?.googleId === post?.creator ||
              user?.result?._id === post?.creator
            )
          }
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post
