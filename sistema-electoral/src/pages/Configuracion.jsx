import { useState } from 'react';
import { Settings, Save, Lock, Bell, Database, Users, Globe, Shield } from 'lucide-react';

const Configuracion = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'seguridad', name: 'Seguridad', icon: Lock },
    { id: 'notificaciones', name: 'Notificaciones', icon: Bell },
    { id: 'basedatos', name: 'Base de Datos', icon: Database },
    { id: 'usuarios', name: 'Usuarios', icon: Users },
    { id: 'sistema', name: 'Sistema', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl shadow-lg text-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white bg-opacity-20 rounded-full">
            <Settings size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Configuración del Sistema</h2>
            <p className="text-sm opacity-90 mt-1">Administra los parámetros generales del sistema electoral</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Configuración General */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Información General</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Sistema
                    </label>
                    <input
                      type="text"
                      defaultValue="Sistema Electoral Nacional 2024"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organización
                    </label>
                    <input
                      type="text"
                      defaultValue="ONPE - Oficina Nacional de Procesos Electorales"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email de Contacto
                    </label>
                    <input
                      type="email"
                      defaultValue="contacto@onpe.gob.pe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono de Soporte
                    </label>
                    <input
                      type="tel"
                      defaultValue="+51 1 417-0630"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Parámetros Electorales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Elecciones
                    </label>
                    <input
                      type="date"
                      defaultValue="2024-11-10"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hora de Inicio
                    </label>
                    <input
                      type="time"
                      defaultValue="08:00"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hora de Cierre
                    </label>
                    <input
                      type="time"
                      defaultValue="16:00"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Edad Mínima para Votar
                    </label>
                    <input
                      type="number"
                      defaultValue="18"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Preferencias del Sistema</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                    <div>
                      <p className="font-medium text-gray-800">Modo Mantenimiento</p>
                      <p className="text-sm text-gray-600">Deshabilitar acceso público al sistema</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                    <div>
                      <p className="font-medium text-gray-800">Backup Automático</p>
                      <p className="text-sm text-gray-600">Realizar copias de seguridad diarias</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" className="w-4 h-4 text-indigo-600" />
                    <div>
                      <p className="font-medium text-gray-800">Registro de Auditoría Detallado</p>
                      <p className="text-sm text-gray-600">Guardar logs completos de todas las acciones</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Configuración de Seguridad */}
          {activeTab === 'seguridad' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Políticas de Contraseña</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Longitud Mínima
                    </label>
                    <input
                      type="number"
                      defaultValue="8"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiración (días)
                    </label>
                    <input
                      type="number"
                      defaultValue="90"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Intentos Fallidos Máximos
                    </label>
                    <input
                      type="number"
                      defaultValue="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo de Bloqueo (minutos)
                    </label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Requisitos de Contraseña</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                    <span className="text-gray-800">Requiere letras mayúsculas</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                    <span className="text-gray-800">Requiere números</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                    <span className="text-gray-800">Requiere caracteres especiales</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Autenticación de Dos Factores</h3>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="text-blue-600" size={24} />
                    <div>
                      <p className="font-medium text-gray-800">2FA Habilitado</p>
                      <p className="text-sm text-gray-600">Protección adicional para todas las cuentas</p>
                    </div>
                  </div>
                  <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Configurar 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Configuración de Notificaciones */}
          {activeTab === 'notificaciones' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Notificaciones por Email</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                    <div>
                      <p className="font-medium text-gray-800">Alertas de Seguridad</p>
                      <p className="text-sm text-gray-600">Notificar intentos de acceso sospechosos</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                    <div>
                      <p className="font-medium text-gray-800">Reportes Diarios</p>
                      <p className="text-sm text-gray-600">Resumen diario de actividad del sistema</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" className="w-4 h-4 text-indigo-600" />
                    <div>
                      <p className="font-medium text-gray-800">Actualizaciones del Sistema</p>
                      <p className="text-sm text-gray-600">Notificar cuando hay actualizaciones disponibles</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                    <div>
                      <p className="font-medium text-gray-800">Alertas de Proceso Electoral</p>
                      <p className="text-sm text-gray-600">Eventos importantes durante las elecciones</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Configuración SMTP</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Servidor SMTP
                    </label>
                    <input
                      type="text"
                      defaultValue="smtp.gmail.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Puerto
                    </label>
                    <input
                      type="number"
                      defaultValue="587"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Usuario
                    </label>
                    <input
                      type="email"
                      defaultValue="sistema@onpe.gob.pe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      defaultValue="••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Probar Conexión
                </button>
              </div>
            </div>
          )}

          {/* Configuración de Base de Datos */}
          {activeTab === 'basedatos' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Información de Conexión</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Host
                    </label>
                    <input
                      type="text"
                      defaultValue="localhost"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Puerto
                    </label>
                    <input
                      type="number"
                      defaultValue="5432"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de Base de Datos
                    </label>
                    <input
                      type="text"
                      defaultValue="electoral_db"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Usuario
                    </label>
                    <input
                      type="text"
                      defaultValue="admin_electoral"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Copias de Seguridad</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">Última Copia</p>
                    <p className="text-2xl font-bold text-green-900 mt-2">Hace 2h</p>
                    <p className="text-xs text-green-700 mt-1">25/10/2024 12:00</p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">Tamaño Total</p>
                    <p className="text-2xl font-bold text-blue-900 mt-2">15.7 GB</p>
                    <p className="text-xs text-blue-700 mt-1">42 copias guardadas</p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm text-purple-800 font-medium">Próxima Copia</p>
                    <p className="text-2xl font-bold text-purple-900 mt-2">En 10h</p>
                    <p className="text-xs text-purple-700 mt-1">26/10/2024 00:00</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Crear Backup Ahora
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Restaurar Backup
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Mantenimiento</h3>
                <div className="space-y-3">
                  <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="font-medium text-gray-800">Optimizar Base de Datos</p>
                    <p className="text-sm text-gray-600 mt-1">Reorganizar y optimizar tablas</p>
                  </button>
                  <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="font-medium text-gray-800">Limpiar Logs Antiguos</p>
                    <p className="text-sm text-gray-600 mt-1">Eliminar registros de más de 90 días</p>
                  </button>
                  <button className="w-full p-4 text-left border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                    <p className="font-medium text-red-800">Resetear Base de Datos</p>
                    <p className="text-sm text-red-600 mt-1">⚠️ Acción irreversible - Elimina todos los datos</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Configuración de Usuarios */}
          {activeTab === 'usuarios' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Roles y Permisos</h3>
                <div className="space-y-3">
                  {[
                    { rol: 'Administrador', usuarios: 3, permisos: 'Acceso total al sistema' },
                    { rol: 'Coordinador Electoral', usuarios: 25, permisos: 'Gestión de mesas y votación' },
                    { rol: 'Analista de Datos', usuarios: 12, permisos: 'Acceso a módulos de análisis' },
                    { rol: 'Auditor', usuarios: 8, permisos: 'Solo lectura y reportes' },
                  ].map((rol, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-800">{rol.rol}</p>
                          <p className="text-sm text-gray-600 mt-1">{rol.permisos}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-indigo-600">{rol.usuarios}</p>
                          <p className="text-xs text-gray-600">usuarios</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Límites de Sesión</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo de Inactividad (minutos)
                    </label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sesiones Simultáneas Máximas
                    </label>
                    <input
                      type="number"
                      defaultValue="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Configuración del Sistema */}
          {activeTab === 'sistema' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Información del Sistema</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Versión del Sistema</p>
                    <p className="text-lg font-bold text-gray-800 mt-1">v2.5.1</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Última Actualización</p>
                    <p className="text-lg font-bold text-gray-800 mt-1">20/10/2024</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Estado del Servidor</p>
                    <p className="text-lg font-bold text-green-600 mt-1">Operativo</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Uso de Almacenamiento</p>
                    <p className="text-lg font-bold text-gray-800 mt-1">234 GB / 500 GB</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Mantenimiento del Sistema</h3>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Verificar Actualizaciones</p>
                        <p className="text-sm text-gray-600 mt-1">Buscar nuevas versiones disponibles</p>
                      </div>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Verificar
                      </button>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Limpiar Caché</p>
                        <p className="text-sm text-gray-600 mt-1">Liberar memoria y archivos temporales</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Limpiar
                      </button>
                    </div>
                  </div>
                  <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-yellow-900">Reiniciar Sistema</p>
                        <p className="text-sm text-yellow-700 mt-1">El sistema estará inactivo por 5 minutos</p>
                      </div>
                      <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                        Reiniciar
                      </button>
                    </div>
                  </div>
                </div>
                 </div>
              </div>
          )}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Logs del Sistema</h3>
                <div className="p-4 bg-gray-900 rounded-lg font-mono text-sm text-green-400 max-h-64 overflow-y-auto">
                  <p>[2024-10-25 14:35:22] Sistema iniciado correctamente</p>
                  <p>[2024-10-25 14:35:23] Conexión a base de datos establecida</p>
                  <p>[2024-10-25 14:35:24] Módulos cargados: 12/12</p>
                  <p>[2024-10-25 14:35:25] Usuarios activos: 48</p>
                  <p>[2024-10-25 14:35:30] Backup programado ejecutado</p>
                  <p>[2024-10-25 14:36:15] Nueva sesión iniciada: admin_electoral</p>
                  <p>[2024-10-25 14:38:42] Proceso de votación: Activo</p>
                  <p>[2024-10-25 14:40:12] Sincronización de datos completada</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recursos del Servidor</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Uso de CPU</span>
                      <span className="text-sm font-medium text-gray-800">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{width: '45%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Uso de RAM</span>
                      <span className="text-sm font-medium text-gray-800">62%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-600 h-3 rounded-full" style={{width: '62%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Uso de Disco</span>
                      <span className="text-sm font-medium text-gray-800">47%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-purple-600 h-3 rounded-full" style={{width: '47%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Tráfico de Red</span>
                      <span className="text-sm font-medium text-gray-800">23%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-orange-600 h-3 rounded-full" style={{width: '23%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

        </div>

        {/* Botones de Acción */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-end gap-3">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
              Cancelar
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Save size={18} />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
      </div>
  );
};
export default Configuracion;