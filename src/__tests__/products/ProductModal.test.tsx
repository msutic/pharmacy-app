import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Product } from '@/views/products/types';
import ProductModal from '@/views/products/components/ProductModal';

jest.mock('@/services/product.service', () => ({
  mockManufacturers: [
    { id: '1', name: 'Manufacturer 1' },
    { id: '2', name: 'Manufacturer 2' },
  ],
}));

const mockOnClose = jest.fn();
const mockOnAddProduct = jest.fn();
const mockOnEditProduct = jest.fn();

const renderComponent = (selectedProduct: Product | null = null) => {
  render(
    <ProductModal
      open={true}
      onClose={mockOnClose}
      onAddProduct={mockOnAddProduct}
      onEditProduct={mockOnEditProduct}
      selectedProduct={selectedProduct}
    />
  );
};

describe('ProductModal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the modal with the correct title for adding a product', () => {
    renderComponent();
    expect(screen.getByText(/Add New Product/i)).toBeInTheDocument();
  });

  test('renders the modal with the correct title for editing a product', () => {
    const selectedProduct: Product = {
      id: '1',
      name: 'Product 1',
      manufacturer: { id: '1', name: 'Manufacturer 1' },
      price: 100,
      expirationDate: new Date(),
    };
    renderComponent(selectedProduct);
    expect(screen.getByText(/Edit Product/i)).toBeInTheDocument();
  });

  test('renders form fields correctly', () => {
    renderComponent();
    expect(screen.getByLabelText(/Product Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Manufacturer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expiration Date/i)).toBeInTheDocument();
  });

  test('validates form fields', async () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Add Product/i));
    expect(
      await screen.findByText(/Product name is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Manufacturer is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Expiration date is required/i)
    ).toBeInTheDocument();
  });

  //   test('calls onAddProduct with correct data when adding a product', async () => {
  //     renderComponent();
  //     fireEvent.change(screen.getByLabelText(/Product Name/i), {
  //       target: { value: 'New Product' },
  //     });
  //     fireEvent.change(screen.getByLabelText(/Manufacturer/i), {
  //       target: { value: '1' },
  //     });
  //     fireEvent.change(screen.getByLabelText(/Price/i), {
  //       target: { value: '100' },
  //     });
  //     fireEvent.change(screen.getByLabelText(/Expiration Date/i), {
  //       target: { value: '2023-12-31' },
  //     });
  //     fireEvent.click(screen.getByText(/Add Product/i));
  //     expect(mockOnAddProduct).toHaveBeenCalledWith({
  //       id: expect.any(String),
  //       name: 'New Product',
  //       manufacturer: { id: '1', name: 'Manufacturer 1' },
  //       price: 100,
  //       expirationDate: new Date('2023-12-31'),
  //     });
  //   });

  //   test('calls onEditProduct with correct data when editing a product', async () => {
  //     const selectedProduct: Product = {
  //       id: '1',
  //       name: 'Product 1',
  //       manufacturer: { id: '1', name: 'Manufacturer 1' },
  //       price: 100,
  //       expirationDate: new Date('2024-10-28T00:30:33.772Z'),
  //     };
  //     renderComponent(selectedProduct);
  //     fireEvent.change(screen.getByLabelText(/Product Name/i), {
  //       target: { value: 'Updated Product' },
  //     });
  //     fireEvent.click(screen.getByText(/Save Changes/i));
  //     expect(mockOnEditProduct).toHaveBeenCalledWith({
  //       id: '1',
  //       name: 'Updated Product',
  //       manufacturer: { id: '1', name: 'Manufacturer 1' },
  //       price: 100,
  //       expirationDate: new Date('2024-10-28T00:30:33.772Z'),
  //     });
  //   });

  test('calls onClose when the cancel button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
