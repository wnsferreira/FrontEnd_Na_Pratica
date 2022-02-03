// estética: buzzfeed
// tema: HP (qual a sua casa no hogwarts)
// perguntas e respostas

class Pergunta{
    constructor(titulo, alternativas) {
      this.titulo = titulo;
      this.alternativas = alternativas;
    }
  }
  
  class Alternativa{
    constructor(titulo, pontuacao) {
      this.titulo = titulo;
      this.pontuacao = pontuacao;
    }
  }
  let perguntas = [
    new Pergunta(
      titulo="Escolha uma ferramenta de limpeza/cuidado doméstico para jogar Quadribol:", 
      alternativas=[
        new Alternativa(titulo="Ancinho", pontuacao=3),
        new Alternativa(titulo="Esfregão", pontuacao=0),
        new Alternativa(titulo="Rooomba", pontuacao=2),
        new Alternativa(titulo="Aspirador de pó", pontuacao=1)
        ]
    ),
    new Pergunta(
      titulo="Escolha uma cor:", 
      alternativas=[
        new Alternativa(titulo="Verde", pontuacao=1),
        new Alternativa(titulo="Azul", pontuacao=3),
        new Alternativa(titulo="Amarelo", pontuacao=2),
        new Alternativa(titulo="Vermelho", pontuacao=0)
        ]),
    new Pergunta(
      titulo="Você é bruxo?", 
      alternativas=[
        new Alternativa(titulo="Sim", pontuacao=1),
        new Alternativa(titulo="Não", pontuacao=0)
        ]),
    new Pergunta(
      titulo="Escolha um feitiço:", 
      alternativas=[
        new Alternativa(titulo="Expecto Petroleum", pontuacao=1),
        new Alternativa(titulo="Hocus Pocus", pontuacao=2),
        new Alternativa(titulo="Avada Cadebera", pontuacao=0)
        ]),
    new Pergunta(
      titulo="Você está usando meias?",
      alternativas=[
        new Alternativa(titulo="Sim", pontuacao=0),
        new Alternativa(titulo="Não", pontuacao=1)]),
  ]
  let totalDePontos = 0
  let perguntasHtml = document.getElementById("perguntas")
  
  for (let i in perguntas){
    let pergunta = perguntas[i]
    let alternativas = ""
  
    for (index in pergunta.alternativas){
      alternativas+= `<input type="radio" 
      id="alternativa${index}" 
      name="${i}" 
      value="${pergunta.alternativas[index].pontuacao}">
      <label for="alternativa${index}">
      ${pergunta.alternativas[index].titulo}</label><br/>`
    }
    perguntasHtml.innerHTML += `<div class="pergunta">
                <div class="titulo">${pergunta.titulo}</div>
                <div class="alternativas">${alternativas}</div>
              </div>`
    totalDePontos +=pergunta.alternativas.length
  }
  
  function corrigir(){
    let pontos = 0
    let resultadoHtml = document.getElementById("resultado")
    let botaoHtml = document.getElementById("verResultado")
    botaoHtml.style.display = "none";
    for( let elemento of document.querySelectorAll('input[type="radio"]:checked')){
      pontos += parseInt(elemento.value)
    }
    if (pontos <= 2){
      resultadoHtml.innerHTML = `Você é da casa grifinória com ${pontos} pontos`
    }
  
    if (pontos >= 3 && pontos <= 5 ){
      resultadoHtml.innerHTML =`Você é da casa sonserina com ${pontos} pontos`
    }
  
    if (pontos >= 6 && pontos <= 8){
      resultadoHtml.innerHTML =`<span class="lufa">Você é da casa lufa lufa com ${pontos} pontos</span>`
    }
  
    if (pontos >= 9){
      resultadoHtml.innerHTML =`<span class="corvival">Você é da casa corvinal com ${pontos} pontos</span>`
    }
  }
  