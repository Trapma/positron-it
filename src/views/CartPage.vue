<template>
  <div class="wrapper">
    <nav-bar />
    <bread-crumbs />
    <div class="cart-wrapper">
      <div class="cart-info"><cart-item-info /></div>
      <div class="cart-order"><cart-item-order /></div>
    </div>
    <div class="viewed-wrapper">
      <div class="cart-viewed"><viewed-products /></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import NavBar from "@/components/NavBar.vue";
import BreadCrumbs from "@/components/breadCrumbs.vue";
import CartItemInfo from "@/components/CartItemInfo.vue";
import CartItemOrder from "@/components/CartItemOrder.vue";
import ViewedProducts from "@/components/ViewedProducts.vue";

export default {
  components: {
    NavBar,
    BreadCrumbs,
    CartItemInfo,
    CartItemOrder,
    ViewedProducts,
  },
  mounted() {
    console.log(this.$route.params);
    // eslint-disable-next-line no-undef
    this.getCart(this.$route.params.id);
  },
  computed: {
    ...mapState({
      cartItem: (state) => state.cart.cartItems,
      isLoading: (state) => state.cart.isLoading,
    }),
  },
  methods: {
    ...mapActions("cart", ["updateCartDebounce", "getCart"]),
  },
};
</script>
<style scoped>
.wrapper {
  width: 1280px;
  margin-left: auto;
  margin-right: auto;
}
.cart-wrapper {
  width: 100%;
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
}
.viewed-wrapper {
  margin-top: 84px;
}
.cart-info {
  min-width: 800px;
}
.cart-order {
  margin-left: 55px;
  margin-top: 118px;
  min-width: 425px;
}
</style>
