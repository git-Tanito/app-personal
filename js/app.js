const contenedor = document.querySelector("#contenedor");
let empleados = obtenerEmpleados();

document.addEventListener("DOMContentLoaded", mostrarEmpleados);

function mostrarEmpleados() {
  if (!contenedor) return;
  contenedor.innerHTML = "";

  empleados.forEach((empleado) => {
    const tarjeta = document.createElement("div");
    tarjeta.className =
      "group bg-[#1e293b] rounded-2xl border border-slate-800 p-6 mb-4 shadow-2xl hover:border-indigo-500/50 transition-all";

    const inicialNombre = empleado.nombre ? empleado.nombre.charAt(0) : "";
    const inicialApellido = empleado.apellido
      ? empleado.apellido.charAt(0)
      : "";

    tarjeta.innerHTML = `
            <div class="flex items-center mb-6">
                <div class="h-14 w-14 bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                    ${inicialNombre}${inicialApellido}
                </div>
                <div class="ml-4">
                    <h3 class="font-bold text-white text-lg">${empleado.nombre} ${empleado.apellido}</h3>
                    <span class="text-xs bg-slate-800 text-indigo-400 px-2 py-1 rounded-md font-bold uppercase">${empleado.puesto}</span>
                </div>
            </div>
            <div class="space-y-3 text-sm text-slate-400 mb-4">
                <div class="flex items-center"><i class="fas fa-envelope w-6 text-indigo-500"></i>${empleado.correo}</div>
                <div class="flex items-center"><i class="fas fa-calendar-alt w-6 text-indigo-500"></i>Antigüedad: ${empleado.antiguedad}</div>
            </div>
            <div class="flex justify-between border-t border-slate-800 pt-4">
                <button onclick="prepararEdicion('${empleado.id}')" class="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest">Editar</button>
                <button onclick="eliminarEmpleado('${empleado.id}')" class="text-red-400/70 hover:text-red-400 text-xs font-bold uppercase tracking-widest">Eliminar</button>
            </div>
        `;
    contenedor.appendChild(tarjeta);
  });
}

function prepararEdicion(id) {
  localStorage.setItem("empleadoId", id);
  location.href = "registro.html";
}

function eliminarEmpleado(id) {
  if (confirm("¿Deseas eliminar este empleado?")) {
    empleados = empleados.filter((e) => e.id !== id);
    guardarEmpleados(empleados);
    mostrarEmpleados();
  }
}
