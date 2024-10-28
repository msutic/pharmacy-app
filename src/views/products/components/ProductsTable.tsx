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

  const handleRequestSort = (property: keyof Product) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

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
          {sortedData.map((row) => (
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
    </TableContainer>
  );
};

export default ProductsTable;
