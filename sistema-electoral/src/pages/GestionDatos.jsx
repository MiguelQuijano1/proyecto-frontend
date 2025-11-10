import { useState } from 'react';
import { Search, Filter, Download, Trash2, Edit, CheckCircle, XCircle } from 'lucide-react';

const GestionDatos = () => {
  const [activeTab, setActiveTab] = useState('presidencial');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  // Datos de votantes - Presidencial
  const votantesPresidencial = [
    { id: 1, nombre: 'Juan Pérez Gómez', dni: '72345678', edad: 45, distrito: 'San Isidro', voto: 'Keiko Fujimori', estado: 'Activo' },
    { id: 2, nombre: 'María López Ruiz', dni: '87654321', edad: 38, distrito: 'Miraflores', voto: 'Pedro Castillo', estado: 'Activo' },
    { id: 3, nombre: 'Carlos Mendoza', dni: '45678912', edad: 29, distrito: 'Surco', voto: 'Hernando de Soto', estado: 'Activo' },
    { id: 4, nombre: 'Ana Torres Vega', dni: '78912345', edad: 52, distrito: 'La Molina', voto: 'Yonhy Lescano', estado: 'Inactivo' },
    { id: 5, nombre: 'Pedro Ramírez', dni: '32165498', edad: 33, distrito: 'San Borja', voto: 'Verónika Mendoza', estado: 'Activo' },
    { id: 6, nombre: 'Laura Sánchez', dni: '65498732', edad: 27, distrito: 'Barranco', voto: 'Keiko Fujimori', estado: 'Activo' },
    { id: 7, nombre: 'Diego Morales', dni: '98765432', edad: 61, distrito: 'Magdalena', voto: 'Pedro Castillo', estado: 'Inactivo' },
    { id: 8, nombre: 'Sofía Vargas', dni: '15975348', edad: 24, distrito: 'Pueblo Libre', voto: 'Hernando de Soto', estado: 'Activo' },
  ];

  // Datos de votantes - Regional
  const votantesRegional = [
    { id: 1, nombre: 'Rosa Quispe', dni: '71234567', edad: 40, region: 'Lima', voto: 'Rafael López Aliaga', estado: 'Activo' },
    { id: 2, nombre: 'Miguel Huamán', dni: '82345678', edad: 55, region: 'Arequipa', voto: 'Kimberly Gutiérrez', estado: 'Activo' },
    { id: 3, nombre: 'Carmen Rojas', dni: '73456789', edad: 31, region: 'Cusco', voto: 'Werner Salcedo', estado: 'Inactivo' },
    { id: 4, nombre: 'José Ccallocnto', dni: '84567890', edad: 48, region: 'Piura', voto: 'Servando García', estado: 'Activo' },
    { id: 5, nombre: 'Elena Mamani', dni: '75678901', edad: 36, region: 'La Libertad', voto: 'César Acuña', estado: 'Activo' },
  ];

  // Datos de votantes - Distrital
  const votantesDistrital = [
    { id: 1, nombre: 'Luis Fernández', dni: '70123456', edad: 42, distrito: 'San Isidro', voto: 'Nancy Vizurraga', estado: 'Activo' },
    { id: 2, nombre: 'Patricia Díaz', dni: '81234567', edad: 39, distrito: 'Miraflores', voto: 'Luis Molina', estado: 'Activo' },
    { id: 3, nombre: 'Andrés Castro', dni: '72345679', edad: 28, distrito: 'San Borja', voto: 'Marco Álvarez', estado: 'Inactivo' },
    { id: 4, nombre: 'Gloria Paredes', dni: '83456780', edad: 51, distrito: 'La Molina', voto: 'Álvaro Paz', estado: 'Activo' },
    { id: 5, nombre: 'Roberto Ortiz', dni: '74567891', edad: 35, distrito: 'Surco', voto: 'Carla García', estado: 'Inactivo' },
  ];

  // Datos según pestaña
  const currentData = activeTab === 'presidencial' ? votantesPresidencial :
                      activeTab === 'regional' ? votantesRegional : votantesDistrital;

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentData.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const getEstadoColor = (estado) => {
    return estado === 'Activo'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const getEstadoIcon = (estado) => {
    return estado === 'Activo'
      ? <CheckCircle size={14} className="text-green-600" />
      : <XCircle size={14} className="text-red-600" />;
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Título y pestañas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Registro de Votantes por Nivel Electoral</h2>
        
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          <button
            onClick={() => { setActiveTab('presidencial'); setSelectedRows([]); setSearchTerm(''); }}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-all ${
              activeTab === 'presidencial'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-indigo-600'
            }`}
          >
            Presidencial
          </button>
          <button
            onClick={() => { setActiveTab('regional'); setSelectedRows([]); setSearchTerm(''); }}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-all ${
              activeTab === 'regional'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-indigo-600'
            }`}
          >
            Regional
          </button>
          <button
            onClick={() => { setActiveTab('distrital'); setSelectedRows([]); setSearchTerm(''); }}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-all ${
              activeTab === 'distrital'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-indigo-600'
            }`}
          >
            Distrital
          </button>
        </div>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Votantes</p>
          <p className="text-3xl font-bold text-gray-800">{currentData.length}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Activos</p>
          <p className="text-3xl font-bold text-green-600">
            {currentData.filter(d => d.estado === 'Activo').length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Inactivos</p>
          <p className="text-3xl font-bold text-red-600">
            {currentData.filter(d => d.estado === 'Inactivo').length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Seleccionados</p>
          <p className="text-3xl font-bold text-indigo-600">{selectedRows.length}</p>
        </div>
      </div>

      {/* Tabla Principal */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="text-lg font-bold text-gray-800">
              {activeTab === 'presidencial' && 'Votantes - Elección Presidencial'}
              {activeTab === 'regional' && 'Votantes - Elección Regional'}
              {activeTab === 'distrital' && 'Votantes - Elección Distrital'}
            </h3>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar por DNI o nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                />
              </div>

              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={18} />
                <span className="hidden md:inline">Filtros</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Download size={18} />
                <span className="hidden md:inline">Exportar</span>
              </button>
            </div>
          </div>

          {/* Acciones en lote */}
          {selectedRows.length > 0 && (
            <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-between">
              <span className="text-sm font-medium text-indigo-800">
                {selectedRows.length} votante(s) seleccionado(s)
              </span>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm bg-white border border-indigo-300 text-indigo-700 rounded hover:bg-indigo-50 flex items-center gap-1">
                  <Edit size={16} /> Editar
                </button>
                <button className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1">
                  <Trash2 size={16} /> Eliminar
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
                    checked={selectedRows.length === currentData.length && currentData.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">DNI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nombre Completo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Edad</th>
                {activeTab !== 'regional' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    {activeTab === 'distrital' || activeTab === 'presidencial' ? 'Distrito' : 'Región'}
                  </th>
                )}
                {activeTab === 'regional' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Región</th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Votó por</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData
                .filter(row => 
                  row.dni.includes(searchTerm) || 
                  row.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.dni}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">{row.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.edad}</td>
                    {activeTab !== 'regional' && (
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {row.distrito || row.region}
                      </td>
                    )}
                    {activeTab === 'regional' && (
                      <td className="px-6 py-4 text-sm text-gray-600">{row.region}</td>
                    )}
                    <td className="px-6 py-4 text-sm font-medium text-indigo-700">{row.voto}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(row.estado)}`}>
                        {getEstadoIcon(row.estado)}
                        {row.estado}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-medium">1</span> a <span className="font-medium">{currentData.length}</span> de{' '}
            <span className="font-medium">{currentData.length}</span> registros
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-white transition-colors">Anterior</button>
            <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">1</button>
            <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-white transition-colors">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionDatos;