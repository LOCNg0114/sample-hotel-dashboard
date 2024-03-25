import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';

const data = [
    { category: 'Occupied Room', percentage: 22.8 },
    { category: 'Group Rooms', percentage: 14.05 },
    { category: 'Transient Rooms', percentage: 8.75 },
];

// Set up dimensions
const width = 400;
const height = 300;
const margin = { top: 20, bottom: 20, left: 40, right: 20 };

// Define scales
const xScale = scaleBand({
    domain: data.map(d => d.category),
    range: [margin.left, width - margin.right],
    padding: 0.2,
});

const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(d => d.percentage))],
    range: [height - margin.bottom, margin.top],
});

const BarChart: React.FC = () => {
    return (
        <svg width={width} height={height}>
            <Group>
                {data.map(d => (
                    <Bar
                        key={d.category}
                        x={xScale(d.category)}
                        y={yScale(d.percentage)}
                        width={xScale.bandwidth()}
                        height={height - margin.bottom - yScale(d.percentage)}
                        fill="#007bff"
                    />
                ))}
            </Group>
            <AxisBottom
                scale={xScale}
                top={height - margin.bottom}
                label="Category"
                tickLabelProps={() => ({ dy: '0.25em', textAnchor: 'middle' })}
            />
            <AxisLeft
                scale={yScale}
                left={margin.left}
                label="%"
                numTicks={5}
                tickLabelProps={() => ({ dx: '-0.25em', textAnchor: 'end' })}
            />
        </svg>
    );
};

export default BarChart;