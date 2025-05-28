import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("ERRO: Credenciais do Supabase (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) não configuradas corretamente no .env ou inválidas!");
  supabase = {
    from: () => ({
      select: async () => ({ error: { message: 'Supabase não configurado' } }),
      insert: async () => ({ error: { message: 'Supabase não configurado' } }),
      update: async () => ({ error: { message: 'Supabase não configurado' } }),
      delete: async () => ({ error: { message: 'Supabase não configurado' } })
    }),
    auth: {
      signUp: async () => ({ error: { message: 'Supabase não configurado' } }),
      signInWithPassword: async () => ({ error: { message: 'Supabase não configurado' } }),
      signOut: async () => ({ error: { message: 'Supabase não configurado' } }),
      getSession: async () => ({ data: { session: null }, error: { message: 'Supabase não configurado' } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    storage: {},
    functions: {}
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

