import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';
import { getAllAssessments } from '../services/supabaseService';
import { deleteAssessment } from '../services/supabaseService';
import { downloadPDF } from '../services/pdfService';
import { Eye, Download, Calendar, User, Building, FileText, ArrowLeft, Database, FileSpreadsheet, Trash2, AlertTriangle } from 'lucide-react';
import { ConfirmationModal } from './ConfirmationModal';

interface Assessment {
  id: string;
  created_at: string;
  completed_at: string | null;
  status: string;
  user_data: any;
  ai_analysis: any;
  complete_report_pdf: string | null;
}

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    assessment: Assessment | null;
  }>({ isOpen: false, assessment: null });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      setLoading(true);
      const data = await getAllAssessments();
      setAssessments(data);
    } catch (err) {
      setError('Error al cargar los assessments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setShowDetails(true);
  };

  const handleDownloadReport = (assessment: Assessment) => {
    if (assessment.complete_report_pdf) {
      const filename = `Reporte_${assessment.user_data?.name?.replace(/\s+/g, '_') || 'Usuario'}_${assessment.id.slice(0, 8)}.pdf`;
      downloadPDF(assessment.complete_report_pdf, filename);
    }
  };

  const handleViewFullReport = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setShowFullReport(true);
  };

  const handleDeleteClick = (assessment: Assessment) => {
    setDeleteConfirmation({ isOpen: true, assessment });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmation.assessment) return;

    setIsDeleting(true);
    try {
      await deleteAssessment(deleteConfirmation.assessment.id);
      await loadAssessments(); // Reload the list
      setDeleteConfirmation({ isOpen: false, assessment: null });
    } catch (err) {
      setError('Error al eliminar el assessment');
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ isOpen: false, assessment: null });
  };

  const handleExportCSV = () => {
    const csvData = generateCSVData(assessments);
    downloadCSV(csvData, `assessments_export_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const generateCSVData = (assessments: Assessment[]) => {
    const headers = [
      'ID',
      'Nombre',
      'Email',
      'Teléfono',
      'Empresa',
      'Cargo',
      'Departamento',
      'Estado',
      'Fecha Creación',
      'Fecha Completado',
      'Fortalezas',
      'Oportunidades',
      'Logros',
      'Metas',
      'Respuestas Situacionales',
      'Respuestas Hogan',
      'Respuestas DISC',
      'Respuestas Cognitivas',
      'Respuestas Éticas',
      'Resumen Ejecutivo IA',
      'Perfil Liderazgo IA',
      'Evaluación Cognitiva IA',
      'Insights Personalidad IA',
      'Marco Ético IA'
    ];

    const rows = assessments.map(assessment => [
      assessment.id,
      assessment.user_data?.name || '',
      assessment.user_data?.email || '',
      assessment.user_data?.phone || '',
      assessment.user_data?.company || '',
      assessment.user_data?.position || '',
      assessment.user_data?.department || '',
      assessment.status,
      assessment.created_at,
      assessment.completed_at || '',
      assessment.user_data?.strengths || '',
      assessment.user_data?.opportunities || '',
      assessment.user_data?.achievements || '',
      assessment.user_data?.goals || '',
      JSON.stringify(assessment.situational_answers || {}),
      JSON.stringify(assessment.hogan_answers || {}),
      JSON.stringify(assessment.disc_answers || {}),
      JSON.stringify(assessment.cognitive_answers || {}),
      JSON.stringify(assessment.ethical_answers || {}),
      assessment.ai_analysis?.executiveSummary || '',
      assessment.ai_analysis?.leadershipProfile || '',
      assessment.ai_analysis?.cognitiveAssessment || '',
      assessment.ai_analysis?.personalityInsights || '',
      assessment.ai_analysis?.ethicalFramework || ''
    ]);

    return [headers, ...rows];
  };

  const downloadCSV = (data: string[][], filename: string) => {
    const csvContent = data.map(row => 
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { color: 'bg-green-100 text-green-800', text: 'Completado' },
      in_progress: { color: 'bg-yellow-100 text-yellow-800', text: 'En Progreso' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.in_progress;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando assessments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button onClick={onClose} variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Panel de Administración</h1>
                <p className="text-slate-600">Gestión de Assessments</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleExportCSV}
                variant="outline"
                size="sm"
                disabled={assessments.length === 0}
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
              <div className="text-sm text-slate-500">
                Total: {assessments.length} assessments
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Lista de Assessments</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Participante
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Empresa/Cargo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Fecha Creación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Fecha Completado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {assessments.map((assessment) => (
                  <tr key={assessment.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-slate-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {assessment.user_data?.name || 'Sin nombre'}
                          </div>
                          <div className="text-sm text-slate-500">
                            {assessment.user_data?.email || 'Sin email'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 text-slate-400 mr-2" />
                        <div>
                          <div className="text-sm text-slate-900">
                            {assessment.user_data?.company || 'Sin empresa'}
                          </div>
                          <div className="text-sm text-slate-500">
                            {assessment.user_data?.position || 'Sin cargo'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(assessment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(assessment.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {assessment.completed_at ? (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(assessment.completed_at)}
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleViewDetails(assessment)}
                        variant="ghost"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      {assessment.ai_analysis && (
                        <Button
                          onClick={() => handleViewFullReport(assessment)}
                          variant="ghost"
                          size="sm"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Reporte
                        </Button>
                      )}
                      {assessment.complete_report_pdf && (
                        <Button
                          onClick={() => handleDownloadReport(assessment)}
                          variant="ghost"
                          size="sm"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDeleteClick(assessment)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Eliminar
                      </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {assessments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500">No hay assessments disponibles</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalles */}
      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title="Detalles del Assessment"
        size="xl"
      >
        {selectedAssessment && (
          <div className="space-y-6">
            {/* Información personal */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Información Personal</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-slate-700">Nombre:</span>
                  <p className="text-slate-600">{selectedAssessment.user_data?.name || 'N/A'}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-700">Email:</span>
                  <p className="text-slate-600">{selectedAssessment.user_data?.email || 'N/A'}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-700">Teléfono:</span>
                  <p className="text-slate-600">{selectedAssessment.user_data?.phone || 'N/A'}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-700">Empresa:</span>
                  <p className="text-slate-600">{selectedAssessment.user_data?.company || 'N/A'}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-700">Cargo:</span>
                  <p className="text-slate-600">{selectedAssessment.user_data?.position || 'N/A'}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-700">Departamento:</span>
                  <p className="text-slate-600">{selectedAssessment.user_data?.department || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Análisis de IA */}
            {selectedAssessment.ai_analysis && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Resumen del Análisis</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-700">
                    {selectedAssessment.ai_analysis.executiveSummary || 'Análisis no disponible'}
                  </p>
                </div>
              </div>
            )}

            {/* Acciones */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                onClick={() => setShowDetails(false)}
                variant="secondary"
              >
                Cerrar
              </Button>
              {selectedAssessment.complete_report_pdf && (
                <Button
                  onClick={() => handleDownloadReport(selectedAssessment)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Reporte
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de reporte completo */}
      <Modal
        isOpen={showFullReport}
        onClose={() => setShowFullReport(false)}
        title="Reporte Completo de Assessment"
        size="xl"
      >
        {selectedAssessment && selectedAssessment.ai_analysis && (
          <div className="space-y-6 max-h-96 overflow-y-auto">
            {/* Información del participante */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Participante</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Nombre:</strong> {selectedAssessment.user_data?.name}</div>
                <div><strong>Email:</strong> {selectedAssessment.user_data?.email}</div>
                <div><strong>Empresa:</strong> {selectedAssessment.user_data?.company}</div>
                <div><strong>Cargo:</strong> {selectedAssessment.user_data?.position}</div>
              </div>
            </div>

            {/* Resumen Ejecutivo */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Resumen Ejecutivo</h3>
              <p className="text-slate-700 bg-blue-50 p-4 rounded-lg">
                {selectedAssessment.ai_analysis.executiveSummary}
              </p>
            </div>

            {/* Perfil de Liderazgo */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Perfil de Liderazgo</h3>
              <p className="text-slate-700 bg-green-50 p-4 rounded-lg">
                {selectedAssessment.ai_analysis.leadershipProfile}
              </p>
            </div>

            {/* Evaluación Cognitiva */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Evaluación Cognitiva</h3>
              <p className="text-slate-700 bg-purple-50 p-4 rounded-lg">
                {selectedAssessment.ai_analysis.cognitiveAssessment}
              </p>
            </div>

            {/* Insights de Personalidad */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Insights de Personalidad</h3>
              <p className="text-slate-700 bg-yellow-50 p-4 rounded-lg">
                {selectedAssessment.ai_analysis.personalityInsights}
              </p>
            </div>

            {/* Marco Ético */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Marco Ético</h3>
              <p className="text-slate-700 bg-red-50 p-4 rounded-lg">
                {selectedAssessment.ai_analysis.ethicalFramework}
              </p>
            </div>

            {/* Fortalezas */}
            {selectedAssessment.ai_analysis.strengths && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Fortalezas Clave</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700 bg-green-50 p-4 rounded-lg">
                  {selectedAssessment.ai_analysis.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Áreas de Crecimiento */}
            {selectedAssessment.ai_analysis.areasForGrowth && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Áreas de Crecimiento</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700 bg-orange-50 p-4 rounded-lg">
                  {selectedAssessment.ai_analysis.areasForGrowth.map((area, index) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recomendaciones de Desarrollo */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Recomendaciones de Desarrollo</h3>
              <p className="text-slate-700 bg-indigo-50 p-4 rounded-lg">
                {selectedAssessment.ai_analysis.developmentRecommendations}
              </p>
            </div>

            {/* Sugerencias de Carrera */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Sugerencias de Carrera</h3>
              <p className="text-slate-700 bg-teal-50 p-4 rounded-lg">
                {selectedAssessment.ai_analysis.careerSuggestions}
              </p>
            </div>

            {/* Acciones */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                onClick={() => setShowFullReport(false)}
                variant="secondary"
              >
                Cerrar
              </Button>
              {selectedAssessment.complete_report_pdf && (
                <Button
                  onClick={() => handleDownloadReport(selectedAssessment)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Assessment"
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
        isLoading={isDeleting}
      >
        <div className="space-y-3">
          <div className="flex items-center text-red-600">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span className="font-medium">Esta acción no se puede deshacer</span>
          </div>
          
          {deleteConfirmation.assessment && (
            <div className="bg-slate-50 p-3 rounded-md">
              <p className="text-sm text-slate-700">
                <strong>Participante:</strong> {deleteConfirmation.assessment.user_data?.name || 'Sin nombre'}
              </p>
              <p className="text-sm text-slate-700">
                <strong>Email:</strong> {deleteConfirmation.assessment.user_data?.email || 'Sin email'}
              </p>
              <p className="text-sm text-slate-700">
                <strong>Empresa:</strong> {deleteConfirmation.assessment.user_data?.company || 'Sin empresa'}
              </p>
              <p className="text-sm text-slate-700">
                <strong>Estado:</strong> {deleteConfirmation.assessment.status === 'completed' ? 'Completado' : 'En Progreso'}
              </p>
            </div>
          )}
          
          <p className="text-sm text-slate-600">
            Se eliminarán permanentemente todos los datos del assessment, incluyendo respuestas, análisis de IA y reportes generados.
          </p>
        </div>
      </ConfirmationModal>
    </div>
  );
};