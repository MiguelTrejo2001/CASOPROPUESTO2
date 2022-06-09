$(document).ready(function () {
    listarCategoria();
});
function listarCategoria() {
    $.get("cat", {"opc": 1}, function (data) {
        let x = JSON.parse(data);
        $("#tablita tbody tr").remove();
        for (let i = 0; i < x.length; i++) {
            $("#tablita").append(
                    "<tr><td>" + (i + 1) + "</td><td>" + x[i].idcategoria + "</td><td>" + x[i].nombre + "</td><td><a href='#' onclick='read(" + x[i].idcategoria + ")'><i class='fa-solid fa-pen-to-square color1'></i></a></td><td><a href='#' onclick='eliminar(" + x[i].idcategoria + ")'><i class='fa-solid fa-trash-can color2'></i></a></td></tr>");
        }

    });
}

function guardarCategoria() {
    let descripcion = $("#descripcion").val();
    $.cat("cat", {"descripcion": descripcion,"opc": 2}, function (data) {
        bootbox.alert({
            message: "Categoria guardada correctamente...!",
            className: 'rubberBand animated'
        });
        limpiar();
        listarCategoria();
    });
    $("#guardar").modal('hide');
}


function guardar() {
    let titulo = $("#titulo").val();
    let desc = $("#descripcion").val();
    $.post("post", {"titulo": titulo, "desc": desc, "opc": 2}, function (data) {
        bootbox.alert({
            message: "Post guardado correctamente...!",
            className: 'rubberBand animated'
        });
        limpiar();
        listarPost();
    });
    $("#guardar").modal('hide');
}

function editarcategoría() {
    let id = $("#cat_id").val();
    let titulo = $("#edit_titulo").val();
    let desc = $("#edit_descripcion").val();
    bootbox.confirm({
        message: "Realmente desea Editar..?",
        buttons: {
            confirm: {
                label: 'SI',
                className: 'btn-success'
            },
            cancel: {
                label: 'NO',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.get("post", {"id": id, "titulo":titulo, "desc":desc, "opc": 5}, function (data) {
                    bootbox.alert({
                        message: "Post Editado correctamente...!",
                        className: 'rubberBand animated'
                    });
                    limpiar();
                    listarPost();
                });
                $("#editar").modal('hide');
            } else {
                bootbox.alert({
                    message: "Post no Modificó!",
                    className: 'rubberBand animated'
                });
            }
        }
    });
    $("#guardar").modal('hide');
}