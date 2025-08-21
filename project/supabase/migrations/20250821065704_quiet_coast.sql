/*
  # Configuración inicial de la base de datos para Assessment

  1. Nueva tabla: assessments
    - Almacena todos los datos de evaluaciones
    - Incluye datos personales, respuestas y análisis de IA
    - Configurada con RLS para seguridad

  2. Seguridad
    - Row Level Security habilitado
    - Políticas para acceso público (necesario para la app)
*/

-- Crear tabla de assessments
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  status text DEFAULT 'in_progress',
  
  -- Datos del usuario
  user_data jsonb,
  
  -- Respuestas de las evaluaciones
  situational_answers jsonb,
  hogan_answers jsonb,
  disc_answers jsonb,
  cognitive_answers jsonb,
  ethical_answers jsonb,
  
  -- Análisis de IA
  ai_analysis jsonb,
  
  -- Reportes PDF
  complete_report_pdf text
);

-- Habilitar Row Level Security
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Crear política para acceso público (necesario para que funcione la app)
CREATE POLICY "Allow public access to assessments"
  ON assessments
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Crear índices para mejor performance
CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON assessments(created_at);
CREATE INDEX IF NOT EXISTS idx_assessments_status ON assessments(status);
CREATE INDEX IF NOT EXISTS idx_assessments_completed_at ON assessments(completed_at);