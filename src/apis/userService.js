import { URL_USER, URL_REGISTER, URL_CURRENT_USER } from '../constant/url';
import http from '../utils/http';
const userService = {
  getCurrentUser() {
    return http.get(`${URL_CURRENT_USER}`);
  },
  registerAccount(body) {
    return http.post(URL_REGISTER, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default userService;
