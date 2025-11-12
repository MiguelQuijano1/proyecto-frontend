import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Zap, RefreshCw, Database, Play, Filter, FileText, Search, Trash2, Edit, Calendar, Hash, User, Mail, Phone, MapPin, BarChart3, Copy, MinusCircle } from 'lucide-react';

const LimpiezaDatos = () => {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProcessingStep, setCurrentProcessingStep] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dataAnalyzed, setDataAnalyzed] = useState(false); // Nuevo estado para controlar si los datos han sido analizados

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const issues = [
    { id: 1, type: 'Duplicados', count: 245, severity: 'high', color: 'red' },
    { id: 2, type: 'Valores Nulos', count: 89, severity: 'medium', color: 'yellow' },
    { id: 3, type: 'Valores Correctos', count: 34, severity: 'check', color: 'green' },
    { id: 4, type: 'Score Calidad', count: '100%', severity: 'check', color: 'green' },
    { id: 5, type: 'Datos a Normalizar', count: 61, severity: 'medium', color: 'blue' }, // Agregado para normalizar
  ];

  const cleaningActions = [
    { id: 1, name: 'Analizar datos', description: 'Analizar la calidad y estructura de los datos', icon: BarChart3 },
    { id: 2, name: 'Quitar duplicados', description: 'Remover registros duplicados basándose en DNI', icon: Copy },
    { id: 3, name: 'Limpiar datos null', description: 'Rellenar o eliminar valores nulos', icon: MinusCircle },
    { id: 4, name: 'Normalizar Datos', description: 'Ajustar los valores para que estén en la misma escala y sean más fáciles de comparar', icon: MinusCircle },

  ];

  const sampleData = [
    { id: 1, dni: '87654321', nombre: 'Juan Pérez', email: 'juan.perez@email.com', telefono: '+54 11 1234-5678', direccion: 'Av. Corrientes 1000, CABA', fechaRegistro: '2023-01-15', estado: 'valido', lastCleaned: '2023-06-10' },
    { id: 2, dni: '12345678', nombre: 'María García', email: 'maria.garcia@email.com', telefono: '+54 11 8765-4321', direccion: 'Santa Fe 2000, CABA', fechaRegistro: '2023-02-20', estado: 'valido', lastCleaned: '2023-06-10' },
    { id: 3, dni: '87654321', nombre: 'Juan Pérez', email: 'juan.perez@email.com', telefono: '+54 11 1234-5678', direccion: 'Av. Corrientes 1000, CABA', fechaRegistro: '2023-01-15', estado: 'duplicado', lastCleaned: null },
    { id: 4, dni: '23456789', nombre: 'Carlos López', email: 'carlos.lopez@email', telefono: '15-1111-2222', direccion: 'Córdoba 500, CABA', fechaRegistro: '2023-03-10', estado: 'con-errores', lastCleaned: null },
    { id: 5, dni: '', nombre: 'Ana Martínez', email: 'ana.martinez@email.com', telefono: '+54 11 3333-4444', direccion: 'Rivadavia 3000, CABA', fechaRegistro: '2023-04-05', estado: 'incompleto', lastCleaned: null },
    { id: 6, dni: '34567890', nombre: 'Laura Fernández', email: 'laura.fernandez@email.com', telefono: '+54 11 5555-6666', direccion: 'Belgrano 1500, CABA', fechaRegistro: '2023-05-12', estado: 'valido', lastCleaned: '2023-06-10' },
    { id: 7, dni: '45678901', nombre: 'Roberto Díaz', email: 'roberto.diaz@email.com', telefono: '+54 11 7777-8888', direccion: 'Corrientes 2500, CABA', fechaRegistro: '2023-06-01', estado: 'valido', lastCleaned: '2023-06-10' },
    { id: 8, dni: '56789012', nombre: 'Sofía González', email: 'sofia.gonzalez@email.com', telefono: '+54 11 9999-0000', direccion: 'Lavalle 1200, CABA', fechaRegistro: '2023-06-15', estado: 'valido', lastCleaned: '2023-06-15' },
  ];

  const filteredData = sampleData.filter(item => {
    const matchesSearch = Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = filterStatus === 'all' || item.estado === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCleaningAction = (actionId) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setCurrentProcessingStep(actionId);
    
    // Simulate processing time
    setTimeout(() => {
      setCompletedSteps(prev => [...prev, actionId]);
      setIsProcessing(false);
      setCurrentProcessingStep(null);
      
      // Si la acción es "Analizar datos" (id: 1), mostrar las tarjetas de problemas
      if (actionId === 1) {
        setDataAnalyzed(true);
      }
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'valido':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Válido</span>;
      case 'duplicado':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Duplicado</span>;
      case 'con-errores':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Con errores</span>;
      case 'incompleto':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Incompleto</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Desconocido</span>;
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Botones de Acciones Principales */}
      <motion.div 
        variants={itemVariants}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Zap className="text-indigo-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Acciones de Limpieza</h3>
            <p className="text-sm text-gray-600">Ejecuta las acciones principales de limpieza</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {cleaningActions.map((action) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                onClick={() => handleCleaningAction(action.id)}
                disabled={isProcessing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 border-2 rounded-xl transition-all flex flex-col items-center justify-center gap-3 ${
                  completedSteps.includes(action.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-indigo-500 hover:bg-indigo-50'
                } ${isProcessing ? 'cursor-not-allowed opacity-75' : ''}`}
              >
                <div className={`p-3 rounded-lg ${
                  completedSteps.includes(action.id) ? 'bg-green-100' : 'bg-indigo-100'
                }`}>
                  {currentProcessingStep === action.id ? (
                    <RefreshCw className={`animate-spin ${
                      completedSteps.includes(action.id) ? 'text-green-600' : 'text-indigo-600'
                    }`} size={24} />
                  ) : (
                    <Icon className={
                      completedSteps.includes(action.id) ? 'text-green-600' : 'text-indigo-600'
                    } size={24} />
                  )}
                </div>
                <div className="text-center">
                  <p className={`font-semibold text-base ${
                    completedSteps.includes(action.id) ? 'text-green-800' : 'text-gray-800'
                  }`}>
                    {action.name}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">{action.description}</p>
                </div>
                {completedSteps.includes(action.id) && (
                  <CheckCircle className="text-green-600" size={20} />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Resumen de Problemas - Solo se muestra después de analizar los datos */}
      {dataAnalyzed && (
        <motion.div 
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-100 rounded-lg">
              <AlertTriangle className="text-amber-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Resumen de Problemas</h3>
              <p className="text-sm text-gray-600">Problemas detectados en los datos</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {issues.map((issue) => (
              <div key={issue.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className={`text-${issue.color}-500`} size={20} />
                  <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${issue.color}-100 text-${issue.color}-800`}>
                    {issue.severity === 'high' ? 'Alta' : issue.severity === 'medium' ? 'Media' : 'Listo'}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{issue.type}</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{issue.count}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tabla de Datos */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Vista de Datos</h3>
                <p className="text-sm text-gray-600">Registros del dataset</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">Todos los estados</option>
                <option value="valido">Válidos</option>
                <option value="duplicado">Duplicados</option>
                <option value="con-errores">Con errores</option>
                <option value="incompleto">Incompletos</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Hash size={14} />
                    <span>ID</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>Nombre</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>DNI</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Mail size={14} />
                    <span>Email</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Phone size={14} />
                    <span>Teléfono</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>Dirección</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Fecha</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <motion.tr 
                  key={item.id} 
                  variants={itemVariants}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.nombre}</div>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm text-gray-900">{item.dni}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.telefono}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.direccion}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.fechaRegistro}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(item.estado)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">1</span> a <span className="font-medium">{filteredData.length}</span> de{' '}
            <span className="font-medium">{sampleData.length}</span> resultados
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              Anterior
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              Siguiente
            </button>
          </div>
        </div>
      </motion.div>

      {/* Registro de Actividades - Solo se muestra después de analizar los datos */}
      {dataAnalyzed && (
        <motion.div 
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
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
                <p className="text-sm font-medium text-gray-800">Análisis de datos completado</p>
                <p className="text-xs text-gray-600">Hace 20 minutos</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LimpiezaDatos;