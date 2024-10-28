import { Manufacturer, Product } from '@/views/products/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Ibuprofen',
    manufacturer: { name: 'Pfizer', id: '101' },
    price: 29.99,
    expirationDate: new Date('2025-12-01'),
  },
  {
    id: '2',
    name: 'Aspirin',
    manufacturer: { name: 'Bayer', id: '102' },
    price: 49.99,
    expirationDate: new Date('2024-11-15'),
  },
  {
    id: '3',
    name: 'Dexomen',
    manufacturer: { name: 'Johnson & Johnson', id: '103' },
    price: 19.99,
    expirationDate: new Date('2023-09-30'),
  },
  {
    id: '4',
    name: 'Panrazol',
    manufacturer: { name: 'AbbVie', id: '104' },
    price: 39.99,
    expirationDate: new Date('2025-01-20'),
  },
  {
    id: '5',
    name: 'Vitamin C',
    manufacturer: { name: 'Roche', id: '105' },
    price: 24.99,
    expirationDate: new Date('2024-06-10'),
  },
];

export const mockManufacturers: Manufacturer[] = [
  { id: '101', name: 'Pfizer' },
  { id: '102', name: 'Bayer' },
  { id: '103', name: 'Johnson & Johnson' },
  { id: '104', name: 'AbbVie' },
  { id: '105', name: 'Roche' },
  { id: '106', name: 'Novartis' },
  { id: '107', name: 'Merck' },
  { id: '108', name: 'Sanofi' },
  { id: '109', name: 'Gilead Sciences' },
  { id: '110', name: 'AstraZeneca' },
  { id: '111', name: 'GlaxoSmithKline' },
  { id: '112', name: 'Takeda Pharmaceutical' },
  { id: '113', name: 'Eli Lilly' },
];

export const fetchProducts = async (): Promise<Product[]> => {
  return Promise.resolve(mockProducts);
};
