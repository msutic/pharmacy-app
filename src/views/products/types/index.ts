export interface Product {
  id: string;
  name: string;
  manufacturer: Manufacturer;
  price: number;
  expirationDate: Date;
}

export interface Manufacturer {
  id: string;
  name: string;
}

export interface ProductTableData {
  id: string;
  name: string;
  manufacturerName: string;
  price: string;
  expirationDate: string;
}

export interface NewProduct {
  name: string;
  manufacturerName: string;
  price: number;
  expirationDate: string;
}
