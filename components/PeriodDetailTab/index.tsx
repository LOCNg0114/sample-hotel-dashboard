import { Box } from '@mui/material'
import React from 'react'
import { dashboardSampleV0_4MealDetailData } from '@/common/data/sampledata_meal_detail'
import NestedTableCustom from '@/common/NestedTableCustom'
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
            <ExportExcel data={dashboardSampleV0_4MealDetailData} />
            <NestedTableCustom data={dashboardSampleV0_4MealDetailData} />
        </Box>
    )
}

export default PeriodDetailTab