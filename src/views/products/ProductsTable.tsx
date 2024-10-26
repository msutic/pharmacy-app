import { useEffect, useState } from 'react';
import { Product } from './types/Product';
import { getProducts } from '../../services/product.service';
import DataTable from '../../components/data-table/DataTable';

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const products = getProducts();
    setProducts(products);
  }, []);

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'manufacturerName', label: 'Manufacturer' },
    { id: 'price', label: 'Price' },
    { id: 'expirationDate', label: 'Expiration Date' },
  ];

  const mappedData = products?.map((product) => ({
    name: product.name,
    manufacturerName: product.manufacturer.name,
    price: `$${product.price.toFixed(2)}`,
    expirationDate: product.expirationDate,
  }));

  return <DataTable title="Products" data={mappedData} columns={columns} />;
};

export default ProductTable;
