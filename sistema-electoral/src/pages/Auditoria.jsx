import { useState } from 'react';
import { Shield, Search, Filter, Eye, Download, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const Auditoria = () => {
  const [filtroTipo, setFiltroTipo] = useState('todos');

  const registrosAuditoria = [
    {
      id: 1,
      usuario: 'Admin Electoral',
      accion: 'Inicio de sesión',
      modulo: 'Sistema',
      detalle: 'Acceso exitoso al sistema',
      ip: '192.168.1.100',
      fecha: '2024-10-25 14:35:22',
      tipo: 'Acceso',
      estado: 'Éxito'
    },
    {
      id: 2,
      usuario: 'Carlos Méndez',
      accion: 'Modificación de datos',
      modulo: 'Candidatos',
      detalle: 'Actualización de información del candidato ID: 1234',
      ip: '192.168.1.105',
      fecha: '2024-10-25 14:28:15',
      tipo: 'Modificación',
      estado: 'Éxito'
    },
    {
      id: 3,
      usuario: 'Ana Torres',
      accion: 'Carga de datos',
      modulo: 'Padrón Electoral',
      detalle: 'Importación de 5,430 registros desde CSV',
      ip: '192.168.1.110',
      fecha: '2024-10-25 13:45:33',
      tipo: 'Carga',
      estado: 'Éxito'
    },
    {
      id: 4,
      usuario: 'Sistema',
      accion: 'Respaldo automático',
      modulo: 'Base de Datos',
      detalle: 'Backup automático programado ejecutado',
      ip: 'localhost',
      fecha: '2024-10-25 12:00:00',
      tipo: 'Sistema',
      estado: 'Éxito'
    },
    {
      id: 5,
      usuario: 'Pedro García',
      accion: 'Intento de acceso',
      modulo: 'Sistema',
      detalle: 'Intento fallido - Credenciales incorrectas',
      ip: '192.168.1.150',
      fecha: '2024-10-25 11:23:45',
      tipo: 'Acceso',
      estado: 'Fallido'
    },
    {
      id: 6,
      usuario: 'Admin Electoral',
      accion: 'Eliminación de registro',
      modulo: 'Mesas de Votación',
      detalle: 'Eliminación de mesa duplicada ID: 5678',
      ip: '192.168.1.100',
      fecha: '2024-10-25 10:15:20',
      tipo: 'Eliminación',
      estado: 'Éxito'
    },
  ];

  const estadisticasAuditoria = [
    { label: 'Total Eventos', value: '15,847', icon: Shield, color: 'indigo' },
    { label: 'Eventos Hoy', value: '234', icon: Clock, color: 'blue' },
    { label: 'Acciones Exitosas', value: '15,652', icon: CheckCircle, color: 'green' },
    { label: 'Alertas de Seguridad', value: '12', icon: AlertTriangle, color: 'red' },
  ];

  const tiposAccion = ['todos', 'Acceso', 'Modificación', 'Carga', 'Eliminación', 'Sistema'];

  const registrosFiltrados = filtroTipo === 'todos' 
    ? registrosAuditoria 
    : registrosAuditoria.filter(r => r.tipo === filtroTipo);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl shadow-lg text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Shield size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Sistema de Auditoría</h2>
              <p className="text-sm opacity-90 mt-1">Registro y monitoreo de actividades del sistema</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
            <Download size={18} />
            Exportar Log
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {estadisticasAuditoria.map((stat, index) => {
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

      {/* Filtros */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Usuario, acción, módulo..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Inicio</label>
            <input
              type="datetime-local"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Fin</label>
            <input
              type="datetime-local"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Filtros por Tipo */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Filtrar por Tipo de Acción</h3>
        <div className="flex flex-wrap gap-3">
          {tiposAccion.map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltroTipo(tipo)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                filtroTipo === tipo
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de Registros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">Registro de Actividades</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Fecha/Hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Acción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Módulo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">IP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Detalles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {registrosFiltrados.map((registro) => (
                <tr key={registro.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{registro.fecha}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{registro.usuario}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{registro.accion}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{registro.modulo}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{registro.ip}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      registro.estado === 'Éxito' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {registro.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm">
                      <Eye size={14} />
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">Mostrando 6 de 15,847 registros</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">Anterior</button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">Siguiente</button>
          </div>
        </div>
      </div>

      {/* Alertas de Seguridad */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Alertas de Seguridad Recientes</h3>
        <div className="space-y-3">
          {[
            { tipo: 'Intento de acceso fallido', detalles: '3 intentos desde IP: 192.168.1.150', severidad: 'media', tiempo: 'Hace 2 horas' },
            { tipo: 'Modificación no autorizada', detalles: 'Intento de acceso a módulo restringido', severidad: 'alta', tiempo: 'Hace 5 horas' },
          ].map((alerta, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-2 ${
                alerta.severidad === 'alta' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className={
                  alerta.severidad === 'alta' ? 'text-red-600' : 'text-yellow-600'
                } size={20} />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{alerta.tipo}</h4>
                  <p className="text-sm text-gray-600 mt-1">{alerta.detalles}</p>
                  <p className="text-xs text-gray-500 mt-2">{alerta.tiempo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auditoria;