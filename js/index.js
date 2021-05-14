tinymce.init({
    selector: '#descripcion-txt',
    height: 150,
    menubar: false,
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
const horarios = ["Desayuno","Almuerzo","Once","Cena"];
let seleccion = document.querySelector("#horario-select");
  
for(let i=0; i<horarios.length; ++i){
    const option = document.createElement('option');
    option.value=horarios[i];
    option.text=horarios[i];
    seleccion.appendChild(option);
}
const p = [] ;
const cargarTabla = ()=>{
    //1)seleccionar el tbody por medio de un selector
    const tbody = document.querySelector("#tabla-menu");
    //vaciamos la tabla cada vez que llamamos la funcion
    tbody.innerHTML = "";
    //2)realizar un for para recorrer el arreglo creado
    for (let i = 0; i < p.length; ++i) {
        //2.5)asignarle al elemento del arreglo una variable
        let m = p[i];
        //3)por cada elemento recorrido, generar una fila en la tabla (tr).
        let fila = document.createElement("tr");
        //4)por cada atributo del objeto, generar una celda
        let celdaNombre = document.createElement("td");
        //4.1)a cada celda asignarle el valor correspondiente del arreglo
        celdaNombre.innerText = m.nombre;
        let celdaHorario = document.createElement("td");
        celdaHorario.innerText = m.horario;
        let celdaValor = document.createElement("td");
        celdaValor.innerText = m.valor;
        let celdaDescripcion = document.createElement("td");
        celdaDescripcion.innerHTML = m.descripcion;
        let celdaOferta = document.createElement("td");
        celdaOferta = m.oferta;
        let icono = document.createElement("i");
        if(celdaOferta==true){
            icono.classList.add("fas", "fa-exclamation", "text-success", "fa-2x");
        }
        if(celdaOferta==false){
            icono.classList.add("fas", "fa-exclamation", "text-dark", "fa-2x");
        }
        
        //5)agregar cada celda a la fila
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaHorario);
        fila.appendChild(celdaValor);
        fila.appendChild(celdaDescripcion);
        fila.appendChild(icono);
        //6)agregar fila al cuerpo de la tabla
        tbody.appendChild(fila);
    }
};
document.querySelector("#btn-registrar").addEventListener("click", ()=>{
    //para obtener el valor de un elemento input, utilizamos el selector correspondiente y le colocamos .value
    /*para guardar este valor, se lo asignamos con una variable por medio de:
    let nombreVariable = blablabla.value */
    let nombre = document.querySelector("#nombre-txt").value;
    let horario = document.querySelector("#horario-select").value;
    let valor = document.querySelector("#valor-txt").value;
    let descripcion = tinymce.get("descripcion-txt").getContent();
    let oferta = false

    if(horario=="Desayuno"){
        if((horario == "Desayuno" && valor < 1000) || (horario == "Desayuno" && valor > 10000)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El valor ingresado es invalido',
            })
            return
        }
        if(valor<"5000"){
            oferta = true
        }
    }
    if(horario=="Almuerzo"){
        if((valor<"10000") && (valor>"20000")){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El valor ingresado es invalido',
            })
            return
        }
        if(valor<"15000"){
            oferta = true
        }
    }
    if(horario=="Once"){
        if((valor<"5000") && (valor>"15000")){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El valor ingresado es invalido',
            })
            return
        }
        if(valor<"10000"){
            oferta = true
        }
    }
    if(horario=="Cena"){
        if(valor<"15000"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El valor ingresado es invalido',
            })
            return
        }
        if(valor<"20000"){
            oferta = true
        }
    }
    let menu = {};
    menu.nombre = nombre;
    menu.horario = horario;
    menu.valor = valor;
    menu.descripcion = descripcion
    menu.oferta = oferta
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registro de Menu realizado',
        showConfirmButton: false,
        timer: 1500
      })

    p.push(menu);
    cargarTabla();

});
