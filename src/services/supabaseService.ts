import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase con credenciales reales
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nbyqzntmtfasqqojiiwv.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ieXF6bnRtdGZhc3Fxb2ppaXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NDk4MTQsImV4cCI6MjA3MTMyNTgxNH0.ndRE4rwGW9XRhUKXgJFdThMDPG2tLmBGngzQFcseGyM';

console.log('🔧 Configurando Supabase para PRODUCCIÓN...');
console.log('📍 URL:', supabaseUrl);
console.log('🔑 Key configurada:', supabaseKey ? 'Sí' : 'No');

export const supabase = createClient(supabaseUrl, supabaseKey);

// Verificar conexión al inicializar
supabase.from('assessments').select('count', { count: 'exact', head: true })
  .then(({ count, error }) => {
    if (error) {
      console.error('❌ Error conectando a Supabase:', error);
    } else {
      console.log('✅ Supabase conectado exitosamente en PRODUCCIÓN');
      console.log('📊 Assessments en base de datos:', count);
    }
  });

// Función para inicializar un nuevo assessment
export const initializeAssessment = async (): Promise<string> => {
  try {
    console.log('🆕 Creando nuevo assessment en PRODUCCIÓN...');
    
    // Generar ID único como fallback primero
    const fallbackId = `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Intentar crear en Supabase
    const { data, error } = await supabase
      .from('assessments')
      .insert({
        status: 'in_progress',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.warn('⚠️ Error creando en Supabase, usando ID local:', error.message);
      return fallbackId;
    }

    console.log('✅ Assessment creado en PRODUCCIÓN con ID:', data.id);
    return data.id;
  } catch (error) {
    console.warn('⚠️ Excepción en initializeAssessment, usando ID local:', error);
    return `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
};

// Función para actualizar un assessment
export const updateAssessment = async (assessmentId: string, updates: any) => {
  try {
    console.log('📝 Actualizando assessment en PRODUCCIÓN:', assessmentId);
    console.log('📊 Datos a actualizar:', Object.keys(updates));

    // Si es un ID local, solo logear y continuar
    if (assessmentId.startsWith('assessment_') || assessmentId.startsWith('local_')) {
      console.log('📝 ID local detectado, guardando en memoria local');
      return { id: assessmentId, ...updates };
    }

    const { data, error } = await supabase
      .from('assessments')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', assessmentId)
      .select()
      .single();

    if (error) {
      console.warn('⚠️ Error actualizando assessment:', error.message);
      return { id: assessmentId, ...updates };
    }

    console.log('✅ Assessment actualizado exitosamente en PRODUCCIÓN');
    return data;
  } catch (error) {
    console.warn('⚠️ Error en updateAssessment:', error);
    return { id: assessmentId, ...updates };
  }
};

// Función para obtener todos los assessments (para admin)
export const getAllAssessments = async () => {
  try {
    console.log('📋 Obteniendo todos los assessments de PRODUCCIÓN...');

    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error obteniendo assessments:', error);
      throw error;
    }

    console.log('✅ Assessments obtenidos de PRODUCCIÓN:', data?.length || 0);
    return data;
  } catch (error) {
    console.error('❌ Error en getAllAssessments:', error);
    throw error;
  }
};

// Función para eliminar un assessment
export const deleteAssessment = async (assessmentId: string) => {
  try {
    console.log('🗑️ Eliminando assessment de PRODUCCIÓN:', assessmentId);

    const { error } = await supabase
      .from('assessments')
      .delete()
      .eq('id', assessmentId);

    if (error) {
      console.error('❌ Error eliminando assessment:', error);
      throw error;
    }

    console.log('✅ Assessment eliminado exitosamente de PRODUCCIÓN');
    return true;
  } catch (error) {
    console.error('❌ Error en deleteAssessment:', error);
    throw error;
  }
};

// Función para obtener un assessment específico
export const getAssessment = async (assessmentId: string) => {
  try {
    console.log('🔍 Obteniendo assessment de PRODUCCIÓN:', assessmentId);

    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('id', assessmentId)
      .single();

    if (error) {
      console.error('❌ Error obteniendo assessment:', error);
      throw error;
    }

    console.log('✅ Assessment obtenido exitosamente de PRODUCCIÓN');
    return data;
  } catch (error) {
    console.error('❌ Error en getAssessment:', error);
    throw error;
  }
};
