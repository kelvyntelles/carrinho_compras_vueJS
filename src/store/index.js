import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    produtos: [],
    produtosNoCarrinho: [],
  },
  mutations: {
    carregarProdutos (state, produtos) {
      state.produtos = produtos;
    },

    carregarCarrinho (state, produtos) {
      state.produtosNoCarrinho = produtos
    },

    addProdutoCarrinho (state, produto) {
      state.produtosNoCarrinho.push(produto)
      localStorage.setItem("produtosNoCarrinho", JSON.stringify(state.produtosNoCarrinho))
    },

    removerProdutoCarrinho(state, produtoId) {
      var atualizarCarrinho = state.produtosNoCarrinho.filter(item => produtoId != item.id);
      state.produtosNoCarrinho = atualizarCarrinho;
      localStorage.setItem("produtosNoCarrinho", JSON.stringify(state.produtosNoCarrinho))
    },
  },
  actions: {
    carregarProdutos({commit}) {
      axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        commit('carregarProdutos', response.data);
      })
    },

    carregarCarrinho({ commit }) {
      
      if (localStorage.getItem("produtosNoCarrinho")) {
        commit('carregarCarrinho', JSON.parse(localStorage.getItem("produtosNoCarrinho")));
      }
      
    },

    addProdutoCarrinho({commit}, produto) {
      commit('addProdutoCarrinho', produto)
    },

    removerProdutoCarrinho({ commit }, produtoId) {
      if (confirm('Tem certeza que deseja remover o produto do carrinho?')) {
        commit('removerProdutoCarrinho', produtoId);
      }
    },
  },
  modules: {
  }
})
