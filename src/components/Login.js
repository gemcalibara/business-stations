import React, { useState, useEffect } from 'react'
import { Grid, Paper, TextField, Button, Typography } from '@material-ui/core'
import { NavLink, useHistory } from 'react-router-dom'
import AlertMessage from './AlertMessage'
import Logo from './Logo'
import axios from 'axios'

const Login = () => {
  const paperStyle = { padding: 20, height: '50px auto', width: 300, margin: '80px auto' }
  const btnstyle = { margin: '8px 0' }

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const history = useHistory()

  const { email, password } = user
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const [alertMessage, setAlertMessage] = useState('')

  const signIn = () => {
    const random = Math.random()

    if (user.email === '') {
      setAlertMessage({ msg: 'Please input your email.', key: random })
    } else if (user.password === '') {
      setAlertMessage({ msg: 'Please input your password.', key: random })
    } else {
      const url = process.env.REACT_APP_LOGIN_API

      axios.post(url, user)
        .then(response => {
          localStorage.setItem('users', user.email)
          localStorage.setItem('accessToken', response.data.data.AccessToken)
          history.push('/Home')
        }).catch(error => {
          console.error({ errorMessage: error.message })
          setAlertMessage({ msg: 'Your email or password is incorrect.', key: random })
        })
    }
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  useEffect(() => {
    if (token !== null) {
      location.href = '/Home'
    }
  }, [])

  if (!token) {
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Logo/>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Email' name="email" value={email} onChange={e => onInputChange(e)} placeholder='Enter Email' type='text' fullWidth required/>
                <TextField label='Password' name="password" value={password} onChange={e => onInputChange(e)} placeholder='Enter password' type='password' fullWidth required/>
                <Button type='submit' onClick={signIn} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography > Do not have account ?
                    <NavLink to="#">
                        <span style={{ marginLeft: '4px' }}>Sign Up</span>
                    </NavLink>
                </Typography>
            </Paper>
            { alertMessage ? <AlertMessage key={alertMessage.key} message={alertMessage.msg} /> : null }
        </Grid>
    )
  } else {
    return null
  }
}

export default Login
