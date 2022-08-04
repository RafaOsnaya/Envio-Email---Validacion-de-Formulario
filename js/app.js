//Variables
const btnEnviar = document.querySelector("#enviar");
const formulario = document.querySelector("#enviar-mail");

//Variales de inputs de formulario

const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

eventListeners();
function eventListeners() {
  //Cuando se inicia la app
  document.addEventListener("DOMContentLoaded", iniciarApp);

  //inputs de formulario
  email.addEventListener("blur", validarFormulario); // blur se ejecuta cuando estas dentro el input y te sales
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);
}

//Funciones

//Encargada de arrancar toda la funcionalidad una vez cargado el documento por primera vez
function iniciarApp() {
  btnEnviar.disabled = true; //deshabilita el boton
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

//Validar Formulario
function validarFormulario(e) {
  if (e.target.value.length > 0) {
    //Elimina los errores
    const error = document.querySelector("p.error");
    if (error) {
        error.remove();
    }

    e.target.classList.remove("boder", "border-red-500");
    e.target.classList.add("boder", "border-green-500");
  } else {
    e.target.classList.add("boder", "border-green-500");
    e.target.classList.add("boder", "border-red-500");

    mostrarError("Todos los campos son obligatorios");
  }

  if (e.target.type === "email") {
    const exRegular =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (exRegular.test(e.target.value)) {
      //Elimina los errores
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
    }

      e.target.classList.remove("boder", "border-red-500");
      e.target.classList.add("boder", "border-green-500");
    } else {
      e.target.classList.add("boder", "border-green-500");
      e.target.classList.remove("boder", "border-red-500");

      mostrarError("Email no valido");
    }
  }
}

//Funcion muestra el error del input
function mostrarError(mensaje) {
  console.log("mostrar error");

  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "boder",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formulario.insertBefore(mensajeError, document.querySelector(".mb-10"));
  }
}
