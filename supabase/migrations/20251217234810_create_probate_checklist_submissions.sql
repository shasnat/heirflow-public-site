-- Create table for probate checklist submissions
CREATE TABLE IF NOT EXISTS probate_checklist_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  firm_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create an index on email for faster lookups if needed
CREATE INDEX IF NOT EXISTS idx_probate_checklist_submissions_email ON probate_checklist_submissions(email);

-- Create an index on created_at for sorting/filtering
CREATE INDEX IF NOT EXISTS idx_probate_checklist_submissions_created_at ON probate_checklist_submissions(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE probate_checklist_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow inserts (for form submissions)
-- Adjust this policy based on your authentication requirements
CREATE POLICY "Allow public inserts for probate checklist submissions"
  ON probate_checklist_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Optional: Create a policy to allow authenticated users to read submissions
-- Uncomment if you want authenticated users to view submissions
-- CREATE POLICY "Allow authenticated users to read probate checklist submissions"
--   ON probate_checklist_submissions
--   FOR SELECT
--   TO authenticated
--   USING (true);

