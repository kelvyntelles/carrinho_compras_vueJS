<template>
  <div class="home">
    <div class="cardProduto" v-for="(produto, index) in this.produtos" :key="index">
      <img :src="produto.image" />
      <div>
        <h4>{{ produto.title }}</h4>
        <strong>R$ {{ produto.price }}</strong>
        <button v-if="!isInCarrinho(produto)" @click="this.addProdutoCarrinho(produto)">Add no carrinho</button>
        <button 
          v-else 
          class="removerCarrinho" 
          @click="this.$store.dispatch('removerProdutoCarrinho', produto.id)"
        >Remover do carrinho</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HomeView',
  data() {
    return {

    }
  },
  computed: mapState([
    'produtos',
    'produtosNoCarrinho'
  ]),
  methods: {
    addProdutoCarrinho(produto) {
      produto.qtd = 1;
      this.$store.dispatch('addProdutoCarrinho', produto);
    },
    isInCarrinho(produto) {
      return this.produtosNoCarrinho.find(item => item.id == produto.id)
    }
  }
}
</script>

<style lang="scss">

.home {
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  .cardProduto {
    height: auto;
    margin: 0 10px 10px 0;
    padding: 15px;
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 70%;
      height: auto;
      object-fit: cover;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    button {
      padding: 5px;
      border: none;
      background-color: blue;
      color: white;
      border-radius: 5px;
      margin-top: 8px;
      cursor: pointer;
    }

    .removerCarrinho {
      background-color: transparent;
      color: black;
    }
  }
}

</style>
