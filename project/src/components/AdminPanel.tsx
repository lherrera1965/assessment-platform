import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';
import { ConfirmationModal } from './ConfirmationModal';
import { supabase } from '../services/supabaseService';
import { downloadPDF } from '../services/pdfService';
import { Download, Eye, Trash2, Users, FileText, Calendar, AlertTriangle, CheckCircle, Clock, BarChart3 } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

interface Assessment {
  id: string;
  created_at: string;
  completed_at: string | null;
  status: string;
  user_data: any;
  personal_data: any;
  professional_profile: any;
  situational_answers: any;
  hogan_answers: any;
  disc_answers: any;
  cognitive_answers: any;
  ethical_answers: any;
  complete_report_pdf: string | null;
  ai_analysis: any;
  detailed_report: any;
  csv_data: any;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [assessmentToDelete, setAssessmentToDelete] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    thisWeek: 0
  });

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    setLoading(true);
    try {
      if (!supabase) {
        // Mock data para desarrollo
        const mockAssessments: Assessment[] = [
          {
            id: 'mock-1',
            created_at: new Date().toISOString(),
            completed_at: new Date().toISOString(),
            status: 'completed',
            user_data: { name: 'Usuario Demo', email: 'demo@test.com', position: 'Gerente', company: 'Empresa Demo' },
            personal_data: null,
            professional_profile: null,
            situational_answers: {},
            hogan_answers: {},
            disc_answers: {},
            cognitive_answers: {},
            ethical_answers: {},
            complete_report_pdf: null,
            ai_analysis: null,
            detailed_report: null,
            csv_data: null
          }
        ];
        setAssessments(mockAssessments);
        setStats({
          total: 1,
          completed: 1,
          inProgress: 0,
          thisWeek: 1
        });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading assessments:', error);
        setAssessments([]);
      } else {
        setAssessments(data || []);
        
        // Calcular estadísticas
        const total = data?.length || 0;
        const completed = data?.filter(a => a.status === 'completed').length || 0;
        const inProgress = data?.filter(a => a.status === 'in_progress').length || 0;
        
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const thisWeek = data?.filter(a => new Date(a.created_at) >= oneWeekAgo).length || 0;
        
        setStats({ total, completed, inProgress, thisWeek });
      }
    } catch (error) {
      console.error('Error loading assessments:', error);
      setAssessments([]);
    }
    setLoading(false);
  };

  const handleDownloadPDF = async (assessment: Assessment) => {
    try {
      if (assessment.complete_report_pdf) {
        const userData = assessment.user_data || assessment.personal_data || {};
        const filename = `Reporte_${userData.name?.replace(/\s+/g, '_') || 'Assessment'}_${assessment.id.slice(0, 8)}.pdf`;
        downloadPDF(assessment.complete_report_pdf, filename);
      } else {
        alert('El reporte PDF no está disponible para esta evaluación.');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error al descargar el PDF. Por favor, intente de nuevo.');
    }
  };

  const handleViewDetails = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setShowDetails(true);
  };

  const handleDeleteAssessment = async () => {
    if (!assessmentToDelete || !supabase) return;

    try {
      const { error } = await supabase
        .from('assessments')
        .delete()
        .eq('id', assessmentToDelete);

      if (error) {
        console.error('Error deleting assessment:', error);
        alert('Error al eliminar la evaluación.');
      } else {
        await loadAssessments();
        setShowDeleteConfirm(false);
        setAssessmentToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting assessment:', error);
      alert('Error al eliminar la evaluación.');
    }
  };

  const exportToCSV = () => {
    const csvData = assessments.map(assessment => {
      const userData = assessment.user_data || assessment.personal_data || {};
      return {
        ID: assessment.id,
        Fecha: new Date(assessment.created_at).toLocaleDateString('es-ES'),
        Nombre: userData.name || 'N/A',
        Email: userData.email || 'N/A',
        Empresa: userData.company || 'N/A',
        Cargo: userData.position || 'N/A',
        Estado: assessment.status === 'completed' ? 'Completado' : 'En Progreso',
        'Fecha Completado': assessment.completed_at ? new Date(assessment.completed_at).toLocaleDateString('es-ES') : 'N/A'
      };
    });

    const headers = Object.keys(csvData[0] || {});
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header as keyof typeof row] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `assessments_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in_progress':
        return 'En Progreso';
      default:
        return 'Desconocido';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Panel de Administración</h1>
              <p className="text-slate-600">Gestión de evaluaciones y reportes</p>
            </div>
            <Button onClick={onClose} variant="secondary">
              Cerrar Panel
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Evaluaciones</p>
                <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Completadas</p>
                <p className="text-2xl font-bold text-slate-900">{stats.completed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">En Progreso</p>
                <p className="text-2xl font-bold text-slate-900">{stats.inProgress}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Esta Semana</p>
                <p className="text-2xl font-bold text-slate-900">{stats.thisWeek}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Acciones Rápidas</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button onClick={exportToCSV} className="flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
              <Button onClick={loadAssessments} variant="secondary" className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Actualizar Lista
              </Button>
            </div>
          </div>
        </div>

        {/* Lista de Evaluaciones */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Evaluaciones Registradas</h2>
          </div>
          
          {assessments.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No hay evaluaciones</h3>
              <p className="text-slate-600">
                {!supabase ? 'Conecte Supabase para ver evaluaciones reales.' : 'Las evaluaciones aparecerán aquí cuando se completen.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Evaluado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Empresa/Cargo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {assessments.map((assessment) => {
                    const userData = assessment.user_data || assessment.personal_data || {};
                    return (
                      <tr key={assessment.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-slate-900">
                              {userData.name || 'Sin nombre'}
                            </div>
                            <div className="text-sm text-slate-500">
                              {userData.email || 'Sin email'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{userData.company || 'N/A'}</div>
                          <div className="text-sm text-slate-500">{userData.position || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {new Date(assessment.created_at).toLocaleDateString('es-ES')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(assessment.status)}
                            <span className="ml-2 text-sm text-slate-900">
                              {getStatusText(assessment.status)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewDetails(assessment)}
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Ver
                            </button>
                            {assessment.complete_report_pdf && (
                              <button
                                onClick={() => handleDownloadPDF(assessment)}
                                className="text-green-600 hover:text-green-900 flex items-center"
                              >
                                <Download className="w-4 h-4 mr-1" />
                                PDF
                              </button>
                            )}
                            {supabase && (
                              <button
                                onClick={() => {
                                  setAssessmentToDelete(assessment.id);
                                  setShowDeleteConfirm(true);
                                }}
                                className="text-red-600 hover:text-red-900 flex items-center"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Eliminar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalles */}
      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title="Detalles de la Evaluación"
        size="xl"
      >
        {selectedAssessment && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-slate-500">ID de Evaluación</h3>
                <p className="mt-1 text-sm text-slate-900">{selectedAssessment.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500">Estado</h3>
                <div className="mt-1 flex items-center">
                  {getStatusIcon(selectedAssessment.status)}
                  <span className="ml-2 text-sm text-slate-900">
                    {getStatusText(selectedAssessment.status)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-2">Información del Evaluado</h3>
              <div className="bg-slate-50 rounded-lg p-4">
                <pre className="text-sm text-slate-700 whitespace-pre-wrap">
                  {JSON.stringify(selectedAssessment.user_data || selectedAssessment.personal_data || {}, null, 2)}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-2">Módulos Completados</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  {selectedAssessment.situational_answers ? (
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                  )}
                  <span className="text-sm">Liderazgo Situacional</span>
                </div>
                <div className="flex items-center">
                  {selectedAssessment.hogan_answers ? (
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                  )}
                  <span className="text-sm">Perfil Hogan</span>
                </div>
                <div className="flex items-center">
                  {selectedAssessment.disc_answers ? (
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                  )}
                  <span className="text-sm">Perfil DISC</span>
                </div>
                <div className="flex items-center">
                  {selectedAssessment.cognitive_answers ? (
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                  )}
                  <span className="text-sm">Evaluación Cognitiva</span>
                </div>
                <div className="flex items-center">
                  {selectedAssessment.ethical_answers ? (
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                  )}
                  <span className="text-sm">Dilemas Éticos</span>
                </div>
                <div className="flex items-center">
                  {selectedAssessment.complete_report_pdf ? (
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                  )}
                  <span className="text-sm">Reporte PDF</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button onClick={() => setShowDetails(false)} variant="secondary">
                Cerrar
              </Button>
              {selectedAssessment.complete_report_pdf && (
                <Button onClick={() => handleDownloadPDF(selectedAssessment)}>
                  Descargar PDF
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAssessment}
        title="Confirmar Eliminación"
        message="¿Está seguro de que desea eliminar esta evaluación? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};

export default AdminPanel;