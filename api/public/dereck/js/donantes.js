// Módulo donantes - Fundación MarViva
// Interfaz Bootstrap, jQuery y AJAX.
const URL_API = '/api/donantes';
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
        $('#idDonante').val(registro.idDonante);
        $('#nombre').val(registro.nombre);
        $('#tipoDonante').val(registro.tipoDonante);
        $('#correo').val(registro.correo);
        $('#telefono').val(registro.telefono);
        $('#montoDonacion').val(registro.montoDonacion);
        $('#moneda').val(registro.moneda);
        $('#fechaDonacion').val(registro.fechaDonacion ? String(registro.fechaDonacion).substring(0, 10) : '');
        $('#idProyecto').val(registro.idProyecto);
        $('#activo').val(registro.activo === true ? 'true' : 'false');
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
                fila.append($('<td>').text(registro.idDonante !== undefined ? registro.idDonante : ''));
                fila.append($('<td>').text(registro.nombre !== undefined ? registro.nombre : ''));
                fila.append($('<td>').text(registro.tipoDonante !== undefined ? registro.tipoDonante : ''));
                fila.append($('<td>').text(registro.montoDonacion !== undefined ? registro.montoDonacion : ''));
                fila.append($('<td>').text(registro.moneda !== undefined ? registro.moneda : ''));
                fila.append($('<td>').text(registro.fechaDonacion ? String(registro.fechaDonacion).substring(0, 10) : ''));
                fila.append($('<td>').text(registro.idProyecto !== undefined ? registro.idProyecto : ''));
                fila.append($('<td>').text(registro.activo === true ? 'Sí' : 'No'));
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
    const objeto = {
        idDonante: Number($('#idDonante').val()),
        nombre: $('#nombre').val(),
        tipoDonante: $('#tipoDonante').val(),
        correo: $('#correo').val(),
        telefono: $('#telefono').val(),
        montoDonacion: Number($('#montoDonacion').val()),
        moneda: $('#moneda').val(),
        fechaDonacion: $('#fechaDonacion').val(),
        idProyecto: Number($('#idProyecto').val()),
        activo: $('#activo').val() === 'true'
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
