import { useState, useEffect } from 'react';
import { container } from '../config';
import { Product } from '../models';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await container.productController.getAvailableProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Error loading products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const getByCategory = async (category: string) => {
    try {
      setLoading(true);
      const data = await container.productController.getProductsByCategory(category);
      setProducts(data);
    } catch (err) {
      console.error('Error filtering products:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (query: string) => {
    try {
      setLoading(true);
      const data = await container.productController.searchProducts(query);
      setProducts(data);
    } catch (err) {
      console.error('Error searching products:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    getByCategory,
    searchProducts,
    refresh: loadProducts,
  };
}
