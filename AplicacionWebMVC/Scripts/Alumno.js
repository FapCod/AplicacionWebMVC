//llamando a la funcion de almanaque
$("#datepickerFN").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    closeText: "Close",
    dayNamesMin: ["Dom", "Lu", "Ma", "Mie", "Jue", "Vie", "Sab"],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
});

let arrayColumnas = ["ID", "NOMBRE", "APELLIDO PATERNO", "APELLIDO MATERNO", "TELEFONO PADRE"];

const ListarAllAlumnos = () => {
    $.get("Alumno/ListarALumnos", (data) => {
        crearListado(arrayColumnas, data);
    })
}

$.get("../Alumno/ListarSexo", (data) => {
    let control = document.getElementById("select");
    let combo = document.getElementById("selectSexo");  
    llenarCombo(data, control, true);
    llenarCombo(data, combo, true);
    
})

const crearListado = (columnas,data) => {
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

const llenarCombo = (data,control,primerElemento) => {
    let contenido = "";
    if (primerElemento == true) {
        contenido += "<option value=''>--Seleccione--</option>";
    }
    let tamano = data.length;
    for (let i = 0; i < tamano; i++) {
        contenido += "<option value='" + data[i].IID + "'>" + data[i].NOMBRE + "</option>";
    }
    control.innerHTML = contenido;
}

const btnConsultarSexo = document.getElementById("btnConsultarSexo");
const btnLimpiar = document.getElementById("btnLimpiar");
const BuscarPorSexo= () => {
    let sexo = document.getElementById("select").value;
    /*alert(nombre)*/
    if (sexo == "") {
        ListarAllAlumnos();
    } else {
        $.get("../Alumno/BuscarPorSexo/?sexo=" + sexo, (data) => {
            crearListado(arrayColumnas, data);
        });
    }
}
btnConsultarSexo.addEventListener("click", BuscarPorSexo);
btnLimpiar.addEventListener("click", ListarAllAlumnos);
//saber cuando el dom ya cargo
$(document).ready(function () {
    ListarAllAlumnos();
})