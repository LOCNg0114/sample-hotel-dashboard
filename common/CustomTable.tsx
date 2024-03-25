import React, { useState, useEffect } from 'react';
import {
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    ListItemText,
    ListItemIcon,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    OutlinedInput,
} from '@mui/material';
import { tableData } from './data/actualData';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface TableData {
    property: string;
    totalRooms: number;
    roomRevenue: number;
    fbRevenue: number;
    otherRevenue: number;
    totalRevenue: number;
}

const PROPERTY_CODE = tableData.map(item => item.property);

const fetchData = async (selected: string[]): Promise<TableData[]> => {
    // Simulate delay when calling API
    await new Promise(resolve => setTimeout(resolve, 1000));
    return tableData.filter(item => selected.includes(item.property));
};

const CustomTable = () => {
    const [selectedProperty, setSelectedProperty] = useState<string[]>([]);
    const [tableData, setTableData] = useState<TableData[]>([]);

    useEffect(() => {
        fetchData(selectedProperty).then(data => {
            setTableData(data);
        });
    }, [selectedProperty]);

    const handlePropertyChange = (event: SelectChangeEvent<typeof selectedProperty>) => {
        const { value } = event.target;
        setSelectedProperty(value as string[]);
    };

    const grandTotal: TableData = tableData.reduce((acc, curr) => {
        acc.totalRooms += curr.totalRooms;
        acc.roomRevenue += curr.roomRevenue;
        acc.fbRevenue += curr.fbRevenue;
        acc.otherRevenue += curr.otherRevenue;
        acc.totalRevenue += curr.totalRevenue;
        return acc;
    }, {
        property: 'Grand Total',
        totalRooms: 0,
        roomRevenue: 0,
        fbRevenue: 0,
        otherRevenue: 0,
        totalRevenue: 0
    });

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="property-select-label">Properties</InputLabel>
                <Select
                    labelId="property-selection-label"
                    multiple
                    value={selectedProperty}
                    input={<OutlinedInput label="Tag" />}
                    onChange={handlePropertyChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {PROPERTY_CODE.map((property) => (
                        <MenuItem key={property} value={property}>
                            <ListItemIcon>
                                <Checkbox checked={selectedProperty.includes(property)} />
                            </ListItemIcon>
                            <ListItemText primary={property} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Property</TableCell>
                            <TableCell>Total Rooms</TableCell>
                            <TableCell>Room Revenue</TableCell>
                            <TableCell>F&B Revenue</TableCell>
                            <TableCell>Other Revenue</TableCell>
                            <TableCell>Total Revenue</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.property}</TableCell>
                                <TableCell>{row.totalRooms}</TableCell>
                                <TableCell>{row.roomRevenue}</TableCell>
                                <TableCell>{row.fbRevenue}</TableCell>
                                <TableCell>{row.otherRevenue}</TableCell>
                                <TableCell>{row.totalRevenue}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>{grandTotal.property}</TableCell>
                            <TableCell>{grandTotal.totalRooms}</TableCell>
                            <TableCell>{grandTotal.roomRevenue}</TableCell>
                            <TableCell>{grandTotal.fbRevenue}</TableCell>
                            <TableCell>{grandTotal.otherRevenue}</TableCell>
                            <TableCell>{grandTotal.totalRevenue}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CustomTable;
