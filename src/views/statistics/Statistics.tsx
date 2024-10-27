import ProductPriceChart from './ProductPriceChart';
import { mockProducts } from 'src/services/product.service';
import './Statistics.scss';

const Statistics: React.FC = () => {
  return (
    <>
      <h1>Statistics</h1>
      <div className="statistics-container">
        <div>
          <h3>Price of Medicine</h3>
          <ProductPriceChart products={mockProducts} />
        </div>
        <div>
          <h3>Manufacturer Products Chart</h3>
        </div>
      </div>
    </>
  );
};

export default Statistics;
