<template>
    <div class="carrinho">
      <div class="cardCarrinho" v-for="(produto, index) in produtosNoCarrinho" :key="index">
        <img :src="produto.image" />
        <div class="conteudoCard">
          <div class="titulo">
            <h4>{{ produto.title }}</h4>
          </div>
          <div class="valorItem">
            <div 
              class="texoRemoveItem" 
              @click="this.$store.dispatch('removerProdutoCarrinho', produto.id)"
            ><u>Remove item</u></div>
            <div>
              <button @click="diminuirQtdProduto(produto)">-</button>
              {{ produto.qtd }}
              <button @click="produto.qtd++">+</button>
              R$ {{ (produto.price * produto.qtd).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
      
      <h3>Valor total: R$ {{ this.valorTotal() }}</h3>
      
    </div>
  </template>
  
<script>
  import { mapState } from 'vuex';
  
  export default {
    name: 'CarrinhoView',

    computed: mapState([
      'produtosNoCarrinho'
    ]),
    methods: {
      diminuirQtdProduto(produto) {
        if(produto.qtd > 1) {
          produto.qtd--;
        }
      },
      valorTotal() {
        let total = 0;
        this.produtosNoCarrinho.forEach(item => {
          total += item.price * item.qtd;
        });
        return total.toFixed(2);
      }
    }
  }
</script>

<style lang="scss">

.carrinho {
  padding: 30px 20% 0 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .cardCarrinho {
    background-color: #F5F5F5;
    padding: 20px;
    display: flex;
    flex-direction: row;
    border: none;
    border-bottom: 1px solid gray;
    margin-bottom: 5px;
    width: 100%;

    button {
      cursor: pointer;
    }

    img {
      width: 15%;
      height: auto;
      object-fit: cover;
    }

    .conteudoCard {
      flex: 1;
      display: grid;
      grid-template-columns: 2fr 1fr;

      .titulo {
        text-align: center;
      }

      .valorItem {
        display: flex;
        flex-direction: column;
        text-align: right;

        .texoRemoveItem {
          font-size: 12px;
          margin-bottom: 5px;
          cursor: pointer;
        }
      }
    }
  }
}

</style>