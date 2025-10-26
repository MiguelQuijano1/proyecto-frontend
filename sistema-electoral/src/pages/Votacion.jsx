import { useState } from 'react';
import { Vote, Clock, CheckCircle, AlertCircle, TrendingUp, Users, Activity } from 'lucide-react';

const Votacion = () => {
  const [procesoActivo, setProcesoActivo] = useState(true);

  const estadisticasEnVivo = {
    mesasAbiertas: 28456,
    mesasCerradas: 6111,
    totalMesas: 34567,
    votantesRegistrados: 125430,
    votosEmitidos: 89234,
    participacion: 71.2,
    horaActual: '14:35:22'
  };

  const incidencias = [
    { id: 1, tipo: 'Retraso', mesa: '001234', descripcion: 'Apertura tardía - 20 min', severidad: 'media', hora: '08:20' },
    { id: 2, tipo: 'Técnico', mesa: '002456', descripcion: 'Problema con actas', severidad: 'alta', hora: '10:15' },
    { id: 3, tipo: 'Menor', mesa: '003789', descripcion: 'Falta de útiles', severidad: 'baja', hora: '11:30' },
    { id: 4, tipo: 'Resuelta', mesa: '001890', descripcion: 'Mesa sin presidente - Solucionado', severidad: 'baja', hora: '09:45' },
  ];

  const actividadReciente = [
    { mesa: '001234', accion: 'Apertura de mesa', hora: '08:00', estado: 'success' },
    { mesa: '002456', accion: 'Inicio de votación', hora: '08:05', estado: 'success' },
    { mesa: '003789', accion: 'Voto registrado', hora: '08:15', estado: 'success' },
    { mesa: '004123', accion: 'Incidencia reportada', hora: '08:20', estado: 'warning' },
  ];

  return (
    <div className="space-y-6">
      {/* Banner de Estado */}
      <div className={`p-6 rounded-xl shadow-lg text-white ${
        procesoActivo ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-gray-600 to-gray-700'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-4 bg-white bg-opacity-20 rounded-full ${procesoActivo ? 'animate-pulse' : ''}`}>
              <Vote size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {procesoActivo ? 'Proceso Electoral en Curso' : 'Proceso Electoral Finalizado'}
              </h2>
              <p className="text-sm opacity-90 mt-1">
                Elecciones Generales 2024 - {procesoActivo ? 'En vivo' : 'Escrutinio iniciado'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <Clock size={20} />
              <p className="text-3xl font-bold font-mono">{estadisticasEnVivo.horaActual}</p>
            </div>
            <p className="text-sm opacity-90 mt-1">Hora oficial del proceso</p>
          </div>
        </div>
      </div>

      {/* Métricas en Tiempo Real */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Participación</p>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <p className="text-4xl font-bold text-green-600">{estadisticasEnVivo.participacion}%</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${estadisticasEnVivo.participacion}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Votos Emitidos</p>
            <Vote className="text-indigo-600" size={20} />
          </div>
          <p className="text-4xl font-bold text-indigo-600">
            {estadisticasEnVivo.votosEmitidos.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            de {estadisticasEnVivo.votantesRegistrados.toLocaleString()} registrados
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Mesas Abiertas</p>
            <CheckCircle className="text-blue-600" size={20} />
          </div>
          <p className="text-4xl font-bold text-blue-600">
            {estadisticasEnVivo.mesasAbiertas.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            de {estadisticasEnVivo.totalMesas.toLocaleString()} totales
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Incidencias</p>
            <AlertCircle className="text-yellow-600" size={20} />
          </div>
          <p className="text-4xl font-bold text-yellow-600">24</p>
          <p className="text-xs text-gray-500 mt-2">15 resueltas, 9 pendientes</p>
        </div>
      </div>

      {/* Panel Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monitor de Actividad */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Monitor en Tiempo Real</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">En vivo</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {actividadReciente.map((actividad, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className={`p-2 rounded-full ${
                    actividad.estado === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {actividad.estado === 'success' ? (
                      <CheckCircle className="text-green-600" size={16} />
                    ) : (
                      <AlertCircle className="text-yellow-600" size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{actividad.accion}</p>
                    <p className="text-sm text-gray-600">Mesa {actividad.mesa}</p>
                  </div>
                  <span className="text-sm text-gray-500 font-mono">{actividad.hora}</span>
                </div>
              ))}
            </div>

            {/* Gráfico de Participación */}
            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-4">Participación por Hora</h4>
              <div className="flex items-end gap-2 h-32">
                {[25, 38, 52, 61, 68, 71].map((valor, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-gradient-to-t from-indigo-600 to-purple-600 rounded-t transition-all duration-500"
                      style={{ height: `${valor}%` }}
                    ></div>
                    <span className="text-xs text-gray-600">{8 + index * 2}h</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Panel de Incidencias */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">Incidencias Reportadas</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {incidencias.map((incidencia) => (
                <div 
                  key={incidencia.id}
                  className={`p-4 rounded-lg border-2 ${
                    incidencia.severidad === 'alta' ? 'border-red-200 bg-red-50' :
                    incidencia.severidad === 'media' ? 'border-yellow-200 bg-yellow-50' :
                    'border-green-200 bg-green-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-1 text-xs font-bold rounded ${
                      incidencia.severidad === 'alta' ? 'bg-red-600 text-white' :
                      incidencia.severidad === 'media' ? 'bg-yellow-600 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      {incidencia.tipo}
                    </span>
                    <span className="text-xs text-gray-600">{incidencia.hora}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800">Mesa {incidencia.mesa}</p>
                  <p className="text-xs text-gray-600 mt-1">{incidencia.descripcion}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Ver Todas las Incidencias
            </button>
          </div>
        </div>
      </div>

      {/* Estado por Distrito */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Estado por Distrito</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { distrito: 'Lima', mesas: 12340, activas: 11234, participacion: 73.5 },
            { distrito: 'Callao', mesas: 5670, activas: 5234, participacion: 69.8 },
            { distrito: 'Arequipa', mesas: 6780, activas: 6445, participacion: 75.2 },
          ].map((distrito, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-bold text-gray-800 mb-3">{distrito.distrito}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Mesas Activas</span>
                  <span className="font-medium">{distrito.activas}/{distrito.mesas}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(distrito.activas / distrito.mesas) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm pt-2">
                  <span className="text-gray-600">Participación</span>
                  <span className="font-bold text-green-600">{distrito.participacion}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex gap-4">
        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
          <Activity size={20} />
          Ver Dashboard Completo
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium">
          <Users size={20} />
          Gestionar Coordinadores
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium">
          <AlertCircle size={20} />
          Centro de Incidencias
        </button>
      </div>
    </div>
  );
};

export default Votacion;