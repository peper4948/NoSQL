use("MarViva");

// =====================================================
// REINICIO (opcional): descomentar para borrar y volver a cargar todo (12 colecciones)
// =====================================================
// ["Usuarios", "ZonasConservacion", "Proyectos", "Actividades", "Inscripciones", "AvancesProyecto",
//  "ReportesCampo", "ReportesCiudadanos", "ObservacionesEspecies", "RegistrosResiduos", "Donantes", "Alianzas"]
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
// Las coordenadas son aproximadas, solo para pruebas.
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
  { idReporteCampo: 1,  fecha: new Date("2026-10-15"), colaborador:"Carlos Rojas",    provincia:"Puntarenas", actividad:"Limpieza de playa",       descripcion:"Se realizo una jornada de limpieza en la zona costera" },
  { idReporteCampo: 2,  fecha: new Date("2026-10-16"), colaborador:"Ana Salas",       provincia:"Guanacaste", actividad:"Monitoreo ambiental",     descripcion:"Se realizo una inspeccion de la zona marina" },
  { idReporteCampo: 3,  fecha: new Date("2026-10-17"), colaborador:"Luis Vargas",     provincia:"Puntarenas", actividad:"Recoleccion de residuos", descripcion:"Se recolectaron residuos plasticos encontrados en la playa" },
  { idReporteCampo: 4,  fecha: new Date("2026-10-18"), colaborador:"Maria Lopez",     provincia:"Guanacaste", actividad:"Observacion de especies", descripcion:"Se observaron diferentes especies marinas durante el recorrido" },
  { idReporteCampo: 5,  fecha: new Date("2026-10-19"), colaborador:"Pedro Ramirez",   provincia:"Puntarenas", actividad:"Monitoreo de manglares",  descripcion:"Se realizo una revision de las condiciones ambientales del manglar" },
  { idReporteCampo: 6,  fecha: new Date("2026-10-20"), colaborador:"Sofia Hernandez", provincia:"Guanacaste", actividad:"Limpieza de playa",       descripcion:"Se retiraron residuos solidos de una zona costera" },
  { idReporteCampo: 7,  fecha: new Date("2026-10-21"), colaborador:"Jose Martinez",   provincia:"Puntarenas", actividad:"Educacion ambiental",     descripcion:"Se desarrollo una charla sobre la importancia de la conservacion marina" },
  { idReporteCampo: 8,  fecha: new Date("2026-10-22"), colaborador:"Laura Fernandez", provincia:"Guanacaste", actividad:"Monitoreo ambiental",     descripcion:"Se registraron las condiciones generales de una zona de conservacion" },
  { idReporteCampo: 9,  fecha: new Date("2026-10-23"), colaborador:"Daniel Castro",   provincia:"Puntarenas", actividad:"Observacion de especies", descripcion:"Se realizo un recorrido para identificar especies marinas presentes" },
  { idReporteCampo: 10, fecha: new Date("2026-10-24"), colaborador:"Andrea Morales",  provincia:"Guanacaste", actividad:"Recoleccion de residuos", descripcion:"Se realizo una jornada de recoleccion de residuos en una playa" }
]);
db.getCollection("ReportesCampo").createIndex({ idReporteCampo: 1 }, { unique: true });


// =====================================================
// 5. REPORTES CIUDADANOS (10 documentos)
// =====================================================
db.getCollection("ReportesCiudadanos").insertMany([
  { idReporteCiudadano: 1,  fecha: new Date("2026-10-17"), ciudadano:"Luis Vargas",     provincia:"Puntarenas", tipo_reporte:"Contaminacion", descripcion:"Se observa acumulacion de residuos en la playa" },
  { idReporteCiudadano: 2,  fecha: new Date("2026-10-18"), ciudadano:"Maria Lopez",     provincia:"Guanacaste", tipo_reporte:"Residuos",      descripcion:"Se reporta presencia de basura en una zona costera" },
  { idReporteCiudadano: 3,  fecha: new Date("2026-10-19"), ciudadano:"Carlos Mendez",   provincia:"Puntarenas", tipo_reporte:"Contaminacion", descripcion:"Se observa presencia de plasticos flotando cerca de la costa" },
  { idReporteCiudadano: 4,  fecha: new Date("2026-10-20"), ciudadano:"Ana Rodriguez",   provincia:"Guanacaste", tipo_reporte:"Fauna marina",  descripcion:"Se reporta una tortuga marina herida en la playa" },
  { idReporteCiudadano: 5,  fecha: new Date("2026-10-21"), ciudadano:"Pedro Sanchez",   provincia:"Puntarenas", tipo_reporte:"Residuos",      descripcion:"Se observa acumulacion de botellas plasticas en la zona costera" },
  { idReporteCiudadano: 6,  fecha: new Date("2026-10-22"), ciudadano:"Sofia Ramirez",   provincia:"Guanacaste", tipo_reporte:"Contaminacion", descripcion:"Se reporta presencia de residuos cerca de un manglar" },
  { idReporteCiudadano: 7,  fecha: new Date("2026-10-23"), ciudadano:"Jose Fernandez",  provincia:"Puntarenas", tipo_reporte:"Fauna marina",  descripcion:"Se observa un delfin aparentemente herido cerca de la costa" },
  { idReporteCiudadano: 8,  fecha: new Date("2026-10-24"), ciudadano:"Laura Castro",    provincia:"Guanacaste", tipo_reporte:"Residuos",      descripcion:"Se reporta acumulacion de basura en una playa" },
  { idReporteCiudadano: 9,  fecha: new Date("2026-10-25"), ciudadano:"Daniel Morales",  provincia:"Puntarenas", tipo_reporte:"Contaminacion", descripcion:"Se observa presencia de residuos en el agua" },
  { idReporteCiudadano: 10, fecha: new Date("2026-10-26"), ciudadano:"Andrea Vargas",   provincia:"Guanacaste", tipo_reporte:"Fauna marina",  descripcion:"Se reporta presencia de una tortuga marina atrapada entre residuos" }
]);
db.getCollection("ReportesCiudadanos").createIndex({ idReporteCiudadano: 1 }, { unique: true });


// =====================================================
// 6. OBSERVACIONES DE ESPECIES (10 documentos)
// =====================================================
db.getCollection("ObservacionesEspecies").insertMany([
  { idObservacion: 1,  fecha: new Date("2026-10-15"), especie:"Tortuga marina",          cantidad:3,  provincia:"Puntarenas", descripcion:"Se observaron tres tortugas durante el recorrido" },
  { idObservacion: 2,  fecha: new Date("2026-10-16"), especie:"Delfin",                  cantidad:5,  provincia:"Guanacaste", descripcion:"Se observaron cinco delfines en la zona marina" },
  { idObservacion: 3,  fecha: new Date("2026-10-17"), especie:"Tiburon martillo",        cantidad:2,  provincia:"Puntarenas", descripcion:"Se observaron dos tiburones martillo durante el monitoreo marino" },
  { idObservacion: 4,  fecha: new Date("2026-10-18"), especie:"Mantarraya",              cantidad:4,  provincia:"Guanacaste", descripcion:"Se registraron cuatro mantarrayas durante el recorrido" },
  { idObservacion: 5,  fecha: new Date("2026-10-19"), especie:"Ballena jorobada",        cantidad:2,  provincia:"Puntarenas", descripcion:"Se observaron dos ballenas jorobadas en aguas cercanas a la costa" },
  { idObservacion: 6,  fecha: new Date("2026-10-20"), especie:"Tortuga verde",           cantidad:6,  provincia:"Guanacaste", descripcion:"Se registraron seis tortugas verdes durante la actividad de observacion" },
  { idObservacion: 7,  fecha: new Date("2026-10-21"), especie:"Delfin nariz de botella", cantidad:8,  provincia:"Puntarenas", descripcion:"Se observo un grupo de ocho delfines durante el monitoreo" },
  { idObservacion: 8,  fecha: new Date("2026-10-22"), especie:"Tiburon ballena",         cantidad:1,  provincia:"Guanacaste", descripcion:"Se registro la presencia de un tiburon ballena en la zona marina" },
  { idObservacion: 9,  fecha: new Date("2026-10-23"), especie:"Tortuga baula",           cantidad:3,  provincia:"Puntarenas", descripcion:"Se observaron tres tortugas baula durante el recorrido de conservacion" },
  { idObservacion: 10, fecha: new Date("2026-10-24"), especie:"Pez loro",                cantidad:12, provincia:"Guanacaste", descripcion:"Se registraron doce peces loro durante la actividad de observacion" }
]);
db.getCollection("ObservacionesEspecies").createIndex({ idObservacion: 1 }, { unique: true });


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
// 10. ACTIVIDADES (10 documentos)
// idProyecto -> Proyectos | idZona -> ZonasConservacion | idResponsable -> Usuarios
// =====================================================
db.getCollection("Actividades").insertMany([
  { idActividad: 1,  nombre: "Jornada de limpieza Golfo Dulce",       tipo: "Limpieza",     idProyecto: 1, idZona: 1, idResponsable: 6, fecha: new Date("2026-03-10"), cupoMaximo: 30, descripcion: "Recolección de residuos en playa y manglar.",               estado: "FINALIZADA" },
  { idActividad: 2,  nombre: "Avistamiento guiado de ballenas",       tipo: "Monitoreo",    idProyecto: 2, idZona: 2, idResponsable: 4, fecha: new Date("2026-08-15"), cupoMaximo: 15, descripcion: "Registro de avistamientos con guías locales.",              estado: "FINALIZADA" },
  { idActividad: 3,  nombre: "Taller de identificación de tiburones", tipo: "Educación",    idProyecto: 3, idZona: 3, idResponsable: 1, fecha: new Date("2026-06-20"), cupoMaximo: 20, descripcion: "Capacitación para reconocer especies de tiburón.",          estado: "FINALIZADA" },
  { idActividad: 4,  nombre: "Trasplante de fragmentos de coral",     tipo: "Restauración", idProyecto: 4, idZona: 4, idResponsable: 5, fecha: new Date("2026-11-22"), cupoMaximo: 10, descripcion: "Siembra de fragmentos de coral en viveros submarinos.",      estado: "PROGRAMADA" },
  { idActividad: 5,  nombre: "Capacitación en artes de pesca",        tipo: "Educación",    idProyecto: 5, idZona: 5, idResponsable: 3, fecha: new Date("2026-05-12"), cupoMaximo: 25, descripcion: "Charla con pescadores artesanales de Isla Chira.",          estado: "FINALIZADA" },
  { idActividad: 6,  nombre: "Siembra de mangle",                     tipo: "Restauración", idProyecto: 6, idZona: 6, idResponsable: 7, fecha: new Date("2026-12-05"), cupoMaximo: 40, descripcion: "Siembra de propágulos en zonas degradadas del humedal.",    estado: "PROGRAMADA" },
  { idActividad: 7,  nombre: "Liberación de neonatos de tortuga",     tipo: "Conservación", idProyecto: 7, idZona: 7, idResponsable: 5, fecha: new Date("2026-11-28"), cupoMaximo: 50, descripcion: "Liberación de tortugas con participación de la comunidad.", estado: "PROGRAMADA" },
  { idActividad: 8,  nombre: "Mapeo participativo Bahía Salinas",     tipo: "Investigación",idProyecto: 8, idZona: 8, idResponsable: 1, fecha: new Date("2025-09-18"), cupoMaximo: 12, descripcion: "Reunión con actores locales para mapear usos de la bahía.", estado: "FINALIZADA" },
  { idActividad: 9,  nombre: "Limpieza mensual playa Cahuita",        tipo: "Limpieza",     idProyecto: 9, idZona: 9, idResponsable: 6, fecha: new Date("2026-11-15"), cupoMaximo: 35, descripcion: "Jornada mensual con voluntarios y escuelas.",               estado: "PROGRAMADA" },
  { idActividad: 10, nombre: "Patrullaje nocturno de nidos",          tipo: "Conservación", idProyecto: 10,idZona: 10,idResponsable: 7, fecha: new Date("2025-05-20"), cupoMaximo: 8,  descripcion: "Patrullaje para registrar nidos de tortuga baula.",         estado: "CANCELADA" }
]);

db.getCollection("Actividades").createIndex({ idActividad: 1 }, { unique: true });
db.getCollection("Actividades").createIndex({ idProyecto: 1, fecha: 1 });

// =====================================================
// 11. INSCRIPCIONES (10 documentos)
// idActividad -> Actividades | idUsuario -> Usuarios
// =====================================================
db.getCollection("Inscripciones").insertMany([
  { idInscripcion: 1,  idActividad: 1, idUsuario: 8,  fechaInscripcion: new Date("2026-03-01"), estado: "ASISTIO",    comentario: "" },
  { idInscripcion: 2,  idActividad: 1, idUsuario: 9,  fechaInscripcion: new Date("2026-03-02"), estado: "ASISTIO",    comentario: "" },
  { idInscripcion: 3,  idActividad: 2, idUsuario: 8,  fechaInscripcion: new Date("2026-08-01"), estado: "ASISTIO",    comentario: "Primera vez en monitoreo." },
  { idInscripcion: 4,  idActividad: 3, idUsuario: 9,  fechaInscripcion: new Date("2026-06-10"), estado: "NO_ASISTIO", comentario: "" },
  { idInscripcion: 5,  idActividad: 4, idUsuario: 8,  fechaInscripcion: new Date("2026-11-05"), estado: "CONFIRMADA", comentario: "Tiene licencia de buceo." },
  { idInscripcion: 6,  idActividad: 6, idUsuario: 9,  fechaInscripcion: new Date("2026-11-06"), estado: "CONFIRMADA", comentario: "" },
  { idInscripcion: 7,  idActividad: 7, idUsuario: 10, fechaInscripcion: new Date("2026-11-07"), estado: "PENDIENTE",  comentario: "Asiste con su familia." },
  { idInscripcion: 8,  idActividad: 7, idUsuario: 8,  fechaInscripcion: new Date("2026-11-08"), estado: "CONFIRMADA", comentario: "" },
  { idInscripcion: 9,  idActividad: 9, idUsuario: 9,  fechaInscripcion: new Date("2026-11-09"), estado: "CONFIRMADA", comentario: "" },
  { idInscripcion: 10, idActividad: 9, idUsuario: 10, fechaInscripcion: new Date("2026-11-10"), estado: "CANCELADA",  comentario: "Canceló por motivos personales." }
]);

db.getCollection("Inscripciones").createIndex({ idInscripcion: 1 }, { unique: true });
db.getCollection("Inscripciones").createIndex({ idActividad: 1, idUsuario: 1 }, { unique: true });

// =====================================================
// 12. AVANCES DE PROYECTO (10 documentos)
// idProyecto -> Proyectos | idUsuario -> Usuarios (quien registra)
// =====================================================
db.getCollection("AvancesProyecto").insertMany([
  { idAvance: 1,  idProyecto: 1,  idUsuario: 3, fecha: new Date("2026-04-01"), porcentaje: 25,  descripcion: "Se completaron las primeras tres jornadas de limpieza.",       fotografias: ["img/avance-golfo-1.jpg"] },
  { idAvance: 2,  idProyecto: 1,  idUsuario: 3, fecha: new Date("2026-08-01"), porcentaje: 60,  descripcion: "Se superaron los 150 kg de residuos recolectados.",            fotografias: [] },
  { idAvance: 3,  idProyecto: 2,  idUsuario: 4, fecha: new Date("2026-09-15"), porcentaje: 70,  descripcion: "Se registraron 48 avistamientos en la temporada.",             fotografias: ["img/avance-ballena-1.jpg"] },
  { idAvance: 4,  idProyecto: 3,  idUsuario: 1, fecha: new Date("2026-07-10"), porcentaje: 40,  descripcion: "Se instalaron receptores acústicos para seguimiento.",         fotografias: [] },
  { idAvance: 5,  idProyecto: 4,  idUsuario: 5, fecha: new Date("2026-06-20"), porcentaje: 30,  descripcion: "Se evaluó la salud de 12 colonias de coral.",                  fotografias: ["img/avance-cano-1.jpg"] },
  { idAvance: 6,  idProyecto: 5,  idUsuario: 3, fecha: new Date("2026-07-30"), porcentaje: 50,  descripcion: "Se capacitaron 40 pescadores artesanales.",                    fotografias: [] },
  { idAvance: 7,  idProyecto: 6,  idUsuario: 4, fecha: new Date("2026-05-15"), porcentaje: 20,  descripcion: "Se sembraron 1000 plántulas antes de pausar el proyecto.",     fotografias: [] },
  { idAvance: 8,  idProyecto: 7,  idUsuario: 5, fecha: new Date("2026-10-05"), porcentaje: 45,  descripcion: "Se protegieron 85 nidos durante la temporada.",                fotografias: ["img/avance-tortugas-1.jpg"] },
  { idAvance: 9,  idProyecto: 8,  idUsuario: 1, fecha: new Date("2026-03-01"), porcentaje: 100, descripcion: "Se entregó la propuesta técnica de ordenamiento.",             fotografias: [] },
  { idAvance: 10, idProyecto: 9,  idUsuario: 3, fecha: new Date("2026-10-20"), porcentaje: 75,  descripcion: "Se realizaron 7 jornadas mensuales con escuelas locales.",     fotografias: ["img/avance-cahuita-1.jpg"] }
]);

db.getCollection("AvancesProyecto").createIndex({ idAvance: 1 }, { unique: true });
db.getCollection("AvancesProyecto").createIndex({ idProyecto: 1, fecha: 1 });

// =====================================================
// VERIFICACIÓN: las 12 colecciones
// =====================================================
["Usuarios", "ZonasConservacion", "Proyectos", "Actividades", "Inscripciones", "AvancesProyecto",
 "ReportesCampo", "ReportesCiudadanos", "ObservacionesEspecies", "RegistrosResiduos", "Donantes", "Alianzas"]
  .map(c => ({ coleccion: c, documentos: db.getCollection(c).countDocuments() }));
