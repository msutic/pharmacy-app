import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';

import ProductsTable from './ProductsTable';
import { fetchProducts } from 'src/services/product.service';
import { Product } from '../types';
import './Products.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  deleteProduct,
  editProduct,
  ProductsState,
  setProducts,
} from '../store';
import ProductModal from './ProductModal';

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: ProductsState) => state.products);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProduct, setProductToEdit] = useState<Product | null>(null);

  const handleCreateProduct = () => {
    setProductToEdit(null);
    setModalOpen(true);
  };

  const handleAddProduct = (newProduct: Product) => {
    dispatch(addProduct(newProduct));
    setModalOpen(false);
  };

  const openEditModal = (product: Product) => {
    setProductToEdit(product);
    setModalOpen(true);
  };

  const handleEditProduct = (editedProduct: Product) => {
    dispatch(editProduct(editedProduct));
    setModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const handleCloseModal = () => {
    setProductToEdit(null);
    setModalOpen(false);
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
        onEdit={openEditModal}
        onDelete={handleDeleteProduct}
      />
      <ProductModal
        open={modalOpen}
        onClose={handleCloseModal}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default Products;
