// supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import dotnev from "dotenv"
dotnev.config();
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
