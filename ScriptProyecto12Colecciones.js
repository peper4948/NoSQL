use("MarViva");

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
