<template>
  <div class="info-wrapper">
    <div class="title">
      <div class="title__info">
        <h1 class="title__name">Ваша корзина</h1>
        <span class="title__count"
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
      <button @click="clearCart" class="title__clear">
        <u>Очистить корзину</u>
      </button>
    </div>
    <div class="cart-list">
      <c-page-loader v-if="isLoading" />
      <div class="cart-item" v-for="(item, index) in cartItems" :key="item.id">
        <div class="card">
          <img
            class="card__img"
            :src="item.img"
            height="100"
            width="100"
            alt=""
          />
          <div class="card__text">
            <div class="card__title">{{ item.title }}</div>
            <div class="card__descr">{{ item.descr }}</div>
            <div class="card__article">{{ item.article }}</div>
          </div>

          <div class="card__controller card__controller_wrapper">
            <div class="card__controller">
              <button class="card__minus" @click="minusCount(item.id)">
                <img src="@/assets/image/svg/minus.svg" />
              </button>
              <div class="card__count">{{ item.count }}</div>
              <button class="card__plus" @click="plusCount(item.id)">
                <img src="@/assets/image/svg/plus.svg" />
              </button>
            </div>
            <div class="card__info" v-if="item.count > 1">
              <span>{{ getPrettyNum(item.price) }}&nbsp;₽/шт.</span>
            </div>
          </div>
          <div class="card__price">
            {{ getPrettyNum(item.price * item.count) }}&nbsp;₽
          </div>

          <button class="card__close" @click="deleteItem(item.id)">
            <img src="@/assets/image/svg/close.svg" />
          </button>
        </div>
        <hr class="cart-item__divider" v-if="index !== cartItems.length - 1" />
      </div>
    </div>
    <div v-if="cartItems" class="check-info">
      <div class="check-info__check">
        <c-checkbox
          :model-value="checkStatus"
          @update:model-value="setCheckStatus"
        />
      </div>
      <div class="check-info__img">
        <img src="@/assets/image/svg/set.svg" alt="" width="50" height="50" />
      </div>
      <div class="check-info__text">
        <div class="check-info__title">
          <span>Установка</span>
        </div>
        <div class="check-info__body">
          <span
            >Отметьте, если Вам необходима консультация профессионала по монтажу
            выбранных товаров.</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CCheckbox from "@/components/Ui/checkbox/CCheckbox.vue";
import CPageLoader from "@/components/Ui/pageloader/CPageloader.vue";
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
import { prettifyNumber } from "@/utils/prettifyNumber";
export default {
  name: "cart-item-info",
  components: {
    CCheckbox,
    CPageLoader,
  },
  data() {
    return {
      checkedValue: true,
    };
  },
  mounted() {
    // this.getCart();
  },
  computed: {
    ...mapState({
      cartItems: (state) => state.cart.cartItems,
      checkStatus: (state) => state.cart.checkStatus,
      isLoading: (state) => state.cart.isLoading,
    }),
    ...mapGetters({
      totalCountCart: "cart/getTotalCountCart",
    }),
  },
  methods: {
    ...mapMutations({
      plus: "cart/INCREMENT",
      minus: "cart/DECREMENT",
      delete: "cart/DELETE_ITEM",
      clear: "cart/CLEAR_CART",
      setCheck: "cart/SET_CHECK",
    }),
    ...mapActions("cart", ["updateCartDebounce", "updateCart"]),
    getPrettyNum(price) {
      return prettifyNumber(price);
    },
    plusCount(id) {
      this.plus(id);
      this.updateCartDebounce();
    },
    minusCount(id) {
      this.minus(id);
      this.updateCartDebounce();
    },
    clearCart() {
      this.clear();
      this.updateCart();
    },
    deleteItem(id) {
      this.delete(id);
      this.updateCart();
    },
    setCheckStatus(isTrue) {
      this.setCheck(isTrue);
      this.updateCart();
    },
  },
};
</script>

<style lang="scss" scoped>
.info-wrapper {
  width: 100%;
}
.title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  &__info {
    display: flex;
    align-items: baseline;
  }

  &__name {
    @include text-lato(700, 44px, 120.52%, $text-title-color);
    margin-bottom: 0;
  }
  &__count {
    margin-left: 22px;
    @include text-lato(400, 18px, 145%, $text-thin-color);
  }
  &__clear {
    @include text-lato(400, 14px, 150%, $text-thin-color);
    cursor: pointer;
    border: none;
    background: $text-white-color;
    &:active {
      color: $text-title-color;
    }
  }
}
.cart-list {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  position: relative;
}
.cart-item {
  &__divider {
    margin-top: 20px;
  }
}
.card {
  display: flex;
  align-items: center;
  height: 100px;
  margin-top: 25px;
  position: relative;
  &__img {
    margin-left: 15px;
  }
  &__text {
    margin-left: 31px;
    max-width: 264px;
    padding-top: 6px;
    padding-bottom: 2px;
  }
  &__title {
    @include text-lato(600, 16px, 145%, $text-title-color);
  }
  &__descr {
    @include text-lato(400, 12px, 150%, $text-base-color);
    margin: 6px 0px 7px;
  }
  &__article {
    @include text-lato(400, 14px, 150%, $text-thin-color);
  }
  &__controller {
    display: flex;
    height: 34px;
    align-items: center;

    &_wrapper {
      flex-direction: column;
      margin-left: 80px;
    }
  }

  %df-xc-yc {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  %controller-block {
    background-color: $bg-card-color;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    width: 32px;
  }
  %controller-btn {
    cursor: pointer;
    border: none;
    &:active {
      background: $text-thin-color;
    }
  }

  &__plus {
    @extend %controller-block;
    @extend %controller-btn;
    border-radius: 0 4px 4px 0;
  }
  &__minus {
    @extend %controller-block;
    @extend %controller-btn;
    border-radius: 4px 0px 0px 4px;
  }
  &__count {
    @extend %controller-block;
    @include text-lato(400, 14px, 150%, $text-title-color);
    width: 34px;
    margin: 0 2px;
  }
  &__info {
    @include text-roboto(400, 12px, 145%, $text-title-color);
    margin-top: 8px;
  }

  &__price {
    @extend %df-xc-yc;
    @include text-roboto(500, 18px, 145%, $text-title-color);
    margin-left: 84px;
  }
  &__close {
    cursor: pointer;
    border: none;
    background: white;
    position: absolute;
    border-radius: 5px;
    right: 0;
    top: 0;
    &:active {
      background: $text-thin-color;
    }
  }
}
.check-info {
  display: flex;
  margin-top: 44px;
  height: 102px;
  background: $bg-card-color;
  border-radius: 5px;
  align-items: center;

  &__check {
    margin-left: 25px;
  }
  &__img {
    margin-left: 20px;
  }

  &__text {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
  }
  &__title {
    @include text-lato(600, 16px, 145%, $text-title-color);
  }
  &__body {
    @include text-lato(400, 14px, 150%, $text-thin-color);
  }
}
</style>
