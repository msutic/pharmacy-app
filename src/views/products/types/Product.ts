export interface Product {
  id: number;
  name: string;
  manufacturer: Manufacturer;
  price: number;
  expirationDate: string;
}

export interface Manufacturer {
  id: number;
  name: string;
}
