import React from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material';

const headerCellStyle = {
    backgroundColor: '#43b284',
    color: 'common.white',
    // fontSize: (theme: any) => theme.typography.h6.fontSize,
    fontWeight: 'bold',
};

const NestedTable = ({ data }: any) => {


    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={headerCellStyle}>Date</TableCell>
                        <TableCell sx={headerCellStyle}>RVC</TableCell>
                        <TableCell sx={headerCellStyle}>Period</TableCell>
                        <TableCell sx={headerCellStyle}>Adults Count</TableCell>
                        <TableCell sx={headerCellStyle}>Children Count</TableCell>
                        <TableCell sx={headerCellStyle}>Adult Sales</TableCell>
                        <TableCell sx={headerCellStyle}>Children Sales</TableCell>
                        <TableCell sx={headerCellStyle}>Total Count</TableCell>
                        <TableCell sx={headerCellStyle}>Percentage Count</TableCell>
                        <TableCell sx={headerCellStyle}>Total Sales</TableCell>
                        <TableCell sx={headerCellStyle}>Percentage Sales</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item: any, index: number) => (
                        <React.Fragment key={index}>
                            {/* First row */}
                            <TableRow>
                                <TableCell>{item.report_date}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>{item.total.adults_actual.count}</TableCell>
                                <TableCell>{item.total.children_actual.count}</TableCell>
                                <TableCell>{item.total.adults_actual.sales}</TableCell>
                                <TableCell>{item.total.children_actual.sales}</TableCell>
                                <TableCell>{item.total.total_actual.count}</TableCell>
                                <TableCell>{item.total.total_actual.percentage_count}</TableCell>
                                <TableCell>{item.total.total_actual.sales}</TableCell>
                                <TableCell>{item.total.total_actual.percentage_sales}</TableCell>
                            </TableRow>
                            {/* Second row */}
                            <TableRow>
                                <TableCell>{item.report_date}</TableCell>
                                <TableCell>{item.outlet[0].outlet_code}</TableCell>
                                <TableCell></TableCell>
                                <TableCell>{item.outlet[0].total.adults_actual.count}</TableCell>
                                <TableCell>{item.outlet[0].total.children_actual.count}</TableCell>
                                <TableCell>{item.outlet[0].total.adults_actual.sales}</TableCell>
                                <TableCell>{item.outlet[0].total.children_actual.sales}</TableCell>
                                <TableCell>{item.outlet[0].total.total_actual.count}</TableCell>
                                <TableCell>{item.outlet[0].total.total_actual.percentage_count}</TableCell>
                                <TableCell>{item.outlet[0].total.total_actual.sales}</TableCell>
                                <TableCell>{item.outlet[0].total.total_actual.percentage_sales}</TableCell>
                            </TableRow>
                            {/* Third row */}
                            <TableRow>
                                <TableCell>{item.report_date}</TableCell>
                                {/* <TableCell>{item.outlet[0].outlet_code}</TableCell> */}
                                <TableCell></TableCell>
                                <TableCell>Breakfast</TableCell>
                                <TableCell>{item.outlet[0].breakfast.total.adults_actual.count}</TableCell>
                                <TableCell>{item.outlet[0].breakfast.total.children_actual.count}</TableCell>
                                <TableCell>{item.outlet[0].breakfast.total.adults_actual.sales}</TableCell>
                                <TableCell>{item.outlet[0].breakfast.total.children_actual.sales}</TableCell>
                                <TableCell>{item.outlet[0].breakfast.total.total_actual.count}</TableCell>
                                <TableCell>{item.outlet[0].breakfast.total.total_actual.percentage_count}</TableCell>
                                <TableCell>{item.outlet[0].breakfast.total.total_actual.sales}</TableCell>
                                <TableCell>{item.outlet[0].breakfast.total.total_actual.percentage_sales}</TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default NestedTable;