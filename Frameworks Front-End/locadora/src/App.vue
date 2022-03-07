<template>
  <div id="app">
    <h1>Bem vindo(a) a {{ title }}</h1>

    <h3 v-if="horas >= 9 && horas < 17" id="aberta">ABERTA</h3>
    <h3 v-else-if="horas >= 17 && horas < 18" id="proxima_fechar">PRÓXIMA DE FECHAR</h3>
    <h3 v-else id="fechada">FECHADA</h3>

    <div>
      <div class="carrinho">
        <h2>Filmes encontrados</h2>
        <button type="button" @click="mostrarCarrinho">
          Carrinho: {{ quantidadeNoCarrinho }} filmes
        </button>
      </div>
    </div>

    <div v-if="mostrarFilmes">
      <div v-bind:key="filme.id" v-for="filme in filmes">
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
        filmes: [
          {
            id: 1,
            titulo: "Vingadores",
            descricao: "Um <b>filme</b> de heróis",
            valor: 25,
            imagem:
              "https://ondebaixa.com/imagens/the-avengers-os-vingadores-4k-download-torrent-dublado-dual-audio-bluray-1080p-720p-4k-hd.jpg",
            estoqueDisponivel: 2
          },
          {
            id: 2,
            titulo: "Pantera Negra",
            descricao: "Um filme de panteras",
            valor: 35,
            imagem:
              "https://ondebaixa.com/imagens/pantera-negra-black-panther-bluray-download-torrent-2018-dublado-dual-audio-bluray-1080p-720p-4k-hd.jpg",
            estoqueDisponivel: 6
          },
          {
            id: 3,
            titulo: "Homem Aranha",
            descricao: "Um filme de aranha",
            valor: 20,
            imagem:
              "https://ondebaixa.com/imagens/homem-aranha-trilogia-spider-man-trilogy-download-torrent-2002-dublado-dual-audio-bluray-1080p-720p-4k-hd.jpg",
            estoqueDisponivel: 8
          },
          {
            id: 4,
            titulo: "Cinderela",
            descricao: "Um filme de princesa",
            valor: 40,
            imagem:
              "https://ondebaixa.com/imagens/cinderela-e-o-pri%cc%81ncipe-secreto-download-torrent-2020-dublado-dual-audio-bluray-1080p-720p-4k-hd.jpg",
            estoqueDisponivel: 3
          },
          {
            id: 5,
            titulo: "007",
            descricao: "Um filme de ação",
            valor: 10,
            imagem:
              "https://ondebaixa.com/imagens/007-sem-tempo-para-morrer-cam-download-torrent-2021-dublado-dual-audio-bluray-1080p-720p-4k-hd.jpg",
            estoqueDisponivel: 2
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
.carrinho{
  margin-top: 5px;
}
.carrinho button {
  margin: 20px;
  font-size: 20px;
  border-radius: 5%;
}
</style>
