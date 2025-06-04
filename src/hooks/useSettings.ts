
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type AppSettings = {
  id?: string;
  user_id?: string;
  scrape_frequency: string;
  email_notifications: boolean;
  slack_notifications: boolean;
  violation_threshold: number;
  max_retries: number;
  request_delay: number;
  enable_proxy: boolean;
  user_agent: string;
  alert_email: string;
  slack_webhook: string;
  database_url: string;
  created_at?: string;
  updated_at?: string;
};

export const useSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('app_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      // Return default settings if no settings exist yet
      if (!data) {
        return {
          scrape_frequency: '6',
          email_notifications: true,
          slack_notifications: false,
          violation_threshold: 90,
          max_retries: 3,
          request_delay: 2,
          enable_proxy: true,
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          alert_email: '',
          slack_webhook: '',
          database_url: 'postgresql://localhost:5432/map_monitor'
        } as AppSettings;
      }

      return data as AppSettings;
    },
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (settings: Partial<AppSettings>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Check if settings already exist
      const { data: existingSettings } = await supabase
        .from('app_settings')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      const settingsWithUserId = {
        ...settings,
        user_id: user.id
      };

      if (existingSettings) {
        // Update existing settings
        const { data, error } = await supabase
          .from('app_settings')
          .update(settingsWithUserId)
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Insert new settings
        const { data, error } = await supabase
          .from('app_settings')
          .insert(settingsWithUserId)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast({
        title: 'Settings saved',
        description: 'Your settings have been successfully updated.',
      });
    },
    onError: (error) => {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    },
  });
};
