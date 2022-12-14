//llamando a la funcion de almanaque
$("#datepickerFechaContrato").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    closeText: "Close",
    dayNamesMin: ["Dom", "Lu", "Ma", "Mie", "Jue", "Vie", "Sab"],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
});




let arrayColumnas = ["ID", "NOMBRE", "APELLIDO PATERNO", "APELLIDO MATERNO", "EMAIL"];

const ListarAllDocentes = () => {
    $.get("Docente/ListarDocentes", (data) => {
        CrearListado(arrayColumnas, data);
    })
}

const ListarCombo = () => {
    $.get("../Docente/ListarModalidadContrato", (data) => {
        let control = document.getElementById("selectModalidad");
        let combo = document.getElementById("selectModalidadC");
        LlenarCombo(data, control, true);
        LlenarCombo(data, combo, true);
    });

}
//SABER CUANDO EL DOCUMENTO ESTA LISTO
$(document).ready(function () {
    ListarAllDocentes();
    ListarCombo();
    ListarSexo();
});


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
const ListarSexo = () => {
    $.get("../Alumno/ListarSexo", (data) => {
        let combo = document.getElementById("selectSexo");
        LlenarCombo(data, combo, true);
    });
}

const LlenarCombo = (data, control, primerElemento) => {
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

const BuscarPorModalidad = () => {
    let idModalidad = document.getElementById("selectModalidad").value;
    if (idModalidad == "") {
        ListarAllDocentes();
    } else {
        $.get("Docente/BuscarDocentePorModalidad/?modalidad=" + idModalidad, (data) => {
            CrearListado(arrayColumnas, data);
        });
    }
}

const selectModalidad = document.getElementById("selectModalidad");
selectModalidad.addEventListener("change", BuscarPorModalidad);