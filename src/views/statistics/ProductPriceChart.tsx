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
import { generateRandomColor } from 'src/utils/colorUtils';

const CHART_TOP_COUNT = 5;

const ProductPriceChart: React.FC<{ products: Product[] }> = ({ products }) => {
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);

  const topLeastExpensive = sortedProducts.slice(0, CHART_TOP_COUNT);
  const topMostExpensive = sortedProducts
    .slice(-CHART_TOP_COUNT)
    .filter(
      (product) => !topLeastExpensive.some((least) => least.id === product.id)
    );

  const chartData = [...topLeastExpensive, ...topMostExpensive].map(
    (product) => ({
      name: product.name,
      price: product.price,
    })
  );

  return (
    <BarChart
      width={900}
      height={400}
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
    >
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <XAxis dataKey="name" fontSize={11} angle={-50} textAnchor="end" />
      <YAxis fontSize={11} />
      <Tooltip />
      {false && <Legend formatter={() => null} />}
      <Bar dataKey="price" name="" barSize={40} stroke="#000" strokeWidth={2}>
        {chartData.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={generateRandomColor()} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default ProductPriceChart;
