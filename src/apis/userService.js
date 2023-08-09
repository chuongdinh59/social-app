import { URL_USER } from '../constant/url';
import http from '../utils/http';
const userService = {
  getCurrentUser() {
    return http.get(URL_USER);
  },
  registerAccount(body) {
    return http.post(URL_USER, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default userService;
