import { createStore } from "vuex";
import { cartModule } from "./cartModule";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cart: cartModule,
  },
});
