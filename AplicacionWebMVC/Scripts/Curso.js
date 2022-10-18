//saber si el documento ya cargo
$(document).ready(function () {
    listarAllCursos();
});


let arrayColumnas = ["ID", "NOMBRE", "DESCRIPCION"];


const listarAllCursos = () => {
    $.get("Curso/listarcursos", (data) => {
        //alert(JSON.stringify(data))
        crearListado(arrayColumnas, data);
    });
}

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
            let id = data[i][llaves[0]];
            //alert(id);
            //agregar columna de operaciones
            contenido += "<td>"
            contenido += "<button class='btn btn-primary' onclick='AbrirModal("+id+")' style='margin: 4px' data-toggle='modal' data-target='#myModal'> <i class='glyphicon glyphicon-edit'></i> </button>"
            contenido += "<button class='btn btn-danger' onclick='Eliminar(" + id +")'> <i class='glyphicon glyphicon-trash'></i></button>"
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

const btnConsultar = document.getElementById("btnConsultar");
const btnLimpiar = document.getElementById("btnLimpiar");
const buscar = () => {
    let nombre = document.getElementById("nombre").value;
    /*alert(nombre)*/
    $.get("Curso/buscarCursoPorNombre/?nombre=" + nombre, (data) => {
        crearListado(arrayColumnas,data);
    });
}

const limpiar = () => {

    let nombre = document.getElementById("nombre");
    nombre.value = "";
    //alert(nombre)
    $.get("Curso/buscarCursoPorNombre/?nombre=", (data) => {
        crearListado(arrayColumnas,data);
    });
}
btnConsultar.addEventListener("click", buscar);
btnLimpiar.addEventListener("click", limpiar);

const AbrirModal = (id) => {
    const controladores = document.getElementsByClassName("obligatorio");
    for (let i = 0; i < controladores.length; i++) {
        controladores[i].parentNode.classList.remove("error");
    }
    if (id === 0) {
        BorrarDatos();
    } else {
        $.get("Curso/RecuperarDatos/?id=" + id, (data) => {
            document.getElementById("txtIdCurso").value = data[0].IIDCURSO;
            document.getElementById("txtNombreCurso").value = data[0].NOMBRE;
            document.getElementById("txtDescripcion").value = data[0].DESCRIPCION;
        });
    }
}

const BorrarDatos = () => {
    const controladores = document.getElementsByClassName("borrar");
    for (let i = 0; i < controladores.length; i++) {
        controladores[i].value = "";
    }
}
const Agregar = () => {
    if (DatosObligatorios()) {
        let frm = new FormData();
        let id = document.getElementById("txtIdCurso").value;
        let nombre = document.getElementById("txtNombreCurso").value;
        let descripcion = document.getElementById("txtDescripcion").value;
        frm.append("IIDCURSO", id);
        frm.append("NOMBRE", nombre);
        frm.append("DESCRIPCION", descripcion);
        frm.append("BHABILITADO", 1);
        if (confirm("Desea realmente guardar?")==1) {
            $.ajax({
                type: "POST",
                url: "Curso/GuardarDatos",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 1) {
                        alert("Se guardo correctamente");
                        listarAllCursos();
                        //cerrar modal
                        $("#myModal").modal("hide");
                    }
                    else {
                        alert("Ocurrio un error");
                    }
                }
            });
        } else {
            //cerrar modal
            
        }
    } else {
        console.log("HAY DATOS OBLIGATORIOS VACIOS");
    }
}
const DatosObligatorios = () => {
    let exito = true;
    const controladores = document.getElementsByClassName("obligatorio");
    for (let i = 0; i < controladores.length; i++) {
        if (controladores[i].value == "") {
            exito = false;
            controladores[i].parentNode.classList.add("error");
        } else {
            controladores[i].parentNode.classList.remove("error");
        }
    }
    return exito;
}
const Eliminar = (id) => {
    let frm = new FormData();
    frm.append("IIDCURSO", id);
    if (confirm("Desea realmente Eliminar?") == 1) {
        $.ajax({
            type: "POST",
            url: "Curso/Eliminar",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == 1) {
                    alert("Se Elimino correctamente");
                    listarAllCursos();
                    //cerrar modal
                    $("#myModal").modal("hide");
                }
                else {
                    alert("Ocurrio un error");
                }
            }
        });
    } else {
        //cerrar modal

    }
}