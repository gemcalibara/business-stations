import React, { useEffect, useState } from 'react'
import Header from './Header'
import TableStations from './table/TableStations'

const Home = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  const [accessToken, setAccessToken] = useState()

  useEffect(() => {
    if (setAccessToken(token) === null) {
      location.href = '/'
    }
  }, [])

  if (accessToken) {
    return (
        <div className="App">
            <Header accessToken={accessToken}/>
            <TableStations />
        </div>
    )
  } else {
    return null
  }
}

export default Home
