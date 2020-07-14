import Vuex from 'vuex';
import Vue from 'vue';
import actions from './actions'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
    // five options : state, mutations, getters, actions, modules
    state: { // = data
        
    },

    getters: { // = computed properties

    },

    // the actions (request) ussualy they are asynchronous use a promise to how to
    // know when action is done
    actions: {
        addProductToCart ({state, getters, commit, rootState, rootGetters}, product) {
            if (rootGetters['products/productIsInStock'](product)) {
                const cartItem = rootState.cart.items.find(item => item.id === product.id)
                if (!cartItem) {
                    commit('cart/pushProductToCart', product.id)
                } else {
                    commit('cart/incrementItemQuantity', cartItem)
                }
                commit('products/decrementProductInventory', product)
            }
        },
    },

    mutations: { // setting and update the state

    },

    modules: {
        cart,
        products
    }

})