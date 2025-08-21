/*
  # Configuración inicial de la base de datos para Assessment Platform

  1. Nueva tabla: assessments
     - Almacena todos los datos de evaluaciones
     - Incluye datos personales, respuestas y análisis de IA
     - Campos para PDFs generados

  2. Seguridad
     - Habilita RLS (Row Level Security)
     - Permite acceso público para la demo
*/

-- Crear tabla de assessments
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  status text DEFAULT 'in_progress',
  
  -- Datos del usuario
  personal_data jsonb,
  professional_profile jsonb,
  user_data jsonb,
  
  -- Resultados de evaluaciones
  leadership_results jsonb,
  ethical_results jsonb,
  situational_test jsonb,
  hogan_style_test jsonb,
  disc_test jsonb,
  cognitive_test jsonb,
  ethical_dilemmas jsonb,
  
  -- Respuestas individuales
  situational_answers jsonb,
  hogan_answers jsonb,
  disc_answers jsonb,
  cognitive_answers jsonb,
  ethical_answers jsonb,
  
  -- Análisis de IA
  ai_analysis jsonb,
  
  -- PDFs generados
  situational_report_pdf text,
  hogan_report_pdf text,
  disc_report_pdf text,
  cognitive_report_pdf text,
  ethical_report_pdf text,
  complete_report_pdf text
);

-- Habilitar Row Level Security
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir acceso público (para demo)
CREATE POLICY "Allow public access to assessments"
  ON assessments
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON assessments(created_at);
CREATE INDEX IF NOT EXISTS idx_assessments_status ON assessments(status);
CREATE INDEX IF NOT EXISTS idx_assessments_completed_at ON assessments(completed_at);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_assessments_updated_at ON assessments;
CREATE TRIGGER update_assessments_updated_at
    BEFORE UPDATE ON assessments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();