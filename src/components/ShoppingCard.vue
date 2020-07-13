<template>
    <div>
        <h1>Shopping Cart</h1>
        <ul>
            <li v-for="product in products" :key="product.id">
                Quantity: {{product.quantity}}, Name: {{product.title}}, Price: {{product.price | currency }}
            </li>
        </ul>
        <p>Total: {{total | currency }}</p>
        <button v-if="products.length !== 0" @click="$store.dispatch('checkout')">Checkout</button>
        <p v-if="$store.state.checkoutStatus">{{$store.state.checkoutStatus}}</p>
    </div>
  
</template>

<script>
export default {
    computed: {
        products () {
            return this.$store.getters.cartProducts
        },

        total () {
            return this.$store.getters.cartTotal
        }
    }
} 
</script>

<style>

</style>