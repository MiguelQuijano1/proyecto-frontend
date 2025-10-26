import { 
  BarChart3, Database, FileUp, Settings, Users, TrendingUp, 
  LogOut, Menu, X, Vote, UserCheck, Building2, MapPinned,
  FileText, ShieldCheck, ClipboardList, Home
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }) => {
  const menuSections = [
    {
      title: 'General',
      items: [
        { id: 'dashboard', name: 'Inicio', icon: Home },
      ]
    },
    {
      title: 'Gestión Electoral',
      items: [
        { id: 'candidatos', name: 'Candidatos', icon: UserCheck },
        { id: 'partidos', name: 'Partidos Políticos', icon: Building2 },
        { id: 'votantes', name: 'Padrón Electoral', icon: Users },
        { id: 'mesas', name: 'Mesas de Votación', icon: MapPinned },
        { id: 'votacion', name: 'Proceso de Votación', icon: Vote },
        { id: 'resultados', name: 'Resultados', icon: BarChart3 },
      ]
    },
    {
      title: 'Análisis de Datos',
      items: [
        { id: 'datos', name: 'Gestión de Datos', icon: Database },
        { id: 'carga', name: 'Importar Datos', icon: FileUp },
        { id: 'limpieza', name: 'Limpieza de Datos', icon: Settings },
        { id: 'analisis', name: 'Análisis Estadístico', icon: TrendingUp },
        { id: 'visualizacion', name: 'Visualización', icon: BarChart3 },
      ]
    },
    {
      title: 'Administración',
      items: [
        { id: 'reportes', name: 'Reportes', icon: FileText },
        { id: 'auditoria', name: 'Auditoría', icon: ShieldCheck },
        { id: 'configuracion', name: 'Configuración', icon: ClipboardList },
      ]
    }
  ];

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-900 text-white transition-all duration-300 flex flex-col`}>
      {/* Header del Sidebar */}
      <div className="p-4 flex items-center justify-between border-b border-indigo-800">
        {sidebarOpen && (
          <div>
            <h1 className="text-xl font-bold">ONPE</h1>
            <p className="text-xs text-indigo-300">Sistema Electoral</p>
          </div>
        )}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-indigo-800 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menú de Navegación */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {menuSections.map((section, idx) => (
          <div key={idx} className="mb-6">
            {sidebarOpen && (
              <h3 className="text-xs font-semibold text-indigo-400 uppercase mb-2 px-4">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                        activeSection === item.id
                          ? 'bg-indigo-700 text-white'
                          : 'text-indigo-200 hover:bg-indigo-800'
                      }`}
                      title={!sidebarOpen ? item.name : ''}
                    >
                      <Icon size={20} />
                      {sidebarOpen && <span className="text-sm">{item.name}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-indigo-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-indigo-200 hover:bg-indigo-800 rounded-lg transition-all">
          <LogOut size={20} />
          {sidebarOpen && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;