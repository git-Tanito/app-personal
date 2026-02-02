// variables y selectores

const formulario = document.querySelector("#formEmpleado");
let empleados = [];
// eventos

nombre.addEventListener("input", validar);
apellido.addEventListener("input", validar);
correo.addEventListener("input", validar);
formulario.addEventListener("submit", validarSubmit);

// funciones
function validar({ target }) {
  if (target.value.trim() === "") {
    mostrarAlerta(`El campo ${target.id} es obligatorio`, target.parentElement);
    return;
  }
  const borrar = target.parentElement.querySelector(".borrar");
  borrar?.remove();
}

function mostrarAlerta(mjs, contenedor) {
  const borrar = contenedor.querySelector(".borrar");
  borrar?.remove();
  const alerta = document.createElement("P");
  alerta.classList.add(
    "text-center",
    "bg-red-500",
    "py-2",
    "font-bold",
    "rounded-lg",
    "mt-2",
    "borrar",
  );

  alerta.textContent = mjs;
  contenedor.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 3000);
}

function validarSubmit(e) {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const correo = document.querySelector("#correo").value;
  const puesto = document.querySelector("#puesto").value;
  const antiguedad = Number(document.querySelector("#antiguedad").value);

  const empleado = {
    nombre,
    apellido,
    correo,
    puesto,
    antiguedad,
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
  formulario.reset();
  console.log(empleados);
}

function generarId() {
  return Date.now() + Math.random().toString(32).substring(2);
}
