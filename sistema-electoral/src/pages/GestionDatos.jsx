import { useState } from 'react';
import { Search, Filter, Download, Trash2, Edit, Eye, MoreVertical } from 'lucide-react';

const GestionDatos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  // Datos de ejemplo
  const data = [
    { id: 1, nombre: 'Juan Pérez', dni: '12345678', edad: 35, distrito: 'Lima', estado: 'Activo' },
    { id: 2, nombre: 'María García', dni: '87654321', edad: 28, distrito: 'Callao', estado: 'Activo' },
    { id: 3, nombre: 'Carlos López', dni: '45678912', edad: 42, distrito: 'Arequipa', estado: 'Pendiente' },
    { id: 4, nombre: 'Ana Martínez', dni: '78912345', edad: 31, distrito: 'Cusco', estado: 'Activo' },
    { id: 5, nombre: 'Pedro Sánchez', dni: '32165498', edad: 39, distrito: 'Lima', estado: 'Inactivo' },
    { id: 6, nombre: 'Laura Torres', dni: '65498732', edad: 26, distrito: 'Trujillo', estado: 'Activo' },
    { id: 7, nombre: 'Diego Ramírez', dni: '98765432', edad: 45, distrito: 'Lima', estado: 'Activo' },
    { id: 8, nombre: 'Sofia Vargas', dni: '15975348', edad: 33, distrito: 'Piura', estado: 'Pendiente' },
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'Activo': return 'bg-green-100 text-green-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Inactivo': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Registros</p>
          <p className="text-2xl font-bold text-gray-800">{data.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Activos</p>
          <p className="text-2xl font-bold text-green-600">
            {data.filter(d => d.estado === 'Activo').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-600">
            {data.filter(d => d.estado === 'Pendiente').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Seleccionados</p>
          <p className="text-2xl font-bold text-indigo-600">{selectedRows.length}</p>
        </div>
      </div>

      {/* Tabla de Datos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header de la Tabla */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="text-lg font-bold text-gray-800">Registro de Votantes</h3>
            
            <div className="flex items-center gap-3">
              {/* Búsqueda */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Filtros */}
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={18} />
                <span className="hidden md:inline">Filtros</span>
              </button>

              {/* Exportar */}
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Download size={18} />
                <span className="hidden md:inline">Exportar</span>
              </button>
            </div>
          </div>

          {/* Acciones en Lote */}
          {selectedRows.length > 0 && (
            <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-between">
              <span className="text-sm text-indigo-800 font-medium">
                {selectedRows.length} registro(s) seleccionado(s)
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-white border border-indigo-300 text-indigo-700 rounded hover:bg-indigo-50 transition-colors">
                  Editar
                </button>
                <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === data.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">DNI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Edad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Distrito</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{row.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{row.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.dni}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.edad}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row.distrito}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEstadoColor(row.estado)}`}>
                      {row.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando <span className="font-medium">1</span> a <span className="font-medium">8</span> de{' '}
            <span className="font-medium">{data.length}</span> registros
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
              Anterior
            </button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionDatos;