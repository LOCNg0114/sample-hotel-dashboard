import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';

interface BarChartProps {
    category: string;
    percentage: number;
}

interface BarChartData {
    data: BarChartProps[];
}

const BarChart = ({ data }: BarChartData) => {
    const width = 400;
    const height = 400;
    const margin = { top: 20, bottom: 40, left: 40, right: 20 };

    const xScale = scaleBand({
        domain: data.map(d => d.category),
        range: [margin.left, width - margin.right],
        padding: 0.2,
    });

    const yScale = scaleLinear({
        domain: [0, Math.max(...data.map(d => d.percentage))],
        range: [height - margin.bottom, margin.top],
    });

    const renderBars = () =>
        data.map(d => (
            <Bar
                key={d.category}
                x={xScale(d.category)!}
                y={yScale(d.percentage)}
                width={xScale.bandwidth()}
                height={height - margin.bottom - yScale(d.percentage)}
                fill="#ff9a00"
            />
        ));

    return (
        <svg width={width} height={height}>
            <Group>
                {renderBars()}
                {/* {data.map(d => (
                    <Annotation // Change to Annotation
                        key={d.category}
                        x={xScale(d.category) + xScale.bandwidth() / 2}
                        y={yScale(d.percentage)}
                        dx={0}
                        dy={-4}
                        width={0}
                        height={0}
                        note={{
                            label: `${d.percentage}%`,
                            align: 'middle',
                            orientation: 'top',
                            lineType: 'none',
                            backgroundPadding: 4,
                        }}
                        style={{
                            fill: '#000000',
                            fontSize: 12,
                            textAnchor: 'middle',
                        }}
                    />
                ))} */}
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