import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import SearchBar from 'material-ui-search-bar'
import axios from 'axios'

const TableContents = ({ stations }) => {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(0)

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const [rows, setRows] = useState([])
  const [searched, setSearched] = useState('')

  const params = {
    page: 1,
    perPage: 20
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  useEffect(() => {
    if (token) {
      const url = process.env.REACT_APP_STATION_API

      axios.get(url, {
        headers: { Authorization: token },
        params
      })
        .then(response => {
          setRows(response.data.data.stations)
        })
        .catch(error => {
          throw error
        })
    }
  }, [])

  const requestSearch = (searchedVal) => {
    const filteredRows = stations.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase())
    })
    setRows(filteredRows)
  }

  const cancelSearch = () => {
    setSearched('')
    requestSearch(searched)
  }

  return (
    <>
    <h1 style={{ color: 'rgb(63, 81, 182)', textAlign: 'left', marginLeft: '0px' }}>
      PriceLOCQ for Business Stations
    </h1>
    <p style={{ color: '#7d7f88', fontSize: '16px', marginTop: '5px', marginBottom: '30px', textAlign: 'left', marginLeft: '0px' }}>
      View list of stations.
    </p>
    <SearchBar
      value={searched}
      onChange={(searchVal) => requestSearch(searchVal)}
      onCancelSearch={() => cancelSearch()}
      placeholder="Station Name"
      style={{ border: '1px solid #e0e0e0', marginTop: '-10px', marginBottom: '10px', boxShadow: 'none', width: '500px' }}
    />
    <Card style={{ border: '1px solid #e0e0e0', boxShadow: 'none', borderRadius: '0px' }}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 600 }} style={{ border: 'none', boxShadow: 'none', borderRadius: '0px' }}>
          <Table style={{ border: 'none', boxShadow: 'none', borderRadius: '0px' }}>
            <TableHead
                style={{ backgroundColor: '#fafafa' }}
            >
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Station Name
                </TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  City/Province
                </TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  <FiberManualRecordIcon style={{ fontSize: 'small', color: '#fca60b' }} /> Diesel
                </TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  <FiberManualRecordIcon style={{ fontSize: 'small', color: '#049f37' }} /> Gas 91
                </TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  <FiberManualRecordIcon style={{ fontSize: 'small', color: '#ed3931' }} /> Gas 95
                </TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  <FiberManualRecordIcon style={{ fontSize: 'small', color: '#2a468d' }} /> Gas 97
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * limit, page * limit + limit).map((station) => (
                <TableRow
                  hover
                  key={station.stationId}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {station.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '12px' }}>
                    {station.city.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))} <br/>
                    <p style={{ fontSize: '12px', fontWeight: '400', marginTop: '-2px', color: '#a1a1a1' }}>
                      {station.province.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                    </p>
                  </TableCell>
                  <TableCell>
                    {station.stationProduct.diesel === true
                      ? <CheckIcon style={{ color: '#6127b7' }} />
                      : ''}
                  </TableCell>
                  <TableCell>
                    {station.stationProduct.gas91 === true
                      ? <CheckIcon style={{ color: '#6127b7' }} />
                      : ''}
                  </TableCell>
                  <TableCell>
                    {station.stationProduct.gas95 === true
                      ? <CheckIcon style={{ color: '#6127b7' }} />
                      : ''}
                  </TableCell>
                  <TableCell>
                    {station.stationProduct.gas97 === true
                      ? <CheckIcon style={{ color: '#6127b7' }} />
                      : ''}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>

      <TablePagination
        component="div"
        count={stations.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        style={{ backgroundColor: '#fafafa', textTransform: 'uppercase' }}
      />
    </Card>
    </>
  )
}

TableContents.propTypes = {
  stations: PropTypes.array.isRequired
}

export default TableContents
