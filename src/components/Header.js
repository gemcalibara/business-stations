import React from 'react'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Logo from './Logo'

// eslint-disable-next-line react/prop-types
const Header = ({ accessToken }) => {
  const btnstyle = { margin: '3px 0' }

  const history = useHistory()

  const loggedUser = localStorage.getItem('users')

  const logout = () => {
    localStorage.removeItem('users')
    localStorage.removeItem('accessToken')
    history.push('/')
  }

  if (accessToken) {
    return (
        <div>
          <Logo/>
          <h4 style={{ textAlign: 'center' }}>Logged User :
            <span style={{ color: 'blue' }}>{loggedUser}</span>
          </h4>
          <Button type='submit' onClick={logout} color='primary' variant="contained" style={btnstyle} >Logout</Button>
        </div>
    )
  } else {
    return null
  }
}

export default Header