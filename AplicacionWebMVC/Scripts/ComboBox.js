$.get("../RepasoHtml/LlenarCombo", (data) => {
    alert(JSON.stringify(data));
    let contenido = "";
    let tamano = data.length;
    for (let i = 0; i < tamano; i++) {
        contenido += "<option value='" + data[i].idTarea + "'>" + data[i].tituloTarea +"</option>";
    }

    document.getElementById("select").innerHTML = contenido;
});