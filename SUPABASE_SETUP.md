# Supabase Setup Instructions

This document provides instructions for setting up Supabase tables to collect form submissions from the consultation and demo request pages.

## Prerequisites

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Get your project URL and anon key from the Supabase dashboard (Settings > API)

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Database Tables

Run the following SQL in your Supabase SQL Editor to create the required tables:

### Consultations Table

```sql
CREATE TABLE consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_details TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (anonymous users can submit forms)
CREATE POLICY "Allow anonymous inserts" ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read (optional - adjust as needed)
CREATE POLICY "Allow authenticated reads" ON consultations
  FOR SELECT
  TO authenticated
  USING (true);
```

### Demo Requests Table

```sql
CREATE TABLE demo_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  interest_reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (anonymous users can submit forms)
CREATE POLICY "Allow anonymous inserts" ON demo_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read (optional - adjust as needed)
CREATE POLICY "Allow authenticated reads" ON demo_requests
  FOR SELECT
  TO authenticated
  USING (true);
```

## Security Notes

- The tables use Row Level Security (RLS) to control access
- Anonymous users can insert data (submit forms)
- Only authenticated users can read data (you may want to adjust this based on your needs)
- Consider adding additional validation or rate limiting in production

## Testing

After setting up the tables and environment variables:

1. Start your development server: `npm run dev`
2. Navigate to the landing page
3. Click "Free Consultation" or "Schedule Demo"
4. Fill out and submit the forms
5. Check your Supabase dashboard to verify the data was inserted
