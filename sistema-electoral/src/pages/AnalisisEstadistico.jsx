import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calculator, BarChart2, PieChart, Activity } from 'lucide-react';

const AnalisisEstadistico = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState('descriptivo');

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

  const estadisticas = {
    descriptivas: [
      { label: 'Media de Edad', value: '38.5 años', icon: Calculator, color: 'blue' },
      { label: 'Mediana', value: '36 años', icon: Activity, color: 'green' },
      { label: 'Desviación Estándar', value: '±12.3', icon: TrendingUp, color: 'purple' },
      { label: 'Moda', value: '42 años', icon: BarChart2, color: 'orange' },
    ],
    distribucion: [
      { rango: '18-25', cantidad: 12430, porcentaje: 18.5 },
      { rango: '26-35', cantidad: 23450, porcentaje: 34.8 },
      { rango: '36-45', cantidad: 18920, porcentaje: 28.1 },
      { rango: '46-55', cantidad: 9840, porcentaje: 14.6 },
      { rango: '56+', cantidad: 2690, porcentaje: 4.0 },
    ],
    distritos: [
      { nombre: 'Lima', votantes: 45230, porcentaje: 36.1 },
      { nombre: 'Callao', votantes: 28450, porcentaje: 22.7 },
      { nombre: 'Arequipa', votantes: 18920, porcentaje: 15.1 },
      { nombre: 'Cusco', votantes: 15340, porcentaje: 12.2 },
      { nombre: 'Otros', votantes: 17490, porcentaje: 13.9 },
    ]
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Selector de Tipo de Análisis */}
      <motion.div 
        variants={itemVariants}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">Tipo de Análisis</h3>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={containerVariants}
        >
          <button
            onClick={() => setSelectedAnalysis('descriptivo')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedAnalysis === 'descriptivo'
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Calculator className={`mx-auto mb-2 ${
                selectedAnalysis === 'descriptivo' ? 'text-indigo-600' : 'text-gray-400'
              }`} size={32} />
            </motion.div>
            <p className="font-medium text-gray-800">Análisis Descriptivo</p>
            <p className="text-xs text-gray-600 mt-1">Estadísticas básicas</p>
          </button>

          <button
            onClick={() => setSelectedAnalysis('inferencial')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedAnalysis === 'inferencial'
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <TrendingUp className={`mx-auto mb-2 ${
                selectedAnalysis === 'inferencial' ? 'text-indigo-600' : 'text-gray-400'
              }`} size={32} />
            </motion.div>
            <p className="font-medium text-gray-800">Análisis Inferencial</p>
            <p className="text-xs text-gray-600 mt-1">Pruebas de hipótesis</p>
          </button>

          <button
            onClick={() => setSelectedAnalysis('predictivo')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedAnalysis === 'predictivo'
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Activity className={`mx-auto mb-2 ${
                selectedAnalysis === 'predictivo' ? 'text-indigo-600' : 'text-gray-400'
              }`} size={32} />
            </motion.div>
            <p className="font-medium text-gray-800">Análisis Predictivo</p>
            <p className="text-xs text-gray-600 mt-1">Modelos y predicciones</p>
          </button>
        </motion.div>
      </motion.div>

      {/* Estadísticas Descriptivas */}
      {selectedAnalysis === 'descriptivo' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          variants={containerVariants}
          className="space-y-6"
        >
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
            variants={containerVariants}
          >
            {estadisticas.descriptivas.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className={`inline-flex p-3 bg-${stat.color}-100 rounded-lg mb-3`}>
                    <Icon className={`text-${stat.color}-600`} size={24} />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Distribución por Edad */}
          <motion.div 
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4">Distribución por Rango de Edad</h3>
            <div className="space-y-4">
              {estadisticas.distribucion.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.rango} años</span>
                    <span className="text-sm text-gray-600">
                      {item.cantidad.toLocaleString()} ({item.porcentaje}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.porcentaje * 2.5}%` }}
                      transition={{ duration: 0.8, delay: 0.1 * index }}
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Distribución por Distrito */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Votantes por Distrito</h3>
              <div className="space-y-3">
                {estadisticas.distritos.map((distrito, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{distrito.nombre}</p>
                      <p className="text-xs text-gray-600">{distrito.porcentaje}% del total</p>
                    </div>
                    <motion.p 
                      className="text-lg font-bold text-indigo-600"
                      whileHover={{ scale: 1.1 }}
                    >
                      {distrito.votantes.toLocaleString()}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Resumen Estadístico</h3>
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <p className="text-sm text-blue-800 font-medium">Coeficiente de Variación</p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">31.95%</p>
                  <p className="text-xs text-blue-700 mt-1">Variabilidad moderada</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <p className="text-sm text-green-800 font-medium">Asimetría</p>
                  <p className="text-2xl font-bold text-green-900 mt-1">0.35</p>
                  <p className="text-xs text-green-700 mt-1">Distribución ligeramente sesgada</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-purple-50 border border-purple-200 rounded-lg"
                >
                  <p className="text-sm text-purple-800 font-medium">Curtosis</p>
                  <p className="text-2xl font-bold text-purple-900 mt-1">-0.82</p>
                  <p className="text-xs text-purple-700 mt-1">Distribución platicúrtica</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Análisis Inferencial */}
      {selectedAnalysis === 'inferencial' && (
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          variants={containerVariants}
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Pruebas de Hipótesis</h3>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="font-medium text-gray-800 mb-2">Prueba Chi-cuadrado</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-600">Estadístico χ²</p>
                    <p className="text-lg font-bold text-gray-800">24.56</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Valor p</p>
                    <p className="text-lg font-bold text-green-600">0.0023</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Resultado: Se rechaza H₀ (α = 0.05)
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="font-medium text-gray-800 mb-2">Prueba T de Student</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-600">Estadístico t</p>
                    <p className="text-lg font-bold text-gray-800">3.42</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Valor p</p>
                    <p className="text-lg font-bold text-green-600">0.0008</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Diferencia significativa entre grupos
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="font-medium text-gray-800 mb-2">ANOVA</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-600">F-estadístico</p>
                    <p className="text-lg font-bold text-gray-800">12.89</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Valor p</p>
                    <p className="text-lg font-bold text-green-600">{'< 0.001'}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Diferencias significativas entre distritos
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Intervalos de Confianza</h3>
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <p className="text-sm font-medium text-indigo-900 mb-2">Media poblacional (95% IC)</p>
                <p className="text-2xl font-bold text-indigo-900">36.8 - 40.2 años</p>
                <p className="text-xs text-indigo-700 mt-1">Intervalo de confianza del 95%</p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-900 mb-2">Proporción (95% IC)</p>
                <p className="text-2xl font-bold text-green-900">0.62 - 0.68</p>
                <p className="text-xs text-green-700 mt-1">Proporción de votantes activos</p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm font-medium text-purple-900 mb-2">Diferencia de medias (95% IC)</p>
                <p className="text-2xl font-bold text-purple-900">2.3 - 5.7 años</p>
                <p className="text-xs text-purple-700 mt-1">Entre Lima y provincias</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Análisis Predictivo */}
      {selectedAnalysis === 'predictivo' && (
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          variants={containerVariants}
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Modelos de Predicción</h3>
            <div className="space-y-4">
              <div className="p-4 border-2 border-indigo-500 bg-indigo-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-gray-800">Regresión Lineal</p>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Activo
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-600">R² Score</p>
                    <p className="text-lg font-bold text-indigo-600">0.847</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">RMSE</p>
                    <p className="text-lg font-bold text-indigo-600">4.23</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                  Ver Detalles
                </button>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                <p className="font-medium text-gray-800 mb-2">Random Forest</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-600">Precisión</p>
                    <p className="text-lg font-bold text-gray-800">92.3%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">F1-Score</p>
                    <p className="text-lg font-bold text-gray-800">0.91</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                <p className="font-medium text-gray-800 mb-2">XGBoost</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-600">Precisión</p>
                    <p className="text-lg font-bold text-gray-800">94.1%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">F1-Score</p>
                    <p className="text-lg font-bold text-gray-800">0.93</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Predicciones</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Participación Estimada 2024</p>
                <p className="text-3xl font-bold text-indigo-900">78.5%</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-green-700">
                  <TrendingUp size={14} />
                  <span>+3.2% respecto a 2020</span>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-3">Factores Principales</p>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Edad</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{width: '35%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Distrito</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '28%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Nivel Educativo</span>
                      <span className="font-medium">22%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '22%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Otros</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '15%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnalisisEstadistico;