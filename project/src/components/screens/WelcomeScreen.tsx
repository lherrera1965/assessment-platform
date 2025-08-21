
import React from 'react';
import { Button } from '../Button';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">
        Bienvenido a la Evaluación de Perfil Profesional
      </h2>
      <p className="text-slate-600 mb-8 max-w-3xl mx-auto">
        A continuación, iniciará un proceso diseñado para conocer mejor sus fortalezas, estilo de liderazgo y aspiraciones profesionales.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 text-slate-800 p-6 rounded-lg text-left max-w-3xl mx-auto mb-10 shadow-sm">
        <h3 className="font-bold text-lg text-blue-800">Una Inversión en Nuestro Talento: Su Desarrollo</h3>
        <p className="mt-3 text-sm text-slate-700">
          En nuestra empresa, creemos que nuestro mayor activo es nuestra gente. Esta evaluación no es un examen, sino el primer paso en un esfuerzo <strong>colaborativo</strong> para entender mejor su perfil profesional, sus talentos únicos y sus aspiraciones. No hay respuestas correctas o incorrectas; buscamos su perspectiva auténtica.
        </p>
        <p className="mt-3 text-sm text-slate-700">
          Los resultados nos permitirán crear un <strong>plan de desarrollo personalizado</strong> para usted, alineando sus metas con las oportunidades de crecimiento dentro de la compañía y asegurando que tenga el apoyo necesario para alcanzar su máximo potencial.
        </p>
        <p className="mt-3 text-sm text-slate-700">
          Su honestidad es crucial para el éxito de este proceso. Le agradecemos de antemano su tiempo y le aseguramos que toda la información compartida será tratada con la <strong>más estricta confidencialidad</strong> y utilizada exclusivamente para fines de desarrollo.
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 text-slate-800 p-6 rounded-lg text-left max-w-3xl mx-auto mb-10 shadow-sm">
        <h3 className="font-bold text-lg text-yellow-800">Información Importante Antes de Empezar</h3>
        <ul className="mt-3 text-sm text-slate-700 list-disc list-inside space-y-2">
          <li>
            <strong>Duración estimada:</strong> Le recomendamos reservar entre <strong>60 y 75 minutos</strong> en un entorno tranquilo y sin interrupciones para completar la evaluación de manera reflexiva.
          </li>
          <li>
            <strong>Sesión única:</strong> Esta evaluación debe ser completada en <strong>una sola sesión</strong>. Su progreso no se guardará si cierra la ventana del navegador.
          </li>
        </ul>
      </div>
      
      <Button onClick={onStart} size="large">
        Entendido, Comenzar Evaluación
      </Button>
    </div>
  );
};

export default WelcomeScreen;

export { WelcomeScreen }