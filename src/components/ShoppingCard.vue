<template>
    <div>
        <h1>Shopping Cart</h1>
        <ul>
            <li v-for="product in products" :key="product.id">
                Quantity: {{product.quantity}}, Name: {{product.title}}, Price: {{product.price | currency }}
            </li>
        </ul>
        <p>Total: {{total | currency }}</p>
        <button v-if="products.length !== 0" @click="checkout">Checkout</button>
        <p v-if="checkoutStatus">{{checkoutStatus}}</p>
    </div>
  
</template>

<script>

    import { mapGetters, mapState, mapActions } from 'vuex'
    export default {
        computed: {
            
            ...mapGetters({
                products: 'cartProducts',
                total: 'cartTotal'
            }),

            ...mapState({
                checkoutStatus: state => state.cart.checkoutStatus
            })
        },

        methods: {
            ...mapActions({
                checkout: 'checkout'
            })
        }
    } 
</script>

<style>

</style>