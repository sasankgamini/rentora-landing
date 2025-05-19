import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { email, password, name, role } = req.body;
  if (!email || !password || !name || !role) {
    res.status(400).json({ error: 'All fields required' });
    return;
  }

  // Check if user already exists
  const { data: existing, error: existingError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    res.status(409).json({ error: 'Email already registered' });
    return;
  }
  // If error is not "no rows", fail
  if (existingError && existingError.code !== 'PGRST116') {
    res.status(500).json({ error: 'Database error: ' + existingError.message });
    return;
  }

  // Hash password
  let password_hash = '';
  try {
    password_hash = await bcrypt.hash(password, 10);
  } catch (err) {
    res.status(500).json({ error: 'Password hashing failed' });
    return;
  }

  // Insert user
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password_hash, name, role }])
    .select('id, email, name, role')
    .single();

  if (error) {
    res.status(500).json({ error: 'Failed to create user: ' + error.message });
    return;
  }

  res.status(201).json({ user: data });
}
