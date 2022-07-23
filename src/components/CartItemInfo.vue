<template>
  <div class="title">
    <div class="title__info">
      <h1 class="title__name">Ваша корзина</h1>
      <span class="title__count">4 товара</span>
    </div>
    <span class="title__clear"><u>Очистить корзину</u></span>
  </div>
  <div class="cart-item" v-for="item in cartItems" :key="item.id">
    <div class="cart-item__card">
      <img class="cart-item__img" :src="item.img" alt="" />
      <!-- <img class="cart-item__img" src="@/assets/image/Rectangle72-1.png" alt="" /> -->
      <div class="cart-item__text">
        <div class="cart-item__title">{{ item.title }}</div>
        <div class="cart-item__descr">{{ item.descr }}</div>
        <div class="cart-item__article">{{ item.article }}</div>
      </div>
      <div class="cart-item__controller">
        <div class="cart-item__plus">
          <img src="@/assets/image/svg/plus.svg" />
        </div>
        <div class="cart-item__count">1</div>
        <div class="cart-item__minus">
          <img src="@/assets/image/svg/minus.svg" />
        </div>
      </div>
      <div class="cart-item__price">{{ getPrettyNum(item.price) }}</div>
      <div class="cart-item__close">
        <img src="@/assets/image/svg/close.svg" />
      </div>
    </div>
    <hr class="cart-item__divider" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { prettifyNumber } from "@/utils/prettifyNumber";
export default {
  mounted() {
    console.log("1", this.cartItems);
  },
  computed: {
    ...mapState({
      cartItems: (state) => state.cart.cartItems,
    }),
  },
  methods: {
    getPrettyNum(price) {
      return prettifyNumber(price);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 30px;
  &__info {
    display: flex;
    align-items: baseline;
  }

  &__name {
    @include text-lato(normal, 700, 44px, 120.52%, $text-title-color);
  }
  &__count {
    margin-left: 22px;
    @include text-lato(normal, 400, 18px, 145%, $text-thin-color);
  }
  &__clear {
    @include text-lato(normal, 400, 14px, 150%, $text-thin-color);
  }
}
.cart-item {
  display: flex;
  flex-direction: column;

  &__card {
    display: flex;
    justify-content: space-between;
  }
  &__img {
  }
  &__text {
  }
  &__title {
  }
  &__descr {
  }
  &__article {
  }
  &__controller {
  }
  &__plus {
  }
  &__minus {
  }
  &__count {
  }
  &__price {
  }
  &__close {
  }
  &__divider {
    width: 100%;
  }
}
</style>
