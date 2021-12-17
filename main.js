const d = document,
    //get selectors
    $table = d.querySelector('.crud-table'),
    $title = d.querySelector('.crud-title'),
    $form = d.querySelector('.crud-form'),

    $template = d.getElementById('crud-template').content, //get content elements
    $fragment = d.createDocumentFragment();

console.log($table, $title, $form, $template, $fragment);

//get API

const getAll = async() => {
        try {
            let resp = await axios.get('http://localhost:5555/santos'),
                json = await resp.data;

            json.forEach(element => { //fill table.
                $template.querySelector('.name').textContent = element.nombre;
                $template.querySelector('.name').textContent = element.nombre;
                $template.querySelector('.constelacion').textContent = element.constelacion;
                $template.querySelector('.edit').dataset.id = element.id;
                $template.querySelector('.edit').dataset.name = element.nombre;
                $template.querySelector('.edit').dataset.constelacion = element.constelacion;
                $template.querySelector('.delete').dataset.id = element.id;

                let $clone = d.importNode($template, true); //clone node
                $fragment.appendChild($clone);
            });

            $table.querySelector('tbody').appendChild($fragment);
        } catch (error) {

        }
    }
    //send peticion


d.addEventListener('DOMContentLoaded', getAll(), e => {});

d.addEventListener('submit', async e => { //post
    if (e.target === $form) {
        console.log(e.target);
        e.preventDefault();
        if (!e.target.id.value) { //si el id no trae valor.

            try {
                let options = { //creamos nuestro objeto options.
                        method: "POST",
                        headers: {
                            "Content-type": "application/json; charset= utf-8"

                        },
                        data: JSON.stringify({ //creamos el objeto json.
                            nombre: e.target.nombre.value,
                            constelacion: e.target.constelacion.value
                        })
                    },

                    res = await axios('http://localhost:5555/santos', options),
                    json = await res.data;


            } catch (error) {
                let mensaje = error.statusText || "Ocurrio un error";
                alert(`<p><b>${error.status} : ${mensaje}</b></p>`)
            }

        } else {
            try {
                let options = {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json; charset= utf-8"
                    },

                    data: JSON.stringify({
                        nombre: e.target.nombre.value,
                        constelacion: e.target.constelacion.value
                    })
                }

                res = await axios('http://localhost:5555/santos', options), //enviamos la peticion
                    json = await res.data;

            } catch (error) {
                let mensaje = error.statusText || "Ocurrio un error";
                alert(`<p><b>${error.status} : ${mensaje}</b></p>`)
            }
        }
    }
})

d.addEventListener('click', async e => {
    if (e.target.matches('.edit')) {
        $form.nombre.value = e.target.dataset.name,
            $form.constelacion.value = e.target.dataset.constelacion,
            $form.id.value = e.target.dataset.id
    }

    if (e.target.matches('.delete')) {
        console.log('delete');
        let del = confirm(`Estas seguro de eliminar ${e.target.dataset.id}?`)
        if (del) {
            try {
                let options = {
                        method: "DELETE",
                        headers: {
                            "Content-type": "application/json; charset= utf-8"

                        },
                    },
                    res = await axios(`http://localhost:5555/santos/${e.target.dataset.id}`, options),
                    json = await res.data

            } catch (error) {
                let mensaje = error.statusText || "Ocurrio un error";
                alert(`<p><b>${error.status} : ${mensaje}</b></p>`)
            }
        } else {

        }
    }
})