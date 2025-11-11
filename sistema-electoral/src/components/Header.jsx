import { Bell, Search, User, ChevronDown } from 'lucide-react';

const Header = ({ activeSection, sidebarOpen }) => {
  const getPageInfo = () => {
    const pages = {
      'dashboard': { title: 'Dashboard', subtitle: 'Vista general del sistema', icon: '📊' },
      'candidatos': { title: 'Candidatos', subtitle: 'Gestión de candidatos electorales', icon: '👥' },
      'partidos': { title: 'Partidos Políticos', subtitle: 'Registro de organizaciones políticas', icon: '🏛️' },
      'votantes': { title: 'Padrón Electoral', subtitle: 'Base de datos de votantes registrados', icon: '📋' },
      'mesas': { title: 'Mesas de Votación', subtitle: 'Organización de locales y mesas', icon: '🗳️' },
      'votacion': { title: 'Proceso de Votación', subtitle: 'Gestión del día electoral', icon: '✅' },
      'resultados': { title: 'Resultados Electorales', icon: '📈' },
      'datos': { title: 'Gestión de Datos', subtitle: 'Administración de bases de datos', icon: '💾' },
      'carga': { title: 'Importar Datos', subtitle: 'Carga masiva de información', icon: '📤' },
      'limpieza': { title: 'Limpieza de Datos', subtitle: 'Validación y corrección', icon: '🧹' },
      'analisis': { title: 'Análisis Estadístico', subtitle: 'Análisis y métricas electorales', icon: '📊' },
      'visualizacion': { title: 'Visualización', subtitle: 'Gráficos y reportes visuales', icon: '📉' },
      'reportes': { title: 'Reportes', subtitle: 'Generación de informes', icon: '📄' },
      'auditoria': { title: 'Auditoría', subtitle: 'Registro de actividades del sistema', icon: '🔒' },
      'configuracion': { title: 'Configuración', subtitle: 'Ajustes del sistema', icon: '⚙️' },
    };
    return pages[activeSection] || { title: 'Dashboard', subtitle: 'Vista general', icon: '📊' };
  };

  const pageInfo = getPageInfo();

  return (
    <header className="glass-effect sticky top-0 z-20 border-b border-white/20">
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Título de la página */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/30">
            {pageInfo.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent">
              {pageInfo.title}
            </h2>
            <p className="text-sm text-slate-600">{pageInfo.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Usuario */}
          <button className="flex items-center gap-3 p-2 pr-4 hover:bg-white/50 rounded-xl transition-all group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
              <User size={20} className="text-white" />
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-sm font-semibold text-slate-700">Admin Electoral</p>
              <p className="text-xs text-slate-500">Administrador</p>
            </div>
            <ChevronDown size={16} className="text-slate-400 group-hover:rotate-180 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;