import NestedTable from '@/common/NestedTable'
import { Box } from '@mui/material'
import React from 'react'
import { dashboardSampleV0_4MealDetailData } from '@/common/data/sampledata_meal_detail'
import FirstTable from '@/common/FirstTable'
import NestedTableCustom from '@/common/NestedTableCustom'
import NestedTablev2 from '@/common/FirstTable'
import ExportExcel from '@/common/ExportExcel'

const PeriodDetailTab = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={3}
        >
            <ExportExcel data={dashboardSampleV0_4MealDetailData}/>
            {/* <NestedTable data={dashboardSampleV0_4MealDetailData} /> */}
            <NestedTableCustom data={dashboardSampleV0_4MealDetailData}/>
            {/* <NestedTablev2 data={dashboardSampleV0_4MealDetailData} /> */}
            {/* <FirstTable data={dashboardSampleV0_4MealDetailData}/> */}
        
        </Box>
    )
}

export default PeriodDetailTab