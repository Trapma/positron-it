<template>
  <div class="">
    <nav-bar />
    <bread-crumbs />
    <cart-item-info />
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "@/components/NavBar.vue";
import BreadCrumbs from "@/components/breadCrumbs.vue";
import CartItemInfo from "@/components/CartItemInfo.vue";
export default {
  components: {
    NavBar,
    BreadCrumbs,
    CartItemInfo,
  },
  mounted() {},
  ...mapState({
    cartItem: (state) => state.cart.cartItems,
  }),
};
</script>
<style scoped></style>
