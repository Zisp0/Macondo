$('#buttonRecuperarContrase├▒a').click(function(){
    validarCorreo();
});

$('#buttonToken').click(function () {
    validarToken();
});

$("#buttonActContra").click(function () {
    validarContra();
});

const correo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/;
const token = /^\d{4,4}$/;
const expresiones = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function validarCorreo(){
    let correoRec = $('#inputCorreo').val().trim();
    if(correoRec == ''){
        Swal.fire({
            title:'Ingrese un correo',
            text: 'Por favor ingrese su email',
            icon: 'warning'
        })
    }else if(!correo.test(correoRec)){
        Swal.fire({
            title:'Correo invalido',
            text: 'Por favor ingrese su email',
            icon: 'warning'
        })
    }else{
        buscandoCorreo(correoRec);
    }
}

function buscandoCorreo(correo){
    $.ajax({
        url: "../controlador/accion/act_recuperarContrasena.php",
        dataType: 'text',
        method: 'post',
        data: {correo: correo},
        success: function (respuesta) {
            if(respuesta == 'no existe'){
                Swal.fire({
                    title:'Usuario No Registrado',
                    text: 'El correo no se encuentra registrado en Macondo, registrese para disfrutar de nuestros servicios',
                    icon: 'error'
                })
            }else{
                enviarToken(correo);
            }
        }
    });
}

function enviarToken(correo){
    let token = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    token = new String(token);
    $.ajax({
        url: "../controlador/accion/act_enviarToken.php",
        dataType: 'text',
        method: 'post',
        data: {correo: correo, token: token},
        success: function (respuesta) {
            if(respuesta == "si"){
                document.location.href='/Macondo/vista/ingresarToken.php';
            }else{
                Swal.fire({
                    title:'Error!',
                    text: 'Hubo un error al enviar el token',
                    icon: 'error'
                })
            }
        }
    });
}

function validarToken() {
    let tokenIngresado = $("#inputToken").val().trim();

    if(tokenIngresado == ""){
        Swal.fire({
            text: 'Por favor ingrese su token',
            icon: 'warning'
        })
    }else if(!token.test(tokenIngresado)){
        Swal.fire({
            title:'Token inv├ílido',
            text: 'Su token es un n├║mero entero de cuatro cifras',
            icon: 'warning'
        })
    }else{
        $.ajax({
            url: "../controlador/accion/act_validarToken.php",
            dataType: 'text',
            method: 'post',
            data: {tokenIngresado: tokenIngresado},
            success: function (respuesta) {
                console.log(respuesta);
                if(respuesta == "si"){
                    document.location.href='/Macondo/vista/actualizarContrase├▒a.php';
                }else if(respuesta == "no"){
                    Swal.fire({
                        title:'Error!',
                        text: 'El token ingresado no es el correcto',
                        icon: 'error'
                    })
                }else{
                    Swal.fire({
                        title:'Error!',
                        text: 'Hubo un error al validar el token',
                        icon: 'error'
                    })
                }
            }
        });
    }
}

function validarContra() {
    if($("#inputContraNueva").val() == ""){
        Swal.fire({
            title: "Campo de contrase├▒a nueva vac├şo.",
            text: 'Por favor ingrese su nueva contrase├▒a.',
            icon: 'warning'
        })
    }else if($("#inputContraConfirmar").val() == ""){
        Swal.fire({
            title: "Campo de confirmar contrase├▒a vac├şo.",
            text: 'Por favor confirme su nueva contrase├▒a.',
            icon: 'warning'
        })
    }else if($("#inputContraConfirmar").val() != $("#inputContraNueva").val()){
        Swal.fire({
            title: "Las contrase├▒as no coinciden.",
            text: 'La nueva contrase├▒a ingresada no coincide con su confirmaci├│n, digitela nuevamente.',
            icon: 'warning'
        })
    }else if(!expresiones.test($("#inputContraConfirmar").val())){
        Swal.fire({
            title: "Contrase├▒a insegura.",
            text: 'La nueva contrase├▒a debe tener mas de 8 digitos sin espacios y minimo un numero y letra.',
            icon: 'warning'
        })
    }else{
        cambiarContra();
    }
}

function cambiarContra() {
    $.ajax({
        url: "../controlador/accion/act_ActualizarContrasenaOlvidada.php",
        method: 'POST',
        dataType: 'text',
        data: {
            contrasenaNueva: $("#inputContraNueva").val()
        },
        success: function (resultado) {
            console.log(resultado);
            if(resultado == "si"){
                document.location.href='/Macondo/vista/login.php';
            }else{
                Swal.fire({
                    text: 'Hubo un error al momento de atualizar',
                    icon: 'error'
                })
            }
        }
    })
}