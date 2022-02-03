
function calculaQuadrado(numero) {
    let resultado = document.getElementById("resultadoQuadrado")
    resultado.innerText = Math.pow(numero, 2)
}
function calculaCubo(numero) {
    let resultado = document.getElementById("resultadoCubo")
    resultado.innerText = Math.pow(numero, 3)
}
function calculaRaiz(numero) {
    let resultado = document.getElementById("resultadoRaiz")
    resultado.innerText = Math.sqrt(numero).toFixed(4)
}
function calculaFatorial(numero) {
    let fatorial = 1;
    for (let i = 1; i <= numero; i++) {
        fatorial *= i;
    }
    let resultado = document.getElementById("resultadoFatorial");
    resultado.innerText = fatorial;
}
function calculaParOuImpar(numero) {
    let resultado = document.getElementById("resultadoParOuImpar")
    if (numero % 2 != 0) {
        resultado.innerText = "Ímpar"
    } else {
        resultado.innerText = "Par"
    }
}
function CalculaPrimo(numero) {
    let resultado = document.getElementById("resultadoPrimo")
    if (numero == 1 || numero == 0) {
        resultado.innerText = "Não Primo"
        return
    }
    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) {
            resultado.innerText = "Composto"
            return
        }
    }
    resultado.innerText = "Primo"
}

function calcula() {
    let numero = document.getElementById("numero").value
    calculaQuadrado(numero)
    calculaCubo(numero)
    calculaRaiz(numero)
    calculaFatorial(numero)
    calculaParOuImpar(numero)
    calculaPrimo(numero)
}