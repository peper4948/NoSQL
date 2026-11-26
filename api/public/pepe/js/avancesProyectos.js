const URL_API = '/api/avances';
const modalFormulario = new bootstrap.Modal(document.getElementById('modalFormulario'));
const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
let registros = [];

$(document).ready(function () {
    consultarDatos();

    $('#btnNuevo').click(function () {
        $('#formRegistro')[0].reset();
        $('#registroId').val('');
        $('#tituloModal').text('Nuevo avance');
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
        $('#tituloModal').text('Editar avance');
        $('#idAvance').val(registro.idAvance);
        $('#idProyecto').val(registro.idProyecto);
        $('#idUsuario').val(registro.idUsuario);
        $('#porcentaje').val(registro.porcentaje);
        $('#fecha').val(fechaParaInput(registro.fecha));
        $('#descripcion').val(registro.descripcion || '');
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
                mostrarMensaje('Avance eliminado correctamente', 'success');
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
                fila.append($('<td>').text(registro.idAvance !== undefined ? registro.idAvance : ''));
                fila.append($('<td>').text(registro.idProyecto !== undefined ? registro.idProyecto : ''));
                fila.append($('<td>').text(registro.idUsuario !== undefined ? registro.idUsuario : ''));
                fila.append($('<td>').text(registro.descripcion !== undefined ? registro.descripcion : ''));

                const celdaPorcentaje = $('<td>').css('min-width', '120px');
                if (registro.porcentaje !== undefined) {
                    const barra = $('<div>').addClass('progress').attr('role', 'progressbar')
                        .attr({ 'aria-valuenow': registro.porcentaje, 'aria-valuemin': 0, 'aria-valuemax': 100 });
                    barra.append($('<div>').addClass('progress-bar').css('width', registro.porcentaje + '%').text(registro.porcentaje + '%'));
                    celdaPorcentaje.append(barra);
                }
                fila.append(celdaPorcentaje);

                fila.append($('<td>').text(fechaParaTabla(registro.fecha)));

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
    const porcentaje = Number($('#porcentaje').val());

    if (isNaN(porcentaje) || porcentaje < 0 || porcentaje > 100) {
        mostrarMensaje('El porcentaje debe estar entre 0 y 100', 'danger');
        return;
    }

    const objeto = {
        idAvance: Number($('#idAvance').val()),
        idProyecto: Number($('#idProyecto').val()),
        idUsuario: Number($('#idUsuario').val()),
        porcentaje: porcentaje,
        descripcion: $('#descripcion').val().trim(),
        fotografias: textoAArreglo($('#fotografias').val())
    };

    // Si no se elige fecha, Mongo usa Date.now por defecto
    const fecha = $('#fecha').val();
    if (fecha) objeto.fecha = fecha;

    $.ajax({
        type: id ? 'PUT' : 'POST',
        url: id ? URL_API + '/' + id : URL_API,
        data: JSON.stringify(objeto),
        contentType: 'application/json',
        dataType: 'json',
        success: function () {
            modalFormulario.hide();
            $('#formRegistro')[0].reset();
            mostrarMensaje(id ? 'Avance actualizado correctamente' : 'Avance creado correctamente', 'success');
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