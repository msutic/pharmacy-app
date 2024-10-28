import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { fetchProducts } from '@/services/product.service';
import Products from '@/views/products/components/Products';
import { deleteProduct, ProductsState } from '@/views/products/store';

jest.mock('@/services/product.service', () => ({
  fetchProducts: jest.fn(),
  mockManufacturers: [
    { id: '1', name: 'Pfizer' },
    { id: '2', name: 'Bayer' },
    { id: '3', name: 'Johnson & Johnson' },
  ],
}));

const mockStore = configureStore<ProductsState>();

describe('Products Component', () => {
  let store: MockStoreEnhanced<ProductsState>;
  const initialState: ProductsState = {
    products: [],
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('displays loading spinner when loading', () => {
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays error message when there is an error', async () => {
    (fetchProducts as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to fetch products')
    );
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );
    await waitFor(
      () => {
        expect(
          screen.getByText(/Failed to fetch products/i)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test('displays products when loaded', async () => {
    const mockProducts = [
      {
        id: '11',
        name: 'Product 1',
        price: 55,
        expirationDate: new Date(),
        manufacturer: { id: '11', name: 'New Manufacturer' },
      },
    ];
    (fetchProducts as jest.Mock).mockResolvedValueOnce(mockProducts);
    store = mockStore({
      products: mockProducts,
    });
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    });
  });

  test('opens modal when "Create New Product" button is clicked', () => {
    store = mockStore({
      products: [
        {
          id: '11',
          name: 'Product 1',
          price: 55,
          expirationDate: new Date(),
          manufacturer: { id: '11', name: 'New Manufacturer' },
        },
      ],
    });
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );
    fireEvent.click(screen.getByText(/\+ Create New Product/i));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  //   test('adds product when add product function is called', () => {
  //     render(
  //       <Provider store={store}>
  //         <Products />
  //       </Provider>
  //     );
  //     fireEvent.click(screen.getByText(/\+ Create New Product/i));
  //     fireEvent.change(screen.getByLabelText(/product name/i), {
  //       target: { value: 'New Product' },
  //     });
  //     fireEvent.click(screen.getByText(/add product/i));
  //     expect(store.getActions()).toContainEqual(
  //       addProduct({
  //         name: 'New Product',
  //         id: '',
  //         manufacturer: { id: '15', name: 'manufact. name' },
  //         price: 0,
  //         expirationDate: new Date(),
  //       })
  //     );
  //   });

  //   test('edits product when edit product function is called', () => {
  //     const mockProducts = [
  //       {
  //         id: '1',
  //         name: 'Product 1',
  //         manufacturer: { id: '1', name: 'Manufacturer' },
  //         price: 0,
  //         expirationDate: new Date(),
  //       },
  //     ];
  //     store = mockStore({
  //       products: mockProducts,
  //     });
  //     render(
  //       <Provider store={store}>
  //         <Products />
  //       </Provider>
  //     );
  //     fireEvent.click(screen.getByTestId('edit-product-button'));
  //     fireEvent.change(screen.getByLabelText(/product name/i), {
  //       target: { value: 'Edited Product' },
  //     });
  //     fireEvent.click(screen.getByText(/save changes/i));
  //     expect(store.getActions()).toContainEqual(
  //       editProduct({
  //         id: '1',
  //         name: 'Edited Product',
  //         manufacturer: { id: '1', name: 'Manufacturer' },
  //         price: 0,
  //         expirationDate: new Date(),
  //       })
  //     );
  //   });

  test('deletes product when delete product function is called', () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Product 1',
        price: 0,
        expirationDate: new Date(),
        manufacturer: { id: '1', name: 'Manufacturer' },
      },
    ];
    store = mockStore({
      products: mockProducts,
    });
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );
    fireEvent.click(screen.getByTestId('delete-product-button'));
    expect(store.getActions()).toContainEqual(deleteProduct('1'));
  });
});
