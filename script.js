let btnEmpezar = document.getElementById("EmpezarContador")
let btnFinalizar = document.getElementById("finalizarContador")
let btnReiniciar = document.getElementById("ReiniciarContador")
let contadorElement = document.getElementById("contador")
let Agregar5m = document.getElementById("agregar5")
let Agregar15m = document.getElementById("agregar15")
let Agregar30m = document.getElementById("agregar30")
let AgregarTiempoAdicional = document.getElementById("agregarTiempoAdicional")
let EliminarTiempoAdicional = document.getElementById("eliminarTiempoAdicional")
let contador = 0
let intervalId
let contadorIniciado = false
let tiempoInicial = 0
let contadorTiempoAdicional = 0

// EVENTOS 
btnEmpezar.addEventListener("click", function() {
    if (!contadorIniciado) { 
        empezarContador()
        contadorIniciado = true
        btnEmpezar.disabled = true
        btnReiniciar.disabled = false
    } 
})

btnFinalizar.addEventListener("click", function() {
    finalizarContador()
    tiempoInicial = contador
})

AgregarTiempoAdicional.addEventListener("click", function() {
    agregarTiempoAdicional()
  })
  
EliminarTiempoAdicional.addEventListener("click", function() {
    eliminarTiempoAdicionalContador()
})


btnReiniciar.addEventListener("click", function() {
    finalizarContador()
    contadorElement.textContent = `00:00:00`
    contador = 0
})

Agregar5m.addEventListener("click", function() {
    if(!contadorIniciado === true) {
        agregarTiempo(300) // 5 minutos en segundos: 5 * 60 = 300
    } else {
        mostrarContadorIniciado()
    }
}, false)

Agregar15m.addEventListener("click", function() {
    if(!contadorIniciado) {
        agregarTiempo(900) // 15 minutos en segundos: 15 * 60 = 900
    } else {
        mostrarContadorIniciado()
    }
}, false)

Agregar30m.addEventListener("click", function() {
    if(!contadorIniciado === true) {
        agregarTiempo(1800) // 30 minutos en segundos: 30 * 60 = 1800
    } else {
        mostrarContadorIniciado()
    }
}, false)

// FUNCIONES 
function agregarTiempo(tiempo) {
    if (!contadorIniciado) {
      contador += tiempo
      contadorTiempoAdicional += tiempo
      actualizarContador()
    }
  }

function eliminarTiempo(tiempo) {
    if (!contadorIniciado) {
        contador = tiempo - tiempoInicial
        actualizarContador()
    } 
}

function agregarTiempoAdicional() {
    if (contadorIniciado) {
      mostrarContadorIniciado()
    } else {
      let tiempoAdicionalStr = inputAlertAgregar()
      let tiempoAdicional = parseInt(tiempoAdicionalStr)
  
      if (!isNaN(tiempoAdicional) && tiempoAdicional > 0) {
        agregarTiempo(tiempoAdicional * 60) // Convertir minutos a segundos
      }
    }
  }
  

function eliminarTiempoAdicional() {
    if (contadorIniciado) {
        mostrarContadorIniciado()
    } else {
        let tiempoAdicionalStr = inputAlertEliminar()
        let tiempoAdicional = parseInt(tiempoAdicionalStr)

        if (!isNaN(tiempoAdicional) && tiempoAdicional > 0) {
            eliminarTiempo(tiempoAdicional * 60) // Convertir minutos a segundos
        }
    }
}

function eliminarTiempoAdicionalContador() {
    if (contadorIniciado) {
        mostrarContadorIniciado()
    } else {
        let tiempoAdicionalStr = inputAlertEliminar()
        let tiempoAdicional = parseInt(tiempoAdicionalStr)

        if (!isNaN(tiempoAdicional) && tiempoAdicional > 0) {
            let tiempoEliminar = tiempoInicial + contadorTiempoAdicional - tiempoAdicional * 60 
            eliminarTiempo(tiempoEliminar)
            contadorTiempoAdicional = tiempoAdicional * 60 
        }
    }
}
  


function inputAlertAgregar() {
    Swal.fire({
        title: 'Ingresa el tiempo adicional en minutos:',
        input: 'text',
        inputLabel: 'Tiempo en minutos',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'Ingresa un valor válido para el tiempo adicional.'
            } else {
                let tiempoAdicional = parseInt(value)

                if (!isNaN(tiempoAdicional) && tiempoAdicional > 0) {
                    agregarTiempo(tiempoAdicional * 60) // Convertir minutos a segundos
                } else {
                    alert('Ingresa un valor válido para el tiempo adicional.')
                }
            }
        }
    })
}

function inputAlertEliminar() {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: 'Ingresa el tiempo adicional en minutos:',
            input: 'text',
            inputLabel: 'Tiempo en minutos',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    reject('Ingresa un valor válido para el tiempo adicional.')
                } else {
                    resolve(value)
                }
            }
        })
    })
}

async function eliminarTiempoAdicionalContador() {
    if (contadorIniciado) {
        mostrarContadorIniciado()
    } else {
        try {
            let tiempoAdicionalStr = await inputAlertEliminar()
            let tiempoAdicional = parseInt(tiempoAdicionalStr)

            if (!isNaN(tiempoAdicional) && tiempoAdicional > 0) {
                let tiempoEliminar = tiempoInicial + contadorTiempoAdicional - tiempoAdicional * 60 
                eliminarTiempo(tiempoEliminar)
                contadorTiempoAdicional = tiempoAdicional * 60 
            }
        } catch (error) {
            alert(error)
        }
    }
}


function empezarContador() {
    intervalId = setInterval(function() {
        contador++
        actualizarContador()
    }, 1000)
}



function mostrarContadorIniciado() {
    Toastify({
        text: "El contador está iniciado, debes finalizarlo para agregar más tiempo",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "left",
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #ff6b6b, #ff8400)",
        },
        onClick: function(){} 
    }).showToast()
}


function finalizarContador() {
    clearInterval(intervalId)
    contadorIniciado = false
    btnEmpezar.disabled = false
    btnReiniciar.disabled = false
}

function actualizarContador() {
    let horas = Math.floor(contador / 3600)
    let minutos = Math.floor((contador % 3600) / 60)
    let segundos = contador % 60

    let horasStr = horas.toString().padStart(2, "0")
    let minutosStr = minutos.toString().padStart(2, "0")
    let segundosStr = segundos.toString().padStart(2, "0")

    contadorElement.textContent = `${horasStr}:${minutosStr}:${segundosStr}`

    if (horas >= 24) {
        reiniciarContador()
    }
}
    
function reiniciarContador() {
      clearInterval(intervalId)
      contador = 0
      contadorIniciado = false
      btnEmpezar.disabled = false
      btnReiniciar.disabled = false
}