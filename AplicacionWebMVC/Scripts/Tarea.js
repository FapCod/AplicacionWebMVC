
//variables globales
const formularioUI = document.getElementById("formulario");
const tablaUI = document.getElementById("divTabla");
const actualizarUI = document.getElementById("actualizar");
let arrayTareas = [];
var IDEDITAR = 0;
//funciones
const CrearObjeto = (titulo, estado, fechacreacion, fechatermino) => {
    let id;
    let tamano;
    let idAntiguo;
    if (arrayTareas.length ==0) {
        tamano = 0;
        id = 1;
        idAntiguo = 0;
    } else {
        tamano = arrayTareas.length;
        idAntiguo = arrayTareas[tamano - 1].Id;
        id = idAntiguo + 1;
    }
    if (fechacreacion == null || fechacreacion == "") {
        let hoy = new Date();
        let fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);
        let hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);
        let fecha_hora_creacion = fecha + 'T' + hora;
        fechacreacion = fecha_hora_creacion;
    }
    let tarea = {
        Id: id,
        Titulo: titulo,
        Estado: estado,
        Fechacreacion: fechacreacion,
        Fechatermino: fechatermino
    };
    let form = new FormData();
    form.append("Id", id);
    form.append("Titulo", titulo);
    form.append("Estado", estado);
    form.append("Fechacreacion", fechacreacion);
    form.append("Fechatermino", fechatermino);
    console.log(tarea);
    console.log(form + "souy el form");
    $.ajax({
        type: "POST",
        url: "Tarea/CrearTarea",
        data: tarea,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data == 1) {
                alert("agregado");
            }
        }
    });
    arrayTareas.push(tarea);
}
const GuardarDB = () => {
    localStorage.setItem('listaTarea', JSON.stringify(arrayTareas));
    CrearTabla();
}
const CrearTabla = () => {
    arrayTareas = JSON.parse(localStorage.getItem("listaTarea"));
    if (arrayTareas === null) {
        arrayTareas = [];
    } else {
        let contenido = "";
        contenido += "<table class='table'>"
        contenido += "<thead>"
        contenido += "<tr>"
        contenido += "<td>ID</td>"
        contenido += "<td>Titulo</td>"
        contenido += "<td>Estado</td>"
        contenido += "<td>FechaCreacion</td>"
        contenido += "<td>FechaTermino</td>"
        contenido += "<td class='col-span-3'>Funciones</td>"
        contenido += "</tr>"
        contenido += "</thead>"
        contenido += "<tbody>"
        let tamano = arrayTareas.length;
        for (let i = 0; i < tamano; i++) {
            contenido += "<tr>"
            contenido += "<td>" + arrayTareas[i].Id + "</td>"
            contenido += "<td>" + arrayTareas[i].Titulo + "</td>"
            if (arrayTareas[i].Estado != 2) {
                contenido += "<td>" + "Pendiente" + "</td>"
            } else {
                contenido += "<td>" + "Terminada" + "</td>"
            }
            contenido += "<td>" + arrayTareas[i].Fechacreacion + "</td>"
            contenido += "<td>" + arrayTareas[i].Fechatermino + "</td>"
            if (arrayTareas[i].Estado != 2) {
                contenido += "<td>" + "<button type='button' data-toggle='modal' data-target='#exampleModal' data-whatever='" + arrayTareas[i].Id + "'    class='btn btn-warning glyphicon glyphicon-pencil'></button>" + "</td>"
            } else {
                contenido += "<td>" + "<button type='button' data-toggle='modal' data-target='#exampleModal' data-whatever='" + arrayTareas[i].Id + "'    class='btn btn-warning glyphicon glyphicon-pencil' disabled></button>" + "</td>"
            }
            contenido += "<td>" + "<button type='button' onclick='EliminarDB(" + arrayTareas[i].Id + ")' class='btn btn-danger glyphicon glyphicon-trash'></button>" + "</td>"
            contenido += "</tr>"
        }
        contenido += "</tbody>"
        contenido += "</table>"
        document.getElementById("divTabla").innerHTML = contenido;
    }
    
}

const EliminarDB = (id) => {
    let indexArray;
    arrayTareas.forEach((tarea, index) => {
        if (tarea.Id === id) {
            indexArray = index;
        }
    });
    arrayTareas.splice(indexArray, 1);
    GuardarDB();
}

const EditarDB = () => {
    let indexArray = arrayTareas.findIndex((tarea) => tarea.Id === IDEDITAR);
    let titulon = document.getElementById("titulon").value;
    let estadon = document.getElementById("estadon").value;
    let fechacreacionn = document.getElementById("fechacreacionn").value;
    let fechaterminon = document.getElementById("fechaterminon").value;
    if ($('#titulon').val().length == 0) {
        alert('No te olvides del Titulo 👍');
        console.log(titulon.length + "mensaje de consola")
        return false;
    }
    if (estadon == 2) {
        let hoy = new Date();
        let fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);
        let hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);
        let fecha_hora_termino = fecha + 'T' + hora;
        fechaterminon = fecha_hora_termino;
    }
    arrayTareas[indexArray].Titulo = titulon;
    arrayTareas[indexArray].Estado = estadon;
    arrayTareas[indexArray].Fechacreacion = fechacreacionn;
    arrayTareas[indexArray].Fechatermino = fechaterminon;
    GuardarDB();
    $('#exampleModal').modal('hide');

}

//Eventos de la web
formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();//para no refrescar la web
    let tituloUI = document.getElementById("titulo").value;
    let estadoUI = document.getElementById("estado").value;
    let fechacreacionUI = document.getElementById("fechacreacion").value;
    let fechaterminoUI = document.getElementById("fechatermino").value;
    if ($('#titulo').val().length == 0) {
        alert('No te olvides del Titulo 👍');
        return false;
    }
    CrearObjeto(tituloUI, estadoUI, fechacreacionUI, fechaterminoUI);
    GuardarDB();
    formularioUI.reset();
});

document.addEventListener('DOMContentLoaded', CrearTabla);
actualizarUI.addEventListener("click", (e) => {
    e.preventDefault;
    EditarDB();
});


//fin eventos web
$.get("Tarea/ListarTareas", (data) => {
    console.log("DATOS DE LISTA TAREAS:"+JSON.stringify(data));
});


//obtener modal
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var id = button.data('whatever') // Extract info from data-* attributes
    var modal = $(this)
    modal.find('.modal-title').text('Actualizar Tarea:' + id)
    let estadon = document.getElementById("estadon");
    //modal.find('.modal-body input').val(id)
    arrayTareas = JSON.parse(localStorage.getItem("listaTarea"));
    let tamano = arrayTareas.length;
    for (let i = 0; i < tamano; i++) {
        /*alert(data[i].Id)*/
        if (arrayTareas[i].Id == id) {
            modal.find('#titulon').val(arrayTareas[i].Titulo)
            if (arrayTareas[i].Estado == 1) {
                console.log("PENDIENTE");
            } else {
                console.log("TERMINADO");
                estadon.setAttribute("disabled", "");
            }
            modal.find('#estadon').val(arrayTareas[i].Estado)
            let hoy = new Date(arrayTareas[i].Fechacreacion)
            let fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);
            let hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);
            let fecha_hora_creacion = fecha + 'T' + hora;
            console.log(fecha_hora_creacion);
            modal.find('#fechacreacionn').val(fecha_hora_creacion);
            hoy = new Date(arrayTareas[i].Fechatermino)
            fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);
            hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);
            let fecha_hora_termino = fecha + 'T' + hora;
            modal.find('#fechaterminon').val(fecha_hora_termino)
            IDEDITAR = id;
        }
        
    }
})
//fin de obtener modal
