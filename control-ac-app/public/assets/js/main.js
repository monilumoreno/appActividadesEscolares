/**
 * inicio bloque ocultar y mostrar formularios perfil administrador
 */

//funcion para mostrar el formulario docentes
function mostrarDocentes(){
    document.getElementById('docentes').style.display = 'block';
}

//funcion para ocultar el formulario docentes
function ocultarDocentes(){
    document.getElementById('docentes').style.display = 'none';
}

//funcion para mostrar el formulario estudiantes
function mostrarEstudiantes(){
    document.getElementById('estudiantes').style.display = 'block';
}

//funcion para ocultar el formulario estudiantes
function ocultarEstudiantes(){
    document.getElementById('estudiantes').style.display = 'none';
}

//funcion para mostrar el formulario acudientes
function mostrarAcudientes(){
    document.getElementById('acudientes').style.display = 'block';
}

//funcion para ocultar el formulario acudientes
function ocultarAcudientes(){
    document.getElementById('acudientes').style.display = 'none';
}

/**
 * Fin bloque ocultar y mostrar formularios perfil administrador
 */



/**
 * inicio bloque ocultar y mostrar formularios perfil docente
 */

//funcion para mostrar el formulario registrar actividades
function mostrarActividades(){
    document.getElementById('actividades').style.display = 'block';
}

//funcion para ocultar el formulario docentes
function ocultarActividades(){
    document.getElementById('actividades').style.display = 'none';
}
/**
 * Fin bloque ocultar y mostrar formularios perfil docente
 */



/**
 * Inicio bloque validación formularios perfil administrador
 */

(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

  
  function verificarPasswords() {

  password1 = document.getElementById('ingresoPassword');
  password2 = document.getElementById('verificarPassword');

  // Verificamos si las constraseñas no coinciden 
  if (password1.value  !='' && password2.value != '') {

      if (password1.value != password2.value) {
  
          // Si las constraseñas no coinciden mostramos un mensaje 
          document.getElementById("error").classList.add("mostrar");
  
          return false;
      } else {
  
          // Si las contraseñas coinciden ocultamos el mensaje de error
          document.getElementById("error").classList.remove("mostrar");
  
          // Mostramos un mensaje mencionando que las Contraseñas coinciden 
          document.getElementById("ok").classList.remove("ocultar");
  
          // Desabilitamos el botón de login 
          document.getElementById("crear").disabled = true;
  
          // Refrescamos la página (Simulación de envío del formulario) 
          setTimeout(function() {
              location.reload();
          }, 3000);
  
          return true;
      }
  }

  }

/**
 * fin bloque validación formularios perfil administrador
 */


/**
 * Inicio bloque validación grados y materias perfil acudiente
 */

//función para mostrar materias:

function grados() {
    grado = document.getElementById('grado');

    var prueba = grado.value;
    limpiar(); //funcion invocada para limpiar dropdown de materias
    switch (prueba) {
        case "6-1":

            var materias = ["Biología",
                "Agropecuaria",
                "Español",
                "Informatica",
                "Tecnología",
                "Artística",
                "Educación Física",
                "Ética",
                "Matemáticas",
                "Inglés",
                "Sociales"
            ];
            break;
        case "6-2":

            var materias = ["Biología",
                "Agropecuaria",
                "Español",
                "Informatica",
                "Tecnología",
                "Artística",
                "Educación Física",
                "Ética",
                "Matemáticas",
                "Inglés",
                "Sociales"
            ];

            break;
        case "7-1":
            var materias = ["Biología",
                "Agropecuaria",
                "Español",
                "Informatica",
                "Tecnología",
                "Artística",
                "Educación Física",
                "Ética",
                "Matemáticas",
                "Inglés",
                "Sociales"
            ];

            break;
        case "7-2":
            var materias = ["Biología",
                "Agropecuaria",
                "Español",
                "Informatica",
                "Tecnología",
                "Artística",
                "Educación Física",
                "Ética",
                "Matemáticas",
                "Inglés",
                "Sociales"
            ];

            break;
        case "8-1":
            var materias = ["Biología",
                "Agropecuaria",
                "Español",
                "Informatica",
                "Tecnología",
                "Artística",
                "Educación Física",
                "Ética",
                "Matemáticas",
                "Inglés",
                "Sociales"
            ];

            break;
        case "8-2":
            var materias = ["Biología",
                "Agropecuaria",
                "Español",
                "Informatica",
                "Tecnología",
                "Artística",
                "Educación Física",
                "Ética",
                "Matemáticas",
                "Inglés",
                "Sociales"
            ];

            break;
        case "9-1":
            var materias = ["Biología",
                "Agropecuaria",
                "Español",
                "Informatica",
                "Tecnología",
                "Artística",
                "Educación Física",
                "Ética",
                "Matemáticas",
                "Inglés",
                "Sociales"
            ];

            break;
        case "10-1":
            var materias = ["Química",
                "Agropecuaria",
                "Español",
                "Informatica",
                "Ciencias Políticas",
                "Artística",
                "Educación Física",
                "Ética",
                "Matemáticas",
                "Inglés",
                "Sociales",
                "Filosofía",
                "Física"
            ];

            break;
        case "11-1":
            var materias = ["Química",
                "Agropecuaria",
                "Español",
                "Informatica",
                "Ciencias Políticas",
                "Artística",
                "Educación Física",
                "Ética",
                "Matemáticas",
                "Inglés",
                "Sociales",
                "Filosofía",
                "Física",
                "emprendimiento"
            ];

            break;
    };

    for (option = 0; option < materias.length; option++) { //contador del array de materias
        let option1 = document.createElement("option"); //creamos elemento option de html
        option1.setAttribute("value", materias[option]); //añadimos el valor del elemento option
        let option1Texto = document.createTextNode(materias[option]); //añadimos el valor del elemnto option visible al usuario
        option1.appendChild(option1Texto); //añadimos el option a la lista 

        materia.appendChild(option1); //añadimos el option al dropdown
        document.body.appendChild(materia); //añadimos el dropdown al body del html 

    };

    function limpiar() { //funcion para limpiar el dropdown de materias
        materia = document.getElementById('materia');
        for (let i = materia.options.length; i >= 0; i--) {
            materia.remove(i);
        }
    };

}

//funcion para validar el boton consultar
function datos() {
    alert("Base de datos ControlActividadesEscolares")
}

//funcion para validar losbotones de check
function validarCheck() {
    document.getElementById(flexRadioDefault1).innerHTML = "Entrando a revision de tareas"
    alert("boton1")
}

/**
 * fin bloque validación grados y materias perfil acudiente
 */