import React, { useState, useEffect } from 'react'
import { Box, Container } from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import TableContents from './TableContents'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const TableStations = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [stations, setStations] = useState([])
  const params = {
    page: 1,
    perPage: 20
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  useEffect(() => {
    if (token) {
      setOpen(true)
      const url = process.env.REACT_APP_STATION_API

      axios.get(url, {
        headers: { Authorization: token },
        params
      })
        .then(response => {
          setStations(response.data.data.stations)
        })
        .catch(error => {
          throw error
        })

      const timer = setTimeout(() => {
        setOpen(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <>
        <Box
        sx={{
          minHeight: '100%',
          py: 3
        }}
        >
        <Container maxWidth={false}>
            <Box sx={{ pt: 3 }}>
                <TableContents stations={stations} />
            </Box>
        </Container>
        </Box>
        <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </>
  )
}

export default TableStations
