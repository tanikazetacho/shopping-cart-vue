import shop from '@/api/shop'

export default { // = methods
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
}