// sistema-electoral/src/pages/Login.jsx
import { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Shield } from 'lucide-react';

const Login = ({ onLoginSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const [loginError, setLoginError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLoginError('');

        // Credenciales de ejemplo - en producción validar con backend
        if (loginData.username === 'admin' && loginData.password === 'admin123') {
            setSuccess(true);
            setTimeout(() => {
                // Llamar callback de login exitoso
                onLoginSuccess();
            }, 1000);
        } else {
            setLoginError('Usuario o contraseña incorrectos');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
        setLoginError('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
            {/* Background decorativo */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <Shield size={40} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-center mb-2">Panel Administrativo</h2>
                    <p className="text-center text-sm opacity-90">Sistema Electoral ONPE 2024</p>
                </div>

                {/* Formulario */}
                <div className="p-8">
                    {loginError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-shake">
                            <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                            <p className="text-sm text-red-800">{loginError}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                            <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                            <p className="text-sm text-green-800">¡Acceso correcto! Redirigiendo...</p>
                        </div>
                    )}

                    <form onSubmit={handleLoginSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Usuario
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={loginData.username}
                                onChange={handleInputChange}
                                placeholder="Ingrese su usuario"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese su contraseña"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <p className="text-xs text-blue-800">
                                <strong>Credenciales de prueba:</strong><br />
                                Usuario: <code className="bg-blue-100 px-2 py-1 rounded font-mono">admin</code><br />
                                Contraseña: <code className="bg-blue-100 px-2 py-1 rounded font-mono">admin123</code>
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={!loginData.username || !loginData.password || success}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <Lock size={20} />
                            Iniciar Sesión
                        </button>
                    </form>
                </div>

                {/* Footer del modal */}
                <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600 text-center">
                        Sistema protegido con encriptación de nivel bancario
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.5s;
                }
            `}</style>
        </div>
    );
};

export default Login;