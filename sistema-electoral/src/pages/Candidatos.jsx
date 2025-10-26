import { useState } from 'react';
import { UserPlus, Search, Filter, Edit, Trash2, Eye, Award, Users } from 'lucide-react';

const Candidatos = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' o 'edit'

  const candidatos = [
    {
      id: 1,
      nombre: 'Juan Carlos Pérez',
      partido: 'Partido Democrático',
      cargo: 'Presidente',
      foto: '👨‍💼',
      dni: '12345678',
      edad: 55,
      propuestas: 15,
      estado: 'Activo'
    },
    {
      id: 2,
      nombre: 'María González',
      partido: 'Movimiento Popular',
      cargo: 'Vicepresidente',
      foto: '👩‍💼',
      dni: '87654321',
      edad: 48,
      propuestas: 12,
      estado: 'Activo'
    },
    {
      id: 3,
      nombre: 'Carlos Rodríguez',
      partido: 'Partido Nacional',
      cargo: 'Congresista',
      foto: '👨‍💼',
      dni: '45678912',
      edad: 42,
      propuestas: 8,
      estado: 'Activo'
    },
    {
      id: 4,
      nombre: 'Ana María Torres',
      partido: 'Frente Progresista',
      cargo: 'Congresista',
      foto: '👩‍💼',
      dni: '78912345',
      edad: 39,
      propuestas: 10,
      estado: 'Pendiente'
    },
  ];

  const estadisticas = [
    { label: 'Total Candidatos', value: '145', icon: Users, color: 'blue' },
    { label: 'Presidenciales', value: '8', icon: Award, color: 'purple' },
    { label: 'Congresistas', value: '120', icon: Users, color: 'green' },
    { label: 'Regionales', value: '17', icon: Users, color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {estadisticas.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                  <Icon className={`text-${stat.color}-600`} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Acciones y Filtros */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar candidato por nombre, DNI o partido..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={18} />
              Filtrar
            </button>
          </div>
          <button
            onClick={() => {
              setModalType('add');
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <UserPlus size={18} />
            Nuevo Candidato
          </button>
        </div>
      </div>

      {/* Lista de Candidatos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidatos.map((candidato) => (
          <div key={candidato.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-24"></div>
            <div className="p-6 -mt-12">
              <div className="flex items-start justify-between">
                <div className="text-6xl bg-white rounded-full p-2 shadow-lg">
                  {candidato.foto}
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  candidato.estado === 'Activo' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {candidato.estado}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-800">{candidato.nombre}</h3>
                <p className="text-sm text-indigo-600 font-medium mt-1">{candidato.partido}</p>
                <p className="text-sm text-gray-600 mt-1">Cargo: {candidato.cargo}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-600">DNI</p>
                  <p className="text-sm font-medium text-gray-800">{candidato.dni}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600">Edad</p>
                  <p className="text-sm font-medium text-gray-800">{candidato.edad}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600">Propuestas</p>
                  <p className="text-sm font-medium text-gray-800">{candidato.propuestas}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <Eye size={16} />
                  Ver
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                  <Edit size={16} />
                  Editar
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros por Cargo */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Filtrar por Cargo</h3>
        <div className="flex flex-wrap gap-3">
          {['Todos', 'Presidente', 'Vicepresidente', 'Congresista', 'Alcalde', 'Regidor'].map((cargo) => (
            <button
              key={cargo}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
            >
              {cargo}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Candidatos;