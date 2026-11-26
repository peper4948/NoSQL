const URL_API = '/api/zonasconservacion';
const modalFormulario = new bootstrap.Modal(document.getElementById('modalFormulario'));
const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
let registros = [];

$(document).ready(function () {
    consultarDatos();

    $('#btnNuevo').click(function () {
        $('#formRegistro')[0].reset();
        $('#registroId').val('');
        $('#tituloModal').text('Nuevo registro');
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
        $('#tituloModal').text('Editar registro');
        $('#idZona').val(registro.idZona);
        $('#nombre').val(registro.nombre);
        $('#provincia').val(registro.provincia);
        $('#tipo').val(registro.tipo);
        $('#descripcion').val(registro.descripcion);
        $('#activa').val(String(Boolean(registro.activa)));
        $('#ubicacion').val(
            registro.ubicacion !== undefined && registro.ubicacion !== null
                ? (typeof registro.ubicacion === 'string' ? registro.ubicacion : JSON.stringify(registro.ubicacion))
                : ''
        );
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
                mostrarMensaje('Registro eliminado correctamente', 'success');
                consultarDatos();
            },
            error: function (xhr) { mostrarError(xhr); }
        });
    });
});

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
                fila.append($('<td>').text(registro.idZona !== undefined ? registro.idZona : ''));
                fila.append($('<td>').text(registro.nombre !== undefined ? registro.nombre : ''));
                fila.append($('<td>').text(registro.provincia !== undefined ? registro.provincia : ''));
                fila.append($('<td>').text(registro.tipo !== undefined ? registro.tipo : ''));
                fila.append($('<td>').text(registro.descripcion !== undefined ? registro.descripcion : ''));
                fila.append($('<td>').text(
                    registro.ubicacion !== undefined && registro.ubicacion !== null
                        ? (typeof registro.ubicacion === 'string' ? registro.ubicacion : JSON.stringify(registro.ubicacion))
                        : ''
                ));
                fila.append($('<td>').text(registro.activa !== undefined ? (registro.activa ? 'Sí' : 'No') : ''));
                const acciones = $('<td>');
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
    let ubicacionObj;

    try {
        ubicacionObj = JSON.parse($('#ubicacion').val());
    } catch (e) {
        mostrarMensaje('El campo ubicación debe tener un formato JSON válido, por ejemplo: {"type":"Point","coordinates":[-84.08,9.93]}', 'danger');
        return;
    }

    const objeto = {
        idZona: Number($('#idZona').val()),
        nombre: $('#nombre').val(),
        provincia: $('#provincia').val(),
        tipo: $('#tipo').val(),
        descripcion: $('#descripcion').val(),
        activa: $('#activa').val() === 'true',
        ubicacion: ubicacionObj
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
            mostrarMensaje(id ? 'Registro actualizado correctamente' : 'Registro creado correctamente', 'success');
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