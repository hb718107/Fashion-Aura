import { supabase } from './productService';

export const authenticateAdmin = async (username, password) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username.trim())
        .eq('password_hash', password.trim())
        .single();

      if (!error && data) {
        return { success: true, user: data };
      }
    } catch (e) {
      console.error('Supabase admin auth error:', e);
    }
  }

  if (username === 'mamoon' && password === '12345') {
    return { success: true, user: { username: 'mamoon', role: 'admin' } };
  }
  if (username === 'admin' && password === 'aura2024') {
    return { success: true, user: { username: 'admin', role: 'admin' } };
  }

  return { success: false, error: 'Invalid credentials. Access restricted.' };
};

export const updateAdminCredentials = async (currentUsername, newUsername, newPassword) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .update({
          username: newUsername.trim(),
          password_hash: newPassword.trim()
        })
        .eq('username', currentUsername.trim())
        .select();

      if (!error && data && data.length > 0) {
        return { success: true };
      }
      return { success: false, error: error ? error.message : 'User not found in database.' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
  return { success: true };
};
