//Variables
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");

//Variales de inputs de formulario

const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

//Expresion Regular Email
const exRegular =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners();
function eventListeners() {
    //Cuando se inicia la app
    document.addEventListener("DOMContentLoaded", iniciarApp);

    //inputs de formulario
    email.addEventListener("blur", validarFormulario); // blur se ejecuta cuando estas dentro el input y te sales
    asunto.addEventListener("blur", validarFormulario);
    mensaje.addEventListener("blur", validarFormulario);

    //Resetear formulario
    btnReset.addEventListener('click', resetearFormulario);
    //btnReset.addEventListener('reset', resetearFormulario);

    //Enviar Email
    formulario.addEventListener("submit", enviarEmail);
}

//Funciones

//Encargada de arrancar toda la funcionalidad una vez cargado el documento por primera vez
function iniciarApp() {
    btnEnviar.disabled = true; //deshabilita el boton enviar
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

    if (exRegular.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false; //habilita el boton enviar
        btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
    }
}

//Funcion muestra el error del input
function mostrarError(mensaje) {
    console.log("mostrar error");

    const mensajeError = document.createElement('p');
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
        //formulario.appendChild(mensajeError);
        formulario.insertBefore(mensajeError, document.querySelector(".mb-10"));
    }
}

//Envia Email
function enviarEmail(e) {
    e.preventDefault();
    console.log("enviando...");

    //Mostrar Spiner
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";

    //Despues de 4 seg. oculta el spinner y muestra el mensaje email enviado
    setTimeout(() => {
        spinner.style.display = "none";

        //Mensaje de confirmacion de envio
        const parrafo = document.createElement('p');
        parrafo.textContent = "El mensaje se envi*o correctamente";

        //Estilo al parrafo
        parrafo.classList.add(
            "text-center",
            "my-10",
            "p-2",
            "bg-green-500",
            "text-white",
            "font-bold",
            "uppercase"
        );

        //inserta el parafo antes del spinner -
        formulario.insertBefore(parrafo, spinner);

        //Elimina el mensaje de exito
        setTimeout(() => {
            parrafo.remove(); //Elimina el mensaje de exito

            resetearFormulario();
        }, 3000);
    }, 3000);



    //Resetea el formulario
    function resetearFormulario() {
        formulario.reset();
        iniciarApp(); //para deshabilitar el boton enviar
    }
}

