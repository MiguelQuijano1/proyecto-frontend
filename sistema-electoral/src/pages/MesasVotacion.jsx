import { useState } from 'react';
import { MapPin, Search, Plus, Users, Building, CheckCircle, AlertCircle } from 'lucide-react';

const MesasVotacion = () => {
  const [vistaActual, setVistaActual] = useState('locales'); // 'locales' o 'mesas'

  const locales = [
    {
      id: 1,
      nombre: 'I.E. José Carlos Mariátegui',
      distrito: 'Lima',
      direccion: 'Av. Principal 456',
      mesas: 45,
      capacidad: 1800,
      estado: 'Habilitado',
      responsable: 'Carlos Méndez'
    },
    {
      id: 2,
      nombre: 'C.E. San Martín de Porres',
      distrito: 'Callao',
      direccion: 'Jr. Los Andes 789',
      mesas: 38,
      capacidad: 1520,
      estado: 'Habilitado',
      responsable: 'Ana Torres'
    },
    {
      id: 3,
      nombre: 'Universidad Nacional',
      distrito: 'Arequipa',
      direccion: 'Av. Universitaria 123',
      mesas: 52,
      capacidad: 2080,
      estado: 'En Revisión',
      responsable: 'Pedro García'
    },
  ];

  const mesas = [
    {
      id: 1,
      numero: '001234',
      local: 'I.E. José Carlos Mariátegui',
      miembros: 3,
      votantes: 40,
      estado: 'Completa'
    },
    {
      id: 2,
      numero: '001235',
      local: 'I.E. José Carlos Mariátegui',
      miembros: 3,
      votantes: 40,
      estado: 'Completa'
    },
    {
      id: 3,
      numero: '001236',
      local: 'C.E. San Martín de Porres',
      miembros: 2,
      votantes: 40,
      estado: 'Incompleta'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Locales de Votación</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">1,245</p>
            </div>
            <Building className="text-indigo-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Mesas Instaladas</p>
              <p className="text-3xl font-bold text-green-600 mt-2">34,567</p>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Miembros de Mesa</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">103,701</p>
            </div>
            <Users className="text-purple-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Revisión</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">87</p>
            </div>
            <AlertCircle className="text-yellow-600" size={32} />
          </div>
        </div>
      </div>

      {/* Selector de Vista */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setVistaActual('locales')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                vistaActual === 'locales'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Locales de Votación
            </button>
            <button
              onClick={() => setVistaActual('mesas')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                vistaActual === 'mesas'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mesas de Votación
            </button>
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Plus size={18} />
            {vistaActual === 'locales' ? 'Agregar Local' : 'Agregar Mesa'}
          </button>
        </div>
      </div>

      {/* Buscador */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={`Buscar ${vistaActual === 'locales' ? 'local' : 'mesa'}...`}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Vista de Locales */}
      {vistaActual === 'locales' && (
        <div className="space-y-4">
          {locales.map((local) => (
            <div key={local.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <Building className="text-indigo-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{local.nombre}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <MapPin size={14} />
                          <span>{local.direccion}, {local.distrito}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        local.estado === 'Habilitado'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {local.estado}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600">Mesas</p>
                        <p className="text-lg font-bold text-gray-800">{local.mesas}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600">Capacidad</p>
                        <p className="text-lg font-bold text-gray-800">{local.capacidad}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600">Responsable</p>
                        <p className="text-sm font-medium text-gray-800">{local.responsable}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 text-sm font-medium">
                          Ver Mesas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vista de Mesas */}
      {vistaActual === 'mesas' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">N° Mesa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Local de Votación</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Miembros</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Votantes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mesas.map((mesa) => (
                  <tr key={mesa.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{mesa.numero}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{mesa.local}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{mesa.miembros}/3</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{mesa.votantes}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        mesa.estado === 'Completa'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {mesa.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mapa de Distribución */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Distribución por Distrito</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { distrito: 'Lima', locales: 456, mesas: 12340 },
            { distrito: 'Callao', locales: 189, mesas: 5670 },
            { distrito: 'Arequipa', locales: 234, mesas: 6780 },
            { distrito: 'Cusco', locales: 156, mesas: 4560 },
          ].map((item, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
              <p className="text-sm font-medium text-gray-700">{item.distrito}</p>
              <p className="text-2xl font-bold text-indigo-900 mt-2">{item.locales}</p>
              <p className="text-xs text-gray-600 mt-1">Locales</p>
              <p className="text-sm font-semibold text-purple-700 mt-2">{item.mesas} mesas</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MesasVotacion;