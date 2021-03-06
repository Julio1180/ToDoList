const listaTareas = document.getElementById('listaTareas');
const btnAgregar = document.getElementById('btnAgregar')
const inputTarea = document.getElementById('inputTarea')
const seleccionTarea = document.getElementById('seleccionTarea')
const seleccionPrioridad = document.getElementById('seleccionPrioridad')
const filtraTexto = document.getElementById('filtraTexto')


printListaTareas(arrTareas, listaTareas)



function printTarea(pTarea) {
    const tarea = document.createElement('h3')
    const urgencia = document.createElement('p')
    const btnEliminar = document.createElement('button')
    const listaTareas = document.createElement('div')
    listaTareas.classList.add('flex')

    tarea.innerText = pTarea.titulo;
    btnEliminar.innerText = 'Quitar Tarea'
    urgencia.innerText = pTarea.prioridad;

    listaTareas.appendChild(tarea);
    listaTareas.appendChild(urgencia)
    listaTareas.appendChild(btnEliminar)

    if (pTarea.prioridad === 'diaria') {
        listaTareas.style.backgroundColor = 'yellow'

    } else if (pTarea.prioridad === 'urgente') {
        listaTareas.style.backgroundColor = 'tomato'
    }
    else if (pTarea.prioridad === 'mensual') {
        listaTareas.style.backgroundColor = 'blue'
    }

    btnEliminar.dataset.idTarea = pTarea.idTarea;

    btnEliminar.addEventListener('click', (event) => {
        arrTareas = borrarTarea(event.target.dataset.id, arrTareas);
        event.target.parentNode.remove();
    });



    return listaTareas;
}



function printListaTareas(pListaTareas, pSection) {
    listaTareas.innerHTML = '';
    for (let tarea of pListaTareas) {
        const totalTareas = printTarea(tarea)
        pSection.appendChild(totalTareas)
    }
}



btnAgregar.addEventListener('click', agregarTarea)


function agregarTarea(event) {

    const nuevaTarea = {
        idTarea: arrTareas.length + 1,
        titulo: inputTarea.value,
        prioridad: seleccionTarea.value,
    }

    arrTareas.push(nuevaTarea)

    const listaAñadida = printTarea(nuevaTarea);
    listaTareas.appendChild(listaAñadida)

}


seleccionPrioridad.addEventListener('change', (event) => {
    let filtrados = [];
    for (let tarea of arrTareas) {
        if (tarea.prioridad === event.target.value) {
            filtrados.push(tarea);
        }
    }

    console.log(filtrados);

    printListaTareas(filtrados, listaTareas)
});



function borrarTarea(pId, pArrTareas) {
    const nuevoArr = [];
    for (let tarea of pArrTareas) {
        if (tarea.idTarea !== parseInt(pId)) {
            nuevoArr.push(tarea);
        }
    }
    return nuevoArr;
}




filtraTexto.addEventListener('input', filtrarTexto)

function filtrarTexto(event) {
    const textoFiltrado = event.target.value.toLowerCase();
    const arrBusqueda = new Array();
    for (let tarea of arrTareas) {
        if (tarea.titulo.toLowerCase().includes(textoFiltrado) && (!arrBusqueda.includes(tarea))) {
            arrBusqueda.push(tarea)
        }
    }
    printListaTareas(arrBusqueda, listaTareas)
}

