import axios from 'axios';
import { IProduct } from '@/models/Product';
import { ICollection } from '@/models/Collection';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const getProducts = async (params?: { 
  collection?: string;
  limit?: number;
  page?: number;
}) => {
  try {
    const response = await api.get('/api/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: string | number): Promise<IProduct> => {
  try {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Collections API
export const getCollections = async (): Promise<ICollection[]> => {
  try {
    const response = await api.get('/api/collections');
    return response.data;
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
};

export const getCollectionById = async (id: string): Promise<ICollection> => {
  try {
    const response = await api.get(`/api/collections/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching collection with ID ${id}:`, error);
    throw error;
  }
};

// Orders API
export const createOrder = async (orderData: any) => {
  try {
    const response = await api.post('/api/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export default api;
