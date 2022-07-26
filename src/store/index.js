import { createStore } from "vuex";
import { cart } from "./cart.module.js";
import { viewed } from "./viewed.module.js";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    viewed,
  },
});
