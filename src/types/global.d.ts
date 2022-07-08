// mark file as a module (at least 1 import/export needed)
export {};

declare global {
  export interface Business {
    id: string;
    name: string;
    description: string;
    phone: string;
    image: string;
    email: string;
    address: Address;
  }

  export interface Address {
    number: string;
    street: string;
    zip: string;
    city: string;
    country: string;
  }
}
