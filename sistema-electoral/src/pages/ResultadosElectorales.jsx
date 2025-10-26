import { useState } from 'react';
import { Trophy, TrendingUp, Users, BarChart2, Download, RefreshCw } from 'lucide-react';

const ResultadosElectorales = () => {
  const [tipoEleccion, setTipoEleccion] = useState('presidencial');

  const resultadosPresidenciales = [
    { 
      candidato: 'Juan Carlos Pérez',
      partido: 'Partido Democrático',
      votos: 2845678,
      porcentaje: 38.5,
      color: 'blue'
    },
    {
      candidato: 'María González',
      partido: 'Movimiento Popular',
      votos: 2134567,
      porcentaje: 28.9,
      color: 'green'
    },
    {
      candidato: 'Carlos Rodríguez',
      partido: 'Frente Progresista',
      votos: 1567890,
      porcentaje: 21.2,
      color: 'purple'
    },
    {
      candidato: 'Ana Torres',
      partido: 'Alianza Nacional',
      votos: 845678,
      porcentaje: 11.4,
      color: 'red'
    },
  ];

  const estadisticasGenerales = {
    actas: { procesadas: 28456, total: 34567, porcentaje: 82.3 },
    votosValidos: 7389345,
    votosNulos: 234567,
    votosBlanco: 145678,
    participacion: 76.8
  };

  return (
    <div className="space-y-6">
      {/* Header con Indicadores */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl shadow-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Resultados Electorales 2024</h2>
            <p className="text-sm opacity-90">Escrutinio en tiempo real - Actualizado cada 5 minutos</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
            <RefreshCw size={18} />
            Actualizar
          </button>
        </div>
      </div>

      {/* Progreso de Escrutinio */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Progreso de Escrutinio</h3>
          <span className="text-2xl font-bold text-indigo-600">
            {estadisticasGenerales.actas.porcentaje}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${estadisticasGenerales.actas.porcentaje}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          {estadisticasGenerales.actas.procesadas.toLocaleString()} de {estadisticasGenerales.actas.total.toLocaleString()} actas procesadas
        </p>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Participación</p>
            <Users className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-green-600">{estadisticasGenerales.participacion}%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Votos Válidos</p>
            <BarChart2 className="text-indigo-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-indigo-600">
            {(estadisticasGenerales.votosValidos / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Votos Nulos</p>
            <TrendingUp className="text-red-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-red-600">
            {estadisticasGenerales.votosNulos.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Votos en Blanco</p>
            <BarChart2 className="text-gray-600" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-600">
            {estadisticasGenerales.votosBlanco.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Selector de Tipo de Elección */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex gap-2">
          {['presidencial', 'congresistas', 'regional'].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setTipoEleccion(tipo)}
              className={`px-6 py-2 rounded-lg font-medium capitalize transition-colors ${
                tipoEleccion === tipo
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>
      </div>

      {/* Resultados Presidenciales */}
      {tipoEleccion === 'presidencial' && (
        <div className="space-y-4">
          {resultadosPresidenciales.map((resultado, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                {index === 0 && (
                  <Trophy className="text-yellow-500" size={32} />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{resultado.candidato}</h3>
                      <p className="text-sm text-gray-600">{resultado.partido}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-indigo-600">{resultado.porcentaje}%</p>
                      <p className="text-sm text-gray-600">{resultado.votos.toLocaleString()} votos</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`bg-${resultado.color}-600 h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${resultado.porcentaje}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Botones de Exportación */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Exportar Resultados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <Download size={18} />
            Descargar PDF
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download size={18} />
            Descargar Excel
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download size={18} />
            Informe Completo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultadosElectorales;