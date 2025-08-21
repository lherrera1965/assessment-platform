import React, { useState } from 'react';
import { UserData } from '../../types';
import { Button } from '../Button';
import { ConfirmationModal } from '../ConfirmationModal';

interface ProfessionalProfileScreenProps {
  data: UserData;
  setData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
  onBack: () => void;
}

const TextareaField: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string, description: string }> = ({ label, id, description, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <p className="text-sm text-slate-500 mb-2">{description}</p>
        <textarea id={id} className="block w-full px-4 py-2 text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition" {...props} />
    </div>
);

const ProfessionalProfileScreen: React.FC<ProfessionalProfileScreenProps> = ({ data, setData, onNext, onBack }) => {
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleNext = () => {
        const hasEmptyFields = !data.strengths.trim() || !data.opportunities.trim() || !data.achievements.trim() || !data.goals.trim();
        if (hasEmptyFields) {
            setIsConfirmationOpen(true);
        } else {
            onNext();
        }
    };

    const handleConfirmContinue = () => {
        setIsConfirmationOpen(false);
        onNext();
    };
    
    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">2. Perfil Profesional</h2>
            <p className="text-slate-500 mb-6">Cuéntenos un poco más sobre su trayectoria y aspiraciones. (Estos campos son opcionales pero muy recomendados).</p>
            
            <div className="space-y-6">
                <TextareaField
                    label="Fortalezas Principales"
                    id="strengths"
                    name="strengths"
                    description="Enumere 3-5 de sus fortalezas clave como profesional."
                    rows={4}
                    value={data.strengths}
                    onChange={handleChange}
                />
                
                <TextareaField
                    label="Áreas de Oportunidad"
                    id="opportunities"
                    name="opportunities"
                    description="¿En qué áreas o habilidades le gustaría desarrollarse más?"
                    rows={4}
                    value={data.opportunities}
                    onChange={handleChange}
                />

                <TextareaField
                    label="Principales Logros"
                    id="achievements"
                    name="achievements"
                    description="Describa 2-3 de sus logros profesionales más significativos."
                    rows={5}
                    value={data.achievements}
                    onChange={handleChange}
                />
                
                <TextareaField
                    label="Metas Personales y Profesionales"
                    id="goals"
                    name="goals"
                    description="¿Dónde se ve en los próximos 5 años? ¿Cuáles son sus aspiraciones?"
                    rows={4}
                    value={data.goals}
                    onChange={handleChange}
                />
            </div>
            
            <div className="mt-8 flex justify-between">
                <Button onClick={onBack} variant="secondary">Atrás</Button>
                <Button onClick={handleNext}>Siguiente</Button>
            </div>

            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                onConfirm={handleConfirmContinue}
                title="¿Continuar con Campos Vacíos?"
                confirmText="Continuar de todas formas"
                cancelText="Volver y Completar"
            >
                Hemos notado que ha dejado algunos campos en blanco en esta sección. Sus respuestas nos ayudan a crear un perfil de desarrollo más completo. ¿Está seguro de que desea continuar?
            </ConfirmationModal>
        </div>
    );
};

export default ProfessionalProfileScreen;

export { ProfessionalProfileScreen }