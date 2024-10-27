import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { NewProduct } from './types';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onAddProduct: (data: NewProduct) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  open,
  onClose,
  onAddProduct,
}) => {
  const { control, handleSubmit, reset } = useForm<NewProduct>({
    defaultValues: {
      name: '',
      manufacturerName: '',
      price: 0,
      expirationDate: '',
    },
  });

  const onSubmit = (data: NewProduct) => {
    onAddProduct(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Name"
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Controller
            name="manufacturerName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Manufacturer Name"
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                type="number"
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Controller
            name="expirationDate"
            control={control}
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
          Add Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;
