// sistema-electoral/src/pages/LandingPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vote, CheckCircle, AlertCircle, Loader, User, MapPin, Phone, Mail, Shield, Lock, X, ChevronRight, FileText, Eye, Clock, Users, BarChart, HelpCircle, MessageSquare, Award, Globe, Zap, TrendingUp } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        dni: '',
        nombre_completo: '',
        nombre: '',
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
    const [showVotingForm, setShowVotingForm] = useState(false);
    const [formStep, setFormStep] = useState(1);
    const [selectedCandidates, setSelectedCandidates] = useState({
        presidencial: '',
        regional: '',
        distrital: ''
    });
    const [viewingProposals, setViewingProposals] = useState(null);
    const [activeFaq, setActiveFaq] = useState(null);

    // Candidatos por tipo de elección con imágenes reales y logos de partidos
    const candidatos = {
        presidencial: [
            {
                id: 1,
                nombre: 'Pedro Castillo',
                partido: 'Perú Libre',
                color: 'red',
                photo: '/img/PedroCastillo.png',
                logo: '/Logo/PeruLibre.png',
                propuestas: '1. Nueva Constitución con participación popular.\n2. Nacionalización de los recursos estratégicos.\n3. Aumento del salario mínimo y bonos sociales.'
            },
            {
                id: 2,
                nombre: 'Keiko Fujimori',
                partido: 'Fuerza Popular',
                color: 'orange',
                photo: '/img/KeikoFujimori.png',
                logo: '/Logo/FuerzaPopular.png',
                propuestas: '1. Mantener la Constitución de 1993.\n2. Fuerte impulso a la inversión privada.\n3. Políticas de seguridad mano dura contra la delincuencia.'
            },
            {
                id: 3,
                nombre: 'Rafael López Aliaga',
                partido: 'Renovación Popular',
                color: 'blue',
                photo: '/img/RafaelLopez.png',
                logo: '/Logo/Renovacion.png',
                propuestas: '1. Implementación del "Perú Bicentenario".\n2. Reducción de impuestos y simplificación tributaria.\n3. Eliminación de vacunas obligatorias y libertad de elección.'
            },
            {
                id: 4,
                nombre: 'Hernando de Soto',
                partido: 'Avanza País',
                color: 'purple',
                photo: '/img/HernandoSoto.png',
                logo: '/Logo/AvanzaPais.png',
                propuestas: '1. Formalización de la propiedad informal.\n2. Creación de millones de empleos formales.\n3. Descentralización y empoderamiento de los gobiernos locales.'
            }
        ],
        regional: [
            {
                id: 5,
                nombre: 'Luis Sánchez',
                partido: 'Frente Regional',
                color: 'teal',
                photo: 'https://randomuser.me/api/portraits/men/32.jpg',
                logo: 'https://placehold.co/40x40/teal/white?text=FR',
                propuestas: '1. Desarrollo turístico sostenible para la región.\n2. Mejorar la conectividad vial entre provincias.\n3. Promover la cultura y las artes locales.'
            },
            {
                id: 6,
                nombre: 'Carmen Vargas',
                partido: 'Unidad Regional',
                color: 'orange',
                photo: 'https://randomuser.me/api/portraits/women/44.jpg',
                logo: 'https://placehold.co/40x40/orange/white?text=UR',
                propuestas: '1. Impulsar la agroindustria regional.\n2. Crear un programa de becas para estudiantes talentosos.\n3. Fortalecer la gestión transparente de los recursos.'
            },
            {
                id: 7,
                nombre: 'Roberto Díaz',
                partido: 'Desarrollo Regional',
                color: 'cyan',
                photo: 'https://randomuser.me/api/portraits/men/65.jpg',
                logo: 'https://placehold.co/40x40/cyan/white?text=DR',
                propuestas: '1. Electrificación de todas las comunidades rurales.\n2. Fomentar el comercio electrónico local.\n3. Proteger las reservas naturales y áreas de conservación.'
            },
            {
                id: 8,
                nombre: 'Patricia Morales',
                partido: 'Fuerza Regional',
                color: 'pink',
                photo: 'https://randomuser.me/api/portraits/women/90.jpg',
                logo: 'https://placehold.co/40x40/pink/white?text=FR',
                propuestas: '1. Modernizar los hospitales regionales.\n2. Implementar programas de vivienda social.\n3. Apoyar a los emprendedores locales con microcréditos.'
            }
        ],
        distrital: [
            {
                id: 9,
                nombre: 'Miguel Ángel',
                partido: 'Partido Distrital',
                color: 'indigo',
                photo: 'https://randomuser.me/api/portraits/men/36.jpg',
                logo: 'https://placehold.co/40x40/indigo/white?text=PD',
                propuestas: '1. Más parques y áreas verdes para el distrito.\n2. Mejorar la recolección de residuos y reciclaje.\n3. Seguridad ciudadana con más patrullajes nocturnos.'
            },
            {
                id: 10,
                nombre: 'Laura Fernández',
                partido: 'Movimiento Vecinal',
                color: 'yellow',
                photo: 'https://randomuser.me/api/portraits/women/33.jpg',
                logo: 'https://placehold.co/40x40/yellow/black?text=MV',
                propuestas: '1. Programas deportivos y culturales para jóvenes.\n2. Reparación de vías y aceras en toda la comunidad.\n3. Apoyo a adultos mayores con centros diurnos.'
            },
            {
                id: 11,
                nombre: 'Jorge Ramírez',
                partido: 'Unidad Distrital',
                color: 'lime',
                photo: 'https://randomuser.me/api/portraits/men/68.jpg',
                logo: 'https://placehold.co/40x40/lime/black?text=UD',
                propuestas: '1. Saneamiento básico para todas las zonas.\n2. Educación vial y seguridad para peatones y ciclistas.\n3. Promover la participación ciudadana en las decisiones.'
            },
            {
                id: 12,
                nombre: 'Sofía Herrera',
                partido: 'Frente Distrital',
                color: 'amber',
                photo: 'https://randomuser.me/api/portraits/women/50.jpg',
                logo: 'https://placehold.co/40x40/amber/black?text=FD',
                propuestas: '1. Mercados locales ordenados y con servicios.\n2. Limpieza y mantenimiento de espacios públicos.\n3. Programas de alfabetización y capacitación técnica.'
            }
        ]
    };

    // Preguntas frecuentes
    const faqs = [
        {
            question: "¿Cómo puedo verificar mi identidad para votar?",
            answer: "Para verificar tu identidad, solo necesitas ingresar tu número de DNI en el formulario de votación. Nuestro sistema se conectará con la base de datos de MIGO para validar tus datos de forma segura."
        },
        {
            question: "¿Mi voto es anónimo y secreto?",
            answer: "Sí, absolutamente. Aunque verificamos tu identidad para emitir el voto, el sistema no registra qué candidato seleccionaste. Tu voto es completamente anónimo y secreto, garantizando la privacidad del proceso electoral."
        },
        {
            question: "¿Puedo votar más de una vez?",
            answer: "No. El sistema registra tu DNI una vez que has emitido tu voto, impidiendo que puedas votar nuevamente. Esto garantiza la integridad del proceso electoral y el principio de un votante, un voto"
        },
        {
            question: "¿Qué hago si tengo un problema técnico durante el proceso de votación?",
            answer: "Si experimentas algún problema técnico, puedes comunicarte con nuestro soporte a través del correo electrónico soporte@onpe.gob.pe o llamando al número de atención al votante 0800-12345. Nuestro equipo estará disponible para ayudarte."
        },
        {
            question: "¿Cómo puedo verificar que mi voto fue registrado correctamente?",
            answer: "Una vez que completes el proceso de votación, recibirás un código de confirmación único que puedes usar para verificar que tu voto fue registrado correctamente en el sistema, sin revelar por quién votaste."
        }
    ];

    // Componente para la tarjeta del candidato
    const CandidateCard = ({ type, candidate, isSelected, onSelect, onViewProposals }) => (
        <div
            className={`relative border-2 rounded-xl overflow-hidden transition-all cursor-pointer ${isSelected
                ? `border-${candidate.color}-500 bg-${candidate.color}-50 shadow-lg`
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
                }`}
            onClick={() => onSelect(candidate)}
        >
            <div className="p-6">
                <div className="flex items-center gap-4">
                    {/* Logo del partido a la izquierda */}
                    <div className="flex-shrink-0">
                        <img
                            src={candidate.logo}
                            alt={`Logo de ${candidate.partido}`}
                            className="w-12 h-12 rounded-lg object-contain bg-white p-1 border border-gray-200"
                        />
                    </div>

                    {/* Contenido del candidato en el centro */}
                    <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-gray-900 text-lg mb-1 truncate">{candidate.nombre}</h5>
                        <p className="text-sm text-gray-600 mb-3">
                            {candidate.partido}
                        </p>
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onViewProposals(candidate);
                                }}
                                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                            >
                                <FileText size={14} />
                                Ver Propuestas
                            </button>
                            {isSelected && (
                                <CheckCircle className={`text-${candidate.color}-600 flex-shrink-0`} size={20} />
                            )}
                        </div>
                    </div>

                    {/* Foto del candidato a la derecha */}
                    <div className="relative flex-shrink-0">
                        <img
                            src={candidate.photo}
                            alt={candidate.nombre}
                            className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    // Componente para el modal de propuestas
    const PropuestasModal = ({ candidate, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className={`bg-gradient-to-r from-${candidate.color}-500 to-${candidate.color}-600 p-6 text-white`}>
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <img
                                src={candidate.photo}
                                alt={candidate.nombre}
                                className="w-16 h-16 rounded-xl object-cover border-2 border-white/50"
                            />
                            <div>
                                <h3 className="text-2xl font-bold">{candidate.nombre}</h3>
                                <p className="text-sm opacity-90 flex items-center gap-2">
                                    <img src={candidate.logo} alt="" className="w-5 h-5 rounded-full" />
                                    {candidate.partido}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-all"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FileText size={20} className={`text-${candidate.color}-600`} />
                        Plan de Gobierno
                    </h4>
                    <div className="space-y-3">
                        {candidate.propuestas.split('\n').map((propuesta, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className={`w-6 h-6 rounded-full bg-${candidate.color}-100 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                    <span className={`text-xs font-bold text-${candidate.color}-600`}>{index + 1}</span>
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">{propuesta}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <button
                            onClick={onClose}
                            className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-colors"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

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
            const response = await fetch(`https://api.migo.pe/api/v1/dni`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    token: 'HDy9QPXs3WMMHWyp7X9fbCvlTbC2qtXvVCO6hhivZygYo7PedRAKphMJn8L4',
                    dni: dni
                })
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('DNI no encontrado en los registros. Por favor, verifica el número.');
                }
                throw new Error(`Error del servidor: ${response.statusText} (Código: ${response.status})`);
            }

            const result = await response.json();

            if (result.success) {
                const nombreCompleto = result.nombre || '';
                const partes = nombreCompleto.split(' ');

                let nombre = '';
                let apellidoPaterno = '';
                let apellidoMaterno = '';

                if (partes.length >= 3) {
                    apellidoPaterno = partes[0];
                    apellidoMaterno = partes[1];
                    nombre = partes.slice(2).join(' ');
                } else if (partes.length === 2) {
                    apellidoPaterno = partes[0];
                    nombre = partes[1];
                } else if (partes.length === 1) {
                    nombre = partes[0];
                }

                setFormData(prev => ({
                    ...prev,
                    nombre_completo: nombreCompleto,
                    nombre: nombre,
                    apellido_paterno: apellidoPaterno,
                    apellido_materno: apellidoMaterno
                }));
                setDniVerified(true);
                setError('');
            } else {
                setError(result.message || 'No se pudieron obtener los datos del DNI.');
                setDniVerified(false);
            }
        } catch (err) {
            setError(err.message || 'Error al conectar con el servicio de verificación. Intenta nuevamente.');
            setDniVerified(false);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContinue = () => {
        if (formStep === 1) {
            setFormStep(2);
        }
    };

    const handleCandidateSelection = (candidate) => {
        // Determinar el tipo de elección basado en la lista de candidatos
        let type = '';
        if (candidatos.presidencial.some(c => c.id === candidate.id)) type = 'presidencial';
        else if (candidatos.regional.some(c => c.id === candidate.id)) type = 'regional';
        else if (candidatos.distrital.some(c => c.id === candidate.id)) type = 'distrital';

        if (type) {
            setSelectedCandidates(prev => ({
                ...prev,
                [type]: prev[type] === candidate.nombre ? '' : candidate.nombre
            }));
        }
    };

    const handleSubmit = () => {
        const hasSelectedCandidate = Object.values(selectedCandidates).some(candidate => candidate !== '');

        if (!hasSelectedCandidate) {
            setError('Debes seleccionar al menos un candidato');
            return;
        }

        console.log('Votos registrados:', {
            ...formData,
            candidatos: selectedCandidates
        });
        setSuccess(true);

        setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    const closeModal = () => {
        setShowVotingForm(false);
        setError('');
        setSuccess(false);
        setFormStep(1);
        setSelectedCandidates({
            presidencial: '',
            regional: '',
            distrital: ''
        });
        setViewingProposals(null);
        setFormData({
            dni: '',
            nombre_completo: '',
            nombre: '',
            apellido_paterno: '',
            apellido_materno: '',
            distrito: '',
            telefono: '',
            email: '',
            candidato: ''
        });
        setDniVerified(false);
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
                            Cuando el pueblo confía, el país avanza; y cuando el país avanza, el pueblo vuelve a confiar. Así se construye el Perú que todos soñamos.
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

                    {/* Botón de Votar Ahora */}
                    <div className="text-center">
                        <button
                            onClick={() => setShowVotingForm(true)}
                            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-bold text-lg shadow-lg"
                        >
                            <Vote size={24} className="inline mr-2" />
                            Votar Ahora
                        </button>
                    </div>
                </div>
            </section>

            {/* Sección de Proceso Electoral */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Proceso Electoral Simplificado</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Hemos diseñado un proceso sencillo y transparente para garantizar tu participación
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-indigo-600">1</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verificación</h3>
                            <p className="text-sm text-gray-600">Verifica tu identidad con tu DNI a través de nuestro sistema seguro</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-indigo-600">2</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Selección</h3>
                            <p className="text-sm text-gray-600">Revisa los perfiles de los candidatos y sus propuestas</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-indigo-600">3</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Votación</h3>
                            <p className="text-sm text-gray-600">Selecciona tus candidatos de forma segura y confidencial</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-indigo-600">4</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirmación</h3>
                            <p className="text-sm text-gray-600">Recibe un código de confirmación que verifica tu voto</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Candidatos Destacados */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Conoce a los Candidatos</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Revisa las propuestas de los principales candidatos para tomar una decisión informada
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {candidatos.presidencial.slice(0, 4).map((candidato) => (
                            <div key={candidato.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
                                <div className={`h-2 bg-${candidato.color}-500`}></div>
                                <div className="p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <img
                                            src={candidato.photo}
                                            alt={candidato.nombre}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{candidato.nombre}</h3>
                                            <p className="text-sm text-gray-600">{candidato.partido}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setViewingProposals(candidato)}
                                        className="w-full text-center py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        Ver Propuestas
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <button
                            onClick={() => setShowVotingForm(true)}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium"
                        >
                            Ver Todos los Candidatos
                        </button>
                    </div>
                </div>
            </section>

            {/* Sección de Características del Sistema */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Características del Sistema</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Nuestra plataforma de votación electrónica ofrece seguridad, transparencia y accesibilidad
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="text-blue-600" size={28} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Seguridad Garantizada</h3>
                            <p className="text-gray-600">Cifrado de extremo a extremo y autenticación biométrica para proteger cada voto</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Zap className="text-green-600" size={28} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Rapidez y Eficiencia</h3>
                            <p className="text-gray-600">Resultados en tiempo real y proceso de votación simplificado para todos los ciudadanos</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Globe className="text-purple-600" size={28} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Accesibilidad Universal</h3>
                            <p className="text-gray-600">Diseño inclusivo que permite votar desde cualquier lugar y dispositivo</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Preguntas Frecuentes */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
                        <p className="text-lg text-gray-600">
                            Resuelve tus dudas sobre el proceso de votación electrónica
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <button
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                >
                                    <h3 className="font-semibold text-gray-900 flex items-center gap-3">
                                        <HelpCircle className="text-indigo-600" size={20} />
                                        {faq.question}
                                    </h3>
                                    <ChevronRight
                                        className={`text-gray-500 transition-transform ${activeFaq === index ? 'rotate-90' : ''}`}
                                        size={20}
                                    />
                                </button>
                                {activeFaq === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-600 pl-8">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sección de Contacto */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Necesitas Ayuda?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Nuestro equipo de soporte está disponible para asistirte con cualquier pregunta o problema
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 rounded-xl p-6 text-center">
                            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="text-indigo-600" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Llámanos</h3>
                            <p className="text-gray-600 mb-3">Atención telefónica las 24 horas</p>
                            <p className="text-indigo-600 font-medium">0800-12345</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 text-center">
                            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="text-indigo-600" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Escríbenos</h3>
                            <p className="text-gray-600 mb-3">Respuesta en menos de 24 horas</p>
                            <p className="text-indigo-600 font-medium">soporte@onpe.gob.pe</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 text-center">
                            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="text-indigo-600" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat en Vivo</h3>
                            <p className="text-gray-600 mb-3">Asistencia inmediata</p>
                            <button className="text-indigo-600 font-medium hover:text-indigo-700">Iniciar Chat</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal de Votación */}
            {showVotingForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Header del Modal */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Formulario de Votación</h3>
                                <p className="text-sm opacity-90">Complete sus datos para emitir su voto</p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Indicador de pasos */}
                        <div className="px-6 pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${formStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
                                    <span className={`ml-2 text-sm font-medium ${formStep >= 1 ? 'text-indigo-600' : 'text-gray-500'}`}>Datos Personales</span>
                                </div>
                                <div className={`flex-1 h-1 mx-4 ${formStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                                <div className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${formStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
                                    <span className={`ml-2 text-sm font-medium ${formStep >= 2 ? 'text-indigo-600' : 'text-gray-500'}`}>Seleccionar Candidatos</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            {success && (
                                <div className="m-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                                    <CheckCircle className="text-green-600" size={24} />
                                    <div>
                                        <p className="font-bold text-green-800">¡Voto(s) registrado(s) exitosamente!</p>
                                        <p className="text-sm text-green-700">Gracias por participar en el proceso democrático</p>
                                        <p className="text-xs text-green-600 mt-2">Puedes cerrar este formulario o emitir otros votos</p>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                                    <AlertCircle className="text-red-600" size={24} />
                                    <p className="text-sm text-red-800">{error}</p>
                                </div>
                            )}

                            {/* Paso 1: Datos Personales */}
                            {formStep === 1 && (
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">1</div>
                                            Datos Personales
                                        </h4>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    DNI
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={formData.dni}
                                                        onChange={handleDniChange}
                                                        maxLength={8}
                                                        placeholder="Ingrese su DNI de 8 dígitos"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                    />
                                                    {loading && (
                                                        <div className="absolute right-3 top-3">
                                                            <Loader className="animate-spin text-indigo-600" size={20} />
                                                        </div>
                                                    )}
                                                    {dniVerified && !loading && (
                                                        <div className="absolute right-3 top-3">
                                                            <CheckCircle className="text-green-600" size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Nombre
                                                </label>
                                                <input
                                                    type="text"
                                                    name="nombre"
                                                    value={formData.nombre}
                                                    onChange={handleInputChange}
                                                    placeholder="Nombres"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Apellido Paterno
                                                </label>
                                                <input
                                                    type="text"
                                                    name="apellido_paterno"
                                                    value={formData.apellido_paterno}
                                                    onChange={handleInputChange}
                                                    placeholder="Apellido Paterno"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Apellido Materno
                                                </label>
                                                <input
                                                    type="text"
                                                    name="apellido_materno"
                                                    value={formData.apellido_materno}
                                                    onChange={handleInputChange}
                                                    placeholder="Apellido Materno"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
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

                                            <div>
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

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    <MapPin size={16} className="inline mr-1" />
                                                    Distrito
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
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-200">
                                        <button
                                            type="button"
                                            onClick={handleContinue}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-bold text-lg shadow-lg"
                                        >
                                            Continuar
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Paso 2: Selección de Candidatos */}
                            {formStep === 2 && (
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">2</div>
                                            Seleccione sus Candidatos <span className="text-red-500">*</span>
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-4">Puede seleccionar un candidato para cada tipo de elección. Haga clic en una tarjeta para seleccionar o deseleccionar.</p>
                                    </div>

                                    {/* Elección Presidencial */}
                                    <div className="mb-8">
                                        <h5 className="text-md font-bold text-blue-600 mb-3 flex items-center gap-2">
                                            <Vote size={18} />
                                            Elección Presidencial
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {candidatos.presidencial.map((candidato) => (
                                                <CandidateCard
                                                    key={candidato.id}
                                                    type="presidencial"
                                                    candidate={candidato}
                                                    isSelected={selectedCandidates.presidencial === candidato.nombre}
                                                    onSelect={handleCandidateSelection}
                                                    onViewProposals={setViewingProposals}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Elección Regional */}
                                    <div className="mb-8">
                                        <h5 className="text-md font-bold text-green-600 mb-3 flex items-center gap-2">
                                            <MapPin size={18} />
                                            Elección Regional
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {candidatos.regional.map((candidato) => (
                                                <CandidateCard
                                                    key={candidato.id}
                                                    type="regional"
                                                    candidate={candidato}
                                                    isSelected={selectedCandidates.regional === candidato.nombre}
                                                    onSelect={handleCandidateSelection}
                                                    onViewProposals={setViewingProposals}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Elección Distrital */}
                                    <div className="mb-8">
                                        <h5 className="text-md font-bold text-purple-600 mb-3 flex items-center gap-2">
                                            <User size={18} />
                                            Elección Distrital
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {candidatos.distrital.map((candidato) => (
                                                <CandidateCard
                                                    key={candidato.id}
                                                    type="distrital"
                                                    candidate={candidato}
                                                    isSelected={selectedCandidates.distrital === candidato.nombre}
                                                    onSelect={handleCandidateSelection}
                                                    onViewProposals={setViewingProposals}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-200 flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormStep(1)}
                                            className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-bold"
                                        >
                                            Anterior
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                        >
                                            <Vote size={24} />
                                            Emitir Voto(s)
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Propuestas */}
            {viewingProposals && (
                <PropuestasModal
                    candidate={viewingProposals}
                    onClose={() => setViewingProposals(null)}
                />
            )}

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                                    <Vote className="text-white" size={20} />
                                </div>
                                <h3 className="text-xl font-bold">ONPE</h3>
                            </div>
                            <p className="text-sm text-gray-400">
                                Oficina Nacional de Procesos Electorales. Garantizando elecciones democráticas y transparentes.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Candidatos</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Resultados</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Prensa</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Guía de Votación</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Centro de Ayuda</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-center gap-2">
                                    <Phone size={16} />
                                    <span>0800-12345</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail size={16} />
                                    <span>soporte@onpe.gob.pe</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>Jr. Washington 1894, Cercado de Lima</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center">
                        <p className="text-sm text-gray-400">
                            © 2024 ONPE - Oficina Nacional de Procesos Electorales. Todos los derechos reservados.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            Sistema seguro y verificado | Elecciones Generales 2024
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;