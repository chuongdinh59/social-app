import { URL_POST } from '../constant/url';
import http from '../utils/http';
const postService = {
  createPost(body) {
    return http.post(URL_POST, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getPosts(pageNumber, userId = null) {
    let url = `${URL_POST}?page=${pageNumber}`;
    if (!!userId) {
      url = `${url}&userId=${userId}`;
    }
    return http.get(url);
  }
};

export default postService;
