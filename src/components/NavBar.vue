<template>
  <nav class="nav">
    <div class="nav__info"></div>
    <div class="nav__main">
      <div class="nav__menu"></div>
      <div class="cart-info">
        <img class="cart-info__img" src="@/assets/image/svg/cart.svg" />
        <div class="cart-info__text">
          <div class="cart-info__title"><span>Ваша корзина</span></div>
          <div class="cart-info__count">
            <span
              >{{ totalCountCart }}
              {{
                !totalCountCart
                  ? "Товаров"
                  : totalCountCart === 1
                  ? "Товар"
                  : totalCountCart < 5
                  ? " Товара"
                  : " Товаров"
              }}</span
            >
          </div>
          <div class="cart-info__price">{{ totalPriceCart }} ₽</div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState({
      cartItem: (state) => state.cart.cartItems,
    }),
    ...mapGetters({
      totalPriceCart: "cart/getTotalPriceCart",
      totalCountCart: "cart/getTotalCountCart",
    }),
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: column;
  height: 140px;
  width: 100%;

  &__info {
    height: 45px;
    width: 100%;
  }
  &__main {
    display: flex;
    justify-content: space-between;
  }
  &__menu {
    height: 95px;
  }
}

.cart-info {
  display: flex;
  align-items: center;

  // &__img {
  // }
  &__text {
    margin-left: 12px;
  }
  &__title {
    // $style, $weight, $font-size, $line-height, $color
    @include text-lato(400, 14px, 150%, $text-title-color);
  }
  &__count {
    @include text-lato(400, 12px, 145%, $text-thin-color);
  }
  &__price {
    @include text-lato(400, 12px, 145%, $text-title-color);
  }
}
</style>
