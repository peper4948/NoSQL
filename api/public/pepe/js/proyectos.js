const URL_API = '/api/proyectos';
const modalFormulario = new bootstrap.Modal(document.getElementById('modalFormulario'));
const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
let registros = [];

$(document).ready(function () {
    consultarDatos();

    $('#btnNuevo').click(function () {
        $('#formRegistro')[0].reset();
        $('#registroId').val('');
        $('#tituloModal').text('Nuevo proyecto');
        modalFormulario.show();
    });

    $('#formRegistro').submit(function (event) {
        event.preventDefault();
        guardarRegistro();
    });

    $('#tablaRegistros').on('click', '.btn-editar', function () {
        const id = $(this).attr('data-id');
        let registro = null;
        registros.forEach(function (item) {
            if (item._id === id) registro = item;
        });
        if (!registro) return;

        $('#formRegistro')[0].reset();
        $('#registroId').val(registro._id);
        $('#tituloModal').text('Editar proyecto');
        $('#idProyecto').val(registro.idProyecto);
        $('#nombre').val(registro.nombre);
        $('#idZona').val(registro.idZona);
        $('#idCoordinador').val(registro.idCoordinador);
        $('#provincia').val(registro.provincia);
        $('#tipo').val(registro.tipo);
        $('#estado').val(registro.estado || '');
        $('#fechaInicio').val(fechaParaInput(registro.fechaInicio));
        $('#fechaFin').val(fechaParaInput(registro.fechaFin));
        $('#descripcion').val(registro.descripcion || '');
        $('#objetivos').val(Array.isArray(registro.objetivos) ? registro.objetivos.join('\n') : '');
        $('#fotografias').val(Array.isArray(registro.fotografias) ? registro.fotografias.join('\n') : '');
        modalFormulario.show();
    });

    $('#tablaRegistros').on('click', '.btn-eliminar', function () {
        $('#registroEliminar').val($(this).attr('data-id'));
        modalEliminar.show();
    });

    $('#confirmarEliminar').click(function () {
        const id = $('#registroEliminar').val();
        $.ajax({
            type: 'DELETE',
            url: URL_API + '/' + id,
            dataType: 'json',
            success: function () {
                modalEliminar.hide();
                mostrarMensaje('Proyecto eliminado correctamente', 'success');
                consultarDatos();
            },
            error: function (xhr) { mostrarError(xhr); }
        });
    });
});

// Convierte una fecha ISO a formato yyyy-mm-dd para <input type="date">
function fechaParaInput(valor) {
    if (!valor) return '';
    const fecha = new Date(valor);
    return isNaN(fecha) ? '' : fecha.toISOString().slice(0, 10);
}

// Muestra la fecha en formato dd/mm/aaaa (sin desfase por zona horaria)
function fechaParaTabla(valor) {
    const iso = fechaParaInput(valor);
    if (!iso) return '';
    const partes = iso.split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
}

// Convierte el texto de un textarea (un elemento por línea) en arreglo
function textoAArreglo(texto) {
    return texto.split('\n').map(function (linea) { return linea.trim(); }).filter(function (linea) { return linea !== ''; });
}

function consultarDatos() {
    $.ajax({
        type: 'GET',
        url: URL_API,
        dataType: 'json',
        success: function (datos) {
            registros = datos;
            $('#tablaRegistros').empty();
            $('#contador').text(datos.length);
            datos.forEach(function (registro) {
                const fila = $('<tr>');
                fila.append($('<td>').text(registro.idProyecto !== undefined ? registro.idProyecto : ''));
                fila.append($('<td>').text(registro.nombre !== undefined ? registro.nombre : ''));
                fila.append($('<td>').text(registro.provincia !== undefined ? registro.provincia : ''));
                fila.append($('<td>').text(registro.tipo !== undefined ? registro.tipo : ''));
                fila.append($('<td>').text(registro.estado !== undefined ? registro.estado : ''));
                fila.append($('<td>').text(registro.idZona !== undefined ? registro.idZona : ''));
                fila.append($('<td>').text(registro.idCoordinador !== undefined ? registro.idCoordinador : ''));
                fila.append($('<td>').text(fechaParaTabla(registro.fechaInicio)));
                fila.append($('<td>').text(fechaParaTabla(registro.fechaFin)));

                const celdaObjetivos = $('<td>');
                if (Array.isArray(registro.objetivos) && registro.objetivos.length) {
                    const lista = $('<ul>').addClass('mb-0 ps-3');
                    registro.objetivos.forEach(function (obj) { lista.append($('<li>').text(obj)); });
                    celdaObjetivos.append(lista);
                }
                fila.append(celdaObjetivos);

                const celdaFotos = $('<td>');
                if (Array.isArray(registro.fotografias)) {
                    registro.fotografias.forEach(function (url, i) {
                        celdaFotos.append($('<a>').attr({ href: url, target: '_blank', rel: 'noopener' }).addClass('d-block').text('Foto ' + (i + 1)));
                    });
                }
                fila.append(celdaFotos);

                const acciones = $('<td>').addClass('text-nowrap');
                acciones.append($('<button type="button">').addClass('btn btn-sm btn-outline-primary me-2 btn-editar').attr('data-id', registro._id).text('Editar'));
                acciones.append($('<button type="button">').addClass('btn btn-sm btn-outline-danger btn-eliminar').attr('data-id', registro._id).text('Eliminar'));
                fila.append(acciones);
                $('#tablaRegistros').append(fila);
            });
        },
        error: function (xhr) { mostrarError(xhr); }
    });
}

function guardarRegistro() {
    const id = $('#registroId').val();
    const fechaInicio = $('#fechaInicio').val();
    const fechaFin = $('#fechaFin').val();

    if (fechaFin && fechaFin < fechaInicio) {
        mostrarMensaje('La fecha de fin no puede ser anterior a la fecha de inicio', 'danger');
        return;
    }

    const objeto = {
        idProyecto: Number($('#idProyecto').val()),
        nombre: $('#nombre').val().trim(),
        idZona: Number($('#idZona').val()),
        idCoordinador: Number($('#idCoordinador').val()),
        provincia: $('#provincia').val().trim(),
        tipo: $('#tipo').val().trim(),
        estado: $('#estado').val(),
        fechaInicio: fechaInicio,
        fechaFin: fechaFin || null,
        descripcion: $('#descripcion').val().trim(),
        objetivos: textoAArreglo($('#objetivos').val()),
        fotografias: textoAArreglo($('#fotografias').val())
    };

    $.ajax({
        type: id ? 'PUT' : 'POST',
        url: id ? URL_API + '/' + id : URL_API,
        data: JSON.stringify(objeto),
        contentType: 'application/json',
        dataType: 'json',
        success: function () {
            modalFormulario.hide();
            $('#formRegistro')[0].reset();
            mostrarMensaje(id ? 'Proyecto actualizado correctamente' : 'Proyecto creado correctamente', 'success');
            consultarDatos();
        },
        error: function (xhr) { mostrarError(xhr); }
    });
}

function mostrarMensaje(texto, tipo) {
    $('#mensaje').removeClass('d-none alert-info alert-success alert-danger').addClass('alert-' + tipo).text(texto);
}

function mostrarError(xhr) {
    const texto = xhr.responseJSON && xhr.responseJSON.mensaje ? xhr.responseJSON.mensaje : 'Error al comunicar con la API';
    mostrarMensaje(texto, 'danger');
}