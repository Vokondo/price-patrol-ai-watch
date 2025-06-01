
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useViolations() {
  return useQuery({
    queryKey: ['violations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('violations')
        .select(`
          *,
          products:product_id(name, sku, brand),
          retailers:retailer_id(name)
        `)
        .order('detected_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useViolationStats() {
  return useQuery({
    queryKey: ['violation-stats'],
    queryFn: async () => {
      const { data: totalViolations, error: totalError } = await supabase
        .from('violations')
        .select('id', { count: 'exact' });

      const { data: activeViolations, error: activeError } = await supabase
        .from('violations')
        .select('id', { count: 'exact' })
        .eq('status', 'active');

      const { data: resolvedToday, error: resolvedError } = await supabase
        .from('violations')
        .select('id', { count: 'exact' })
        .eq('status', 'resolved')
        .gte('resolved_at', new Date().toISOString().split('T')[0]);

      if (totalError || activeError || resolvedError) {
        throw totalError || activeError || resolvedError;
      }

      return {
        total: totalViolations?.length || 0,
        active: activeViolations?.length || 0,
        resolvedToday: resolvedToday?.length || 0,
      };
    },
  });
}
