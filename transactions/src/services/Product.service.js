import axios from "axios";

const API_URL = "http://localhost:8084/products/productTransactions?";

class ProductService {
   
  getAllProductTransactions(month) {
    return axios.get(API_URL, {
      params: {
        month: month
      }
    });
  }

}
export default new ProductService();
