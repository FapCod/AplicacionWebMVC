$.get("Periodo/listarPeriodos", (data) => {
    //alert(JSON.stringify(data))
    crearListado(data);
})

const crearListado = (data) => {
    let contenido = "";
    contenido += "<table id='tablacurso' class='table'>"
    contenido += "<thead>"
    contenido += "<tr>"
    contenido += "<td>ID</td>"
    contenido += "<td>Nombre</td>"
    contenido += "<td>Fecha Inicio</td>"
    contenido += "<td>Fecha Fin</td>"
    contenido += "</tr>"
    contenido += "</thead>"
    contenido += "<tbody>"
    let tamano = data.length;
    for (let i = 0; i < tamano; i++) {
        contenido += "<tr>"
        contenido += "<td>" + data[i].IIDPERIODO + "</td>"
        contenido += "<td>" + data[i].NOMBRE + "</td>"
        contenido += "<td>" + data[i].FECHAINICIO + "</td>"
        contenido += "<td>" + data[i].FECHAFIN + "</td>"
        contenido += "</tr>"
    }
    contenido += "</tbody>"
    contenido += "</table>"
    document.getElementById("tabla").innerHTML = contenido;

    $("#tablacurso").dataTable({
        searching: false
    });

}
let btnConsultar = document.getElementById("btnConsultar");
let btnLimpiar = document.getElementById("btnLimpiar");
let nombre = document.getElementById("nombre");
nombre.addEventListener("keyup", () => {
    buscar(nombre.value)
})
const buscar = (nombrevalor) => {
    $.get("Periodo/buscarPeridoPorNombre/?nombre=" + nombrevalor, (data) => {
        crearListado(data);
    });
}

const limpiar = () => {
    let nombre = document.getElementById("nombre");
    nombre.value = "";
    //alert(nombre)
    $.get("Periodo/listarPeriodos", (data) => {
        //alert(JSON.stringify(data))
        crearListado(data);
    });
}
btnConsultar.addEventListener("click", buscar);
btnLimpiar.addEventListener("click", limpiar);