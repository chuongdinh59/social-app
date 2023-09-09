import { URL_GET_POST_BY_ID, URL_POST, URL_POST_WITH_SLUG, URL_TOGGLE_BLOCK_COMMET } from '../constant/url';
import http from '../utils/http';
const postService = {
  createPost(body) {
    return http.post(URL_POST, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getPosts(pageNumber, { userId = null, slug = null } = {}) {
    if (slug) {
      console.log(URL_POST_WITH_SLUG(slug));
      return http.get(`${URL_POST_WITH_SLUG(slug)}?page=${pageNumber}`);
    }
    let url = `${URL_POST}?page=${pageNumber}`;
    if (!!userId) {
      url = `${url}&userId=${userId}`;
    }
    return http.get(url);
  },
  toggleBlockComment(body) {
    return http.get(URL_TOGGLE_BLOCK_COMMET(body.id));
  },

  getPost(id) {
    return http.get(URL_GET_POST_BY_ID(id));
  }
};

export default postService;
