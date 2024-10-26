import TableDataWrapper from 'src/components/data-table/DataTable';
import { ProductTableData } from './types';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'manufacturerName', label: 'Manufacturer' },
  { id: 'price', label: 'Price' },
  { id: 'expirationDate', label: 'Expiration Date' },
  { id: 'action', label: 'Action' },
];

interface ProductsTableProps {
  data: ProductTableData[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ data }) => {
  return <TableDataWrapper data={data} columns={columns} />;
};

export default ProductsTable;
