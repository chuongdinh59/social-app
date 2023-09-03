import { URL_ACTION_ON_POST, URL_ACTION_ON_COMMENT, URL_ACTION_ON_REPLY } from '../constant/url';
import http from '../utils/http';

const actionService = {
  /**
   *
   * @param { post(id), action } action
   * @returns 
   */
  actionOnPost(action) {
    return http.post(URL_ACTION_ON_POST, action, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  /**
   *
   * @param { Comment(id), action} action
   * @returns
   */
  actionOnComment(action) {
    return http.post(URL_ACTION_ON_COMMENT, action, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  /**
   *
   * @param { subComment(id), action } action
   * @returns
   */
  actionOnReply(action) {
    return http.post(URL_ACTION_ON_REPLY, action, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
export default actionService;
