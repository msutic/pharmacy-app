import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Children } from 'react';

interface Column {
  id: string;
  label: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column[];
  title?: string;
}

const DataTable = <T extends Record<string, any>>({
  title,
  data,
  columns,
}: DataTableProps<T>) => {
  return (
    <>
      <h2>{title}</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Children.toArray(
              data.map((row) => (
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {row[column.id as keyof T]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;
