import React, { useEffect } from 'react'
import Header from './Header'
import TableStations from './table/TableStations'

const Home = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  useEffect(() => {
    if (token === null) {
      location.href = '/'
    }
  }, [])

  if (token) {
    return (
        <div className="App">
            <Header accessToken={token}/>
            <TableStations />
        </div>
    )
  } else {
    return null
  }
}

export default Home
