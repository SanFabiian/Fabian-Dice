const btnAzul = document.getElementById('btnAzul')
const btnRojo = document.getElementById('btnRojo')
const btnNaranja = document.getElementById('btnNaranja')
const btnVerde = document.getElementById('btnVerde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }

    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            btnAzul, 
            btnRojo, 
            btnNaranja, 
            btnVerde
        }
    }

    toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {
        this.subNivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'btnAzul'
            case 1:
                return 'btnRojo'
            case 2:
                return 'btnNaranja'
            case 3:
                return 'btnVerde'
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case 'btnAzul':
                return 0
            case 'btnRojo':
                return 1
            case 'btnNaranja':
                return 2
            case 'btnVerde':  
                return 3
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('luz')
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color) {
        this.colores[color].classList.remove('luz')
    }

    agregarEventosClick() {
        this.colores.btnAzul.addEventListener('click', this.elegirColor)
        this.colores.btnRojo.addEventListener('click', this.elegirColor)
        this.colores.btnNaranja.addEventListener('click', this.elegirColor)
        this.colores.btnVerde.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.btnAzul.removeEventListener('click', this.elegirColor)
        this.colores.btnRojo.removeEventListener('click', this.elegirColor)
        this.colores.btnNaranja.removeEventListener('click', this.elegirColor)
        this.colores.btnVerde.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
            this.iluminarColor(nombreColor) 
            if (numeroColor === this.secuencia[this.subNivel]) {
                this.subNivel++
                if (this.subNivel === this.nivel) {
                    this.nivel++
                    this.eliminarEventosClick()
                    if (this.nivel === (ULTIMO_NIVEL + 1)) {
                        this.ganoElJuego()
                    } else {
                        setTimeout(this.siguienteNivel, 1500)
                    }
                }
            } else {
                this.perdioElJuego()
            }
    }

    ganoElJuego() {
        swal('Fabian Dice', 'Felicidades ¡Has Ganado!', 'success')
        .then(this.inicializar)
    }

    perdioElJuego() {
        swal('Fabian Dice', 'Lo siento Perdiste :(', 'error')
        .then(() => {
            this.eliminarEventosClick()
            this.inicializar()
          })
    }

}

function empezar() {
    window.juego = new Juego()
}