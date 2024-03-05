import Contacto from "./classContacto.js";

const formularioContacto = document.querySelector("form");
const nombre = document.querySelector("#nombre"),
  apellido = document.querySelector("#apellido"),
  email = document.querySelector("#email"),
  telefono = document.querySelector("#telefono");
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];

const crearContacto = (e) => {
  e.preventDefault();
  console.log("desde la funcion que crea los contactos");
  const nuevoContacto = new Contacto(
    nombre.value,
    apellido.value,
    email.value,
    telefono.value
  );
  agenda.push(nuevoContacto);
  limpiarFormularioContacto();
  dibujarFila(nuevoContacto, agenda.length);
  guardarEnLocalstorage();
};

const limpiarFormularioContacto = () => {
  formularioContacto.reset();
};

const guardarEnLocalstorage = () => {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
};

const dibujarFila = (contacto, numeroFila) => {
  const tablaContactos = document.getElementById("tablaContacto");
  tablaContactos.innerHTML += `<tr>
    <th scope="row">${numeroFila}</th>
    <td>${contacto.nombre}</td>
    <td>${contacto.apellido}</td>
    <td>${contacto.email}</td>
    <td>${contacto.telefono}</td>
    <td>
    <button class="btn btn-primary" onclick="detalleContacto('${contacto.id}')">Ver mas</button>
      <button class="btn btn-warning">Editar</button>
      <button class="btn btn-danger" onclick="borrarContacto('${contacto.id}')">Borrar</button>
    </td>
  </tr>`;
};

const cargaInicial = () => {
  if (agenda.length > 0) {
    agenda.map((itemContacto, posicionContacto) =>
      dibujarFila(itemContacto, posicionContacto + 1)
    );
  }
};

window.borrarContacto = (idContacto) => {
  const posicionContactoBuscado = agenda.findIndex(
    (itemContacto) => itemContacto.id === idContacto
  );
  agenda.splice(posicionContactoBuscado, 1);
  guardarEnLocalstorage();
  const tablaContactos = document.getElementById("tablaContacto");
  tablaContactos.innerHTML = "";
  cargaInicial();
};

window.detalleContacto = (idContacto) => {
    console.log(window.location);
    window.location.href =
      window.location.origin + "/pages/detalleContacto.html?id=" + idContacto;
  };

formularioContacto.addEventListener("submit", crearContacto);

cargaInicial();
