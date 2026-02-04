const obtenerEmpleados = () =>
  JSON.parse(localStorage.getItem("empleados")) || [];

const guardarEmpleados = (empleados) => {
  localStorage.setItem("empleados", JSON.stringify(empleados));
};

const generarId = () => Date.now() + Math.random().toString(32).substring(2);
