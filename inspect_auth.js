import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8');
const urlMatch = env.match(/VITE_SUPABASE_URL=(.*)/);
const keyMatch = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/);

const supabaseUrl = urlMatch ? urlMatch[1].trim() : '';
const supabaseKey = keyMatch ? keyMatch[1].trim() : '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Attempting sign in with phone...");
  const phoneEmail = '07052958037@phone.local';
  const { data, error } = await supabase.auth.signInWithPassword({
    email: phoneEmail,
    password: 'Ijumae123#'
  });

  if (error) {
    console.error("Sign in failed:", error);
    return;
  }

  console.log("Sign in successful!");
  console.log("Session User ID:", data.session.user.id);
  console.log("Session Email:", data.session.user.email);

  // Now let's try querying admin_roles using this session client!
  const sessionSupabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });
  
  // Set the session
  await sessionSupabase.auth.setSession(data.session);

  console.log("Querying admin_roles for logged-in user...");
  const { data: roleRow, error: roleError } = await sessionSupabase
    .from('admin_roles')
    .select('*')
    .eq('user_id', data.session.user.id)
    .maybeSingle();

  console.log("Result of admin_roles query:", { roleRow, roleError });
}

main().catch(console.error);
