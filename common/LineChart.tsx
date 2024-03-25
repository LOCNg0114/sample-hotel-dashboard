import React, { useCallback, TouchEvent, MouseEvent } from "react";
import { Group } from "@visx/group";
import { scaleLinear, scaleTime } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Bar, LinePath } from "@visx/shape";
import { extent } from "d3-array";
import { localPoint } from "@visx/event";
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { LinearGradient } from "@visx/gradient";

interface DataItem {
    Date: string;
    "Total Occ.": number;
    "Arr. Rooms": number;
    "Dep. Rooms": number;
    [key: string | number]: number | string;
}

interface LineChartProps {
    data: DataItem[];
    width: number;
    height: number;
}

type TooltipData = DataItem | null;

const LineChart = ({ data, width, height }: LineChartProps) => {
    // tooltip parameters
    const { tooltipData, tooltipLeft = 0, tooltipTop = 0, showTooltip, hideTooltip } = useTooltip<TooltipData>();

    // define margins from where to start drawing the chart
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    // defining inner measurements
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const formatData = data.map(d => ({
        Date: d.Date,
        "Total Occ.": +d["Total Occ."],
        "Arr. Rooms": +d["Arr. Rooms"],
        "Dep. Rooms": +d["Dep. Rooms"]
    }));


    // Defining scales
    const dateScale = scaleTime({
        range: [0, innerWidth],
        domain: extent(formatData, (d) => new Date(d.Date)) as [Date, Date],
    });

    const yScale = scaleLinear({
        range: [innerHeight, 0],
        domain: [0, Math.max(...formatData.map((d) => d["Total Occ."]))],
    });

    // defining tooltip styles
    const tooltipStyles = {
        ...defaultStyles,
        minWidth: 60,
        backgroundColor: "rgba(0,0,0,0.9)",
        color: "red",
    };

    const handleTooltip = useCallback(
        (event: TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>) => {
            const { x } = localPoint(event) || { x: 0 };
            const x0 = dateScale.invert(x);

            const index = Math.floor(x0.getTime());
            const d = data[index];

            if (d) {
                showTooltip({
                    tooltipData: d,
                    tooltipLeft: x,
                    tooltipTop: yScale(d["Total Occ."]),
                });
            }
        },
        [data, dateScale, yScale, showTooltip]
    );

    return (
        <div style={{ position: "relative" }}>
            <svg width={width} height={height}>
                <LinearGradient id="area-gradient" from="#43b284" to="#43b284" toOpacity={0.1} />
                <Group left={margin.left} top={margin.top}>
                    <AxisLeft scale={yScale} />
                    <AxisBottom scale={dateScale} top={innerHeight} />
                    <LinePath
                        data={data}
                        x={(d) => dateScale(new Date(d.Date)) ?? 0}
                        y={(d) => yScale(d["Total Occ."]) ?? 0}
                        stroke="#43b284"
                        strokeWidth={2}
                    />
                    <LinePath
                        data={data}
                        x={(d) => dateScale(new Date(d.Date)) ?? 0}
                        y={(d) => yScale(d["Arr. Rooms"]) ?? 0}
                        stroke="#fab255"
                        strokeWidth={2}
                    />
                    <LinePath
                        data={data}
                        x={(d) => dateScale(new Date(d.Date)) ?? 0}
                        y={(d) => yScale(d["Dep. Rooms"]) ?? 0}
                        stroke="#3182CE"
                        strokeWidth={2}
                    />
                    {tooltipData && (
                        <g>
                            <line
                                x1={tooltipLeft}
                                x2={tooltipLeft}
                                y1={0}
                                y2={innerHeight}
                                stroke="##3182CE"
                                strokeWidth={2}
                                strokeDasharray="4,2"
                            />
                        </g>
                    )}
                    <rect
                        x={0}
                        y={0}
                        width={innerWidth}
                        height={innerHeight}
                        fill="transparent"
                        onTouchStart={handleTooltip}
                        onTouchMove={handleTooltip}
                        onMouseMove={handleTooltip}
                        onMouseLeave={() => hideTooltip()}
                    />
                </Group>
            </svg>
            {tooltipData && (
                <TooltipWithBounds
                    top={tooltipTop}
                    left={tooltipLeft}
                    style={tooltipStyles}
                >
                    <p>Total Occ.: {tooltipData["Total Occ."]}</p>
                    <p>Arr. Rooms: {tooltipData["Arr. Rooms"]}</p>
                    <p>Dep. Rooms: {tooltipData["Dep. Rooms"]}</p>
                </TooltipWithBounds>
            )}
        </div>
    );
};

export default LineChart;