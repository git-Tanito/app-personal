// variables y selectores

const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const correo = document.querySelector("#correo");
const puesto = document.querySelector("#puesto");
const antiguedad = document.querySelector("antiguedad");

const formulario = document.querySelector("#formulario");

// eventos
nombre.addEventListener("change", validar);

// funciones
function validar({ target }) {
  if (target.value.trim() === "") {
    console.log("esto esta vacio");
  }
}
