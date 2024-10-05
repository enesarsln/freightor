// @mui
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
// components
import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import './appStyle.css';
import WeightDisplay from './weight-display';

// ----------------------------------------------------------------------

type RowProps = {
  flightID: string;
  fpfx: string;
  flightNumber: string;
  dep: string;
  arr: string;
  acReg: string;
  std: string;
  sta: string;
  passengerCount: number;
  weight: number;
  second: number;
  extraWeight: number;
  flightDate: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;
}

export default function AppNewInvoice({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <AppNewInvoiceRow key={row.flightID} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

// ----------------------------------------------------------------------

type AppNewInvoiceRowProps = {
  row: RowProps;
};

function AppNewInvoiceRow({ row }: AppNewInvoiceRowProps) {
  return (
    <TableRow>
      <TableCell>{row.fpfx}</TableCell>
      <TableCell>
        <Label variant="soft" sx={{ p: 1 }} color={row.fpfx === 'THY' ? 'error' : 'info'}>
          {row.flightNumber}
        </Label>
      </TableCell>
      <TableCell>{row.dep}</TableCell>
      <TableCell>{row.arr}</TableCell>
      <TableCell>{row.flightDate}</TableCell>
      <TableCell>{row.std}</TableCell>
      <TableCell>{row.sta}</TableCell>
      <TableCell>{row.acReg}</TableCell>
      <TableCell>{row.passengerCount}</TableCell>
      <TableCell width="15%">
        <WeightDisplay weight={row.weight} extraWeight={row.extraWeight} seconds={row.second} />
      </TableCell>
    </TableRow>
  );
}
