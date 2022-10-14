$.get("Alumno/ListarALumnos", (data) => {
    //alert(JSON.stringify(data))
    crearListado(data);
})
$.get("../Alumno/ListarSexo", (data) => {
    //alert(JSON.stringify(data))
    llenarCombo(data);
})

const crearListado = (data) => {
    let contenido = "";
    contenido += "<table id='tablaalumno' class='table'>"
    contenido += "<thead>"
    contenido += "<tr>"
    contenido += "<td>ID</td>"
    contenido += "<td>Nombre</td>"
    contenido += "<td>Apellido paterno</td>"
    contenido += "<td>Apellido materno</td>"
    contenido += "<td>Telefono padre</td>"
    contenido += "</tr>"
    contenido += "</thead>"
    contenido += "<tbody>"
    let tamano = data.length;
    for (let i = 0; i < tamano; i++) {
        contenido += "<tr>"
        contenido += "<td>" + data[i].IIDALUMNO + "</td>"
        contenido += "<td>" + data[i].NOMBRE + "</td>"
        contenido += "<td>" + data[i].APPATERNO + "</td>"
        contenido += "<td>" + data[i].APMATERNO + "</td>"
        contenido += "<td>" + data[i].TELEFONOPADRE + "</td>"
        contenido += "</tr>"
    }
    contenido += "</tbody>"
    contenido += "</table>"
    document.getElementById("tabla").innerHTML = contenido;

    $("#tablaalumno").dataTable({
        searching: false
    });
}

const llenarCombo = (data) => {
    let contenido = "";
    let tamano = data.length;
    for (let i = 0; i < tamano; i++) {
        contenido += "<option value='" + data[i].IIDSEXO + "'>" + data[i].NOMBRE + "</option>";
    }
    document.getElementById("select").innerHTML = contenido;
}

let btnConsultar = document.getElementById("btnConsultar");
const buscar = () => {
    let sexo = document.getElementById("select").value;
    /*alert(nombre)*/
    $.get("Curso/buscarCursoPorNombre/?sexo=" + sexo, (data) => {
        crearListado(data);
    });
}
btnConsultar.addEventListener("click", buscar);