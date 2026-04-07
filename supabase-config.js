// ========================================
// SUPABASE CONFIGURATION
// ========================================

const SUPABASE_URL = 'https://joxkoyvqncmbhngynzeq.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpveGtveXZxbmNtYmhuZ3luemVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MTgxOTQsImV4cCI6MjA4ODI5NDE5NH0.aly6Mzu7KbDPl1_oigB25sGkpNLInPc7Bh4IWw6dh2g'; // Replace with your Anon Key

// Initialize Supabase Client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Make it globally accessible
window.supabaseClient = supabaseClient;

console.log('Supabase initialized successfully');
