
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use the provided hardcoded credentials
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://givglkabwuqhrhbqnnef.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpdmdsa2Fid3VxaHJoYnFubmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMDIxODMsImV4cCI6MjA4MTg3ODE4M30.z_KN9DId54wxjLpzlfbiwU11mcbrFOldHZQm8awfRBw';

let client: SupabaseClient;

// Mock builder to handle chaining for database operations when no URL is present
// (Kept as a safety fallback, though with hardcoded keys this path likely won't be taken unless keys are invalid)
const createMockBuilder = () => {
  return {
    select: () => createMockBuilder(),
    insert: () => createMockBuilder(),
    update: () => createMockBuilder(),
    delete: () => createMockBuilder(),
    eq: () => createMockBuilder(),
    order: () => createMockBuilder(),
    single: () => createMockBuilder(),
    limit: () => createMockBuilder(),
    then: (onfulfilled: any) => Promise.resolve({ data: [], error: null }).then(onfulfilled)
  } as any;
};

if (supabaseUrl && supabaseAnonKey) {
  client = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase credentials missing. Using mock client. Database features will not persist.');
  
  client = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null }),
    },
    from: (table: string) => createMockBuilder(),
  } as unknown as SupabaseClient;
}

export const supabase = client;
