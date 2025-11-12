import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Settings, Maximize2, RefreshCw } from 'lucide-react';

const Visualizacion = () => {
  const [activeChart, setActiveChart] = useState('barras');

  // Datos para gráficos
  const dataEdad = [
    { rango: '18-25', cantidad: 12430 },
    { rango: '26-35', cantidad: 23450 },
    { rango: '36-45', cantidad: 18920 },
    { rango: '46-55', cantidad: 9840 },
    { rango: '56+', cantidad: 2690 },
  ];

  const dataDistrito = [
    { nombre: 'Lima', valor: 45230 },
    { nombre: 'Callao', valor: 28450 },
    { nombre: 'Arequipa', valor: 18920 },
    { nombre: 'Cusco', valor: 15340 },
    { nombre: 'Trujillo', valor: 12490 },
  ];

  const dataTendencia = [
    { mes: 'Ene', registros: 8500 },
    { mes: 'Feb', registros: 9200 },
    { mes: 'Mar', registros: 11800 },
    { mes: 'Abr', registros: 10500 },
    { mes: 'May', registros: 13200 },
    { mes: 'Jun', registros: 15800 },
  ];

  const dataPie = [
    { name: 'Lima', value: 36.1, color: '#6366f1' },
    { name: 'Callao', value: 22.7, color: '#8b5cf6' },
    { name: 'Arequipa', value: 15.1, color: '#ec4899' },
    { name: 'Cusco', value: 12.2, color: '#f59e0b' },
    { name: 'Otros', value: 13.9, color: '#10b981' },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  const chartTypes = [
    { id: 'barras', name: 'Gráfico de Barras', icon: '📊' },
    { id: 'lineas', name: 'Gráfico de Líneas', icon: '📈' },
    { id: 'pie', name: 'Gráfico Circular', icon: '🥧' },
    { id: 'comparativo', name: 'Comparativo', icon: '📉' },
  ];

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

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Selector de Tipo de Gráfico */}
      <motion.div 
        variants={itemVariants}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">Tipo de Visualización</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chartTypes.map((chart) => (
            <button
              key={chart.id}
              onClick={() => setActiveChart(chart.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                activeChart === chart.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="text-3xl mb-2">{chart.icon}</div>
              <p className="text-sm font-medium text-gray-800">{chart.name}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Controles de Visualización */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw size={18} />
            <span className="hidden md:inline">Actualizar</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download size={18} />
            <span className="hidden md:inline">Exportar</span>
          </button>
        </div>
      </motion.div>

      {/* Gráficos */}
      {activeChart === 'barras' && (
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Gráfico de Barras - Edad */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Distribución por Edad</h3>
              <span className="text-sm text-gray-600">Total: 67,330</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataEdad}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="rango" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="cantidad" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Barras - Distrito */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Votantes por Distrito</h3>
              <span className="text-sm text-gray-600">Top 5</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataDistrito} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="nombre" type="category" stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="valor" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {activeChart === 'lineas' && (
        <motion.div 
          variants={itemVariants}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Tendencia de Registros Mensuales</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">2024</span>
              <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={dataTendencia}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="registros" 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={{ fill: '#6366f1', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {activeChart === 'pie' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico Circular */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Distribución Porcentual</h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={dataPie}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Leyenda y Detalles */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Detalle por Región</h3>
            <div className="space-y-3">
              {dataPie.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-medium text-gray-800">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{item.value}%</p>
                    <p className="text-xs text-gray-600">
                      {Math.round((item.value / 100) * 125430).toLocaleString()} votantes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeChart === 'comparativo' && (
        <div className="space-y-6">
          {/* Gráfico Comparativo */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Comparación Multi-Dimensional</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dataDistrito}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="nombre" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="valor" fill="#6366f1" name="Votantes Registrados" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Comparación de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-sm text-white">
              <p className="text-sm opacity-90 mb-2">Tasa de Participación</p>
              <p className="text-3xl font-bold mb-1">82.5%</p>
              <p className="text-xs opacity-75">+5.2% vs. año anterior</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-sm text-white">
              <p className="text-sm opacity-90 mb-2">Promedio por Distrito</p>
              <p className="text-3xl font-bold mb-1">24,086</p>
              <p className="text-xs opacity-75">Votantes registrados</p>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-6 rounded-xl shadow-sm text-white">
              <p className="text-sm opacity-90 mb-2">Crecimiento Mensual</p>
              <p className="text-3xl font-bold mb-1">+18.3%</p>
              <p className="text-xs opacity-75">Últimos 6 meses</p>
            </div>
          </div>
        </div>
      )}

      {/* Panel de Estadísticas Rápidas */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Resumen de Datos</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">Total</p>
            <p className="text-2xl font-bold text-blue-900">125,430</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 font-medium">Activos</p>
            <p className="text-2xl font-bold text-green-900">98,234</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800 font-medium">Pendientes</p>
            <p className="text-2xl font-bold text-yellow-900">15,896</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-800 font-medium">Distritos</p>
            <p className="text-2xl font-bold text-purple-900">25</p>
          </div>
          <div className="text-center p-4 bg-pink-50 rounded-lg">
            <p className="text-sm text-pink-800 font-medium">Edad Media</p>
            <p className="text-2xl font-bold text-pink-900">38.5</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Visualizacion;