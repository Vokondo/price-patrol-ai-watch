
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useProductStats() {
  return useQuery({
    queryKey: ['product-stats'],
    queryFn: async () => {
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id', { count: 'exact' });

      const { data: monitoring, error: monitoringError } = await supabase
        .from('product_monitoring')
        .select('id', { count: 'exact' })
        .eq('is_active', true);

      if (productsError || monitoringError) {
        throw productsError || monitoringError;
      }

      return {
        total: products?.length || 0,
        monitored: monitoring?.length || 0,
      };
    },
  });
}
