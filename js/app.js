// variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.getElementById('vaciar-carrito');



// Listeners
cargarEventListeners();

function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar Carrito";
    cursos.addEventListener('click', comprarCurso);

    // cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Cuando elimina todo el contenido del carrito
    vaciarCarrito.addEventListener('click', vaciarCarro);

    // cragar el documento mostrar el localStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}



// Funciones
// Funcion que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    // Delegation para agregar carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // Enviamos los datos del curso para tomar sus datos
        leerDatosCurso(curso);
    }
}

// Lee los datos del curso
function leerDatosCurso(curso) {

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarcarrito(infoCurso);
}

// muestra el curso seleccionado en el carrito
function insertarcarrito(curso) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>;
        </td>
        <td>${curso.titulo}</td>    
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>  
    `;

    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}


// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();

    let curso,
        cursoId;
    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoId);
}

// Vacia el contenido del carro
function vaciarCarro(e) {

    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
    // vaciar LocalStorage
    vaciarLocalStorage();

    return false;

}

// Almacenar curso en elocal storage

function guardarCursoLocalStorage(curso) {
    let cursos;

    cursos = obtenerCursoLocalStorage();

    // el curso seleccionado se añade al arreglo   
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}


//comprueba que haya elementos en local storage
function obtenerCursoLocalStorage() {
    let cursosLS;

    // comprobamos si hay algo en LocalStorage
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

// Imprime los cursos del LocalStorage

function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursoLocalStorage();

    cursosLS.forEach(function(curso) {
        // construir el template
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>;
        </td>
        <td>${curso.titulo}</td>    
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>  
    `;

        listaCursos.appendChild(row);
    });
}

// Eliminar el curso por el Id en el LocalStorage
function eliminarCursoLocalStorage(curso) {
    let cursosLS;
    // obtenemos el arreglo de cursos
    cursosLS = obtenerCursoLocalStorage();
    // Iteramos comprando el ID del curso borrado con los de LS
    cursosLS.forEach(function(cursoLS, index) {
        if (cursoLS.id === curso) {
            cursosLS.splice(index, 1);
        }
    });
    // Añadimos el arreglo actual a storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

// Eliminar todos los cursos de LocalStorage

function vaciarLocalStorage() {
    localStorage.clear();
}