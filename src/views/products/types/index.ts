export interface Product {
  id: number;
  name: string;
  manufacturer: Manufacturer;
  price: number;
  expirationDate: Date;
}

export interface Manufacturer {
  id: number;
  name: string;
}

export interface ProductTableData {
  id: number;
  name: string;
  manufacturerName: string;
  price: string;
  expirationDate: string;
}
