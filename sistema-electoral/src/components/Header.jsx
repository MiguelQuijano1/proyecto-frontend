import { Bell, Search, User } from 'lucide-react';

const Header = ({ activeSection, sidebarOpen }) => {
  const getPageInfo = () => {
    const pages = {
      'dashboard': { title: 'Dashboard', subtitle: 'Vista general del sistema' },
      'candidatos': { title: 'Candidatos', subtitle: 'Gestión de candidatos electorales' },
      'partidos': { title: 'Partidos Políticos', subtitle: 'Registro de organizaciones políticas' },
      'votantes': { title: 'Padrón Electoral', subtitle: 'Base de datos de votantes registrados' },
      'mesas': { title: 'Mesas de Votación', subtitle: 'Organización de locales y mesas' },
      'votacion': { title: 'Proceso de Votación', subtitle: 'Gestión del día electoral' },
      'resultados': { title: 'Resultados Electorales', subtitle: 'Escrutinio y resultados' },
      'datos': { title: 'Gestión de Datos', subtitle: 'Administración de bases de datos' },
      'carga': { title: 'Importar Datos', subtitle: 'Carga masiva de información' },
      'limpieza': { title: 'Limpieza de Datos', subtitle: 'Validación y corrección' },
      'analisis': { title: 'Análisis Estadístico', subtitle: 'Análisis y métricas electorales' },
      'visualizacion': { title: 'Visualización', subtitle: 'Gráficos y reportes visuales' },
      'reportes': { title: 'Reportes', subtitle: 'Generación de informes' },
      'auditoria': { title: 'Auditoría', subtitle: 'Registro de actividades del sistema' },
      'configuracion': { title: 'Configuración', subtitle: 'Ajustes del sistema' },
    };
    return pages[activeSection] || { title: 'Dashboard', subtitle: 'Vista general' };
  };

  const pageInfo = getPageInfo();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="px-8 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{pageInfo.title}</h2>
          <p className="text-sm text-gray-500">{pageInfo.subtitle}</p>
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
              <p className="text-sm font-medium text-gray-700">Admin Electoral</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;