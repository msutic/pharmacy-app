import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
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

  const colors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff7300',
    '#d0ed57',
    '#a4de6c',
    '#8dd1e1',
    '#ffb3e6',
    '#ff6666',
    '#66b3ff',
  ];

  return (
    <BarChart
      width={1000}
      height={400}
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="price" barSize={40}>
        {chartData.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default ProductPriceChart;
