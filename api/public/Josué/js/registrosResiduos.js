const URL_API = '/api/registrosresiduos';
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
        $('#idRegistroResiduo').val(registro.idRegistroResiduo);
        $('#tipoResiduo').val(registro.tipoResiduo);
        $('#cantidadKg').val(registro.cantidadKg);
        $('#fechaRecoleccion').val(registro.fechaRecoleccion ? String(registro.fechaRecoleccion).substring(0, 10) : '');
        $('#idProyecto').val(registro.idProyecto);
        $('#idZona').val(registro.idZona);
        $('#idUsuario').val(registro.idUsuario);
        $('#descripcion').val(registro.descripcion);
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
                fila.append($('<td>').text(registro.idRegistroResiduo !== undefined ? registro.idRegistroResiduo : ''));
                fila.append($('<td>').text(registro.tipoResiduo !== undefined ? registro.tipoResiduo : ''));
                fila.append($('<td>').text(registro.cantidadKg !== undefined ? registro.cantidadKg : ''));
                fila.append($('<td>').text(registro.fechaRecoleccion ? String(registro.fechaRecoleccion).substring(0, 10) : ''));
                fila.append($('<td>').text(registro.idProyecto !== undefined ? registro.idProyecto : ''));
                fila.append($('<td>').text(registro.idZona !== undefined ? registro.idZona : ''));
                fila.append($('<td>').text(registro.idUsuario !== undefined ? registro.idUsuario : ''));
                fila.append($('<td>').text(registro.descripcion !== undefined ? registro.descripcion : ''));
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
        idRegistroResiduo: Number($('#idRegistroResiduo').val()),
        tipoResiduo: $('#tipoResiduo').val(),
        cantidadKg: Number($('#cantidadKg').val()),
        fechaRecoleccion: $('#fechaRecoleccion').val(),
        idProyecto: Number($('#idProyecto').val()),
        idZona: Number($('#idZona').val()),
        idUsuario: Number($('#idUsuario').val()),
        descripcion: $('#descripcion').val()
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