import { useState } from 'react';
import { UserPlus, Search, Filter, Edit, Trash2, Eye, Award, Users, TrendingUp } from 'lucide-react';

const Candidatos = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');

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
      popularidad: 85,
      estado: 'Activo',
      color: 'from-blue-500 to-cyan-500'
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
      popularidad: 78,
      estado: 'Activo',
      color: 'from-green-500 to-emerald-500'
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
      popularidad: 65,
      estado: 'Activo',
      color: 'from-purple-500 to-pink-500'
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
      popularidad: 72,
      estado: 'Pendiente',
      color: 'from-orange-500 to-red-500'
    },
  ];

  const estadisticas = [
    { label: 'Total Candidatos', value: '145', icon: Users, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Presidenciales', value: '8', icon: Award, gradient: 'from-purple-500 to-pink-500' },
    { label: 'Congresistas', value: '120', icon: Users, gradient: 'from-green-500 to-emerald-500' },
    { label: 'Regionales', value: '17', icon: TrendingUp, gradient: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gestión de Candidatos</h1>
            <p className="text-white/90">Administra y supervisa todos los candidatos electorales</p>
          </div>
          <button
            onClick={() => {
              setModalType('add');
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl hover:scale-105 transition-transform shadow-xl font-semibold"
          >
            <UserPlus size={20} />
            Nuevo Candidato
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {estadisticas.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-effect rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filtros mejorados */}
      <div className="glass-effect p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Buscar candidato por nombre, DNI o partido..."
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 font-medium">
              <Filter size={18} />
              Filtrar
            </button>
          </div>
        </div>
      </div>

      {/* Grid de Candidatos Mejorado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidatos.map((candidato) => (
          <div 
            key={candidato.id} 
            className="group relative glass-effect rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            {/* Header con gradiente */}
            <div className={`h-32 bg-gradient-to-br ${candidato.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  candidato.estado === 'Activo' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-yellow-500 text-white'
                } shadow-lg`}>
                  {candidato.estado}
                </span>
              </div>
            </div>

            <div className="p-6 -mt-16 relative z-10">
              {/* Avatar */}
              <div className="w-24 h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-5xl mb-4 group-hover:scale-110 transition-transform">
                {candidato.foto}
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-slate-800 mb-1">{candidato.nombre}</h3>
              <p className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                {candidato.partido}
              </p>
              <p className="text-sm text-slate-600 mb-4">Cargo: {candidato.cargo}</p>

              {/* Popularidad */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Popularidad</span>
                  <span className="font-bold text-indigo-600">{candidato.popularidad}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${candidato.color} transition-all duration-1000`}
                    style={{width: `${candidato.popularidad}%`}}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-slate-50 rounded-xl">
                <div className="text-center">
                  <p className="text-xs text-slate-600">DNI</p>
                  <p className="text-sm font-bold text-slate-800">{candidato.dni}</p>
                </div>
                <div className="text-center border-x border-slate-200">
                  <p className="text-xs text-slate-600">Edad</p>
                  <p className="text-sm font-bold text-slate-800">{candidato.edad}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-600">Propuestas</p>
                  <p className="text-sm font-bold text-slate-800">{candidato.propuestas}</p>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all font-medium">
                  <Eye size={16} />
                  Ver
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-all font-medium">
                  <Edit size={16} />
                  Editar
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Candidatos;