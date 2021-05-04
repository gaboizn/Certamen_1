tinymce.init({
    selector: '#detalle-txt',
    height: 150,
    menubar: true,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});

const reos = [];
const cargarCiudades = () => {
    let ciudades = ["Viña del mar", "Quilpue", "Santiago", "Otra Ciudad"];
    let select = document.getElementById("ciudad-select");
    
    for(let i=0; i < ciudades.length; i++){ 
        let option = document.createElement("option");
        option.innerHTML = ciudades[i];
        select.appendChild(option);
    }
}
cargarCiudades();
const cargarTabla = () => {

    let tbody = document.querySelector("#tbody-tabla");
    tbody.innerHTML = "";
    for (let i = 0; i < reos.length; ++i) {
        let r = reos[i];
        let tr = document.createElement("tr");
        let tdNombre = document.createElement("td");
        let tdDetalle = document.createElement("td");
        let tdCiudad = document.createElement("td");
        let tdGravedad = document.createElement("td");
        nombreApellido = r.nombre + " " + r.apellido;
        tdNombre.innerText = nombreApellido;
        tdDetalle.innerHTML = r.detalle;
        tdCiudad.innerHTML = r.ciudad;
        let peligro = document.createElement("i");
        if (parseInt(r.nroCrimenes) <= 3) {
            //<i class="far fa-meh"></i>
            peligro.classList.add("fas", "fa-meh", "text-success", "fa-3x");
        } else if (parseInt(r.nroCrimenes) >= 4 && parseInt(r.nroCrimenes) <= 6) {
            //<i class="far fa-angry"></i>
            peligro.classList.add("fas", "fa-angry", "text-dark", "fa-3x");
        } else if (parseInt(r.nroCrimenes) >= 7 && parseInt(r.nroCrimenes) <= 15) {
            //<i class="fas fa-exclamation-triangle"></i>
            peligro.classList.add("fas", "fa-exclamation-triangle", "text-warning", "fa-3x");
        } else {
            //<i class="fas fa-skull-crossbones"></i>
            peligro.classList.add("fas", "fa-skull-crossbones", "text-danger", "fa-3x");
        }
        tdGravedad.classList.add("text-center");
        tdGravedad.appendChild(peligro);
        tr.appendChild(tdNombre);
        tr.appendChild(tdDetalle);
        tr.appendChild(tdCiudad);
        tr.appendChild(tdGravedad);

        tbody.appendChild(tr);

    }
}
document.querySelector("#registrar-btn").addEventListener("click", () => {
    let nombre = document.querySelector("#nombre-txt").value;
    let apellido = document.querySelector("#apellido-txt").value;
    let nroCrimenes = document.querySelector("#nroCrimenes-txt").value;
    let detalle = tinymce.get("detalle-txt").getContent();
    let ciudad = document.querySelector("#ciudad-select").value;

    let reo = {};
    reo.nombre = nombre;
    reo.apellido = apellido;
    reo.nroCrimenes = nroCrimenes;
    reo.detalle = detalle;
    reo.ciudad = ciudad;

    reos.push(reo);
    cargarTabla();

    Swal.fire("Resultado exitoso!", "Reo registrado", "info");
});