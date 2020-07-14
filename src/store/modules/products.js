import shop from '@/api/shop'
export default {
    namespaced: true,
    state: {
        items: [],
    },

    getters: {
        productIsInStock () {
            return (product) => {
                return product.inventory > 0
            }
        }
    },

    mutations: {
        setProducts (state, products) {
            // update products
            state.items = products
        },

        decrementProductInventory(state, product) {
            product.inventory--
        }
    },

    actions: {
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
        }
    }
}