import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';

import ProductsTable from './ProductsTable';
import { fetchProducts } from 'src/services/product.service';
import { NewProduct, Product } from './types';
import './Products.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, ProductsState, setProducts } from './store';
import AddProductModal from './AddProductModal';

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: ProductsState) => state.products);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleCreateProduct = () => {
    setModalOpen(true);
  };

  const handleAddProduct = (newProduct: NewProduct) => {
    const productToAdd: Product = {
      id: Math.random().toString(),
      name: newProduct.name,
      manufacturer: {
        name: newProduct.manufacturerName,
        id: Math.random().toString(),
      },
      price: Number(newProduct.price),
      expirationDate: new Date(newProduct.expirationDate),
    };

    dispatch(addProduct(productToAdd));
    setModalOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    console.log('Edit product', product);
  };

  const handleDeleteProduct = (id: string) => {
    console.log('Delete product', id);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await fetchProducts();
        dispatch(setProducts(productData));
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    if (products.length === 0) {
      getProducts();
    } else {
      setLoading(false);
    }
  }, [dispatch, products]);

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
      <ProductsTable
        data={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
      <AddProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default Products;
