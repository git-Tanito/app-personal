const formulario = document.querySelector("#formEmpleado");
const inputs = {
  nombre: document.querySelector("#nombre"),
  apellido: document.querySelector("#apellido"),
  correo: document.querySelector("#correo"),
  puesto: document.querySelector("#puesto"),
  antiguedad: document.querySelector("#antiguedad"),
};

let empleados = obtenerEmpleados();
const idEdicion = localStorage.getItem("empleadoId");

document.addEventListener("DOMContentLoaded", () => {
  if (idEdicion) {
    const emp = empleados.find((e) => e.id === idEdicion);
    if (emp) {
      Object.keys(inputs).forEach((key) => (inputs[key].value = emp[key]));
      formulario.querySelector('button[type="submit"]').textContent =
        "Actualizar Empleado";
    }
  }
});

function validar({ target }) {
  if (target.value.trim() === "") {
    mostrarAlerta(`El campo ${target.id} es obligatorio`, target.parentElement);
    return;
  }
  target.parentElement.querySelector(".borrar")?.remove();
}

function mostrarAlerta(mjs, contenedorAlerta, tipo) {
  contenedorAlerta.querySelector(".borrar")?.remove();
  const alerta = document.createElement("P");
  alerta.classList.add(
    "text-center",
    "py-2",
    "font-bold",
    "rounded-lg",
    "mt-2",
    "borrar",
    "text-white",
    tipo === "exito" ? "bg-green-600" : "bg-red-500",
  );
  alerta.textContent = mjs;
  contenedorAlerta.appendChild(alerta);
  setTimeout(() => alerta.remove(), 3000);
}

if (formulario) {
  Object.values(inputs).forEach((input) =>
    input.addEventListener("input", validar),
  );

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const datos = {
      nombre: inputs.nombre.value,
      apellido: inputs.apellido.value,
      correo: inputs.correo.value,
      puesto: inputs.puesto.value,
      antiguedad: inputs.antiguedad.value,
    };

    if (Object.values(datos).some((v) => v.trim() === "")) {
      Object.entries(datos).forEach(([key, val]) => {
        if (val.trim() === "")
          mostrarAlerta(
            `El campo ${key} es obligatorio`,
            inputs[key].parentElement,
          );
      });
      return;
    }

    const empleadoFinal = { ...datos, id: idEdicion || generarId() };

    if (idEdicion) {
      empleados = empleados.map((e) =>
        e.id === idEdicion ? empleadoFinal : e,
      );
      localStorage.removeItem("empleadoId");
    } else {
      empleados.push(empleadoFinal);
    }

    guardarEmpleados(empleados);
    mostrarAlerta("Guardado correctamente", formulario, "exito");
    setTimeout(() => (location.href = "index.html"), 1500);
  });
}
