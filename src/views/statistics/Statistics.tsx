import ProductPriceChart from './ProductPriceChart';
import './Statistics.scss';
import { useSelector } from 'react-redux';
import { ProductsState } from '../products/store';

const Statistics: React.FC = () => {
  const products = useSelector((state: ProductsState) => state.products);

  return (
    <>
      <h1>Statistics</h1>
      <div className="statistics-container">
        <div>
          <h3 className="chart-title">Price of Medicine</h3>
          <ProductPriceChart products={products} />
        </div>
        <div>
          <h3 className="chart-title">Manufacturer Products Chart</h3>
        </div>
      </div>
    </>
  );
};

export default Statistics;
