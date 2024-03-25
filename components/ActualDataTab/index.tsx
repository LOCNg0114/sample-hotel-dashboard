import React from 'react'
import BarChart from '@/common/BarChartCustom'
import { Box } from '@mui/material'
import CustomTable from '../../common/CustomTable'
import { RoomAccRecord } from '../../common/data/actualData'

const ActualDataTab = () => {
    return (
        <div>
            <h2>Actual Data</h2>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                gap={3}
            >
                <BarChart data={RoomAccRecord} />
                <CustomTable />
            </Box>
        </div>
    )
}

export default ActualDataTab