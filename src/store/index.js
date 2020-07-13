import Vuex from 'vuex';
import Vue from 'vue';
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    // five options : state, mutations, getters, actions, modules

    state: { // = data
        products: [],
        // {id, quantity}
        cart: [],
        checkoutStatus: null
    },

    getters: { // = computed properties
        products (state, getters) {
            return state.products
        },

        cartProducts(state) {
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.id === cartItem.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },

        cartTotal(state, getters) {
            let total = 0
            getters.cartProducts.forEach(product => {
                total += product.price * product.quantity
            })
            return total;
        },

        // cartTotal(state, getters) { // using reduce
        //     return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
        // }

        productIsInStock () {
            return (product) => {
                return product.inventory > 0
            }
        }
    },

    // the actions (request) ussualy they are asynchronous use a promise to how to
    // know when action is done
    actions,

    mutations: { // setting and update the state
        setProducts (state, products) {
            // update products
            state.products = products
        },

        pushProductToCart(state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },

        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },

        decrementProductInventory(state, product) {
            product.inventory--
        },

        setCheckoutStatus (state, status) {
            state.checkoutStatus = status
        },

        emptyCart (state) {
            state.cart = []
        }

    }

})