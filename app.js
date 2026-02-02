// variables y selectores
const formulario = document.querySelector("#formEmpleado");
const contenedor = document.querySelector("#contenedor");
if (contenedor) {
  listaEmpleados = JSON.parse(localStorage.getItem("empleados")) || [];
  console.log(listaEmpleados);
}

if (formulario) {
  const nombre = document.querySelector("#nombre");
  const apellido = document.querySelector("#apellido");

  const correo = document.querySelector("#correo");
  const puesto = document.querySelector("#puesto");
  const antiguedad = document.querySelector("#antiguedad");

  let empleados = [];

  // eventos
  nombre.addEventListener("input", validar);
  apellido.addEventListener("input", validar);
  correo.addEventListener("input", validar);
  formulario.addEventListener("submit", validarSubmit);

  // funciones
  function validarSubmit(e) {
    e.preventDefault();
    const empleado = {
      nombre: nombre.value,
      apellido: apellido.value,
      correo: correo.value,
      puesto: puesto.value,
      antiguedad: antiguedad.value,
      id: generarId(),
    };

    if (Object.values(empleado).some((valor) => valor === "")) {
      Object.entries(empleado).forEach(([key, valor]) => {
        if (valor === "") {
          const input = formulario[key];
          mostrarAlerta(`El campo ${key} es obligatorio`, input.parentElement);
        }
      });
      return;
    }

    empleados = [...empleados, empleado];
    localStorage.setItem("empleados", JSON.stringify(empleados));
    formulario.reset();
    mostrarAlerta("Guardado Correcatamente", formulario.parentElement, "exito");

    setTimeout(() => {
      location.href = "index.html";
    }, 1000);

    console.log(empleados);
  }
}

// funciones generales
function validar({ target }) {
  if (target.value.trim() === "") {
    mostrarAlerta(`El campo ${target.id} es obligatorio`, target.parentElement);
    return;
  }

  const borrar = target.parentElement.querySelector(".borrar");
  borrar?.remove();
}

function mostrarAlerta(mjs, contenedor, exito) {
  const borrar = contenedor.querySelector(".borrar");
  borrar?.remove();

  const alerta = document.createElement("P");
  alerta.classList.add(
    "text-center",
    "py-2",
    "font-bold",
    "rounded-lg",
    "mt-2",
    "borrar",
    exito === "exito" ? "bg-green-600" : "bg-red-500",
  );

  alerta.textContent = mjs;
  contenedor.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 3000);
}

function generarId() {
  return Date.now() + Math.random().toString(32).substring(2);
}
