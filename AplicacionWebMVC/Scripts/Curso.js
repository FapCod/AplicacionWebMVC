$.get("Curso/listarcursos", (data) => {
    //alert(JSON.stringify(data))

    crearListado(data);
});

const crearListado = (data) => {
    let contenido = "";
    contenido += "<table id='tablacurso' class='table'>"
    contenido += "<thead>"
    contenido += "<tr>"
    contenido += "<td>ID</td>"
    contenido += "<td>Nombre</td>"
    contenido += "<td>Descripcion</td>"
    contenido += "</tr>"
    contenido += "</thead>"
    contenido += "<tbody>"
    let tamano = data.length;
    for (let i = 0; i < tamano; i++) {
        contenido += "<tr>"
        contenido += "<td>" + data[i].IIDCURSO + "</td>"
        contenido += "<td>" + data[i].NOMBRE + "</td>"
        contenido += "<td>" + data[i].DESCRIPCION + "</td>"
        contenido += "</tr>"
    }
    contenido += "</tbody>"
    contenido += "</table>"
    document.getElementById("tabla").innerHTML = contenido;

    $("#tablacurso").dataTable({
        searching:false
    });
}

let btnConsultar = document.getElementById("btnConsultar");
let btnLimpiar = document.getElementById("btnLimpiar");
const buscar = () => {
    let nombre = document.getElementById("nombre").value;
    /*alert(nombre)*/
    $.get("Curso/buscarCursoPorNombre/?nombre="+nombre, (data) => {
        crearListado(data);
    });
}

const limpiar = () => {
    
    let nombre = document.getElementById("nombre");
    nombre.value = "";
    //alert(nombre)
    $.get("Curso/buscarCursoPorNombre/?nombre=", (data) => {
        crearListado(data);
    });
}
btnConsultar.addEventListener("click", buscar);
btnLimpiar.addEventListener("click", limpiar);