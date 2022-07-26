import axios from "axios";
const API_URL = " http://localhost:4000/";

class CartService {
  // обновление корзины, при добавлении и удалении блюд
  async updateCart(data) {
    return axios.put(API_URL + "cart" + "/1", { ...data }).then((res, err) => {
      if (res.data.success) {
        console.log("response update success", res.data);
      }

      return Promise.resolve(res, err);
    });
  }
  async getCart() {
    return await axios.get(API_URL + "cart");
  }
  async getOrderPay(id) {
    return await axios.get(API_URL + "cart", {
      params: {
        id,
      },
    });
  }
  async getBackup() {
    return await axios.get(API_URL + "cart-backup", {
      params: {
        id: 1,
      },
    });
  }
  async pay(data) {
    console.log(data);
    const res = await axios.post(API_URL + "orderPay", { ...data });
    console.log("res", res);
    return res;
  }
}
export default new CartService();
