import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';

import ProductsTable from './ProductsTable';
import { fetchProducts } from 'src/services/product.service';
import { Product, ProductTableData } from './types';
import './Products.scss';
import { formatDate } from 'src/utils/dateUtils';
import { useDispatch } from 'react-redux';
import { setProducts } from './store';

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState<ProductTableData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleCreateProduct = () => {};

  const mapProducts = (products: Product[]): ProductTableData[] =>
    products.map((product: Product) => ({
      id: product.id,
      name: product.name,
      manufacturerName: product.manufacturer.name,
      price: `${product.price.toFixed(2)} €`,
      expirationDate: formatDate(product.expirationDate.toString()),
    }));

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await fetchProducts();
        setTableData(mapProducts(productData));
        dispatch(setProducts(productData));
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="products-container">
      <div className="header">
        <Typography variant="h4">Products</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProduct}
        >
          + Create New Product
        </Button>
      </div>
      <ProductsTable data={tableData} />
    </div>
  );
};

export default Products;
