import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Product } from '../products/types';
import { generateRandomColor } from '@/utils/colorUtils';

interface ManufacturerPieChartProps {
  products: Product[];
}

const ManufacturerPieChart: React.FC<ManufacturerPieChartProps> = ({
  products,
}) => {
  const manufacturerCounts: { [key: string]: number } = {};

  products.forEach((product) => {
    const manufacturerName = product.manufacturer.name;
    manufacturerCounts[manufacturerName] =
      (manufacturerCounts[manufacturerName] || 0) + 1;
  });

  const pieData = Object.entries(manufacturerCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <PieChart width={600} height={400}>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {pieData.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={generateRandomColor()} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ManufacturerPieChart;
