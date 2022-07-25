import { prettifyNumber } from "@/utils/prettifyNumber";
import cartService from "@/services/cart.service";
export const cart = {
  namespaced: true,

  state: () => ({
    cartItems: [
      {
        id: 1,
        title: "Вытяжное устройство G2H",
        descr:
          "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
        article: "Артикул: G2H1065",
        price: 12644,
        img: require("@/assets/image/Rectangle72-1.png"),
        count: 1,
      },
      {
        id: 2,
        title: "Вытяжное устройство BXC",
        descr:
          "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
        article: "Артикул: G2H1065",
        price: 12644,
        img: require("@/assets/image/Rectangle72-3.png"),
        count: 2,
      },
      {
        id: 3,
        title: "Вытяжное устройство GHN",
        descr:
          "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
        article: "Артикул: G2H1065",
        price: 12644,
        img: require("@/assets/image/Rectangle72-2.png"),
        count: 1,
      },
    ],
    isLoading: false,
  }),
  getters: {
    getTotalPriceCart(state) {
      const result = Math.ceil(
        state.cartItems.reduce((prev, curr) => {
          return (prev += curr.price * curr.count);
        }, 0)
      );
      return prettifyNumber(result);
    },
    getTotalCountCart(state) {
      return state.cartItems.reduce((prev, curr) => {
        return (prev += curr.count);
      }, 0);
    },
  },
  actions: {
    updateCartDebounce({ state, dispatch }) {
      const setTime = setTimeout(() => {
        dispatch("updateCart");
      }, 500);

      clearTimeout(state.timer);
      state.timer = setTime;
    },

    async updateCart({ state, commit }) {
      commit("IS_LOADING", true);
      try {
        const res = await cartService.updateCart(state.cartItems);
        // console.log('response order module', res.data)
        commit("IS_LOADING", false);
        console.log("res", res);
        // commit("UPDATE_ORDER", res.data.updateCart.dish_ids);
      } catch (err) {
        return console.log(err);
      }
    },
  },
  mutations: {
    IS_LOADING(state, status) {
      console.log("loading status = ", status);
      state.isLoading = status;
    },
    INCREMENT(state, id) {
      state.cartItems.forEach((item) => item.id === id && item.count++);
    },
    DECREMENT(state, id) {
      let indexToDel;
      state.cartItems.forEach((item, index) => {
        // save index to del or count down
        if (item.id === id && item.count === 1) {
          indexToDel = index;
        } else if (item.id === id && item.count > 1) {
          item.count--;
        }
      });
      // del item
      if (indexToDel !== undefined) {
        state.cartItems.splice(indexToDel, 1);
      }
    },
    DELETE_ITEM(state, id) {
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    CLEAR_CART(state) {
      state.cartItems = [];
    },
  },
};
