import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Filter, Printer, Mail, Eye } from 'lucide-react';

const Reportes = () => {
  const [filtroTipo, setFiltroTipo] = useState('todos');

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

  const reportesDisponibles = [
    {
      id: 1,
      nombre: 'Informe de Participación Electoral',
      tipo: 'Estadístico',
      descripcion: 'Análisis detallado de la participación ciudadana por distritos',
      fecha: '2024-10-25',
      tamaño: '2.4 MB',
      formato: 'PDF',
      estado: 'Disponible'
    },
    {
      id: 2,
      nombre: 'Resultados por Mesa de Votación',
      tipo: 'Resultados',
      descripcion: 'Desglose completo de votos por cada mesa electoral',
      fecha: '2024-10-25',
      tamaño: '8.7 MB',
      formato: 'Excel',
      estado: 'Disponible'
    },
    {
      id: 3,
      nombre: 'Reporte de Incidencias',
      tipo: 'Operativo',
      descripcion: 'Registro de todas las incidencias durante el proceso',
      fecha: '2024-10-25',
      tamaño: '1.2 MB',
      formato: 'PDF',
      estado: 'Disponible'
    },
    {
      id: 4,
      nombre: 'Auditoría de Actas Electorales',
      tipo: 'Auditoría',
      descripcion: 'Verificación y validación de actas procesadas',
      fecha: '2024-10-24',
      tamaño: '5.3 MB',
      formato: 'PDF',
      estado: 'Disponible'
    },
    {
      id: 5,
      nombre: 'Análisis Demográfico de Votantes',
      tipo: 'Estadístico',
      descripcion: 'Distribución de votantes por edad, género y ubicación',
      fecha: '2024-10-24',
      tamaño: '3.1 MB',
      formato: 'PDF',
      estado: 'Disponible'
    },
    {
      id: 6,
      nombre: 'Reporte de Capacitación Electoral',
      tipo: 'Operativo',
      descripcion: 'Detalle de capacitaciones realizadas a miembros de mesa',
      fecha: '2024-10-23',
      tamaño: '1.8 MB',
      formato: 'Excel',
      estado: 'Generando'
    },
  ];

  const tiposReporte = [
    { id: 'todos', nombre: 'Todos los Reportes', count: 6 },
    { id: 'Estadístico', nombre: 'Estadísticos', count: 2 },
    { id: 'Resultados', nombre: 'Resultados', count: 1 },
    { id: 'Operativo', nombre: 'Operativos', count: 2 },
    { id: 'Auditoría', nombre: 'Auditoría', count: 1 },
  ];

  const reportesFiltrados = filtroTipo === 'todos' 
    ? reportesDisponibles 
    : reportesDisponibles.filter(r => r.tipo === filtroTipo);

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 p-6 rounded-xl shadow-lg text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Centro de Reportes</h2>
            <p className="text-sm opacity-90">Generación y descarga de informes del sistema electoral</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            <FileText size={18} />
            Generar Nuevo Reporte
          </motion.button>
        </div>
      </motion.div>

      {/* Estadísticas de Reportes */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        variants={containerVariants}
      >
        <motion.div 
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reportes</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">247</p>
            </div>
            <FileText className="text-indigo-600" size={32} />
          </div>
        </motion.div>
        <motion.div 
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Generados Hoy</p>
              <p className="text-3xl font-bold text-green-600 mt-2">12</p>
            </div>
            <Calendar className="text-green-600" size={32} />
          </div>
        </motion.div>
        <motion.div 
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Descargas</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">1,458</p>
            </div>
            <Download className="text-blue-600" size={32} />
          </div>
        </motion.div>
        <motion.div 
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Programados</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">8</p>
            </div>
            <Calendar className="text-purple-600" size={32} />
          </div>
        </motion.div>
      </motion.div>

      {/* Filtros y Búsqueda */}
      <motion.div 
        variants={itemVariants}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Reporte</label>
            <input
              type="text"
              placeholder="Nombre del reporte..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="md:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="md:w-48 flex items-end">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Filter size={18} />
              Filtrar
            </button>
          </div>
        </div>
      </motion.div>

      {/* Categorías de Reportes */}
      <motion.div 
        variants={itemVariants}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">Categorías</h3>
        <div className="flex flex-wrap gap-3">
          {tiposReporte.map((tipo) => (
            <motion.button
              key={tipo.id}
              onClick={() => setFiltroTipo(tipo.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtroTipo === tipo.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tipo.nombre} ({tipo.count})
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Lista de Reportes */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-xl shadow-sm border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">
            {filtroTipo === 'todos' ? 'Todos los Reportes' : `Reportes de ${filtroTipo}`}
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {reportesFiltrados.map((reporte) => (
            <motion.div 
              key={reporte.id} 
              variants={itemVariants}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  reporte.formato === 'PDF' ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  <FileText className={
                    reporte.formato === 'PDF' ? 'text-red-600' : 'text-green-600'
                  } size={24} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{reporte.nombre}</h4>
                      <p className="text-sm text-gray-600 mt-1">{reporte.descripcion}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">Tipo: {reporte.tipo}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">Fecha: {reporte.fecha}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">Tamaño: {reporte.tamaño}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">Formato: {reporte.formato}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      reporte.estado === 'Disponible' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {reporte.estado}
                    </span>
                  </div>

                  {reporte.estado === 'Disponible' && (
                    <div className="flex gap-2 mt-4">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                      >
                        <Download size={16} />
                        Descargar
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                      >
                        <Eye size={16} />
                        Vista Previa
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        <Printer size={16} />
                        Imprimir
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        <Mail size={16} />
                        Enviar
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Reportes;