const btnEnviar = document.getElementById('btn-enviar');

//Funcion para validar los nombre de usuario,email,apellido y celular
const validación = (e) => {
  e.preventDefault();
  const nombreDeUsuario = document.getElementById('usuario');
  const direcciónEmail = document.getElementById('email');
  const apellidoUsuario = document.getElementById('apellido');
  const numeroCelular = document.getElementById('celular');

  if (nombreDeUsuario.value === "") {
    Swal.fire({
      icon: 'error',
      title: 'Escribe tu nombre',
      text: 'Por favor, escribe tu nombre!'
    })
    usuario.focus();
    return false;
  }
  if (apellidoUsuario.value === "") {
    Swal.fire({
      icon: 'error',
      title: 'Escribe tu apellido',
      text: 'Por favor, escribe tu apellido.!'
    })
    usuario.focus();
    return false;
  }  
  if (direcciónEmail.value === "") {
    Swal.fire({
      icon: 'error',
      title: 'Escribe tu correo electronico',
      text: 'Por favor, escribe tu correo electrónico!'
    })
    email.focus();
    return false;
  }

  if (!emailVálido(email.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Escribe un correo valido',
      text: 'Por favor, escribe un correo electrónico válido!'
    })
    direcciónEmail.focus();
    return false;
  }
  if (!nombreVálido(nombreDeUsuario.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Escribe un nombre valido',
      text: 'Por favor, escribe un nombre válido!'
    })
    nombreDeUsuario.focus();
    return false;
  }
  if (!apellidoVálido(apellido.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Escribe un apellido valido',
      text: 'Por favor, escribe un apellido válido!'
    })
    apellidoUsuario.focus();
    return false;
  }
  if (!numeroTelefonico(numeroCelular.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Escribe un celular valido',
      text: 'Por favor, escribe un numero de celular válido!'
    })
    numeroCelular.focus();
    return false;
  }
  else {
    enviarFormulario()
  }
}
//Expresion regular para el campo de email donde valida la correcta escritura del mismo.  
const emailVálido = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
//Expresion regular para el campo de nombre donde valida la correcta escritura del mismo evitando el uso de numeros.
const nombreVálido = nombre => {
    return /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(nombre)
}
//Expresion regular para el campo de apellido donde valida la correcta escritura del mismo evitando el uso de numeros.
const apellidoVálido = apellido => {
    return /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(apellido)
}
//Expresion regular para el campo de celular donde valida la correcta escritura del mismo evitando el uso de letras y
//comenzando el numero con las caracteristicas del pais 549 o solo con 11.
const numeroTelefonico = numero => {
    return /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(numero)
}
btnEnviar.addEventListener('click', validación);


function enviarFormulario(){
    const seccion = document.getElementById('section');
    seccion.innerHTML =``
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tu compra ha sido completada!!',
        showConfirmButton: false,
        timer: 155500
      })
}