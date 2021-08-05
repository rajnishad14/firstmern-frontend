import React, { useState } from 'react'
import {
  Avatar,
  Paper,
  Grid,
  Typography,
  Button,
  Container,
} from '@material-ui/core'
import GoogleLogIn from 'react-google-login'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import Icon from './Icon'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signIn, signUp } from '../../actions/auth'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Auth = () => {
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [isSignUp, setIsSignUp] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp) {
      dispatch(signUp(formData, history))
    } else {
      dispatch(signIn(formData, history))
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const switchMode = () => {
    setIsSignUp(!isSignUp)
  }
  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId
    try {
      dispatch({ type: 'AUTH', payload: { result, token } })
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }
  const googleFalure = (err) => {
    console.log(err)
    console.log('google signin failed')
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? `Sign Up` : `Sign in`}</Typography>
        <form
          className={classes.form}
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  type="text"
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  type="text"
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? `text` : `password`}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? `Sign Up` : `Sign In`}
          </Button>
          <GoogleLogIn
            clientId="965623131490-92nntmrq5dit87ocpdqmtb8mdqrqo0ug.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFalure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="center">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? `Already have an account? Sign In`
                  : `Don't have an account? Sign Up`}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
