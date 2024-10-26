export interface Product {
  id: string;
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
  id: string;
  name: string;
  manufacturerName: string;
  price: string;
  expirationDate: string;
}
