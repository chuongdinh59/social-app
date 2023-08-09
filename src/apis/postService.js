import { URL_POST } from '../constant/url';
import http from '../utils/http';
const postService = {
  createPost(body) {
    return http.post(URL_POST, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default postService;
