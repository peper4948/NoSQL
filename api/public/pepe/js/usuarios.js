const URL_API = '/api/usuarios';
const modalFormulario = new bootstrap.Modal(document.getElementById('modalFormulario'));
const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
let registros = [];

$(document).ready(function () {
    consultarDatos();

    $('#btnNuevo').click(function () {
        $('#formRegistro')[0].reset();
        $('#registroId').val('');
        $('#contra').prop('required', true).attr('placeholder', '');
        $('#tituloModal').text('Nuevo usuario');
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
        $('#tituloModal').text('Editar usuario');
        $('#idUsuario').val(registro.idUsuario);
        $('#nombre').val(registro.nombre);
        $('#correo').val(registro.correo);
        $('#contra').val('').prop('required', false).attr('placeholder', 'Dejar vacía para no cambiarla');
        $('#rol').val(registro.rol);
        $('#activo').val(String(Boolean(registro.activo)));
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
                mostrarMensaje('Usuario eliminado correctamente', 'success');
                consultarDatos();
            },
            error: function (xhr) { mostrarError(xhr); }
        });
    });
});

function formatearFecha(valor) {
    if (!valor) return '';
    const fecha = new Date(valor);
    return isNaN(fecha) ? '' : fecha.toLocaleString('es-CR');
}

function consultarDatos() {
    $.ajax({
        type: 'GET',
        url: URL_API,
        dataType: 'json',
        success: function (datos) {
            pintarTabla(datos);
        },
        error: function (xhr) {
            // La API responde 404 cuando no hay usuarios: se muestra la tabla vacía, no un error
            if (xhr.status === 404 && xhr.responseJSON && xhr.responseJSON.mensaje === 'No se encontraron usuarios') {
                pintarTabla([]);
                return;
            }
            mostrarError(xhr);
        }
    });
}

function pintarTabla(datos) {
            registros = datos;
            $('#tablaRegistros').empty();
            $('#contador').text(datos.length);
            datos.forEach(function (registro) {
                const fila = $('<tr>');
                fila.append($('<td>').text(registro.idUsuario !== undefined ? registro.idUsuario : ''));
                fila.append($('<td>').text(registro.nombre !== undefined ? registro.nombre : ''));
                fila.append($('<td>').text(registro.correo !== undefined ? registro.correo : ''));
                fila.append($('<td>').text(registro.rol !== undefined ? registro.rol : ''));
                fila.append($('<td>').text(formatearFecha(registro.fechaRegistro)));
                fila.append($('<td>').text(registro.activo !== undefined ? (registro.activo ? 'Sí' : 'No') : ''));
                const acciones = $('<td>');
                acciones.append($('<button type="button">').addClass('btn btn-sm btn-outline-primary me-2 btn-editar').attr('data-id', registro._id).text('Editar'));
                acciones.append($('<button type="button">').addClass('btn btn-sm btn-outline-danger btn-eliminar').attr('data-id', registro._id).text('Eliminar'));
                fila.append(acciones);
                $('#tablaRegistros').append(fila);
            });
}

function guardarRegistro() {
    const id = $('#registroId').val();

    const objeto = {
        idUsuario: Number($('#idUsuario').val()),
        nombre: $('#nombre').val().trim(),
        correo: $('#correo').val().trim(),
        contra: $('#contra').val(),
        rol: $('#rol').val(),
        activo: $('#activo').val() === 'true'
    };

    if (!objeto.idUsuario || !objeto.nombre || !objeto.correo || !objeto.rol) {
        mostrarMensaje('Todos los campos son obligatorios', 'danger');
        return;
    }

    // Al crear, la contraseña es obligatoria; al editar, si queda vacía no se envía y se conserva la actual
    if (!objeto.contra) {
        if (!id) {
            mostrarMensaje('La contraseña es obligatoria', 'danger');
            return;
        }
        delete objeto.contra;
    }

    $.ajax({
        type: id ? 'PUT' : 'POST',
        url: id ? URL_API + '/' + id : URL_API,
        data: JSON.stringify(objeto),
        contentType: 'application/json',
        dataType: 'json',
        success: function () {
            modalFormulario.hide();
            $('#formRegistro')[0].reset();
            mostrarMensaje(id ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente', 'success');
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