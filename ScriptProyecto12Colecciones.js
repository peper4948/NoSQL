use("MarViva");

// =====================================================
// REINICIO (opcional): descomentar para borrar y volver a cargar todo
// =====================================================
// ["Usuarios", "ZonasConservacion", "Proyectos", "ReportesCampo", "ReportesCiudadanos",
//  "ObservacionesEspecies", "RegistrosResiduos", "Donantes", "Alianzas"]
//   .forEach(c => db.getCollection(c).drop());

// Usuarios: 1-2 ADMIN | 3-5 COORDINADOR | 6-7 CAMPO | 8-9 VOLUNTARIO | 10 CIUDADANO

// =====================================================
// 1. USUARIOS (10 documentos)
// La contraseña de todos es un hash BCrypt de ejemplo.
// =====================================================
db.getCollection("Usuarios").insertMany([
  { idUsuario: 1,  nombre: "Laura Campos Mora",      correo: "laura.campos@example.com",     contra: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy", rol: "ADMIN",       activo: true,  fechaRegistro: new Date("2026-01-10") },
  { idUsuario: 2,  nombre: "Carlos Rojas Vargas",    correo: "carlos.rojas@example.com",     contra: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy", rol: "ADMIN",       activo: true,  fechaRegistro: new Date("2026-01-10") },
  { idUsuario: 3,  nombre: "Daniela Solano Araya",   correo: "daniela.solano@example.com",   contra: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy", rol: "COORDINADOR", activo: true,  fechaRegistro: new Date("2026-01-15") },
  { idUsuario: 4,  nombre: "Andrés Mora Jiménez",    correo: "andres.mora@example.com",      contra: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy", rol: "COORDINADOR", activo: true,  fechaRegistro: new Date("2026-01-20") },
  { idUsuario: 5,  nombre: "Sofía Vargas Quesada",   correo: "sofia.vargas@example.com",     contra: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy", rol: "COORDINADOR", activo: true,  fechaRegistro: new Date("2026-02-02") },
  { idUsuario: 6,  nombre: "Esteban Chaves Brenes",  correo: "esteban.chaves@example.com",   contra: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy", rol: "CAMPO",       activo: true,  fechaRegistro: new Date("2026-02-10") },
  { idUsuario: 7,  nombre: "Valeria Núñez Castro",   correo: "valeria.nunez@example.com",    contra: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy", rol: "CAMPO",       activo: true,  fechaRegistro: new Date("2026-02-12") },
  { idUsuario: 8,  nombre: "Mauricio Salazar Pérez", correo: "mauricio.salazar@example.com", contra: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy", rol: "VOLUNTARIO",  activo: true,  fechaRegistro: new Date("2026-03-05") },
  { idUsuario: 9,  nombre: "Karla Jiménez Rojas",    correo: "karla.jimenez@example.com",    contra: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy", rol: "VOLUNTARIO",  activo: true,  fechaRegistro: new Date("2026-03-18") },
  { idUsuario: 10, nombre: "Pedro Alvarado Soto",    correo: "pedro.alvarado@example.com",   contra: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy", rol: "CIUDADANO",   activo: false, fechaRegistro: new Date("2026-04-01") }
]);

db.getCollection("Usuarios").createIndex({ correo: 1 }, { unique: true });
db.getCollection("Usuarios").createIndex({ idUsuario: 1 }, { unique: true });

// =====================================================
// 2. ZONAS DE CONSERVACIÓN (10 documentos)
// ubicacion es GeoJSON: coordinates = [longitud, latitud]
// Las coordenadas son aproximadas, solo para pruebas.D
// =====================================================
db.getCollection("ZonasConservacion").insertMany([
  { idZona: 1,  nombre: "Golfo Dulce",                              tipo: "Golfo / Humedal marino",     provincia: "Puntarenas", descripcion: "Fiordo tropical con alta biodiversidad marina.",                    ubicacion: { type: "Point", coordinates: [-83.20, 8.55] },  activa: true },
  { idZona: 2,  nombre: "Parque Nacional Marino Ballena",           tipo: "Parque nacional marino",     provincia: "Puntarenas", descripcion: "Zona de avistamiento de ballenas jorobadas y arrecifes de coral.", ubicacion: { type: "Point", coordinates: [-83.69, 9.15] },  activa: true },
  { idZona: 3,  nombre: "Isla del Coco",                            tipo: "Parque nacional marino",     provincia: "Puntarenas", descripcion: "Isla oceánica con tiburones martillo y gran riqueza de especies.", ubicacion: { type: "Point", coordinates: [-87.07, 5.53] },  activa: true },
  { idZona: 4,  nombre: "Reserva Biológica Isla del Caño",          tipo: "Reserva biológica",          provincia: "Puntarenas", descripcion: "Isla con arrecifes coralinos y sitios de buceo protegidos.",        ubicacion: { type: "Point", coordinates: [-83.88, 8.72] },  activa: true },
  { idZona: 5,  nombre: "Isla Chira y Golfo de Nicoya",             tipo: "Comunidad pesquera",         provincia: "Puntarenas", descripcion: "Zona de pesca artesanal y manglares del Golfo de Nicoya.",          ubicacion: { type: "Point", coordinates: [-85.00, 10.08] }, activa: true },
  { idZona: 6,  nombre: "Manglar Térraba-Sierpe",                   tipo: "Humedal / Manglar",          provincia: "Puntarenas", descripcion: "Mayor extensión de manglar del país.",                              ubicacion: { type: "Point", coordinates: [-83.60, 8.95] },  activa: true },
  { idZona: 7,  nombre: "Área Marina de Manejo Bahía Santa Elena",  tipo: "Área marina de manejo",      provincia: "Guanacaste", descripcion: "Bahía con pesca responsable y monitoreo de tortugas marinas.",      ubicacion: { type: "Point", coordinates: [-85.82, 10.93] }, activa: true },
  { idZona: 8,  nombre: "Bahía Salinas",                            tipo: "Bahía / Zona costera",       provincia: "Guanacaste", descripcion: "Zona costera en el extremo norte del Pacífico costarricense.",      ubicacion: { type: "Point", coordinates: [-85.70, 11.07] }, activa: true },
  { idZona: 9,  nombre: "Parque Nacional Cahuita",                  tipo: "Parque nacional / Arrecife", provincia: "Limón",      descripcion: "Arrecife de coral del Caribe y playas con jornadas de limpieza.",   ubicacion: { type: "Point", coordinates: [-82.80, 9.74] },  activa: true },
  { idZona: 10, nombre: "Refugio Gandoca-Manzanillo",               tipo: "Refugio de vida silvestre",  provincia: "Limón",      descripcion: "Refugio con anidación de tortugas y manglar de orey.",              ubicacion: { type: "Point", coordinates: [-82.62, 9.60] },  activa: false }
]);

db.getCollection("ZonasConservacion").createIndex({ ubicacion: "2dsphere" });
db.getCollection("ZonasConservacion").createIndex({ idZona: 1 }, { unique: true });

// =====================================================
// 3. PROYECTOS (10 documentos)
// idZona -> ZonasConservacion | idCoordinador -> Usuarios
// =====================================================
db.getCollection("Proyectos").insertMany([
  {
    idProyecto: 1, nombre: "Limpieza de Costas del Golfo Dulce",
    descripcion: "Jornadas periódicas de recolección de residuos en playas y manglares del Golfo Dulce.",
    objetivos: ["Recolectar residuos plásticos", "Sensibilizar a comunidades locales", "Medir volumen de residuos por jornada"],
    tipo: "Limpieza", estado: "ACTIVO", provincia: "Puntarenas",
    idZona: 1, idCoordinador: 3,
    fechaInicio: new Date("2026-02-01"), fechaFin: new Date("2026-12-15"),
    fotografias: ["img/golfo-dulce-1.jpg", "img/golfo-dulce-2.jpg"]
  },
  {
    idProyecto: 2, nombre: "Monitoreo de Ballenas Jorobadas",
    descripcion: "Registro de avistamientos de ballenas y delfines durante las temporadas migratorias.",
    objetivos: ["Registrar avistamientos", "Identificar rutas migratorias", "Capacitar guías turísticos"],
    tipo: "Monitoreo", estado: "ACTIVO", provincia: "Puntarenas",
    idZona: 2, idCoordinador: 4,
    fechaInicio: new Date("2026-01-20"), fechaFin: new Date("2026-11-30"),
    fotografias: ["img/ballena-1.jpg"]
  },
  {
    idProyecto: 3, nombre: "Protección de Tiburones en Isla del Coco",
    descripcion: "Seguimiento de poblaciones de tiburones y control de pesca ilegal en la zona.",
    objetivos: ["Vigilar la pesca ilegal", "Registrar especies de tiburón", "Generar datos científicos"],
    tipo: "Investigación", estado: "ACTIVO", provincia: "Puntarenas",
    idZona: 3, idCoordinador: 1,
    fechaInicio: new Date("2025-11-10"), fechaFin: new Date("2027-06-30"),
    fotografias: ["img/coco-1.jpg", "img/coco-2.jpg", "img/coco-3.jpg"]
  },
  {
    idProyecto: 4, nombre: "Restauración de Arrecifes en Isla del Caño",
    descripcion: "Monitoreo y restauración de colonias de coral afectadas por el blanqueamiento.",
    objetivos: ["Evaluar salud del coral", "Trasplantar fragmentos de coral", "Reducir el impacto del buceo"],
    tipo: "Restauración", estado: "ACTIVO", provincia: "Puntarenas",
    idZona: 4, idCoordinador: 5,
    fechaInicio: new Date("2026-03-05"), fechaFin: new Date("2027-03-05"),
    fotografias: ["img/cano-1.jpg"]
  },
  {
    idProyecto: 5, nombre: "Pesca Responsable en Isla Chira",
    descripcion: "Acompañamiento a pescadores artesanales en prácticas de pesca sostenible.",
    objetivos: ["Capacitar pescadores", "Promover artes de pesca selectivas", "Fortalecer la asociación local"],
    tipo: "Educación", estado: "ACTIVO", provincia: "Puntarenas",
    idZona: 5, idCoordinador: 3,
    fechaInicio: new Date("2026-04-01"), fechaFin: new Date("2026-12-20"),
    fotografias: ["img/chira-1.jpg", "img/chira-2.jpg"]
  },
  {
    idProyecto: 6, nombre: "Reforestación de Manglar Térraba-Sierpe",
    descripcion: "Siembra de propágulos de mangle en áreas degradadas del humedal.",
    objetivos: ["Sembrar 5000 plántulas de mangle", "Involucrar a voluntarios", "Dar seguimiento a la supervivencia"],
    tipo: "Restauración", estado: "EN_PAUSA", provincia: "Puntarenas",
    idZona: 6, idCoordinador: 4,
    fechaInicio: new Date("2026-02-15"), fechaFin: new Date("2027-02-15"),
    fotografias: []
  },
  {
    idProyecto: 7, nombre: "Tortugas Marinas de Bahía Santa Elena",
    descripcion: "Protección de nidos y liberación de neonatos de tortugas marinas.",
    objetivos: ["Proteger nidos", "Registrar eventos de anidación", "Organizar liberaciones con la comunidad"],
    tipo: "Conservación", estado: "ACTIVO", provincia: "Guanacaste",
    idZona: 7, idCoordinador: 5,
    fechaInicio: new Date("2026-06-01"), fechaFin: new Date("2027-01-31"),
    fotografias: ["img/santa-elena-1.jpg"]
  },
  {
    idProyecto: 8, nombre: "Ordenamiento Espacial Marino Bahía Salinas",
    descripcion: "Levantamiento de información para el ordenamiento de usos en la bahía.",
    objetivos: ["Mapear zonas de uso", "Reunirse con actores locales", "Entregar propuesta técnica"],
    tipo: "Investigación", estado: "FINALIZADO", provincia: "Guanacaste",
    idZona: 8, idCoordinador: 1,
    fechaInicio: new Date("2025-03-01"), fechaFin: new Date("2026-03-01"),
    fotografias: ["img/salinas-1.jpg"]
  },
  {
    idProyecto: 9, nombre: "Playas Limpias en Cahuita",
    descripcion: "Jornadas mensuales de limpieza de playa con participación de voluntarios y escuelas.",
    objetivos: ["Realizar jornadas mensuales", "Clasificar residuos recolectados", "Educar sobre manejo de residuos"],
    tipo: "Limpieza", estado: "ACTIVO", provincia: "Limón",
    idZona: 9, idCoordinador: 3,
    fechaInicio: new Date("2026-03-15"), fechaFin: new Date("2026-12-10"),
    fotografias: ["img/cahuita-1.jpg", "img/cahuita-2.jpg"]
  },
  {
    idProyecto: 10, nombre: "Anidación de Tortugas en Gandoca-Manzanillo",
    descripcion: "Patrullaje nocturno y registro de nidos de tortuga baula en el refugio.",
    objetivos: ["Patrullar playas en temporada", "Reubicar nidos en riesgo", "Capacitar voluntarios"],
    tipo: "Conservación", estado: "FINALIZADO", provincia: "Limón",
    idZona: 10, idCoordinador: 4,
    fechaInicio: new Date("2025-02-01"), fechaFin: new Date("2025-10-30"),
    fotografias: ["img/gandoca-1.jpg"]
  }
]);

db.getCollection("Proyectos").createIndex({ idProyecto: 1 }, { unique: true });
db.getCollection("Proyectos").createIndex({ estado: 1, provincia: 1 });

// =====================================================
// 4. REPORTES DE CAMPO (10 documentos)
// =====================================================
db.getCollection("ReportesCampo").insertMany([
  { _id:1,  fecha:"2026-10-15", colaborador:"Carlos Rojas",    provincia:"Puntarenas", actividad:"Limpieza de playa",       descripcion:"Se realizo una jornada de limpieza en la zona costera" },
  { _id:2,  fecha:"2026-10-16", colaborador:"Ana Salas",       provincia:"Guanacaste", actividad:"Monitoreo ambiental",     descripcion:"Se realizo una inspeccion de la zona marina" },
  { _id:3,  fecha:"2026-10-17", colaborador:"Luis Vargas",     provincia:"Puntarenas", actividad:"Recoleccion de residuos", descripcion:"Se recolectaron residuos plasticos encontrados en la playa" },
  { _id:4,  fecha:"2026-10-18", colaborador:"Maria Lopez",     provincia:"Guanacaste", actividad:"Observacion de especies", descripcion:"Se observaron diferentes especies marinas durante el recorrido" },
  { _id:5,  fecha:"2026-10-19", colaborador:"Pedro Ramirez",   provincia:"Puntarenas", actividad:"Monitoreo de manglares",  descripcion:"Se realizo una revision de las condiciones ambientales del manglar" },
  { _id:6,  fecha:"2026-10-20", colaborador:"Sofia Hernandez", provincia:"Guanacaste", actividad:"Limpieza de playa",       descripcion:"Se retiraron residuos solidos de una zona costera" },
  { _id:7,  fecha:"2026-10-21", colaborador:"Jose Martinez",   provincia:"Puntarenas", actividad:"Educacion ambiental",     descripcion:"Se desarrollo una charla sobre la importancia de la conservacion marina" },
  { _id:8,  fecha:"2026-10-22", colaborador:"Laura Fernandez", provincia:"Guanacaste", actividad:"Monitoreo ambiental",     descripcion:"Se registraron las condiciones generales de una zona de conservacion" },
  { _id:9,  fecha:"2026-10-23", colaborador:"Daniel Castro",   provincia:"Puntarenas", actividad:"Observacion de especies", descripcion:"Se realizo un recorrido para identificar especies marinas presentes" },
  { _id:10, fecha:"2026-10-24", colaborador:"Andrea Morales",  provincia:"Guanacaste", actividad:"Recoleccion de residuos", descripcion:"Se realizo una jornada de recoleccion de residuos en una playa" }
]);

// =====================================================
// 5. REPORTES CIUDADANOS (10 documentos)
// =====================================================
db.getCollection("ReportesCiudadanos").insertMany([
  { _id:1,  fecha:"2026-10-17", ciudadano:"Luis Vargas",     provincia:"Puntarenas", tipo_reporte:"Contaminacion", descripcion:"Se observa acumulacion de residuos en la playa" },
  { _id:2,  fecha:"2026-10-18", ciudadano:"Maria Lopez",     provincia:"Guanacaste", tipo_reporte:"Residuos",      descripcion:"Se reporta presencia de basura en una zona costera" },
  { _id:3,  fecha:"2026-10-19", ciudadano:"Carlos Mendez",   provincia:"Puntarenas", tipo_reporte:"Contaminacion", descripcion:"Se observa presencia de plasticos flotando cerca de la costa" },
  { _id:4,  fecha:"2026-10-20", ciudadano:"Ana Rodriguez",   provincia:"Guanacaste", tipo_reporte:"Fauna marina",  descripcion:"Se reporta una tortuga marina herida en la playa" },
  { _id:5,  fecha:"2026-10-21", ciudadano:"Pedro Sanchez",   provincia:"Puntarenas", tipo_reporte:"Residuos",      descripcion:"Se observa acumulacion de botellas plasticas en la zona costera" },
  { _id:6,  fecha:"2026-10-22", ciudadano:"Sofia Ramirez",   provincia:"Guanacaste", tipo_reporte:"Contaminacion", descripcion:"Se reporta presencia de residuos cerca de un manglar" },
  { _id:7,  fecha:"2026-10-23", ciudadano:"Jose Fernandez",  provincia:"Puntarenas", tipo_reporte:"Fauna marina",  descripcion:"Se observa un delfin aparentemente herido cerca de la costa" },
  { _id:8,  fecha:"2026-10-24", ciudadano:"Laura Castro",    provincia:"Guanacaste", tipo_reporte:"Residuos",      descripcion:"Se reporta acumulacion de basura en una playa" },
  { _id:9,  fecha:"2026-10-25", ciudadano:"Daniel Morales",  provincia:"Puntarenas", tipo_reporte:"Contaminacion", descripcion:"Se observa presencia de residuos en el agua" },
  { _id:10, fecha:"2026-10-26", ciudadano:"Andrea Vargas",   provincia:"Guanacaste", tipo_reporte:"Fauna marina",  descripcion:"Se reporta presencia de una tortuga marina atrapada entre residuos" }
]);

// =====================================================
// 6. OBSERVACIONES DE ESPECIES (10 documentos)
// =====================================================
db.getCollection("ObservacionesEspecies").insertMany([
  { _id:1,  fecha:"2026-10-15", especie:"Tortuga marina",          cantidad:3,  provincia:"Puntarenas", descripcion:"Se observaron tres tortugas durante el recorrido" },
  { _id:2,  fecha:"2026-10-16", especie:"Delfin",                  cantidad:5,  provincia:"Guanacaste", descripcion:"Se observaron cinco delfines en la zona marina" },
  { _id:3,  fecha:"2026-10-17", especie:"Tiburon martillo",        cantidad:2,  provincia:"Puntarenas", descripcion:"Se observaron dos tiburones martillo durante el monitoreo marino" },
  { _id:4,  fecha:"2026-10-18", especie:"Mantarraya",              cantidad:4,  provincia:"Guanacaste", descripcion:"Se registraron cuatro mantarrayas durante el recorrido" },
  { _id:5,  fecha:"2026-10-19", especie:"Ballena jorobada",        cantidad:2,  provincia:"Puntarenas", descripcion:"Se observaron dos ballenas jorobadas en aguas cercanas a la costa" },
  { _id:6,  fecha:"2026-10-20", especie:"Tortuga verde",           cantidad:6,  provincia:"Guanacaste", descripcion:"Se registraron seis tortugas verdes durante la actividad de observacion" },
  { _id:7,  fecha:"2026-10-21", especie:"Delfin nariz de botella", cantidad:8,  provincia:"Puntarenas", descripcion:"Se observo un grupo de ocho delfines durante el monitoreo" },
  { _id:8,  fecha:"2026-10-22", especie:"Tiburon ballena",         cantidad:1,  provincia:"Guanacaste", descripcion:"Se registro la presencia de un tiburon ballena en la zona marina" },
  { _id:9,  fecha:"2026-10-23", especie:"Tortuga baula",           cantidad:3,  provincia:"Puntarenas", descripcion:"Se observaron tres tortugas baula durante el recorrido de conservacion" },
  { _id:10, fecha:"2026-10-24", especie:"Pez loro",                cantidad:12, provincia:"Guanacaste", descripcion:"Se registraron doce peces loro durante la actividad de observacion" }
]);

// =====================================================
// 7. REGISTROS DE RESIDUOS (10 documentos)
// =====================================================
db.getCollection("RegistrosResiduos").insertMany([
  { idRegistroResiduo: 1,  idProyecto: 1, idZona: 1, idUsuario: 6, tipoResiduo: "Plástico",        cantidadKg: 45.5, fechaRecoleccion: new Date("2026-03-10"), descripcion: "Botellas y bolsas plásticas recolectadas en Golfo Dulce." },
  { idRegistroResiduo: 2,  idProyecto: 1, idZona: 1, idUsuario: 7, tipoResiduo: "Vidrio",          cantidadKg: 20.3, fechaRecoleccion: new Date("2026-03-10"), descripcion: "Botellas de vidrio encontradas en la playa." },
  { idRegistroResiduo: 3,  idProyecto: 9, idZona: 9, idUsuario: 6, tipoResiduo: "Plástico",        cantidadKg: 60.8, fechaRecoleccion: new Date("2026-04-15"), descripcion: "Residuos plásticos recolectados en Cahuita." },
  { idRegistroResiduo: 4,  idProyecto: 9, idZona: 9, idUsuario: 7, tipoResiduo: "Metal",           cantidadKg: 15.2, fechaRecoleccion: new Date("2026-04-15"), descripcion: "Latas y otros residuos metálicos." },
  { idRegistroResiduo: 5,  idProyecto: 1, idZona: 1, idUsuario: 6, tipoResiduo: "Papel y cartón",  cantidadKg: 12.6, fechaRecoleccion: new Date("2026-05-20"), descripcion: "Cartones y papeles encontrados en zonas costeras." },
  { idRegistroResiduo: 6,  idProyecto: 9, idZona: 9, idUsuario: 7, tipoResiduo: "Plástico",        cantidadKg: 38.4, fechaRecoleccion: new Date("2026-05-25"), descripcion: "Bolsas y envases plásticos recolectados." },
  { idRegistroResiduo: 7,  idProyecto: 1, idZona: 1, idUsuario: 6, tipoResiduo: "Redes de pesca",  cantidadKg: 75.0, fechaRecoleccion: new Date("2026-06-12"), descripcion: "Redes de pesca abandonadas en el mar." },
  { idRegistroResiduo: 8,  idProyecto: 9, idZona: 9, idUsuario: 7, tipoResiduo: "Vidrio",          cantidadKg: 18.7, fechaRecoleccion: new Date("2026-07-05"), descripcion: "Botellas de vidrio recolectadas durante limpieza." },
  { idRegistroResiduo: 9,  idProyecto: 1, idZona: 1, idUsuario: 6, tipoResiduo: "Metal",           cantidadKg: 22.9, fechaRecoleccion: new Date("2026-08-18"), descripcion: "Residuos metálicos encontrados en manglares." },
  { idRegistroResiduo: 10, idProyecto: 9, idZona: 9, idUsuario: 7, tipoResiduo: "Residuos mixtos", cantidadKg: 50.5, fechaRecoleccion: new Date("2026-09-10"), descripcion: "Diferentes residuos recolectados en una jornada ambiental." }
]);

db.getCollection("RegistrosResiduos").createIndex({ idRegistroResiduo: 1 }, { unique: true });
db.getCollection("RegistrosResiduos").createIndex({ idProyecto: 1, fechaRecoleccion: 1 });

// =====================================================
// 8. DONANTES (10 documentos)
// =====================================================
db.getCollection("Donantes").insertMany([
  { idDonante: 1,  nombre: "María Rodríguez",        tipoDonante: "PERSONA",      correo: "maria.rodriguez@example.com",   telefono: "8888-1001", montoDonacion: 25000,  moneda: "CRC", fechaDonacion: new Date("2026-02-10"), idProyecto: 1,  activo: true },
  { idDonante: 2,  nombre: "Carlos Fernández",       tipoDonante: "PERSONA",      correo: "carlos.fernandez@example.com",  telefono: "8888-1002", montoDonacion: 50000,  moneda: "CRC", fechaDonacion: new Date("2026-02-15"), idProyecto: 2,  activo: true },
  { idDonante: 3,  nombre: "Empresa EcoVerde",       tipoDonante: "EMPRESA",      correo: "contacto@ecoverde.example.com", telefono: "2222-1003", montoDonacion: 150000, moneda: "CRC", fechaDonacion: new Date("2026-03-01"), idProyecto: 3,  activo: true },
  { idDonante: 4,  nombre: "Ana Morales",            tipoDonante: "PERSONA",      correo: "ana.morales@example.com",       telefono: "8888-1004", montoDonacion: 30000,  moneda: "CRC", fechaDonacion: new Date("2026-03-12"), idProyecto: 4,  activo: true },
  { idDonante: 5,  nombre: "Fundación Océano Azul",  tipoDonante: "ORGANIZACION", correo: "info@oceanoazul.example.com",   telefono: "2222-1005", montoDonacion: 200000, moneda: "CRC", fechaDonacion: new Date("2026-04-05"), idProyecto: 5,  activo: true },
  { idDonante: 6,  nombre: "José Vargas",            tipoDonante: "PERSONA",      correo: "jose.vargas@example.com",       telefono: "8888-1006", montoDonacion: 15000,  moneda: "CRC", fechaDonacion: new Date("2026-04-18"), idProyecto: 6,  activo: true },
  { idDonante: 7,  nombre: "Empresa Costa Limpia",   tipoDonante: "EMPRESA",      correo: "contacto@costalimpia.example.com", telefono: "2222-1007", montoDonacion: 100000, moneda: "CRC", fechaDonacion: new Date("2026-05-10"), idProyecto: 7,  activo: true },
  { idDonante: 8,  nombre: "Lucía Herrera",          tipoDonante: "PERSONA",      correo: "lucia.herrera@example.com",     telefono: "8888-1008", montoDonacion: 40000,  moneda: "CRC", fechaDonacion: new Date("2026-05-22"), idProyecto: 8,  activo: true },
  { idDonante: 9,  nombre: "Asociación Vida Marina", tipoDonante: "ORGANIZACION", correo: "info@vidamarina.example.com",   telefono: "2222-1009", montoDonacion: 175000, moneda: "CRC", fechaDonacion: new Date("2026-06-15"), idProyecto: 9,  activo: true },
  { idDonante: 10, nombre: "Pedro Jiménez",          tipoDonante: "PERSONA",      correo: "pedro.jimenez@example.com",     telefono: "8888-1010", montoDonacion: 20000,  moneda: "CRC", fechaDonacion: new Date("2026-07-01"), idProyecto: 10, activo: false }
]);

db.getCollection("Donantes").createIndex({ idDonante: 1 }, { unique: true });
db.getCollection("Donantes").createIndex({ correo: 1 });
db.getCollection("Donantes").createIndex({ idProyecto: 1 });

// =====================================================
// 9. ALIANZAS (10 documentos)
// =====================================================
db.getCollection("Alianzas").insertMany([
  { idAlianza: 1,  nombreOrganizacion: "Universidad Ambiental de Costa Rica", tipoOrganizacion: "UNIVERSIDAD", contacto: "Andrea López",    correo: "contacto@universidadambiental.example.com",  telefono: "2222-2001", tipoColaboracion: "Investigación ambiental",        idProyecto: 1,  fechaInicio: new Date("2026-01-15"), estado: "ACTIVA" },
  { idAlianza: 2,  nombreOrganizacion: "Fundación Océanos Unidos",            tipoOrganizacion: "ONG",         contacto: "Daniel Castro",   correo: "info@oceanosunidos.example.com",             telefono: "2222-2002", tipoColaboracion: "Conservación marina",            idProyecto: 2,  fechaInicio: new Date("2026-02-01"), estado: "ACTIVA" },
  { idAlianza: 3,  nombreOrganizacion: "Empresa EcoTecnología",               tipoOrganizacion: "EMPRESA",     contacto: "Sofía Ramírez",   correo: "contacto@ecotecnologia.example.com",         telefono: "2222-2003", tipoColaboracion: "Apoyo tecnológico",              idProyecto: 3,  fechaInicio: new Date("2026-02-20"), estado: "ACTIVA" },
  { idAlianza: 4,  nombreOrganizacion: "Asociación Guardianes del Mar",       tipoOrganizacion: "ASOCIACION",  contacto: "Carlos Morales",  correo: "info@guardianesdelmar.example.com",          telefono: "2222-2004", tipoColaboracion: "Voluntariado ambiental",         idProyecto: 4,  fechaInicio: new Date("2026-03-05"), estado: "ACTIVA" },
  { idAlianza: 5,  nombreOrganizacion: "Instituto de Investigación Marina",   tipoOrganizacion: "INSTITUCION", contacto: "María Solano",    correo: "contacto@investigacionmarina.example.com",   telefono: "2222-2005", tipoColaboracion: "Monitoreo de especies",          idProyecto: 5,  fechaInicio: new Date("2026-03-18"), estado: "ACTIVA" },
  { idAlianza: 6,  nombreOrganizacion: "Empresa Recicla Costa Rica",          tipoOrganizacion: "EMPRESA",     contacto: "José Hernández",  correo: "info@reciclacr.example.com",                 telefono: "2222-2006", tipoColaboracion: "Gestión de residuos",            idProyecto: 6,  fechaInicio: new Date("2026-04-10"), estado: "ACTIVA" },
  { idAlianza: 7,  nombreOrganizacion: "Red de Voluntarios Ambientales",      tipoOrganizacion: "ASOCIACION",  contacto: "Valeria Jiménez", correo: "contacto@voluntariosambientales.example.com", telefono: "2222-2007", tipoColaboracion: "Organización de voluntarios",    idProyecto: 7,  fechaInicio: new Date("2026-04-25"), estado: "ACTIVA" },
  { idAlianza: 8,  nombreOrganizacion: "Fundación Bosques y Mares",           tipoOrganizacion: "ONG",         contacto: "Andrés Vargas",   correo: "info@bosquesymares.example.com",             telefono: "2222-2008", tipoColaboracion: "Educación ambiental",            idProyecto: 8,  fechaInicio: new Date("2025-05-12"), estado: "FINALIZADA" },
  { idAlianza: 9,  nombreOrganizacion: "Empresa Playas Limpias",              tipoOrganizacion: "EMPRESA",     contacto: "Laura Fernández", correo: "contacto@playaslimpias.example.com",         telefono: "2222-2009", tipoColaboracion: "Limpieza de playas",             idProyecto: 9,  fechaInicio: new Date("2026-05-30"), estado: "ACTIVA" },
  { idAlianza: 10, nombreOrganizacion: "Centro de Conservación de Tortugas",  tipoOrganizacion: "INSTITUCION", contacto: "Pedro Rojas",     correo: "info@conservaciontortugas.example.com",      telefono: "2222-2010", tipoColaboracion: "Protección de tortugas marinas", idProyecto: 10, fechaInicio: new Date("2025-06-15"), estado: "FINALIZADA" }
]);

db.getCollection("Alianzas").createIndex({ idAlianza: 1 }, { unique: true });
db.getCollection("Alianzas").createIndex({ nombreOrganizacion: 1 });
db.getCollection("Alianzas").createIndex({ idProyecto: 1, estado: 1 });

// =====================================================
// VERIFICACIÓN: cuenta de documentos por colección
// =====================================================
["Usuarios", "ZonasConservacion", "Proyectos", "ReportesCampo", "ReportesCiudadanos",
 "ObservacionesEspecies", "RegistrosResiduos", "Donantes", "Alianzas"]
  .map(c => ({ coleccion: c, documentos: db.getCollection(c).countDocuments() }));