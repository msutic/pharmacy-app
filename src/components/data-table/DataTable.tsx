import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { Children, useState } from 'react';
import './DataTable.scss';

interface Column {
  id: string;
  label: string;
}

interface TableDataWrapperProps<T> {
  data: T[];
  columns: Column[];
}

const TableDataWrapper = <T extends Record<string, any>>({
  data,
  columns,
}: TableDataWrapperProps<T>) => {
  const [tableData, setTableData] = useState<T[]>(data);
  const handleEdit = (id: number) => {
    const product = tableData.find((item) => (item as any).id === id);
    if (product) {
      console.log('editig product:', product);
    }
  };

  const handleDelete = (id: number) => {
    const updatedData = tableData.filter((item) => (item as any).id !== id);
    setTableData(updatedData);
    console.log('deleted product with id:', id);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow className="table-header">
            {columns.map((column) => (
              <TableCell key={column.id} className="header-font">
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Children.toArray(
            tableData.map((row) => (
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.id === 'action' ? (
                      <>
                        <Button
                          onClick={() => handleEdit(row.id)}
                          color="primary"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(row.id)}
                          color="secondary"
                        >
                          Delete
                        </Button>
                      </>
                    ) : (
                      row[column.id as keyof T]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableDataWrapper;
