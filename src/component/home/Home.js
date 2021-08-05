import React, { useEffect, useState } from 'react'
import { Container, Grid, Grow } from '@material-ui/core'
import Posts from '../posts/Posts'
import Form from '../form/Form'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'

const Home = () => {
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch, currentId])
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
