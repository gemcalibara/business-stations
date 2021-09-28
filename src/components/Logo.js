import React from 'react'
import { Grid } from '@material-ui/core'

const Logo = () => {
  return (
        <div>
            <Grid style={{ textAlign: 'center' }}>
              <img src={process.env.REACT_APP_LOGO} alt="Logo"/>
          </Grid>
        </div>
  )
}

export default Logo
