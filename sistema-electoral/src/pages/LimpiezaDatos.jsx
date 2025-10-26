import { useState } from 'react';
import { AlertTriangle, CheckCircle, Zap, RefreshCw, Database } from 'lucide-react';

const LimpiezaDatos = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const issues = [
    { id: 1, type: 'Duplicados', count: 245, severity: 'high', color: 'red' },
    { id: 2, type: 'Valores Nulos', count: 89, severity: 'medium', color: 'yellow' },
    { id: 3, type: 'Formato Incorrecto', count: 34, severity: 'medium', color: 'yellow' },
    { id: 4, type: 'Datos Inconsistentes', count: 12, severity: 'low', color: 'blue' },
  ];

  const cleaningSteps = [
    { id: 1, name: 'Eliminación de duplicados', status: 'completed' },
    { id: 2, name: 'Corrección de formatos', status: 'completed' },
    { id: 3, name: 'Validación de rangos', status: 'processing' },
    { id: 4, name: 'Normalización de datos', status: 'pending' },
    { id: 5, name: 'Verificación final', status: 'pending' },
  ];

  const handleAutomaticCleaning = () => {
    setIsProcessing(true);
    setProcessingStep(0);
    
    const interval = setInterval(() => {
      setProcessingStep(prev => {
        if (prev >= cleaningSteps.length - 1) {
          clearInterval(interval);
          setIsProcessing(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Resumen de Problemas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {issues.map((issue) => (
          <div key={issue.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className={`text-${issue.color}-500`} size={24} />
              <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${issue.color}-100 text-${issue.color}-800`}>
                {issue.severity === 'high' ? 'Alta' : issue.severity === 'medium' ? 'Media' : 'Baja'}
              </span>
            </div>
            <p className="text-sm text-gray-600">{issue.type}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{issue.count}</p>
          </div>
        ))}
      </div>

      {/* Control de Limpieza */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Limpieza Automática */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Zap className="text-indigo-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Limpieza Automática</h3>
              <p className="text-sm text-gray-600">Proceso automático de corrección</p>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {cleaningSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= processingStep ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {index < processingStep ? (
                    <CheckCircle className="text-green-600" size={18} />
                  ) : index === processingStep && isProcessing ? (
                    <RefreshCw className="text-indigo-600 animate-spin" size={18} />
                  ) : (
                    <span className="text-gray-400 text-sm">{step.id}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    index <= processingStep ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAutomaticCleaning}
            disabled={isProcessing}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              isProcessing
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isProcessing ? 'Procesando...' : 'Iniciar Limpieza Automática'}
          </button>
        </div>

        {/* Limpieza Manual */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Database className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Limpieza Manual</h3>
              <p className="text-sm text-gray-600">Herramientas específicas</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
              <p className="font-medium text-gray-800">Eliminar Duplicados</p>
              <p className="text-xs text-gray-600 mt-1">Remover registros duplicados basándose en DNI</p>
            </button>

            <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
              <p className="font-medium text-gray-800">Corregir Formatos</p>
              <p className="text-xs text-gray-600 mt-1">Estandarizar fechas, números y textos</p>
            </button>

            <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
              <p className="font-medium text-gray-800">Rellenar Valores Nulos</p>
              <p className="text-xs text-gray-600 mt-1">Completar campos vacíos con valores predeterminados</p>
            </button>

            <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
              <p className="font-medium text-gray-800">Validar Rangos</p>
              <p className="text-xs text-gray-600 mt-1">Verificar que los valores estén en rangos válidos</p>
            </button>
          </div>
        </div>
      </div>

      {/* Registro de Actividades */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Registro de Limpieza</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="text-green-600 mt-0.5" size={18} />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">245 duplicados eliminados</p>
              <p className="text-xs text-gray-600">Hace 5 minutos</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="text-green-600 mt-0.5" size={18} />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">89 valores nulos rellenados</p>
              <p className="text-xs text-gray-600">Hace 12 minutos</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <RefreshCw className="text-blue-600 mt-0.5" size={18} />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Formatos estandarizados</p>
              <p className="text-xs text-gray-600">Hace 20 minutos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Configuración de Reglas */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Configuración de Reglas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
              <span className="text-sm font-medium text-gray-800">Eliminar duplicados automáticamente</span>
            </label>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
              <span className="text-sm font-medium text-gray-800">Validar formatos de DNI</span>
            </label>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
              <span className="text-sm font-medium text-gray-800">Rellenar valores nulos con promedios</span>
            </label>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
              <span className="text-sm font-medium text-gray-800">Normalizar nombres y apellidos</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimpiezaDatos;