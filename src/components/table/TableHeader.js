import React from 'react'
import { Box } from '@material-ui/core'

const TableHeader = (props) => (
    <Box {...props}>
        <div>
            <h1 style={{ color: 'rgb(63, 81, 182)', textAlign: 'left', marginLeft: '0px' }}>PriceLOCQ for Business Stations</h1>
            <p style={{ color: '#7d7f88', fontSize: '16px', marginTop: '10px', textAlign: 'left', marginLeft: '0px' }}>View list of stations.</p>
        </div>
    </Box>
)

export default TableHeader
