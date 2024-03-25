import LineChart from '@/common/LineChart'
import { lineChartData } from '@/common/data/actualData'
import React from 'react'

const PeriodDetailTab = () => {
    return (
        <div>
            <LineChart
                data={lineChartData}
                width={800}
                height={600}
            />
        </div>
    )
}

export default PeriodDetailTab