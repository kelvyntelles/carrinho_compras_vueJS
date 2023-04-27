<template>
  <nav>
    <router-link to="/">Home |</router-link>
    <router-link to="/carrinho">Carrinho ({{ this.produtosNoCarrinho.length }})</router-link>
  </nav>
  <router-view/>
</template>

<script>
  import {mapState} from 'vuex' 

  export default {

    created() {
      this.$store.dispatch('carregarProdutos');
      this.$store.dispatch('carregarCarrinho');
    },
    computed: mapState([
      'produtosNoCarrinho'
    ])
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 10px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: white;
    text-decoration: none;
    margin-right: 3px;
  }
}
</style>
