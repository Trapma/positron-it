import { prettifyNumber } from "@/utils/prettifyNumber";
export const cartModule = {
  namespaced: true,

  state: () => ({
    cartItems: [
      {
        id: 1,
        title: "Вытяжное устройство G2H",
        descr:
          "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
        art: "Артикул: G2H1065",
        price: 12644,
        count: 1,
      },
      {
        id: 2,
        title: "Вытяжное устройство BXC",
        descr:
          "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
        art: "Артикул: G2H1065",
        price: 12644,
        count: 2,
      },
      {
        id: 3,
        title: "Вытяжное устройство GHN",
        descr:
          "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
        art: "Артикул: G2H1065",
        price: 12644,
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
  },
  mutations: {},
  actions: {},
};
