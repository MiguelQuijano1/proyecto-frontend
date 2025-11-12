// sistema-electoral/src/pages/LandingPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, CheckCircle, AlertCircle, Loader, User, MapPin, Phone, Mail, Shield, Lock, X, ChevronRight, FileText, Users, BarChart, Award, Globe, Zap, TrendingUp, ArrowRight, Star, Clock, Users2, Eye, Fingerprint, CheckSquare } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        dni: '',
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
        nombre_completo: '',
        departamento: '',
        provincia: '',
        distrito: '',
        direccion: '',
        direccion_completa: '',
        ubigeo_reniec: '',
        ubigeo_sunat: '',
        ubigeo: [],
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
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [activeTab, setActiveTab] = useState('presidencial');

    // Animaciones mejoradas
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        hover: {
            y: -5,
            scale: 1.02,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                type: "spring",
                damping: 25,
                stiffness: 500
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.2
            }
        }
    };

    const stepVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            x: -50,
            transition: {
                duration: 0.3
            }
        }
    };

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
                propuestas: '1. Nueva Constitución con participación popular.\n2. Nacionalización de los recursos estratégicos.\n3. Aumento del salario mínimo y bonos sociales.',
                experiencia: 'Profesor y sindicalista',
                educacion: 'Universidad Nacional de Educación'
            },
            {
                id: 2,
                nombre: 'Keiko Fujimori',
                partido: 'Fuerza Popular',
                color: 'orange',
                photo: '/img/KeikoFujimori.png',
                logo: '/Logo/FuerzaPopular.png',
                propuestas: '1. Mantener la Constitución de 1993.\n2. Fuerte impulso a la inversión privada.\n3. Políticas de seguridad mano dura contra la delincuencia.',
                experiencia: 'Congresista de la República',
                educacion: 'Universidad de Boston, Columbia University'
            },
            {
                id: 3,
                nombre: 'Rafael López Aliaga',
                partido: 'Renovación Popular',
                color: 'blue',
                photo: '/img/RafaelLopez.png',
                logo: '/Logo/Renovacion.png',
                propuestas: '1. Implementación del "Perú Bicentenario".\n2. Reducción de impuestos y simplificación tributaria.\n3. Eliminación de vacunas obligatorias y libertad de elección.',
                experiencia: 'Empresario y exalcalde de Miraflores',
                educacion: 'Universidad de Piura, Universidad del Pacífico'
            },
            {
                id: 4,
                nombre: 'Hernando de Soto',
                partido: 'Avanza País',
                color: 'purple',
                photo: '/img/HernandoSoto.png',
                logo: '/Logo/AvanzaPais.png',
                propuestas: '1. Formalización de la propiedad informal.\n2. Creación de millones de empleos formales.\n3. Descentralización y empoderamiento de los gobiernos locales.',
                experiencia: 'Economista y presidente del ILD',
                educacion: 'London School of Economics'
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
                propuestas: '1. Desarrollo turístico sostenible para la región.\n2. Mejorar la conectividad vial entre provincias.\n3. Promover la cultura y las artes locales.',
                experiencia: 'Exgobernador regional',
                educacion: 'Universidad Nacional Mayor de San Marcos'
            },
            {
                id: 6,
                nombre: 'Carmen Vargas',
                partido: 'Unidad Regional',
                color: 'orange',
                photo: 'https://randomuser.me/api/portraits/women/44.jpg',
                logo: 'https://placehold.co/40x40/orange/white?text=UR',
                propuestas: '1. Impulsar la agroindustria regional.\n2. Crear un programa de becas para estudiantes talentosos.\n3. Fortalecer la gestión transparente de los recursos.',
                experiencia: 'Gerente de desarrollo social',
                educacion: 'Universidad Nacional del Centro del Perú'
            },
            {
                id: 7,
                nombre: 'Roberto Díaz',
                partido: 'Desarrollo Regional',
                color: 'cyan',
                photo: 'https://randomuser.me/api/portraits/men/65.jpg',
                logo: 'https://placehold.co/40x40/cyan/white?text=DR',
                propuestas: '1. Electrificación de todas las comunidades rurales.\n2. Fomentar el comercio electrónico local.\n3. Proteger las reservas naturales y áreas de conservación.',
                experiencia: 'Ingeniero y excongresista',
                educacion: 'Universidad Nacional de Ingeniería'
            },
            {
                id: 8,
                nombre: 'Patricia Morales',
                partido: 'Fuerza Regional',
                color: 'pink',
                photo: 'https://randomuser.me/api/portraits/women/90.jpg',
                logo: 'https://placehold.co/40x40/pink/white?text=FR',
                propuestas: '1. Modernizar los hospitales regionales.\n2. Implementar programas de vivienda social.\n3. Apoyar a los emprendedores locales con microcréditos.',
                experiencia: 'Alcaldesa provincial',
                educacion: 'Universidad Peruana Cayetano Heredia'
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
                propuestas: '1. Más parques y áreas verdes para el distrito.\n2. Mejorar la recolección de residuos y reciclaje.\n3. Seguridad ciudadana con más patrullajes nocturnos.',
                experiencia: 'Regidor municipal',
                educacion: 'Universidad Nacional de San Agustín'
            },
            {
                id: 10,
                nombre: 'Laura Fernández',
                partido: 'Movimiento Vecinal',
                color: 'yellow',
                photo: 'https://randomuser.me/api/portraits/women/33.jpg',
                logo: 'https://placehold.co/40x40/yellow/black?text=MV',
                propuestas: '1. Programas deportivos y culturales para jóvenes.\n2. Reparación de vías y aceras en toda la comunidad.\n3. Apoyo a adultos mayores con centros diurnos.',
                experiencia: 'Líder comunitaria',
                educacion: 'Universidad Nacional de Trujillo'
            },
            {
                id: 11,
                nombre: 'Jorge Ramírez',
                partido: 'Unidad Distrital',
                color: 'lime',
                photo: 'https://randomuser.me/api/portraits/men/68.jpg',
                logo: 'https://placehold.co/40x40/lime/black?text=UD',
                propuestas: '1. Saneamiento básico para todas las zonas.\n2. Educación vial y seguridad para peatones y ciclistas.\n3. Promover la participación ciudadana en las decisiones.',
                experiencia: 'Abogado y exregidor',
                educacion: 'Universidad Nacional de San Antonio Abad'
            },
            {
                id: 12,
                nombre: 'Sofía Herrera',
                partido: 'Frente Distrital',
                color: 'amber',
                photo: 'https://randomuser.me/api/portraits/women/50.jpg',
                logo: 'https://placehold.co/40x40/amber/black?text=FD',
                propuestas: '1. Mercados locales ordenados y con servicios.\n2. Limpieza y mantenimiento de espacios públicos.\n3. Programas de alfabetización y capacitación técnica.',
                experiencia: 'Directora de escuela',
                educacion: 'Universidad Nacional Pedro Ruiz Gallo'
            }
        ]
    };

    // Componente mejorado para la tarjeta del candidato
    const CandidateCard = ({ type, candidate, isSelected, onSelect, onViewProposals }) => (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={`relative border-2 rounded-xl overflow-hidden transition-all cursor-pointer ${isSelected
                ? `border-${candidate.color}-500 shadow-xl`
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
                }`}
            onClick={() => onSelect(candidate)}
        >
            <div className={`h-2 bg-gradient-to-r from-${candidate.color}-400 to-${candidate.color}-600`}></div>
            <div className="p-6">
                <div className="flex items-center gap-4">
                    {/* Logo del partido a la izquierda */}
                    <div className="flex-shrink-0">
                        <img
                            src={candidate.logo}
                            alt={`Logo de ${candidate.partido}`}
                            className="w-14 h-14 rounded-xl object-contain bg-white p-1.5 border border-gray-200 shadow-sm"
                        />
                    </div>

                    {/* Contenido del candidato en el centro */}
                    <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-gray-900 text-lg mb-1 truncate">{candidate.nombre}</h5>
                        <p className="text-sm text-gray-600 mb-2 font-medium">
                            {candidate.partido}
                        </p>
                        <div className="flex items-center justify-between">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onViewProposals(candidate);
                                }}
                                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                            >
                                <FileText size={14} />
                                Ver Propuestas
                            </motion.button>
                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                    className={`bg-${candidate.color}-100 p-1.5 rounded-full`}
                                >
                                    <CheckCircle className={`text-${candidate.color}-600 flex-shrink-0`} size={18} />
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Foto del candidato a la derecha */}
                    <div className="relative flex-shrink-0">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                            src={candidate.photo}
                            alt={candidate.nombre}
                            className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200 shadow-sm"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );

    // Componente mejorado para el modal de propuestas
    const PropuestasModal = ({ candidate, onClose }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
        >
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
                <div className={`bg-gradient-to-r from-${candidate.color}-500 to-${candidate.color}-600 p-6 text-white`}>
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <motion.img
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 500, damping: 15 }}
                                src={candidate.photo}
                                alt={candidate.nombre}
                                className="w-16 h-16 rounded-xl object-cover border-2 border-white/50"
                            />
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h3 className="text-2xl font-bold">{candidate.nombre}</h3>
                                <p className="text-sm opacity-90 flex items-center gap-2">
                                    <img src={candidate.logo} alt="" className="w-5 h-5 rounded-full" />
                                    {candidate.partido}
                                </p>
                            </motion.div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-all"
                        >
                            <X size={24} />
                        </motion.button>
                    </div>
                </div>
                <div className="p-6">
                    <motion.h4 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"
                    >
                        <FileText size={20} className={`text-${candidate.color}-600`} />
                        Plan de Gobierno
                    </motion.h4>
                    <div className="space-y-3 mb-6">
                        {candidate.propuestas.split('\n').map((propuesta, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="flex items-start gap-3"
                            >
                                <div className={`w-6 h-6 rounded-full bg-${candidate.color}-100 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                    <span className={`text-xs font-bold text-${candidate.color}-600`}>{index + 1}</span>
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">{propuesta}</p>
                            </motion.div>
                        ))}
                    </div>
                    
                    {candidate.experiencia && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mb-4"
                        >
                            <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                <Award size={16} className={`text-${candidate.color}-600`} />
                                Experiencia
                            </h5>
                            <p className="text-gray-700 text-sm">{candidate.experiencia}</p>
                        </motion.div>
                    )}
                    
                    {candidate.educacion && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mb-6"
                        >
                            <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                <Users size={16} className={`text-${candidate.color}-600`} />
                                Educación
                            </h5>
                            <p className="text-gray-700 text-sm">{candidate.educacion}</p>
                        </motion.div>
                    )}
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="pt-4 border-t border-gray-200"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onClose}
                            className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-colors"
                        >
                            Cerrar
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );

    // Componente mejorado para el modal de éxito
    const SuccessModal = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
        >
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.1 }}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <CheckCircle className="text-green-500" size={40} />
                    </motion.div>
                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold mb-2"
                    >
                        ¡Voto Registrado con Éxito!
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm opacity-90"
                    >
                        Su participación ha sido registrada en el sistema electoral
                    </motion.p>
                </div>
                <div className="p-6 text-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-700 mb-4"
                    >
                        Gracias por ejercer su derecho al voto. Su participación es fundamental para fortalecer nuestra democracia.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-center gap-2 mb-4"
                    >
                        <Fingerprint className="text-gray-500" size={16} />
                        <span className="text-xs text-gray-500">ID de Voto: {Math.random().toString(36).substring(2, 15).toUpperCase()}</span>
                    </motion.div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={closeSuccessModal}
                        className="w-full px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all font-medium"
                    >
                        Cerrar
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
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
            const response = await fetch(`https://api.factiliza.com/v1/dni/info/${dni}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzOTgzMiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImNvbnN1bHRvciJ9.a1qcTKi8QsEpQCxB8BTGHvn0tnFsi7vGfZi2ltv6cSw`
                }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('DNI no encontrado en los registros. Por favor, verifica el número.');
                }
                throw new Error(`Error del servidor: ${response.statusText} (Código: ${response.status})`);
            }

            const result = await response.json();

            if (result.success) {
                const data = result.data;
                
                setFormData(prev => ({
                    ...prev,
                    dni: data.numero,
                    nombres: data.nombres,
                    apellido_paterno: data.apellido_paterno,
                    apellido_materno: data.apellido_materno,
                    nombre_completo: data.nombre_completo,
                    departamento: data.departamento,
                    provincia: data.provincia,
                    distrito: data.distrito,
                    direccion: data.direccion,
                    direccion_completa: data.direccion_completa,
                    ubigeo_reniec: data.ubigeo_reniec,
                    ubigeo_sunat: data.ubigeo_sunat,
                    ubigeo: data.ubigeo
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
        
        // Mostramos el modal de éxito
        setShowSuccessModal(true);
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
            nombres: '',
            apellido_paterno: '',
            apellido_materno: '',
            nombre_completo: '',
            departamento: '',
            provincia: '',
            distrito: '',
            direccion: '',
            direccion_completa: '',
            ubigeo_reniec: '',
            ubigeo_sunat: '',
            ubigeo: [],
            telefono: '',
            email: '',
            candidato: ''
        });
        setDniVerified(false);
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
        // Opcional: también cerrar el formulario de votación o resetear el formulario
        closeModal();
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100"
        >
            {/* Header mejorado */}
            <motion.header
                variants={itemVariants}
                className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40"
            >
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center shadow-lg"
                            >
                                <Vote className="text-white" size={24} />
                            </motion.div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent">
                                    ONPE - Sistema de Votación
                                </h1>
                                <p className="text-sm text-gray-600">Elecciones Generales 2024</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200"
                            >
                                <Shield className="text-green-600" size={20} />
                                <span className="text-sm font-medium text-green-800">Sistema Seguro</span>
                            </motion.div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/login')}
                                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all font-medium shadow-lg"
                            >
                                <Lock size={18} />
                                Acceso Admin
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Hero Section mejorada */}
            <section className="relative overflow-hidden py-16">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600/5 to-slate-700/5"></div>
                <div className="max-w-7xl mx-auto px-4 relative">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                        >
                            Emite tu Voto de Forma
                            <span className="bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent"> Segura y Rápida</span>
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-gray-600 max-w-2xl mx-auto"
                        >
                            Cuando el pueblo confía, el país avanza; y cuando el país avanza, el pueblo vuelve a confiar. Así se construye el Perú que todos soñamos.
                        </motion.p>
                    </motion.div>

                    {/* Estadísticas mejoradas */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    >
                        {[
                            { icon: User, color: 'blue', number: '125,430', text: 'Votantes Registrados', change: '+12.5%' },
                            { icon: CheckCircle, color: 'green', number: '89,234', text: 'Votos Emitidos', change: '+18.2%' },
                            { icon: Shield, color: 'slate', number: '100%', text: 'Sistema Seguro', change: 'Verificado' }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.text}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center"
                            >
                                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                                    <stat.icon className={`text-${stat.color}-600`} size={24} />
                                </div>
                                <p className="text-3xl font-bold text-gray-900">{stat.number}</p>
                                <p className="text-sm text-gray-600 mt-1">{stat.text}</p>
                                <div className="flex items-center justify-center mt-2">
                                    <TrendingUp className="text-green-500" size={14} />
                                    <span className="text-xs text-green-500 ml-1">{stat.change}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Botón de Votar Ahora mejorado */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowVotingForm(true)}
                            className="px-8 py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all font-bold text-lg shadow-lg"
                        >
                            <Vote size={24} className="inline mr-2" />
                            Votar Ahora
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Sección de Proceso Electoral mejorada */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Proceso Electoral Simplificado</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Hemos diseñado un proceso sencillo y transparente para garantizar tu participación
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-4 gap-6"
                    >
                        {[
                            { number: '1', title: 'Verificación', description: 'Verifica tu identidad con tu DNI a través de nuestro sistema seguro', icon: Fingerprint },
                            { number: '2', title: 'Selección', description: 'Revisa los perfiles de los candidatos y sus propuestas', icon: Eye },
                            { number: '3', title: 'Votación', description: 'Selecciona tus candidatos de forma segura y confidencial', icon: Vote },
                            { number: '4', title: 'Confirmación', description: 'Voto Enviado con Exito', icon: CheckSquare }
                        ].map((step, index) => (
                            <motion.div
                                key={step.number}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                className="text-center"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <step.icon className="text-slate-600" size={24} />
                                </motion.div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-600">{step.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

          {/* Sección de Candidatos Destacados mejorada */}
<section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 z-10 relative">
    <div className="max-w-7xl mx-auto px-4">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
        >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Conoce a los Candidatos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Revisa las propuestas de los principales candidatos para tomar una decisión informada
            </p>
        </motion.div>

        {/* Pestañas de navegación */}
        <div className="flex justify-center mb-8">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-md p-1 inline-flex">
                {[
                    { id: 'presidencial', label: 'Presidencial', icon: Vote },
                    { id: 'regional', label: 'Regional', icon: MapPin },
                    { id: 'distrital', label: 'Distrital', icon: User }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                            activeTab === tab.id
                                ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-md'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>

        {/* Contenedor de candidatos con clave única para forzar rerender */}
        <motion.div
            key={activeTab} // Esto fuerza un rerender completo al cambiar de pestaña
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
            {candidatos[activeTab].slice(0, 4).map((candidato, index) => {
                // Función para obtener la clase de gradiente
                const getGradientClass = (color) => {
                    const gradientMap = {
                        red: 'bg-gradient-to-r from-red-400 to-red-600',
                        orange: 'bg-gradient-to-r from-orange-400 to-orange-600',
                        blue: 'bg-gradient-to-r from-blue-400 to-blue-600',
                        purple: 'bg-gradient-to-r from-purple-400 to-purple-600',
                        teal: 'bg-gradient-to-r from-teal-400 to-teal-600',
                        cyan: 'bg-gradient-to-r from-cyan-400 to-cyan-600',
                        pink: 'bg-gradient-to-r from-pink-400 to-pink-600',
                        indigo: 'bg-gradient-to-r from-indigo-400 to-indigo-600',
                        yellow: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
                        lime: 'bg-gradient-to-r from-lime-400 to-lime-600',
                        amber: 'bg-gradient-to-r from-amber-400 to-amber-600'
                    };
                    return gradientMap[color] || 'bg-gradient-to-r from-gray-400 to-gray-600';
                };

                const gradientClass = getGradientClass(candidato.color);

                return (
                    <motion.div
                        key={candidato.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        whileHover={{ y: -8, scale: 1.03 }}
                        className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                        {/* Barra de color superior */}
                        <div className={`h-3 ${gradientClass}`}></div>
                        
                        <div className="p-5">
                            <div className="flex flex-col items-center mb-4">
                                <div className="relative mb-4">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden"
                                    >
                                        <img
                                            src={candidato.photo}
                                            alt={candidato.nombre}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                // Si la imagen falla, usar avatar generado
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                        {/* Avatar de respaldo */}
                                        <div 
                                            className="w-full h-full bg-gradient-to-br from-slate-500 to-slate-700 rounded-full flex items-center justify-center text-white font-bold text-lg hidden"
                                            style={{ display: 'none' }}
                                        >
                                            {candidato.nombre.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    </motion.div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-slate-500 to-slate-700 flex items-center justify-center text-white text-xs font-bold">
                                            {candidato.partido.split(' ').map(w => w[0]).join('')}
                                        </div>
                                    </div>
                                </div>
                                
                                <h3 className="font-bold text-gray-900 text-center text-lg leading-tight">
                                    {candidato.nombre}
                                </h3>
                                <p className="text-sm text-gray-600 text-center font-medium mt-1">
                                    {candidato.partido}
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-center mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className={`${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                            size={14} 
                                        />
                                    ))}
                                    <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                                </div>
                            </div>
                            
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewingProposals(candidato)}
                                className="w-full text-center py-2.5 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-gray-700 rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2"
                            >
                                <FileText size={14} />
                                Ver Propuestas
                            </motion.button>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
        >
        </motion.div>
    </div>
</section>

            {/* Sección de Características del Sistema mejorada */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Características del Sistema</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Nuestra plataforma de votación electrónica ofrece seguridad, transparencia y accesibilidad
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {[
                            { icon: Shield, color: 'blue', title: 'Seguridad Garantizada', description: 'Cifrado de extremo a extremo y autenticación biométrica para proteger cada voto', features: ['Cifrado AES-256', 'Autenticación biométrica', 'Registro inmutable'] },
                            { icon: Zap, color: 'green', title: 'Rapidez y Eficiencia', description: 'Resultados en tiempo real y proceso de votación simplificado para todos los ciudadanos', features: ['Resultados en tiempo real', 'Proceso simplificado', 'Acceso 24/7'] },
                            { icon: Globe, color: 'slate', title: 'Accesibilidad Universal', description: 'Diseño inclusivo que permite votar desde cualquier lugar y dispositivo', features: ['Diseño responsivo', 'Soporte multiidioma', 'Asistencia inclusiva'] }
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gray-50 rounded-xl p-6"
                            >
                                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                                    <feature.icon className={`text-${feature.color}-600`} size={28} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 mb-4">{feature.description}</p>
                                <ul className="space-y-2">
                                    {feature.features.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                            <CheckCircle className="text-green-500" size={14} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Sección de Testimonios */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Testimonios de Ciudadanos</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Descubre lo que dicen los ciudadanos sobre nuestra plataforma de votación
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {[
                            { name: 'María González', role: 'Profesora', comment: 'El sistema es muy intuitivo y seguro. Pude votar desde casa sin ningún problema.', rating: 5 },
                            { name: 'Carlos Mendoza', role: 'Empresario', comment: 'La verificación por DNI es rápida y confiable. Me siento seguro usando esta plataforma.', rating: 5 },
                            { name: 'Ana Rodríguez', role: 'Estudiante', comment: 'Como joven, valoro la facilidad de uso y la accesibilidad del sistema para votar.', rating: 4 }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="text-yellow-400 fill-current" size={16} />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Modal de Votación mejorado */}
            <AnimatePresence>
                {showVotingForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            {/* Header del Modal mejorado */}
                            <div className="bg-gradient-to-r from-slate-600 to-slate-700 p-6 text-white flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">Formulario de Votación</h3>
                                    <p className="text-sm opacity-90">Complete sus datos para emitir su voto</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={closeModal}
                                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-all"
                                >
                                    <X size={24} />
                                </motion.button>
                            </div>

                            {/* Indicador de pasos mejorado */}
                            <div className="px-6 pt-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${formStep >= 1 ? 'bg-slate-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
                                        <span className={`ml-2 text-sm font-medium ${formStep >= 1 ? 'text-slate-600' : 'text-gray-500'}`}>Datos Personales</span>
                                    </div>
                                    <div className={`flex-1 h-1 mx-4 ${formStep >= 2 ? 'bg-slate-600' : 'bg-gray-200'}`}></div>
                                    <div className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${formStep >= 2 ? 'bg-slate-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
                                        <span className={`ml-2 text-sm font-medium ${formStep >= 2 ? 'text-slate-600' : 'text-gray-500'}`}>Seleccionar Candidatos</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="m-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                                    >
                                        <AlertCircle className="text-red-600" size={24} />
                                        <p className="text-sm text-red-800">{error}</p>
                                    </motion.div>
                                )}

                                <AnimatePresence mode="wait">
                                    {/* Paso 1: Datos Personales mejorado */}
                                    {formStep === 1 && (
                                        <motion.div
                                            key="step1"
                                            variants={stepVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="space-y-6"
                                        >
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-sm">1</div>
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
                                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                                            />
                                                            {loading && (
                                                                <div className="absolute right-3 top-3">
                                                                    <Loader className="animate-spin text-slate-600" size={20} />
                                                                </div>
                                                            )}
                                                            {dniVerified && !loading && (
                                                                <motion.div
                                                                    initial={{ scale: 0 }}
                                                                    animate={{ scale: 1 }}
                                                                    className="absolute right-3 top-3"
                                                                >
                                                                    <CheckCircle className="text-green-600" size={20} />
                                                                </motion.div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Nombre Completo
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="nombre_completo"
                                                            value={formData.nombre_completo}
                                                            onChange={handleInputChange}
                                                            placeholder="Nombre completo"
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                            readOnly={dniVerified}
                                                            autoComplete="name"
                                                            spellCheck="false"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Nombres
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="nombres"
                                                            value={formData.nombres}
                                                            onChange={handleInputChange}
                                                            placeholder="Nombres"
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                            readOnly={dniVerified}
                                                            autoComplete="given-name"
                                                            spellCheck="false"
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
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                            readOnly={dniVerified}
                                                            autoComplete="family-name"
                                                            spellCheck="false"
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
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                            readOnly={dniVerified}
                                                            autoComplete="family-name"
                                                            spellCheck="false"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Departamento
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="departamento"
                                                            value={formData.departamento}
                                                            onChange={handleInputChange}
                                                            placeholder="Departamento"
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                            readOnly={dniVerified}
                                                            autoComplete="address-level1"
                                                            spellCheck="false"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Provincia
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="provincia"
                                                            value={formData.provincia}
                                                            onChange={handleInputChange}
                                                            placeholder="Provincia"
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                            readOnly={dniVerified}
                                                            autoComplete="address-level2"
                                                            spellCheck="false"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Distrito
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="distrito"
                                                            value={formData.distrito}
                                                            onChange={handleInputChange}
                                                            placeholder="Distrito"
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                            readOnly={dniVerified}
                                                            autoComplete="address-level3"
                                                            spellCheck="false"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Dirección
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="direccion"
                                                            value={formData.direccion}
                                                            onChange={handleInputChange}
                                                            placeholder="Dirección"
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                            readOnly={dniVerified}
                                                            autoComplete="street-address"
                                                            spellCheck="false"
                                                        />
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Dirección Completa
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="direccion_completa"
                                                            value={formData.direccion_completa}
                                                            onChange={handleInputChange}
                                                            placeholder="Dirección completa"
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                            readOnly={dniVerified}
                                                            autoComplete="street-address"
                                                            spellCheck="false"
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
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                            autoComplete="tel"
                                                            spellCheck="false"
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
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                            autoComplete="email"
                                                            spellCheck="false"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-gray-200">
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    type="button"
                                                    onClick={handleContinue}
                                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all font-bold text-lg shadow-lg"
                                                >
                                                    Continuar
                                                    <ChevronRight size={20} />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Paso 2: Selección de Candidatos mejorado */}
                                    {formStep === 2 && (
                                        <motion.div
                                            key="step2"
                                            variants={stepVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="space-y-6"
                                        >
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-sm">2</div>
                                                    Seleccione sus Candidatos <span className="text-red-500">*</span>
                                                </h4>
                                                <p className="text-sm text-gray-600 mb-4">Puede seleccionar un candidato para cada tipo de elección. Haga clic en una tarjeta para seleccionar o deseleccionar.</p>
                                            </div>

                                            {/* Pestañas de navegación para candidatos */}
                                            <div className="flex justify-center mb-6">
                                                <div className="bg-gray-100 rounded-lg p-1 inline-flex">
                                                    {[
                                                        { id: 'presidencial', label: 'Presidencial', icon: Vote },
                                                        { id: 'regional', label: 'Regional', icon: MapPin },
                                                        { id: 'distrital', label: 'Distrital', icon: User }
                                                    ].map((tab) => (
                                                        <button
                                                            key={tab.id}
                                                            onClick={() => setActiveTab(tab.id)}
                                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                                                                activeTab === tab.id
                                                                    ? 'bg-white text-slate-600 shadow-sm'
                                                                    : 'text-gray-600 hover:text-gray-900'
                                                            }`}
                                                        >
                                                            <tab.icon size={16} />
                                                            {tab.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Elección Presidencial */}
                                            {activeTab === 'presidencial' && (
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
                                            )}

                                            {/* Elección Regional */}
                                            {activeTab === 'regional' && (
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
                                            )}

                                            {/* Elección Distrital */}
                                            {activeTab === 'distrital' && (
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
                                            )}

                                            {/* Resumen de selección */}
                                            <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                                <h5 className="font-semibold text-gray-800 mb-3">Resumen de su selección:</h5>
                                                <div className="space-y-2">
                                                    {selectedCandidates.presidencial && (
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm text-gray-600">Presidencial:</span>
                                                            <span className="text-sm font-medium text-gray-900">{selectedCandidates.presidencial}</span>
                                                        </div>
                                                    )}
                                                    {selectedCandidates.regional && (
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm text-gray-600">Regional:</span>
                                                            <span className="text-sm font-medium text-gray-900">{selectedCandidates.regional}</span>
                                                        </div>
                                                    )}
                                                    {selectedCandidates.distrital && (
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm text-gray-600">Distrital:</span>
                                                            <span className="text-sm font-medium text-gray-900">{selectedCandidates.distrital}</span>
                                                        </div>
                                                    )}
                                                    {!selectedCandidates.presidencial && !selectedCandidates.regional && !selectedCandidates.distrital && (
                                                        <p className="text-sm text-gray-500 italic">No ha seleccionado ningún candidato aún</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-gray-200 flex gap-4">
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    type="button"
                                                    onClick={() => setFormStep(1)}
                                                    className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-bold"
                                                >
                                                    Anterior
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    type="button"
                                                    onClick={handleSubmit}
                                                    disabled={loading}
                                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                                >
                                                    <Vote size={24} />
                                                    Emitir Voto(s)
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal de Propuestas */}
            <AnimatePresence>
                {viewingProposals && (
                    <PropuestasModal
                        candidate={viewingProposals}
                        onClose={() => setViewingProposals(null)}
                    />
                )}
            </AnimatePresence>

            {/* Modal de Éxito */}
            <AnimatePresence>
                {showSuccessModal && <SuccessModal />}
            </AnimatePresence>

            {/* Footer mejorado */}
            <motion.footer
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-900 text-white py-12"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <motion.div
                                    whileHover={{ scale: 1.05, rotate: 5 }}
                                    className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center"
                                >
                                    <Vote className="text-white" size={20} />
                                </motion.div>
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
            </motion.footer>
        </motion.div>
    );
};

export default LandingPage;