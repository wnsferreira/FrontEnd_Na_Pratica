<template>
  <div id="app" class="container">
    <h1>Bem vindo(a) a {{ title }}</h1>

    <h3 v-if="horas >= 9 && horas < 17" id="aberta">ABERTA</h3>
    <h3 v-else-if="horas >= 17 && horas < 18" id="proxima_fechar">PRÓXIMA DE FECHAR</h3>
    <h3 v-else id="fechada">FECHADA</h3>

    <div class="row">
      <div class="col">
        <h2>Filmes encontrados</h2>
        <button type="button" 
        class="btn btn-primary btn-lg"
        @click="mostrarCarrinho">
          Carrinho: {{ quantidadeNoCarrinho }} filmes
        </button>
      </div>
    </div>
    
    <!-- Esse trecho foi substituido pelo de baixo -->
    <!-- <div class="row" v-if="mostrarFilmes">
      <div class="col-3" v-bind:key="filme.id" v-for="filme in filmes">
        <img v-bind:src="filme.imagem" alt="Imagem do filme" />
        <div>
          <h5>{{ filme.titulo }}</h5>
          <p v-html="filme.descricao"></p>
          <p>R$ {{ filme.valor }}</p>

          <a href="#"
            @click="adicionarAoCarrinho(filme)"
            v-if="validarPermissaoParaAdicionarNoCarrinho(filme)">ALUGAR</a>
        </div>
      </div>
      <div v-if="!mostrarFilmes">
        <h2>Carrinho</h2>
      </div>
    </div> -->

    <!-- Alterações da aula 03/03 -->
    <div class="row" v-if="mostrarFilmes">
      <div class="col-3" v-bind:key="filme.id" v-for="filme in filmesOrdenados">
        <img v-bind:src="filme.imagem" alt="Imagem do filme" class="card-img-top"/>
        <div class="card-body">
          <h5 class="card-title"> {{ filme.titulo }} </h5>
          <p class="card-text" v-html="filme.descricao"></p>
          
          <span class="mensagem-estoque"
                v-if="filme.estoqueDisponivel - quantidadeNoCarrinhoPorFilme(filme) === 0">
                  Indisponível
          </span>
          <span class="mensagem-estoque"
                v-else-if="filme.estoqueDisponivel - quantidadeNoCarrinhoPorFilme(filme) < 5">
                  Apenas {{ filme.estoqueDisponivel - quantidadeNoCarrinhoPorFilme(filme) }} itens no estoque.
          </span>
          <span class="mensagem-estoque"
                v-else>
                  Alugue agora!
          </span>
          
          <p class="card-text">R$ {{ filme.valor }}</p>

          <div class="avaliacao">
            <span v-for="n in 5" :key="n"
              v-bind:class="{ 'avaliacao-active': checarAvaliacao(n,filme) }">
              <img src="./assets/star.svg" height="20"/>
            </span>
          </div>
          
          <a href="#"
            @click="adicionarAoCarrinho(filme)"
            v-if="validarPermissaoParaAdicionarNoCarrinho(filme)"
            class="btn btn-primary"
            >ALUGAR</a>
            <a href="#" v-else class="btn btn-primary disable">ALUGAR</a>
        </div>
      </div>
      <!-- <div v-if="!mostrarFilmes">
        <h2>Carrinho</h2>
      </div> -->

      <div class="row" v-else>
        <h2>Carrinho</h2>

        <div class="col-12">
          <form>
            <div class="form-group">
              <label for="pedido.primeiroNome">Primeiro nome</label>
              <input
                type="text"
                class="form-control"
                id="primeiroNome"
                placeholder="Digita o primeiro nome"
                v-model.trim.lazy="pedido.primeiroNome"
              >
            </div>
            <div class="form-group">
              <label for="ultimoNome">Último nome</label>
              <input
                type="text"
                class="form-control"
                id="ultimoNome"
                placeholder="Digite o último nome"
                v-model.trim.lazy="pedido.ultimoNome"
              >
            </div>
            <div class="form-group">
              <label for="endereco">Endereço</label>
              <input
                type="text"
                class="form-control"
                id="endereco"
                placeholder="Digite o endereço"
                v-model.trim.lazy="pedido.endereco"
              >
            </div>
            <div class="form-group">
              <label for="cidade">Cidade</label>
              <input
                type="text"
                class="form-control"
                id="cidade"
                placeholder="Digite a cidade"
                v-model.trim.lazy="pedido.cidade"
              >
            </div>
            <div class="form-group">
              <label for="estado">Estado</label>
              <select class="form-control" id="estado" v-model="pedido.estado">
                <option disabled value>Escolha um Estado</option>
                <option
                  v-for="(estado, key) in estados"
                  v-bind:value="estado"
                  v-bind:key="key">
                  {{ key }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="cep">CEP</label>
              <input
                type="text"
                class="form-control"
                id="cep"
                placeholder="Digita o CEP"
                v-model.number="pedido.cep"
              >
            </div>
            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="pagoNaEntrega"
                v-bind:true-value="pedido.simNaEntrega"
                v-bind:false-value="pedido.naoNaEntrega"
                v-model="pedido.pagoNaEntrega"
              >
              <label class="form-check-label" for="pagoNaEntrega">Pago na entrega?</label>
            </div>
            <div class="form-group form-check-inline">
              <input
                type="radio"
                class="form-check-input"
                id="manha"
                value="Manhã"
                v-model="pedido.entrega"
              >
              <label class="form-check-label" for="manha">Manhã</label>
            </div>
            <div class="form-group form-check-inline">
              <input
                type="radio"
                class="form-check-input"
                id="tarde"
                value="Tarde"
                v-model="pedido.entrega"
              >
              <label class="form-check-label" for="tarde">Tarde</label>
            </div>
            <div class="form-group form-check-inline">
              <input
                type="radio"
                class="form-check-input"
                id="noite"
                value="Noite"
                v-model="pedido.entrega"
              >
              <label class="form-check-label" for="noite">Noite</label>
            </div>

            <div class="form-group">
              <button type="submit" class="btn btn-primary" v-on:click="submitFormulario">
                Finalizar pedido
              </button>
            </div>
          </form>
        </div>
        <div class="col-12">
          <pre>
            Primeiro nome: {{ pedido.primeiroNome }}
            Último nome: {{ pedido.ultimoNome }}
            Endereço: {{ pedido.endereco }}
            Cidade: {{ pedido.cidade }}
            Estado: {{ pedido.estado }}
            CEP: {{ pedido.cep }}
            Pago na entrega?: {{ pedido.pagoNaEntrega }}
            Entrega: {{ pedido.entrega }}
          </pre>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
  export default {
    name: "app",
    data: function () {
      return {
        mostrarFilmes: true,
        title: "Locadora de filmes",
        horas: new Date().getHours(),
        pedido:{
          primeiroNome: "",
          ultimoNome: "",
          endereco: "",
          cidade: "",
          estado: "",
          cep: "",
          pagoNaEntrega: "Não",
          simNaEntrega: "Sim",
          naoNaEntrega: "Não",
          entrega: "Manhã",
        },
        estados:{
          RJ: "Rio de Janeiro",
          MG: "Minas Gerais",
          SP: "São Paulo",
          ES: "Espirito Santo"
        },
        filmes: [
          {
            id: 1,
            titulo: "Vingadores",
            descricao: "Um <b>filme</b> de heróis",
            valor: 25,
            imagem:
              "https://ondebaixa.com/imagens/the-avengers-os-vingadores-4k-download-torrent-dublado-dual-audio-bluray-1080p-720p-4k-hd.jpg",
            estoqueDisponivel: 2,
            avaliacao: 2
          },
          {
            id: 2,
            titulo: "Pantera Negra",
            descricao: "Um filme de panteras",
            valor: 35,
            imagem:
              "https://ondebaixa.com/imagens/pantera-negra-black-panther-bluray-download-torrent-2018-dublado-dual-audio-bluray-1080p-720p-4k-hd.jpg",
            estoqueDisponivel: 6,
            avaliacao: 4
          },
          {
            id: 3,
            titulo: "Homem Aranha",
            descricao: "Um filme de aranha",
            valor: 20,
            imagem:
              "https://ondebaixa.com/imagens/homem-aranha-trilogia-spider-man-trilogy-download-torrent-2002-dublado-dual-audio-bluray-1080p-720p-4k-hd.jpg",
            estoqueDisponivel: 8,
            avaliacao: 3
          },
          {
            id: 4,
            titulo: "Cinderela",
            descricao: "Um filme de princesa",
            valor: 40,
            imagem:
              "https://ondebaixa.com/imagens/cinderela-e-o-pri%cc%81ncipe-secreto-download-torrent-2020-dublado-dual-audio-bluray-1080p-720p-4k-hd.jpg",
            estoqueDisponivel: 3,
            avaliacao: 5
          },
          {
            id: 5,
            titulo: "007",
            descricao: "Um filme de ação",
            valor: 10,
            imagem:
              "https://ondebaixa.com/imagens/007-sem-tempo-para-morrer-cam-download-torrent-2021-dublado-dual-audio-bluray-1080p-720p-4k-hd.jpg",
            estoqueDisponivel: 2,
            avaliacao: 3
          },
        ],
        carrinho: [],
      };
    },

    methods: {
      mostrarCarrinho() {
        this.mostrarFilmes = this.mostrarFilmes ? false : true;
      },
      adicionarAoCarrinho: function (filme) {
        this.carrinho.push(filme.id);
      },
      quantidadeNoCarrinhoPorFilme: function (filme) {
        var quantidade = 0;
        for (var i = 0; i < this.carrinho.length; i++) {
          if (filme.id == this.carrinho[i]) {
            quantidade++;
          }
        }
        return quantidade;
      },
      validarPermissaoParaAdicionarNoCarrinho: function (filme) {
        return filme.estoqueDisponivel > this.quantidadeNoCarrinhoPorFilme(filme);
      },
    },

    computed: {
      quantidadeNoCarrinho: function () {
        return this.carrinho.length;
      },
    },
  };
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#aberta {
  color: blue;
}
#proxima-fechar {
  color: orange;
}
#fechada {
  color: red;
}

/* A classe carrinho virou "col" */
/* .carrinho{
  margin-top: 5px;
}
.carrinho button {
  margin: 20px;
  font-size: 20px;
  border-radius: 5%;
} */
</style>
