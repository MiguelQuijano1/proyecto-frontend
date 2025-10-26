import { Users, FileText, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Votantes',
      value: '125,430',
      change: '+12.5%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Registros Cargados',
      value: '45,230',
      change: '+8.2%',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Datos Procesados',
      value: '98.5%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Validación Completa',
      value: '42,100',
      change: '+5.3%',
      icon: CheckCircle,
      color: 'bg-orange-500'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'Carga de datos CSV', time: 'Hace 5 minutos', status: 'success' },
    { id: 2, action: 'Limpieza de duplicados', time: 'Hace 15 minutos', status: 'success' },
    { id: 3, action: 'Análisis estadístico', time: 'Hace 1 hora', status: 'warning' },
    { id: 4, action: 'Exportación de reportes', time: 'Hace 2 horas', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</h3>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráficos y Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resumen de Datos */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Resumen de Calidad de Datos</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Registros Válidos</span>
                <span className="text-sm font-medium text-gray-800">93%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '93%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Datos Completos</span>
                <span className="text-sm font-medium text-gray-800">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '87%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Sin Duplicados</span>
                <span className="text-sm font-medium text-gray-800">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{width: '95%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Formato Correcto</span>
                <span className="text-sm font-medium text-gray-800">99%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{width: '99%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-1 rounded-full ${
                  activity.status === 'success' ? 'bg-green-100' :
                  activity.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  {activity.status === 'success' ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : (
                    <AlertCircle size={16} className="text-yellow-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertas del Sistema */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Alertas del Sistema</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="text-yellow-600" size={20} />
            <div>
              <p className="text-sm font-medium text-gray-800">Registros pendientes de validación</p>
              <p className="text-xs text-gray-600">3,130 registros requieren revisión manual</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <CheckCircle className="text-blue-600" size={20} />
            <div>
              <p className="text-sm font-medium text-gray-800">Actualización disponible</p>
              <p className="text-xs text-gray-600">Nueva versión del sistema de análisis disponible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;