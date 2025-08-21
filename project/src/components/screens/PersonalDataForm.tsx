import React, { useState } from 'react';
import { UserData, EducationEntry, WorkExperienceEntry } from '../../types';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { ConfirmationModal } from '../ConfirmationModal';

interface PersonalDataFormProps {
  data: UserData;
  setData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
}

const baseInputStyles = "block w-full px-4 py-2 text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition";

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input id={id} className={baseInputStyles} {...props} />
    </div>
);

const SelectField: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, children: React.ReactNode }> = ({ label, id, children, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <select id={id} className={baseInputStyles} {...props}>
            {children}
        </select>
    </div>
);

const TextareaField: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <textarea id={id} className={baseInputStyles} {...props} />
    </div>
);

const PersonalDataForm: React.FC<PersonalDataFormProps> = ({ data, setData, onNext }) => {
  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  // State for modal management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [modalType, setModalType] = useState<'educationHistory' | 'workExperience' | null>(null);
  const [currentEntry, setCurrentEntry] = useState<Partial<EducationEntry & WorkExperienceEntry> | null>(null);

  // Date options for dropdowns
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 70 }, (_, i) => (currentYear - i).toString());
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof UserData]) {
      setErrors(prev => ({...prev, [name]: undefined}));
    }
  };

  const handleAddHistory = (type: 'educationHistory' | 'workExperience') => {
    setModalMode('add');
    setModalType(type);
    setCurrentEntry(type === 'educationHistory'
        ? { id: `edu_${Date.now()}`, institution: '', degree: '', startYear: '', endYear: '' }
        : { id: `work_${Date.now()}`, company: '', position: '', startDate: '', endDate: '', responsibilities: '' }
    );
    setIsModalOpen(true);
  };

  const handleEditHistory = (entry: EducationEntry | WorkExperienceEntry, type: 'educationHistory' | 'workExperience') => {
      setModalMode('edit');
      setModalType(type);
      setCurrentEntry(entry);
      setIsModalOpen(true);
  };

  const handleSaveHistory = () => {
    if (!currentEntry || !modalType) return;

    if (modalMode === 'add') {
        setData(prev => ({
            ...prev,
            [modalType]: [...prev[modalType], currentEntry]
        }));
    } else { // 'edit' mode
        setData(prev => ({
            ...prev,
            [modalType]: prev[modalType].map(item => item.id === currentEntry.id ? currentEntry : item)
        }));
    }
    handleCloseModal();
  };
  
  const handleCloseModal = () => {
      setIsModalOpen(false);
      setModalType(null);
      setCurrentEntry(null);
  };

  const handleModalInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setCurrentEntry(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleWorkDateChange = (field: 'startDate' | 'endDate', part: 'month' | 'year', value: string) => {
    if (!currentEntry) return;

    const currentDateStr = currentEntry[field] as string || '';
    let [currentMonth, currentYear] = currentDateStr.split(' ');

    if (part === 'month') {
        currentMonth = value;
    } else {
        currentYear = value;
    }
    
    const newDate = `${currentMonth || ''} ${currentYear || ''}`.trim();

    setCurrentEntry(prev => prev ? { ...prev, [field]: newDate } : null);
  };

  const handleCurrentWorkToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCurrentEntry(prev => {
        if (!prev) return null;
        return { ...prev, endDate: isChecked ? 'Actualidad' : '' };
    });
  };

  const removeHistoryEntry = (id: string, type: 'educationHistory' | 'workExperience') => {
    if (window.confirm('¿Está seguro de que desea eliminar este elemento?')) {
        setData(prev => ({
            ...prev,
            [type]: prev[type].filter(entry => entry.id !== id)
        }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof UserData, string>> = {};
    if (!data.name.trim()) newErrors.name = 'El nombre es requerido.';
    if (!data.email.trim()) {
      newErrors.email = 'El email es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'El formato del email es inválido.';
    }
    if (!data.phone.trim()) newErrors.phone = 'El teléfono es requerido.';
    if (!data.company.trim()) newErrors.company = 'La empresa es requerida.';
    if (!data.employeeId.trim()) newErrors.employeeId = 'El número de nómina es requerido.';
    if (!data.position.trim()) newErrors.position = 'El cargo es requerido.';
    if (!data.department.trim()) newErrors.department = 'El departamento es requerido.';
    if (!data.educationLevel.trim()) newErrors.educationLevel = 'El nivel de escolaridad es requerido.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      if (data.educationHistory.length === 0 || data.workExperience.length === 0) {
        setIsConfirmationOpen(true);
      } else {
        onNext();
      }
    }
  };

  const handleConfirmContinue = () => {
    setIsConfirmationOpen(false);
    onNext();
  };
  
  // Helpers for parsing work dates in the modal
  const parseWorkDate = (dateStr: string | undefined) => {
    if (!dateStr) return { month: '', year: '' };
    if (dateStr.toLowerCase() === 'actualidad') return { month: '', year: 'Actualidad' };
    const parts = dateStr.split(' ');
    return { month: parts[0] || '', year: parts[1] || '' };
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">1. Ficha de Personal</h2>
      <p className="text-slate-500 mb-6">Por favor, complete todos los campos a continuación.</p>
      
      <div className="space-y-6">
        {/* Contact Info */}
        <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-slate-700 border-b pb-2 w-full">Información de Contacto</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                    <InputField label="Nombre Completo" id="name" name="name" value={data.name} onChange={handleChange} required />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                    <InputField label="Email" id="email" name="email" type="email" value={data.email} onChange={handleChange} required />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="md:col-span-2">
                    <InputField label="Teléfono" id="phone" name="phone" type="tel" value={data.phone} onChange={handleChange} required />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
            </div>
        </fieldset>
        
        {/* Work Info */}
        <fieldset className="space-y-4">
            <legend className="text-lg font-semibold text-slate-700 border-b pb-2 w-full">Información Laboral</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                    <InputField label="Empresa" id="company" name="company" value={data.company} onChange={handleChange} required />
                    {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                </div>
                <div>
                    <InputField label="Número de Nómina / Empleado" id="employeeId" name="employeeId" value={data.employeeId} onChange={handleChange} required />
                    {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>}
                </div>
                <div>
                    <InputField label="Cargo Actual" id="position" name="position" value={data.position} onChange={handleChange} required />
                    {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                </div>
                <div>
                    <InputField label="Departamento" id="department" name="department" value={data.department} onChange={handleChange} required />
                    {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                </div>
            </div>
        </fieldset>
        
        {/* Education and Experience */}
        <fieldset className="space-y-6">
            <legend className="text-lg font-semibold text-slate-700 border-b pb-2 w-full">Resumen Profesional</legend>
            <div>
                <SelectField label="Último Nivel de Escolaridad" id="educationLevel" name="educationLevel" value={data.educationLevel} onChange={handleChange} required>
                    <option value="">Seleccione una opción...</option>
                    <option value="Primaria">Primaria</option>
                    <option value="Secundaria">Secundaria</option>
                    <option value="Bachillerato">Bachillerato / Preparatoria</option>
                    <option value="Técnico Superior">Técnico Superior</option>
                    <option value="Licenciatura">Licenciatura</option>
                    <option value="Maestría">Maestría</option>
                    <option value="Doctorado">Doctorado</option>
                    <option value="Otro">Otro</option>
                </SelectField>
                {errors.educationLevel && <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>}
            </div>

            {/* Dynamic Education History */}
            <div className="space-y-3">
                <h4 className="font-medium text-slate-700">Historial Educativo</h4>
                {data.educationHistory.length > 0 ? (
                    <ul className="border border-slate-200 rounded-md divide-y divide-slate-200">
                        {data.educationHistory.map((entry) => (
                            <li key={entry.id} className="p-3 flex justify-between items-center bg-slate-50 hover:bg-slate-100">
                                <div>
                                    <p className="font-semibold text-slate-800">{entry.degree}</p>
                                    <p className="text-sm text-slate-500">{entry.institution} ({entry.startYear} - {entry.endYear})</p>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <button type="button" onClick={() => handleEditHistory(entry, 'educationHistory')} className="text-primary-600 hover:text-primary-800 font-medium text-sm">Editar</button>
                                    <button type="button" onClick={() => removeHistoryEntry(entry.id, 'educationHistory')} className="text-red-500 hover:text-red-700 font-medium text-sm">Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-4 border-2 border-dashed border-slate-200 rounded-md">
                        <p className="text-sm text-slate-500">No se ha añadido historial educativo.</p>
                    </div>
                )}
                <Button type="button" variant="ghost" onClick={() => handleAddHistory('educationHistory')}>+ Añadir Formación</Button>
            </div>
            
            {/* Dynamic Work Experience */}
            <div className="space-y-3">
                <h4 className="font-medium text-slate-700">Experiencia Laboral</h4>
                 {data.workExperience.length > 0 ? (
                    <ul className="border border-slate-200 rounded-md divide-y divide-slate-200">
                        {data.workExperience.map((entry) => (
                            <li key={entry.id} className="p-3 flex justify-between items-center bg-slate-50 hover:bg-slate-100">
                                <div>
                                    <p className="font-semibold text-slate-800">{entry.position}</p>
                                    <p className="text-sm text-slate-500">{entry.company} ({entry.startDate} - {entry.endDate})</p>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <button type="button" onClick={() => handleEditHistory(entry, 'workExperience')} className="text-primary-600 hover:text-primary-800 font-medium text-sm">Editar</button>
                                    <button type="button" onClick={() => removeHistoryEntry(entry.id, 'workExperience')} className="text-red-500 hover:text-red-700 font-medium text-sm">Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-4 border-2 border-dashed border-slate-200 rounded-md">
                        <p className="text-sm text-slate-500">No se ha añadido experiencia laboral.</p>
                    </div>
                )}
                <Button type="button" variant="ghost" onClick={() => handleAddHistory('workExperience')}>+ Añadir Experiencia</Button>
            </div>
        </fieldset>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleNext}>Siguiente</Button>
      </div>

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirmContinue}
        title="¿Continuar sin Historial?"
        confirmText="Continuar de todas formas"
        cancelText="Volver y Completar"
      >
        Hemos notado que no ha añadido ninguna entrada en su historial educativo o laboral. Esta información es muy valiosa para entender su perfil. ¿Está seguro de que desea continuar?
      </ConfirmationModal>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalMode === 'add' 
            ? `Añadir ${modalType === 'educationHistory' ? 'Formación' : 'Experiencia'}` 
            : `Editar ${modalType === 'educationHistory' ? 'Formación' : 'Experiencia'}`
        }
    >
        {currentEntry && (
            <div className="space-y-4">
                {modalType === 'educationHistory' && (
                    <>
                        <InputField label="Institución" name="institution" value={currentEntry.institution || ''} onChange={handleModalInputChange} />
                        <InputField label="Título Obtenido" name="degree" value={currentEntry.degree || ''} onChange={handleModalInputChange} />
                        <div className="grid grid-cols-2 gap-4">
                            <SelectField label="Año de Inicio" id="startYear" name="startYear" value={currentEntry.startYear || ''} onChange={handleModalInputChange}>
                                <option value="">Año...</option>
                                {years.map(year => <option key={year} value={year}>{year}</option>)}
                            </SelectField>
                            <SelectField label="Año de Fin" id="endYear" name="endYear" value={currentEntry.endYear || ''} onChange={handleModalInputChange}>
                                <option value="">Año...</option>
                                <option value="Actualidad">Actualidad</option>
                                {years.map(year => <option key={year} value={year}>{year}</option>)}
                            </SelectField>
                        </div>
                    </>
                )}
                {modalType === 'workExperience' && (() => {
                    const { month: startMonth, year: startYear } = parseWorkDate(currentEntry.startDate);
                    const { month: endMonth, year: endYear } = parseWorkDate(currentEntry.endDate);
                    const isCurrentJob = currentEntry.endDate?.toLowerCase() === 'actualidad';

                    return (
                        <>
                            <InputField label="Empresa" name="company" value={currentEntry.company || ''} onChange={handleModalInputChange} />
                            <InputField label="Cargo" name="position" value={currentEntry.position || ''} onChange={handleModalInputChange} />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <fieldset>
                                    <legend className="block text-sm font-medium text-slate-700 mb-1">Fecha de Inicio</legend>
                                    <div className="flex gap-2">
                                        <select name="startMonth" value={startMonth} onChange={(e) => handleWorkDateChange('startDate', 'month', e.target.value)} className={baseInputStyles}>
                                            <option value="">Mes...</option>
                                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                                        </select>
                                        <select name="startYear" value={startYear} onChange={(e) => handleWorkDateChange('startDate', 'year', e.target.value)} className={baseInputStyles}>
                                            <option value="">Año...</option>
                                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                                        </select>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend className="block text-sm font-medium text-slate-700 mb-1">Fecha de Fin</legend>
                                    <div className="flex gap-2">
                                        <select name="endMonth" value={endMonth} disabled={isCurrentJob} onChange={(e) => handleWorkDateChange('endDate', 'month', e.target.value)} className={`${baseInputStyles} disabled:bg-slate-200 disabled:cursor-not-allowed`}>
                                            <option value="">Mes...</option>
                                             {months.map(m => <option key={m} value={m}>{m}</option>)}
                                        </select>
                                        <select name="endYear" value={endYear} disabled={isCurrentJob} onChange={(e) => handleWorkDateChange('endDate', 'year', e.target.value)} className={`${baseInputStyles} disabled:bg-slate-200 disabled:cursor-not-allowed`}>
                                             <option value="">Año...</option>
                                             {years.map(y => <option key={y} value={y}>{y}</option>)}
                                        </select>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" id="currentJob" name="currentJob" checked={isCurrentJob} onChange={handleCurrentWorkToggle} className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                <label htmlFor="currentJob" className="ml-2 block text-sm text-slate-900">Trabajo aquí actualmente</label>
                            </div>

                            <TextareaField label="Responsabilidades / Logros" name="responsibilities" rows={4} value={currentEntry.responsibilities || ''} onChange={handleModalInputChange} />
                        </>
                    );
                })()}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 mt-6">
                    <Button type="button" variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                    <Button type="button" onClick={handleSaveHistory}>
                        {modalMode === 'add' ? 'Añadir' : 'Guardar Cambios'}
                    </Button>
                </div>
            </div>
        )}
    </Modal>
    </div>
  );
};

export default PersonalDataForm;

export { PersonalDataForm }