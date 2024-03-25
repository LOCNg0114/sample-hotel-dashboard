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
    fontWeight: 'bold',
};

const renderDataRow = (item: any, rowIndex: number, outlet_code?: string, period?: string) => {
    // const total = period ? item.outlet[0][period].total : item.total;
    const total = period
        ? item.outlet[0][period]?.total
        : outlet_code
            ? item.outlet[0].total
            : item.total;

    return (
        <TableRow key={rowIndex}>
            <TableCell>{item.report_date}</TableCell>
            {outlet_code
                ? <TableCell>{item.outlet[0].outlet_code}</TableCell>
                : <TableCell></TableCell>
            }
            {period
                ? <TableCell>{period}</TableCell>
                : <TableCell></TableCell>
            }
            <TableCell>{total.adults_actual.count}</TableCell>
            <TableCell>{total.children_actual.count}</TableCell>
            <TableCell>{total.adults_actual.sales}</TableCell>
            <TableCell>{total.children_actual.sales}</TableCell>
            <TableCell>{total.total_actual.count}</TableCell>
            <TableCell>{total.total_actual.percentage_count}</TableCell>
            <TableCell>{total.total_actual.sales}</TableCell>
            <TableCell>{total.total_actual.percentage_sales}</TableCell>
        </TableRow>
    );
};

const NestedTableCustom = ({ data }: any) => {
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
                            {renderDataRow(item, index)}
                            {/* Second row */}
                            {renderDataRow(item, index, 'FLA', '')}
                            {/* Third row */}
                            {renderDataRow(item, index, '', 'breakfast')}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default NestedTableCustom;