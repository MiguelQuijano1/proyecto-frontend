import { Bell, Search, User } from 'lucide-react';

const Header = ({ activeSection, sidebarOpen }) => {
  const getPageTitle = () => {
    const titles = {
      'dashboard': 'Dashboard',
      'datos': 'Gestión de Datos',
      'carga': 'Cargar Datos',
      'limpieza': 'Limpieza de Datos',
      'analisis': 'Análisis Estadístico',
      'visualizacion': 'Visualización de Datos',
      'votantes': 'Registro de Votantes'
    };
    return titles[activeSection] || 'Dashboard';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="px-8 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h2>
          <p className="text-sm text-gray-500">Sistema de Análisis Electoral 2024</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Barra de Búsqueda */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Notificaciones */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Usuario */}
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium text-gray-700">Admin</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;