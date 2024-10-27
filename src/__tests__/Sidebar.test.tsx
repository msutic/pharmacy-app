import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '@/components/sidebar/Sidebar';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Sidebar Component', () => {
  test('renders the title "Pharmacy Dashboard"', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const titleElement = screen.getByText(/Pharmacy Dashboard/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the "Products" menu item', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const productsMenuItem = screen.getByText(/Products/i);
    expect(productsMenuItem).toBeInTheDocument();
  });

  test('navigates to /products when "Products" menu item is clicked', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const productsMenuItem = screen.getByText(/Products/i);
    fireEvent.click(productsMenuItem);
    expect(mockUseNavigate).toHaveBeenCalledWith('/products');
  });

  test('navigates to /statistics when "Statistics" menu item is clicked', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const statisticsMenuItem = screen.getByText(/Statistics/i);
    fireEvent.click(statisticsMenuItem);
    expect(mockUseNavigate).toHaveBeenCalledWith('/statistics');
  });

  test('navigates to /about when "About" menu item is clicked', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const aboutMenuItem = screen.getByText(/About/i);
    fireEvent.click(aboutMenuItem);
    expect(mockUseNavigate).toHaveBeenCalledWith('/about');
  });
});
