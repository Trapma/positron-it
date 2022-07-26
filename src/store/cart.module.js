import { prettifyNumber } from "@/utils/prettifyNumber";
import cartService from "@/services/cart.service";
export const cart = {
  namespaced: true,

  state: () => ({
    cartItems: [],
    cartId: null,
    checkStatus: true,
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
    async updateCartDebounce({ state, dispatch }) {
      const setTime = setTimeout(() => {
        dispatch("updateCart");
      }, 500);

      clearTimeout(state.timer);
      state.timer = setTime;
    },

    async updateCart({ state, commit }) {
      commit("IS_LOADING", true);
      try {
        const data = {
          id: state.cartId,
          cart_items: state.cartItems,
        };
        await cartService.updateCart(data);
      } catch (err) {
        return console.log(err);
      } finally {
        commit("IS_LOADING", false);
      }
    },

    async pay({ state, commit }) {
      commit("IS_LOADING", true);
      try {
        const data = {
          cart_items: state.cartItems,
          checkSettings: state.checkStatus,
        };
        const res = await cartService.pay(data);
        console.log("res", res);
      } catch (err) {
        return console.log(err);
      } finally {
        commit("IS_LOADING", false);
      }
    },

    async getCart({ commit }) {
      commit("IS_LOADING", true);
      try {
        const res = await cartService.getCart();
        console.log("res", res);
        if (res.status !== 200) throw new Error(res.status);

        if (!res.data[0].cart_items.length) {
          const res = await cartService.getBackup();
          commit("GET_CART", res.data[0]);
        } else {
          commit("GET_CART", res.data[0]);
        }
      } catch (err) {
        return console.log(err);
      } finally {
        commit("IS_LOADING", false);
      }
    },

    async getOrderPay({ commit }, id) {
      commit("IS_LOADING", true);
      try {
        const res = await cartService.getOrderPay(id);
        console.log("res", res);
        if (res.status !== 200) throw new Error(res.status);
        commit("GET_CART", res.data[0]);
      } catch (err) {
        return console.log(err);
      } finally {
        commit("IS_LOADING", false);
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
    SET_CHECK(state, status) {
      state.checkStatus = status;
    },
    GET_CART(state, cart) {
      state.cartItems = cart.cart_items;
      state.cartId = cart.id;
    },
  },
};
