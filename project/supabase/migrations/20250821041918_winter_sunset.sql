/*
  # Create assessments table for leadership assessment application

  1. New Tables
    - `assessments`
      - `id` (uuid, primary key) - Unique identifier for each assessment
      - `created_at` (timestamptz) - When the assessment was created
      - `updated_at` (timestamptz) - When the assessment was last updated
      - `completed_at` (timestamptz) - When the assessment was completed
      - `status` (text) - Current status of the assessment
      - `personal_data` (jsonb) - Personal information data
      - `professional_profile` (jsonb) - Professional profile data
      - `user_data` (jsonb) - User data
      - `leadership_results` (jsonb) - Leadership test results
      - `ethical_results` (jsonb) - Ethical dilemmas results
      - `situational_test` (jsonb) - Situational leadership test data
      - `hogan_style_test` (jsonb) - Hogan style test data
      - `disc_test` (jsonb) - DISC test data
      - `cognitive_test` (jsonb) - Cognitive test data
      - `ethical_dilemmas` (jsonb) - Ethical dilemmas data
      - `situational_report_pdf` (text) - Path to situational report PDF
      - `hogan_report_pdf` (text) - Path to Hogan report PDF
      - `disc_report_pdf` (text) - Path to DISC report PDF
      - `cognitive_report_pdf` (text) - Path to cognitive report PDF
      - `ethical_report_pdf` (text) - Path to ethical report PDF

  2. Security
    - Enable RLS on `assessments` table
    - Add policy for public access (since this is a demo application)
*/

CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  status text DEFAULT 'in_progress',
  personal_data jsonb,
  professional_profile jsonb,
  user_data jsonb,
  leadership_results jsonb,
  ethical_results jsonb,
  situational_test jsonb,
  hogan_style_test jsonb,
  disc_test jsonb,
  cognitive_test jsonb,
  ethical_dilemmas jsonb,
  situational_report_pdf text,
  hogan_report_pdf text,
  disc_report_pdf text,
  cognitive_report_pdf text,
  ethical_report_pdf text
);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Allow public access for demo purposes
CREATE POLICY "Allow public access to assessments"
  ON assessments
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);