import Vuex from 'vuex';
import Vue from 'vue';
import shop from '../api/shop'

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
    actions: { // = methods
        // using ES6 destructuring arguments to only get  commit from context objet (context.commit)
        fetchProducts ({commit}) {
            return new Promise((resolve, reject) => {
                // make the call
                // run setProducts mutations
                shop.getProducts(products => {
                    commit('setProducts', products)
                    resolve('Resolve promise')
                    reject('Promise is rejected'); 
                })
            })
        },

        addProductToCart ({state, getters, commit}, product) {
            if (getters.productIsInStock(product)) {
                const cartItem = state.cart.find(item => item.id === product.id)
                if (!cartItem) {
                    commit('pushProductToCart', product.id)
                } else {
                    commit('incrementItemQuantity', cartItem)
                }
                commit('decrementProductInventory', product)
            }
        },

        checkout ({state, commit}) {
            shop.buyProducts(
                state.cart,
                () => {
                    commit('emptyCart')
                    commit('setCheckoutStatus', 'success')
                },
                () => {
                    commit('setCheckoutStatus', 'fail')
                }
            )
        }
    },

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