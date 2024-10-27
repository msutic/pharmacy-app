import React, { useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Product } from '../types';
import { mockManufacturers } from 'src/services/product.service';

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onAddProduct: (data: Product) => void;
  onEditProduct: (data: Product) => void;
  selectedProduct: Product | null;
}

interface ProductForm {
  name: string;
  manufacturerId: string;
  price: number;
  expirationDate: string;
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  onAddProduct,
  onEditProduct,
  selectedProduct = null,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues: {
      name: '',
      manufacturerId: '',
      price: 0,
      expirationDate: '',
    },
  });

  useEffect(() => {
    if (selectedProduct) {
      reset({
        name: selectedProduct.name,
        manufacturerId: selectedProduct.manufacturer.id,
        price: selectedProduct.price,
        expirationDate: new Date(selectedProduct.expirationDate)
          .toISOString()
          .split('T')[0],
      });
    }
  }, [selectedProduct, reset]);

  const onSubmit = (data: ProductForm) => {
    const manufacturer = mockManufacturers.find(
      (m) => m.id === data.manufacturerId
    );
    if (!manufacturer) {
      // better err handling..
      alert('Manufacturer not found');
      return;
    }

    const productToSave: Product = {
      id: selectedProduct?.id ?? Math.random().toString(),
      name: data.name,
      manufacturer: {
        name: manufacturer.name,
        id: manufacturer.id,
      },
      price: Number(data.price),
      expirationDate: new Date(data.expirationDate),
    };

    if (selectedProduct) {
      onEditProduct(productToSave);
    } else {
      onAddProduct(productToSave);
    }
    handleClose();
  };

  const handleClose = () => {
    reset({
      name: '',
      manufacturerId: '',
      price: 0,
      expirationDate: '',
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {selectedProduct ? 'Edit Product' : 'Add New Product'}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Product name is required',
              minLength: {
                value: 2,
                message: 'Product name must be at least 2 characters long',
              },
              maxLength: {
                value: 50,
                message: 'Product name must not exceed 50 characters',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Name"
                fullWidth
                margin="normal"
                required
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
          <Controller
            name="manufacturerId"
            control={control}
            rules={{ required: 'Manufacturer is required' }}
            render={({ field }) => (
              <FormControl
                fullWidth
                margin="normal"
                required
                variant="outlined"
              >
                <InputLabel id="manufacturer-label">Manufacturer</InputLabel>
                <Select
                  {...field}
                  labelId="manufacturer-label"
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  label="Manufacturer"
                  error={!!errors.manufacturerId}
                >
                  {mockManufacturers.map((manufacturer) => (
                    <MenuItem key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.manufacturerId && (
                  <FormHelperText sx={{ color: 'red' }}>
                    {errors.manufacturerId.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="price"
            rules={{
              required: 'Price is required',
              min: {
                value: 0,
                message: 'Price must be a positive number',
              },
            }}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                type="number"
                fullWidth
                margin="normal"
                required
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ''}
              />
            )}
          />
          <Controller
            name="expirationDate"
            control={control}
            rules={{ required: 'Expiration date is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Expiration Date"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                required
                error={!!errors.expirationDate}
                helperText={
                  errors.expirationDate ? errors.expirationDate.message : ''
                }
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">
          {selectedProduct ? 'Save Changes' : 'Add Product'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
