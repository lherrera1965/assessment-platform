/*
  # Actualización del esquema de assessments para almacenar todas las respuestas

  1. Nuevas columnas
    - Se añaden columnas para almacenar todas las respuestas de cada sección
    - Se mantiene la estructura existente para compatibilidad
    
  2. Seguridad
    - Se mantiene RLS habilitado
    - Se actualizan las políticas para permitir acceso público
*/

-- Añadir nuevas columnas si no existen
DO $$
BEGIN
  -- Verificar y añadir columnas para respuestas detalladas
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'assessments' AND column_name = 'situational_answers'
  ) THEN
    ALTER TABLE assessments ADD COLUMN situational_answers jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'assessments' AND column_name = 'hogan_answers'
  ) THEN
    ALTER TABLE assessments ADD COLUMN hogan_answers jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'assessments' AND column_name = 'disc_answers'
  ) THEN
    ALTER TABLE assessments ADD COLUMN disc_answers jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'assessments' AND column_name = 'cognitive_answers'
  ) THEN
    ALTER TABLE assessments ADD COLUMN cognitive_answers jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'assessments' AND column_name = 'ethical_answers'
  ) THEN
    ALTER TABLE assessments ADD COLUMN ethical_answers jsonb;
  END IF;

  -- Añadir columna para análisis de IA
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'assessments' AND column_name = 'ai_analysis'
  ) THEN
    ALTER TABLE assessments ADD COLUMN ai_analysis jsonb;
  END IF;

  -- Añadir columna para PDF completo
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'assessments' AND column_name = 'complete_report_pdf'
  ) THEN
    ALTER TABLE assessments ADD COLUMN complete_report_pdf text;
  END IF;
END $$;