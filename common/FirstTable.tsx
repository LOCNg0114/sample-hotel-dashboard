// import React, { useState } from 'react';
// import {
//     TableContainer,
//     Table,
//     TableHead,
//     TableBody,
//     TableRow,
//     TableCell,
//     IconButton,
// } from '@mui/material';
// import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

// const headerCellStyle = {
//     backgroundColor: '#43b284',
//     color: 'common.white',
//     fontWeight: 'bold',
// };

// const renderDataRow = (item: any, rowIndex: number, outlet_code?: string, period?: string, expandedRow: number | null) => {
//     const total = period
//         ? item.outlet[0][period]?.total
//         : outlet_code
//             ? item.outlet[0].total
//             : item.total;

//     return (
//         <TableRow key={rowIndex} style={{ visibility: 'visible' }}>
//             <TableCell>
//                 {/* Plus or minus icon based on expandedRow state */}
//                 {expandedRow === rowIndex ? (
//                     <IconButton aria-label="collapse row"
//                         onClick={() => toggleRow(null)}
//                     >
//                         <RemoveIcon />
//                     </IconButton>
//                 ) : (
//                     <IconButton
//                         aria-label="expand row"
//                         onClick={() => toggleRow(rowIndex)}
//                     >
//                         <AddIcon />
//                     </IconButton>
//                 )}
//             </TableCell>
//             <TableCell>{item.report_date}</TableCell>
//             {outlet_code
//                 ? <TableCell>{item.outlet[0].outlet_code}</TableCell>
//                 : <TableCell></TableCell>
//             }
//             {period
//                 ? <TableCell>{period}</TableCell>
//                 : <TableCell></TableCell>
//             }
//             <TableCell>{total.adults_actual.count}</TableCell>
//             <TableCell>{total.children_actual.count}</TableCell>
//             <TableCell>{total.adults_actual.sales}</TableCell>
//             <TableCell>{total.children_actual.sales}</TableCell>
//             <TableCell>{total.total_actual.count}</TableCell>
//             <TableCell>{total.total_actual.percentage_count}</TableCell>
//             <TableCell>{total.total_actual.sales}</TableCell>
//             <TableCell>{total.total_actual.percentage_sales}</TableCell>
//         </TableRow>
//     );
// };

// const NestedTableCustom = ({ data }: any) => {
//     const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});

//     const toggleRow = (index: number | null) => {
//         if (index !== null) {
//             setExpandedRows(prevState => ({
//                 ...prevState,
//                 [index]: !prevState[index],
//             }));
//         }
//     };

//     return (
//         <TableContainer>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell sx={headerCellStyle}></TableCell>
//                         <TableCell sx={headerCellStyle}>Date</TableCell>
//                         <TableCell sx={headerCellStyle}>RVC</TableCell>
//                         <TableCell sx={headerCellStyle}>Period</TableCell>
//                         <TableCell sx={headerCellStyle}>Adults Count</TableCell>
//                         <TableCell sx={headerCellStyle}>Children Count</TableCell>
//                         <TableCell sx={headerCellStyle}>Adult Sales</TableCell>
//                         <TableCell sx={headerCellStyle}>Children Sales</TableCell>
//                         <TableCell sx={headerCellStyle}>Total Count</TableCell>
//                         <TableCell sx={headerCellStyle}>Percentage Count</TableCell>
//                         <TableCell sx={headerCellStyle}>Total Sales</TableCell>
//                         <TableCell sx={headerCellStyle}>Percentage Sales</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {data.map((item: any, index: number) => (
//                         <React.Fragment key={index}>
//                             {/* First row */}
//                             {renderDataRow(item, index, undefined, undefined, index)}
//                             {/* Plus button for expanding rows */}
//                             <TableRow style={{ visibility: expandedRows[index] ? 'visible' : 'collapse' }}>
//                                 <TableCell colSpan={11}></TableCell>
//                                 <TableCell>
//                                     <IconButton onClick={() => toggleRow(index)}>
//                                         <AddIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                             {/* Second row */}
//                             {expandedRows[index] && renderDataRow(item, index, 'FLA', '')}
//                             {/* Third row */}
//                             {expandedRows[index] && renderDataRow(item, index, '', 'breakfast')}
//                         </React.Fragment>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// };

// export default NestedTableCustom;

import React, { useState } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

const headerCellStyle = {
    backgroundColor: '#43b284',
    color: 'common.white',
    fontWeight: 'bold',
};

const renderDataRow = (
    item: any,
    rowIndex: number,
    expandedRow: boolean,
    toggleRow: (index: number) => void,
    outlet_code?: string,
    period?: string,
) => {
    const total = period
        ? item.outlet[0][period]?.total
        : outlet_code
            ? item.outlet[0].total
            : item.total;

    return (
        <TableRow key={rowIndex}>
            <TableCell>
                {/* Plus or minus icon based on expandedRow state */}
                <IconButton aria-label="expand row" onClick={() => toggleRow(rowIndex)}>
                    {expandedRow ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
            </TableCell>
            {(!outlet_code && !period)
                ? <TableCell>{item.report_date}</TableCell>
                : <TableCell></TableCell>
            }
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
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    const toggleRow = (index: number) => {
        const nextIndex = index + 1;
        // if (expandedRows.includes(nextIndex)) {
        //     setExpandedRows(prevState => prevState.filter(row => row !== nextIndex));
        // } else {
        //     setExpandedRows(prevState => [...prevState, nextIndex])
        // }
        setExpandedRows(prevState => [...prevState, index, nextIndex])
    };

    console.log({ expandedRows })
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={headerCellStyle}></TableCell>
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
                    {/* {data.map((item: any, index: number) => (
                        <React.Fragment key={index}>
                            {renderDataRow(item, index, expandedRow, toggleRow)}                            
                            {expandedRow === index && (
                                <>
                                    {renderDataRow(item, index, expandedRow, toggleRow, 'FLA', '')}
                                    {renderDataRow(item, index, expandedRow, toggleRow, '', 'breakfast')}
                                </>
                            )}                            
                        </React.Fragment>
                    ))} */}
                    {data.map((item: any, index: number) => (
                        <React.Fragment key={`row-${item.id}-${index}`}>
                            {/* First row */}
                            {renderDataRow(item, index, expandedRows.includes(index), () => toggleRow(index), '', '')}
                            {/* Second row */}
                            {expandedRows.includes(index) &&
                                renderDataRow(item, index, false, () => { }, 'FLA', '')
                            }
                            {/* Third row */}
                            {expandedRows.includes(index) && renderDataRow(item, index, false, () => { }, '', '')}
                        </React.Fragment>

                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default NestedTableCustom;
