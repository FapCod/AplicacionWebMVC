//SABER CUANDO EL DOCUMENTO ESTA LISTO
$(document).ready(function () {
    ListarAllSecciones();
});


let arrayColumnas = ["ID", "NOMBRE"];
const ListarAllSecciones = () => {
    $.get("Seccion/ListarSecciones", (data) => {
        CrearListado(arrayColumnas, data);
    })
}
const CrearListado = (columnas, data) => {
    let contenido = "";
    contenido += "<table id='tablas' class='table'>"
    contenido += "<thead>"
    contenido += "<tr>"
    for (let i = 0; i < columnas.length; i++) {
        contenido += "<td>"
        contenido += columnas[i]
        contenido += "</td>"
    }
    //agregar columna de operaciones
    contenido += "<td>Operaciones</td>"
    contenido += "</tr>"
    contenido += "</thead>"
    contenido += "<tbody>"
    let llaves = Object.keys(data[0]);
    let tamano = data.length;
    for (let i = 0; i < tamano; i++) {
        contenido += "<tr>"
        for (let j = 0; j < llaves.length; j++) {
            let valorLlave = llaves[j];
            contenido += "<td>"
            contenido += data[i][valorLlave]
            contenido += "</td>"
        }
        //agregar columna de operaciones
        contenido += "<td>"
        contenido += "<button class='btn btn-primary' style='margin: 4px' data-toggle='modal' data-target='#myModal'> <i class='glyphicon glyphicon-edit'></i> </button>"
        contenido += "<button class='btn btn-danger'> <i class='glyphicon glyphicon-trash'></i></button>"
        contenido += "</td>"
        contenido += "</tr>"
    }
    contenido += "</tbody>"
    contenido += "</table>"
    document.getElementById("tabla").innerHTML = contenido;

    $("#tablas").dataTable({
        searching: false
    });
}