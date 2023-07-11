import { URL_REGISTER, URL_LOGIN, URL_LOGOUT } from '../constant/url'
import http from '../utils/http'
const authApi = {
  registerAccount(body) {
    return http.post(URL_REGISTER, body)
  },
  login(body) {
    return http.post(URL_LOGIN, body)
  },
  logout() {
    return http.post(URL_LOGOUT)
  }
}

export default authApi
