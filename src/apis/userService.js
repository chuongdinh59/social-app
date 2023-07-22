import { URL_USER } from '../constant/url';
import http from '../utils/http';
const userService = {
  getCurrentUser() {
    return http.get(URL_USER);
  }
};

export default userService;
