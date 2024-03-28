import { createClient } from '@supabase/supabase-js';

// Esta implementación de las funcionalidades de supabase no es oficial
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

export const supabase = createClient(supabaseUrl as string, supabaseKey as string)
export default supabase