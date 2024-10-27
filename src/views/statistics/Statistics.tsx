import ProductPriceChart from './ProductPriceChart';
import './Statistics.scss';
import { useSelector } from 'react-redux';
import { ProductsState } from '../products/store';
import ManufacturerProductsChart from './ManufacturerProductsChart';

const Statistics: React.FC = () => {
  const products = useSelector((state: ProductsState) => state.products);

  return (
    <>
      <h1>Statistics</h1>
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
