//llamando a la funcion de almanaque
$("#datepickerInicio").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    closeText: "Close",
    dayNamesMin: ["Dom", "Lu", "Ma", "Mie", "Jue", "Vie", "Sab"],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
});
$("#datepickerFin").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    closeText: "Close",
    dayNamesMin: ["Dom", "Lu", "Ma", "Mie", "Jue", "Vie", "Sab"],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
});
 


let arrayColumnas = ["ID", "NOMBRE", "FECHA INICIO", "FECHA FIN"];
$.get("Periodo/listarPeriodos", (data) => {
    //alert(JSON.stringify(data))
    crearListado(arrayColumnas,data);
})

const crearListado = (columnas, data) => {
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
    if (data === null) {
        data = []
        alert("No hay lo que buscas")
    } else {
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
}


const btnLimpiar = document.getElementById("btnLimpiarP");
const Buscar = (nombrevalor) => {
    $.get("Periodo/buscarPeridoPorNombre/?nombre=" + nombrevalor, (data) => {
        crearListado(arrayColumnas,data);
    });
}
const Limpiar = () => {
    let nombre = document.getElementById("nombre");
    nombre.value = "";
    //alert(nombre)
    $.get("Periodo/listarPeriodos", (data) => {
        //alert(JSON.stringify(data))
        crearListado(arrayColumnas,data);
    });
}
btnLimpiar.addEventListener("click", Limpiar);
let nombre = document.getElementById("nombre");
nombre.addEventListener("keyup", () => {
    buscar(nombre.value)
})