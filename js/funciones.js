
const url = 'https://api-proyecto-categoria.onrender.com/categoria'
// const url = 'https://api-proyecto-categoria.onrender.com/categoria'
const objectId = document.getElementById('contenido');

const listarCategoria = async () => {
    let contenido = '';

    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((res) => res.json())
        .then(function (data) {
            let listarCategorias = data.msg;
            console.log(listarCategorias);
            listarCategorias.map(function (categoria) {
                let objetoCategoria = Object.keys(categoria).map(key => key + '=' + encodeURIComponent(categoria[key])).join('&');
                console.log(categoria);
                contenido = contenido + `<tr>` +
                    `<td>` + categoria.nombre + `</td>` +
                    `<td>` + categoria.fecha + `</td>` +
                    `<td>` + categoria.informacion + `</td>` +
                    `<td>` + categoria.requisitos + `</td>` +
                    `<td>` + categoria.estado + `</td>` +
                    `<td><button class="btn btn-primary" onclick="redireccionarEditar('${objetoCategoria}')">Editar</button></td>` +
                    `<td> <button type="button" class="btn btn-danger btnEliminar" onclick="eliminarCategoria('${categoria.nombre}');">Eliminar</button></td>` +
                    `</tr>`;
            });
            objectId.innerHTML = contenido;
        });
}

const registrarCategoria = () => {
    const nombre = document.getElementById('nombre').value;
    const fecha = document.getElementById('fecha').value;
    const informacion = document.getElementById('informacion').value;
    const requisitos = document.getElementById('requisitos').value;
    const estado = document.getElementById('estado').value;

    if (nombre.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido';
    } else if (fecha.length == 0) {
        document.getElementById('fechaHelp').innerHTML = 'Dato requerido';
    } else if (informacion.length == 0) {
        document.getElementById('informacionHelp').innerHTML = 'Dato requerido';
    } else if (requisitos.length == 0) {
        document.getElementById('requisitosHelp').innerHTML = 'Dato requerido';
    } else if (estado == "") {
        document.getElementById('estadoHelp').innerHTML = 'Dato requerido';
    } else {
        let categoria = {
            nombre: nombre,
            fecha: fecha,
            informacion: informacion,
            requisitos: requisitos,
            estado: estado,
        };

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(categoria),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())
            .then(json => {
                alert(json.msg);
            });
    }
}
const eliminarCategoria = async (nombre) => {
    try {
        const deleteUrl = `${url}`;  // Solo la ruta base, ya que el ID irá en el cuerpo de la solicitud

        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ nombre })  // Incluye el ID en el cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar. Código de respuesta: ${response.status}`);
        }

        const json = await response.json();
        Swal.fire({
            position: "center",
            icon: "error",
            title: "eliminacion exitosamente",
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(() => {
            regresarListar();
        }, 2000);

        // Puedes realizar alguna acción adicional después de eliminar, como recargar la lista de donaciones
        // por ejemplo:
        // recargarListaDonaciones();
    } catch (error) {
        console.error('Error al eliminar el categoria:', error.message);
        // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario.
        alert('eliminacion exitosa');
    }
};




const actualizarCategoria = () => {
    const nombre = document.getElementById('nombre').value;
    const fecha = document.getElementById('fecha').value;
    const informacion = document.getElementById('informacion').value;
    const requisitos = document.getElementById('requisitos').value;
    const estado = document.getElementById('estado').value;

    if (nombre.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido';
    } else if (fecha.length == 0) {
        document.getElementById('fechaHelp').innerHTML = 'Dato requerido';
    }else if (informacion.length == 0) {
        document.getElementById('informacionHelp').innerHTML = 'Dato requerido';
    } else if (requisitos.length == 0) {
        document.getElementById('requisitosHelp').innerHTML = 'Dato requerido';
    } else if (estado == "") {
        document.getElementById('estadoHelp').innerHTML = 'Dato requerido';
    } else {
        let categoria = {
            nombre: nombre,
            fecha: fecha,
            informacion: informacion,
            requisitos: requisitos,
            estado: estado,
        };

        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(categoria),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())
            .then(json => {
                alert(json.msg);
            });
    }
}

const redireccionarEditar = (objetoCategoria) => {
    document.location.href = 'editarCategoria.html?' + objetoCategoria;
}

const editarCategoria = () => {
    var urlParams = new URLSearchParams(window.location.search);
    document.getElementById('nombre').value = urlParams.get('nombre');
    document.getElementById('fecha').value = urlParams.get('fecha');
    document.getElementById('informacion').value = urlParams.get('informacion');
    document.getElementById('requisitos').value = urlParams.get('requisitos');
    document.getElementById('estado').value = urlParams.get('estado');
}

if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#btnRegistrar').addEventListener('click', registrarCategoria);
}

if (document.querySelector('#btnActualizar')) {
    document.querySelector('#btnActualizar').addEventListener('click', actualizarCategoria);
}

if (document.querySelector('#btnEliminar')) {//Si objeto existe
    document.querySelector('#btnEliminar').addEventListener('click', eliminarCategoria)
}












