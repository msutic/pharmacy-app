import ProductPriceChart from './ProductPriceChart';
import './Statistics.scss';
import { useSelector } from 'react-redux';
import { ProductsState } from '../products/store';
import ManufacturerProductsChart from './ManufacturerProductsChart';
import { Typography } from '@mui/material';

const Statistics: React.FC = () => {
  const products = useSelector((state: ProductsState) => state.products);

  return (
    <>
      <div className="stats-header">
        <Typography variant="h4">Statistics</Typography>
      </div>
      <div className="statistics-container">
        <div className="chart-container">
          <h3 className="chart-title">Price of Medicine</h3>
          <ProductPriceChart products={products} />
        </div>
        <div className="chart-container">
          <h3 className="chart-title">Manufacturer Products Chart</h3>
          <ManufacturerProductsChart products={products} />
        </div>
      </div>
    </>
  );
};

export default Statistics;
