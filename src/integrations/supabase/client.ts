// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jjdthicfmbkmjfkahhzm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZHRoaWNmbWJrbWpma2FoaHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MzIxNDQsImV4cCI6MjA1OTEwODE0NH0.JtW2sCuxirLUryw9wyphlJU2VnP2I6Bj-CL1PIAhZqU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);