<template>
  <div class="order">
    <div class="order__header">Итого</div>
    <div class="order__info">
      <div class="row">
        <div class="order__text">Сумма заказа</div>
        <div class="order__value">{{ totalPriceCart }} ₽</div>
      </div>
      <div class="row">
        <div class="order__text">Количество</div>
        <div class="order__value">{{ totalCountCart }} шт</div>
      </div>
      <div class="row row_mb0">
        <div class="order__text">Установка</div>
        <div class="order__value">{{ checkStatus ? "Да" : "Нет" }}</div>
      </div>
    </div>
    <hr class="order__divider" />
    <div class="order-total">
      <div class="row">
        <div class="order-total__title">Стоимость товаров</div>
        <div class="order-total__price">{{ totalPriceCart }} ₽</div>
      </div>
    </div>
    <div class="order__pay">
      <div @click="pay()" class="order__btn order__btn_blue">
        Оформить заказ
      </div>
      <div @click="pay()" class="order__btn order__btn_white">
        Купить в 1 клик
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "cart-item-order",
  computed: {
    ...mapState({
      checkStatus: (state) => state.cart.checkStatus,
      cartItems: (state) => state.cartItems,
    }),
    ...mapGetters({
      totalPriceCart: "cart/getTotalPriceCart",
      totalCountCart: "cart/getTotalCountCart",
    }),
  },
  methods: {
    pay() {
      const data = {
        id: 1,
        orderItems: this.cartItems,
        setStatus: this.checkStatus,
      };
      return this.$store.dispatch("cart/pay", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.order {
  padding: 35px 30px;
  background: $bg-card-color;
  &__header {
    @include text-lato(600, 24px, 120.52%, $text-title-color);
  }
  &__info {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
  }
  &__text {
    @include text-lato(500, 16px, 145%, $text-title-color);
  }
  &__value {
    @include text-roboto(400, 16px, 145%, $text-title-color);
  }
  &__divider {
    margin-top: 10px;
  }
  &__pay {
    margin-top: 30px;
  }
  &__btn {
    @include text-lato(600, 18px, 145%, $text-white-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 54px;
    width: 100%;
    border-radius: 4px;
    &:active {
      background: $text-thin-color;
    }

    &_blue {
      background: $text-blue-color;
      border: none;
      margin-bottom: 12px;
    }
    &_white {
      color: $text-blue-color;
      border: 1px solid $text-blue-color;
      &:active {
        color: $text-white-color;
      }
    }
  }
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.order-total {
  margin-top: 10px;
  &__title {
    @include text-lato(600, 18px, 145%, $text-title-color);
  }
  &__price {
    @include text-roboto(700, 26px, 130%, $text-title-color);
  }
}
</style>
