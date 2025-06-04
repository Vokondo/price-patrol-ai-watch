
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type UserSecret = {
  id?: string;
  user_id?: string;
  secret_key: string;
  secret_value: string;
  created_at?: string;
  updated_at?: string;
};

export const useSecrets = () => {
  return useQuery({
    queryKey: ['secrets'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_secrets')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data as UserSecret[];
    },
  });
};

export const useUpsertSecret = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ secret_key, secret_value }: { secret_key: string; secret_value: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_secrets')
        .upsert({
          user_id: user.id,
          secret_key,
          secret_value
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['secrets'] });
      toast({
        title: 'Secret saved',
        description: 'Your secret has been successfully updated.',
      });
    },
    onError: (error) => {
      console.error('Error saving secret:', error);
      toast({
        title: 'Error',
        description: 'Failed to save secret. Please try again.',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteSecret = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (secretId: string) => {
      const { error } = await supabase
        .from('user_secrets')
        .delete()
        .eq('id', secretId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['secrets'] });
      toast({
        title: 'Secret deleted',
        description: 'The secret has been successfully removed.',
      });
    },
    onError: (error) => {
      console.error('Error deleting secret:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete secret. Please try again.',
        variant: 'destructive',
      });
    },
  });
};
