export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

export interface Shop {
  _id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  logo: string;
  hasDelivery: boolean;
  products: Product[];
}

export interface Product {
  _id: string;
  photo: string;
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
  description?: string;
}

export interface Review {
  _id: string;
  productId: string;
  name: string;
  rating: number;
  testimonial: string;
  createdAt: string;
}

export interface Customer {
  _id: string;
  photo?: string;
  name: string;
  email: string;
  spent: string;
  phone?: string;
}

export interface IncomeExpense {
  _id: string;
  name: string;
  amount: string;
  type: 'Income' | 'Expense' | 'Error';
}

export interface ClientGoods {
  customer: { name: string; email: string; spent: string };
  goods: { _id: string; name: string; category: string; photo: string; price: string }[];
}
