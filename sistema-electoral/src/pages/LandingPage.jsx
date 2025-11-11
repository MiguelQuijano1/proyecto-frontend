// sistema-electoral/src/pages/LandingPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vote, CheckCircle, AlertCircle, Loader, User, MapPin, Phone, Mail, Shield, Lock } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    dni: '',
    nombre_completo: '',
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    distrito: '',
    telefono: '',
    email: '',
    candidato: ''
  });

  const [loading, setLoading] = useState(false);
  const [dniVerified, setDniVerified] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const candidatos = [
    { id: 1, nombre: 'Juan Carlos Pérez', partido: 'Partido Democrático', color: 'blue' },
    { id: 2, nombre: 'María González', partido: 'Movimiento Popular', color: 'green' },
    { id: 3, nombre: 'Carlos Rodríguez', partido: 'Frente Progresista', color: 'purple' },
    { id: 4, nombre: 'Ana Torres', partido: 'Alianza Nacional', color: 'red' }
  ];

  const handleDniChange = async (e) => {
    const dni = e.target.value.replace(/\D/g, '').slice(0, 8);
    setFormData(prev => ({ ...prev, dni }));
    setError('');
    setDniVerified(false);

    if (dni.length === 8) {
      await verificarDNI(dni);
    }
  };

  const verificarDNI = async (dni) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://apiperu.dev/api/dni/${dni}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      const result = await response.json();

      if (result.success && result.data) {
        setFormData(prev => ({
          ...prev,
          nombre_completo: result.data.nombre_completo,
          nombres: result.data.nombres,
          apellido_paterno: result.data.apellido_paterno,
          apellido_materno: result.data.apellido_materno
        }));
        setDniVerified(true);
        setError('');
      } else {
        setError('DNI no encontrado en RENIEC. Por favor verifica el número.');
        setDniVerified(false);
      }
    } catch (err) {
      setError('Error al conectar con RENIEC. Intenta nuevamente.');
      setDniVerified(false);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!dniVerified) {
      setError('Debes verificar tu DNI primero');
      return;
    }

    if (!formData.candidato) {
      setError('Debes seleccionar un candidato');
      return;
    }

    console.log('Voto registrado:', formData);
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        dni: '',
        nombre_completo: '',
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
        distrito: '',
        telefono: '',
        email: '',
        candidato: ''
      });
      setDniVerified(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Vote className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ONPE - Sistema de Votación
                </h1>
                <p className="text-sm text-gray-600">Elecciones Generales 2024</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                <Shield className="text-green-600" size={20} />
                <span className="text-sm font-medium text-green-800">Sistema Seguro</span>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg"
              >
                <Lock size={18} />
                Acceso Admin
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Emite tu Voto de Forma
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Segura y Rápida</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Verifica tu identidad con RENIEC y participa en el proceso democrático
            </p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <User className="text-blue-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900">125,430</p>
              <p className="text-sm text-gray-600 mt-1">Votantes Registrados</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900">89,234</p>
              <p className="text-sm text-gray-600 mt-1">Votos Emitidos</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield className="text-purple-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-900">100%</p>
              <p className="text-sm text-gray-600 mt-1">Sistema Seguro</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Votación */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Formulario de Votación</h3>
            <p className="text-sm opacity-90">Complete sus datos para emitir su voto</p>
          </div>

          {success && (
            <div className="m-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <CheckCircle className="text-green-600" size={24} />
              <div>
                <p className="font-bold text-green-800">¡Voto registrado exitosamente!</p>
                <p className="text-sm text-green-700">Gracias por participar en el proceso democrático</p>
              </div>
            </div>
          )}

          {error && (
            <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="text-red-600" size={24} />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="p-6 space-y-6">
            {/* Paso 1: Verificación DNI */}
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">1</div>
                Verificación de Identidad
              </h4>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DNI <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.dni}
                  onChange={handleDniChange}
                  maxLength={8}
                  placeholder="Ingrese su DNI de 8 dígitos"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                {loading && (
                  <div className="absolute right-3 top-11">
                    <Loader className="animate-spin text-indigo-600" size={20} />
                  </div>
                )}
                {dniVerified && !loading && (
                  <div className="absolute right-3 top-11">
                    <CheckCircle className="text-green-600" size={20} />
                  </div>
                )}
              </div>

              {dniVerified && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="text-green-600" size={20} />
                    <p className="font-bold text-green-800">Datos verificados con RENIEC</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-medium text-gray-700">Nombre Completo:</span> {formData.nombre_completo}</p>
                    <p className="text-sm"><span className="font-medium text-gray-700">Nombres:</span> {formData.nombres}</p>
                    <p className="text-sm"><span className="font-medium text-gray-700">Apellido Paterno:</span> {formData.apellido_paterno}</p>
                    <p className="text-sm"><span className="font-medium text-gray-700">Apellido Materno:</span> {formData.apellido_materno}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Paso 2: Información Adicional */}
            {dniVerified && (
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">2</div>
                  Información Adicional
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin size={16} className="inline mr-1" />
                      Distrito <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="distrito"
                      value={formData.distrito}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Seleccione su distrito</option>
                      <option value="Lima">Lima</option>
                      <option value="Callao">Callao</option>
                      <option value="Arequipa">Arequipa</option>
                      <option value="Cusco">Cusco</option>
                      <option value="Trujillo">Trujillo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone size={16} className="inline mr-1" />
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      placeholder="987654321"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail size={16} className="inline mr-1" />
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Paso 3: Selección de Candidato */}
            {dniVerified && formData.distrito && (
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">3</div>
                  Seleccione su Candidato
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidatos.map((candidato) => (
                    <button
                      key={candidato.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, candidato: candidato.nombre }))}
                      className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all text-left ${
                        formData.candidato === candidato.nombre
                          ? `border-${candidato.color}-500 bg-${candidato.color}-50`
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-bold text-gray-900 mb-1">{candidato.nombre}</h5>
                          <p className="text-sm text-gray-600">{candidato.partido}</p>
                        </div>
                        {formData.candidato === candidato.nombre && (
                          <CheckCircle className={`text-${candidato.color}-600`} size={24} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Botón de Envío */}
            {dniVerified && (
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!formData.candidato || loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  <Vote size={24} />
                  Emitir Voto
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Al emitir su voto, acepta los términos y condiciones del proceso electoral
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Información Legal */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <Shield className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <h5 className="font-bold text-blue-900 mb-2">Información Importante</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Sus datos son verificados con la RENIEC para garantizar la autenticidad</li>
                <li>• El voto es secreto, libre y voluntario</li>
                <li>• Solo puede votar una vez por proceso electoral</li>
                <li>• El sistema está protegido con encriptación de nivel bancario</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm opacity-75">
            © 2024 ONPE - Oficina Nacional de Procesos Electorales. Todos los derechos reservados.
          </p>
          <p className="text-xs opacity-50 mt-2">
            Sistema seguro y verificado | Elecciones Generales 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;