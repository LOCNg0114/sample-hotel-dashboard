import React from 'react';
import saveAs from 'file-saver';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

const ExportExcel = ({ data }: any) => {
    const exportToExcel = () => {
        const generateExcelContent = () => {
            const headerRow = [
                'Date',
                'RVC',
                'Period',
                'Adults Count',
                'Children Count',
                'Adult Sales',
                'Children Sales',
                'Total Count',
                'Percentage Count',
                'Total Sales',
                'Percentage Sales',
            ];

            const rows: any[] = [];

            data.forEach((item: any) => {
                const mainRowContent = [
                    item.report_date,
                    item.outlet[0]?.outlet_code || '',
                    '',
                    item.total.adults_actual.count,
                    item.total.children_actual.count,
                    item.total.adults_actual.sales,
                    item.total.children_actual.sales,
                    item.total.total_actual.count,
                    item.total.total_actual.percentage_count,
                    item.total.total_actual.sales,
                    item.total.total_actual.percentage_sales,
                ];
                const secondRowContent = [
                    item.report_date,
                    'FLA',
                    '',
                    item.total.adults_actual.count,
                    item.total.children_actual.count,
                    item.total.adults_actual.sales,
                    item.total.children_actual.sales,
                    item.total.total_actual.count,
                    item.total.total_actual.percentage_count,
                    item.total.total_actual.sales,
                    item.total.total_actual.percentage_sales,
                ];
                const thirdRowContent = [
                    item.report_date,
                    item.outlet[0]?.outlet_code || '',
                    'breakfast',
                    item.total.adults_actual.count,
                    item.total.children_actual.count,
                    item.total.adults_actual.sales,
                    item.total.children_actual.sales,
                    item.total.total_actual.count,
                    item.total.total_actual.percentage_count,
                    item.total.total_actual.sales,
                    item.total.total_actual.percentage_sales,
                ];
                rows.push(mainRowContent, secondRowContent, thirdRowContent);
            });
            const content = [headerRow, ...rows];

            return content;
        };

        const convertToExcelSheet = (content: any[][]) => {
            const ws = XLSX.utils.aoa_to_sheet(content);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
            saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'table_data.xlsx');
        };

        const excelContent = generateExcelContent();
        convertToExcelSheet(excelContent);
    };

    return (
        <Button
            onClick={exportToExcel}
            variant="contained"
            style={{
                backgroundColor: '#43b284',
                color: 'white'
            }}
        >
            Export to Excel
        </Button>
    );
};

export default ExportExcel;

const s2ab = (s: string) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
};