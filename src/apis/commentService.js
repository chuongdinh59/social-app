import { URL_ADD_REPLY, URL_COMMENT, URL_DELETE_COMMENT, URL_DELETE_REPLY } from '../constant/url';
import http from '../utils/http';
const commentService = {
  // comment: {
  // content: string,
  // postId: number
  // }
  addComment(comment) {
    return http.post(URL_COMMENT, comment, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  // reply: {
  // content: string,
  // comment: number
  // }
  addReply(reply) {
    return http.post(URL_ADD_REPLY, reply, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  /**
   * URL: /api/comments/{id}/delete/
   * @param {id} id 
   * @returns 
   */
  deleteComment(id) {
    return http.delete(URL_DELETE_COMMENT(id));
  },
  deleteReply(id) {
    return http.delete(URL_DELETE_REPLY(id));
  },
  getCommentByPostId(postId, page = 1) {
    return http.get(`${URL_COMMENT}?postId=${postId}&page=${page}`);
  },
  getRepliesByCommentId(commentId, page = 1) {
    return http.get(`${URL_COMMENT}getReplies/?commentId=${commentId}&page=${page}`);
  }
};

export default commentService;
