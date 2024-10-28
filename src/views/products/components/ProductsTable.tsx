import { Product } from '../types';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TableSortLabel,
  TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDate } from '@/utils/dateUtils';
import './ProductsTable.scss';
import { useState } from 'react';

interface ProductsTableProps {
  data: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Product>('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (property: keyof Product) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue =
      orderBy === 'manufacturer' ? a.manufacturer.name : a[orderBy];
    const bValue =
      orderBy === 'manufacturer' ? b.manufacturer.name : b[orderBy];

    if (aValue < bValue) {
      return order === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const startIdx = page * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;

  const paginatedData = sortedData.slice(startIdx, endIdx);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow className="table-header">
            <TableCell className="header-font">
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleRequestSort('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell className="header-font">
              <TableSortLabel
                active={orderBy === 'manufacturer'}
                direction={orderBy === 'manufacturer' ? order : 'asc'}
                onClick={() => handleRequestSort('manufacturer')}
              >
                Manufacturer
              </TableSortLabel>
            </TableCell>
            <TableCell className="header-font">
              <TableSortLabel
                active={orderBy === 'price'}
                direction={orderBy === 'price' ? order : 'asc'}
                onClick={() => handleRequestSort('price')}
              >
                Price
              </TableSortLabel>
            </TableCell>
            <TableCell className="header-font">
              <TableSortLabel
                active={orderBy === 'expirationDate'}
                direction={orderBy === 'expirationDate' ? order : 'asc'}
                onClick={() => handleRequestSort('expirationDate')}
              >
                Expiration Date
              </TableSortLabel>
            </TableCell>
            <TableCell className="header-font">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.manufacturer.name}</TableCell>
              <TableCell>{`${row.price.toFixed(2)} €`}</TableCell>
              <TableCell>{formatDate(row.expirationDate.toString())}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => onEdit(row)}
                  data-testid="edit-product-button"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(row.id)}
                  data-testid="delete-product-button"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedData.length} // Total number of rows
        rowsPerPage={rowsPerPage} // Current rows per page
        page={page} // Current page
        onPageChange={handleChangePage} // Handle page change
        onRowsPerPageChange={handleChangeRowsPerPage} // Handle change in rows per page
      />
    </TableContainer>
  );
};

export default ProductsTable;
