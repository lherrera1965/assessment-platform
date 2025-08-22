/*
  # Add missing columns to assessments table

  1. New Columns
    - `csv_data` (jsonb) - Stores structured CSV row data for analysis
    - `detailed_report` (jsonb) - Stores detailed report structure

  2. Purpose
    - Support new master analysis system
    - Enable CSV export functionality
    - Store structured report data
*/

-- Add missing columns to assessments table
DO $$
BEGIN
  -- Add csv_data column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'assessments' AND column_name = 'csv_data'
  ) THEN
    ALTER TABLE assessments ADD COLUMN csv_data jsonb;
  END IF;

  -- Add detailed_report column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'assessments' AND column_name = 'detailed_report'
  ) THEN
    ALTER TABLE assessments ADD COLUMN detailed_report jsonb;
  END IF;
END $$;