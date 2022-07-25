import axios from "axios";
const API_URL = " http://localhost:4000/";

class CartService {
  // обновление корзины, при добавлении и удалении блюд
  async updateCart(cart) {
    console.log("updateCart service start", cart);
    return axios
      .post(API_URL + "post", {
        ...cart,
      })
      .then((res, err) => {
        console.log("response update cart = ");
        if (res.data.success) {
          console.log("response update success", res.data);
        }

        return Promise.resolve(res, err);
      });
  }
}
export default new CartService();
