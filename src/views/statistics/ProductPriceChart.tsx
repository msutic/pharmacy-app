import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Product } from '../products/types';

const ProductPriceChart: React.FC<{ products: Product[] }> = ({ products }) => {
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);

  const topLeastExpensive = sortedProducts.slice(0, 5);
  const topMostExpensive = sortedProducts.slice(-5);

  const chartData = [...topLeastExpensive, ...topMostExpensive].map(
    (product) => ({
      name: product.name,
      price: product.price,
    })
  );

  return (
    <BarChart
      width={700}
      height={300}
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="price" barSize={40} fill="#8884d8" />
    </BarChart>
  );
};

export default ProductPriceChart;
