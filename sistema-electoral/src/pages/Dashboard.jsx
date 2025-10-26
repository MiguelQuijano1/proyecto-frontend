import { Users, FileText, TrendingUp, CheckCircle, AlertCircle, Zap, Activity, ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Votantes',
      value: '125,430',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      shadowColor: 'shadow-blue-500/50'
    },
    {
      title: 'Registros Cargados',
      value: '45,230',
      change: '+8.2%',
      trend: 'up',
      icon: FileText,
      gradient: 'from-green-500 to-emerald-500',
      shadowColor: 'shadow-green-500/50'
    },
    {
      title: 'Datos Procesados',
      value: '98.5%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
      shadowColor: 'shadow-purple-500/50'
    },
    {
      title: 'Validación Completa',
      value: '42,100',
      change: '+5.3%',
      trend: 'up',
      icon: CheckCircle,
      gradient: 'from-orange-500 to-red-500',
      shadowColor: 'shadow-orange-500/50'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'Carga de datos CSV', time: 'Hace 5 minutos', status: 'success', icon: '📊' },
    { id: 2, action: 'Limpieza de duplicados', time: 'Hace 15 minutos', status: 'success', icon: '🧹' },
    { id: 3, action: 'Análisis estadístico', time: 'Hace 1 hora', status: 'warning', icon: '📈' },
    { id: 4, action: 'Exportación de reportes', time: 'Hace 2 horas', status: 'success', icon: '📄' },
  ];

  const qualityMetrics = [
    { label: 'Registros Válidos', value: 93, color: 'from-green-500 to-emerald-500' },
    { label: 'Datos Completos', value: 87, color: 'from-blue-500 to-cyan-500' },
    { label: 'Sin Duplicados', value: 95, color: 'from-purple-500 to-pink-500' },
    { label: 'Formato Correcto', value: 99, color: 'from-indigo-500 to-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Bienvenida con efecto hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-yellow-300 animate-pulse" size={32} />
            <h1 className="text-3xl font-bold text-white">¡Bienvenido al Sistema Electoral!</h1>
          </div>
          <p className="text-white/90 text-lg max-w-2xl">
            Gestiona todo el proceso electoral de manera eficiente y transparente. Sistema actualizado en tiempo real.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg">
              Ver Tutorial
            </button>
            <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-colors">
              Documentación
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              style={{animationDelay: `${index * 100}ms`}}
            >
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Borde gradiente animado */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`}></div>
              
              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-2">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</h3>
                  <div className="flex items-center gap-2">
                    {stat.trend === 'up' ? (
                      <ArrowUp className="text-green-500" size={16} />
                    ) : (
                      <ArrowDown className="text-red-500" size={16} />
                    )}
                    <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg ${stat.shadowColor} group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>

              {/* Mini sparkline effect */}
              <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`} style={{width: '70%'}}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráficos y Actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calidad de Datos - Mejorado */}
        <div className="lg:col-span-2 glass-effect rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent">
              Calidad de Datos
            </h3>
            <Activity className="text-indigo-600 animate-pulse" size={24} />
          </div>
          
          <div className="space-y-5">
            {qualityMetrics.map((metric, index) => (
              <div key={index} className="group">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">{metric.label}</span>
                  <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {metric.value}%
                  </span>
                </div>
                <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 ease-out relative`}
                    style={{width: `${metric.value}%`}}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicador general */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={24} />
              <div>
                <p className="font-semibold text-green-800">Calidad Excelente</p>
                <p className="text-sm text-green-700">Todos los indicadores dentro de rangos óptimos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actividad Reciente - Mejorada */}
        <div className="glass-effect rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent mb-6">
            Actividad Reciente
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/50 transition-all group cursor-pointer"
              >
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                    {activity.action}
                  </p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                } group-hover:scale-150 transition-transform`}></div>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
            Ver todo el historial →
          </button>
        </div>
      </div>

      {/* Alertas del Sistema - Mejoradas */}
      <div className="glass-effect rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent mb-6">
          Alertas del Sistema
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group relative overflow-hidden p-5 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl hover:shadow-lg transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200/30 rounded-full blur-2xl"></div>
            <div className="relative flex items-start gap-4">
              <div className="p-3 bg-yellow-500 rounded-xl group-hover:rotate-12 transition-transform">
                <AlertCircle className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-yellow-900 mb-1">Registros pendientes de validación</p>
                <p className="text-xs text-yellow-700">3,130 registros requieren revisión manual</p>
                <button className="mt-3 px-4 py-1.5 bg-yellow-500 text-white text-xs font-semibold rounded-lg hover:bg-yellow-600 transition-colors">
                  Revisar ahora
                </button>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl hover:shadow-lg transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl"></div>
            <div className="relative flex items-start gap-4">
              <div className="p-3 bg-blue-500 rounded-xl group-hover:rotate-12 transition-transform">
                <CheckCircle className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-blue-900 mb-1">Actualización disponible</p>
                <p className="text-xs text-blue-700">Nueva versión del sistema de análisis disponible</p>
                <button className="mt-3 px-4 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Nuevo Registro', icon: '➕', color: 'from-green-500 to-emerald-500' },
          { title: 'Generar Reporte', icon: '📊', color: 'from-blue-500 to-cyan-500' },
          { title: 'Ver Estadísticas', icon: '📈', color: 'from-purple-500 to-pink-500' },
        ].map((action, index) => (
          <button
            key={index}
            className={`group relative overflow-hidden p-6 bg-gradient-to-br ${action.color} rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300`}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="relative flex items-center gap-4">
              <span className="text-4xl group-hover:scale-110 transition-transform">{action.icon}</span>
              <span className="text-xl font-bold text-white">{action.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;