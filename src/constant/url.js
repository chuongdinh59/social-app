// SERVER ORIGIN

export const URL_SERVER = 'http://localhost:8080';

// Authentication
export const URL_LOGIN = '/authenticate'; // Replace with your login URL

export const URL_LOGOUT = '/logout'; // Replace with your logout URL
export const URL_REFRESH_TOKEN = '/refresh-token'; // Replace with your refresh token URL

// User API

export const URL_USER = '/api/users/';
export const URL_CURRENT_USER = `${URL_USER}current-user/`;
export const URL_REGISTER = `${URL_USER}register/`; // Replace with your register URL
export const URL_UPLOAD_AVATAR = `${URL_USER}upload-avatar/`;
export const URL_UPLOAD_BG = `${URL_USER}upload-bg/`;
export const URL_USER_BY_ID_OR_SLUG = (body) => {
  const param = body.id ? `id=${body.id}` : body.slug ? `slug=${body.slug}` : '';
  return `${URL_USER}?${param}`;
};

// Post API
export const URL_POST = '/api/posts/';
export const URL_POST_WITH_SLUG = (slug) => {
  return `${URL_POST}slug/${slug}/`;
}

// Comment API
export const URL_COMMENT = '/api/comments/';
export const URL_ADD_REPLY = `${URL_COMMENT}addReply/`;
export const URL_DELETE_COMMENT = (id) => `${URL_COMMENT}${id}/delete/`;
export const URL_DELETE_REPLY = (id) => `${URL_COMMENT}${id}/deleteSub/`;

// Action API
const URL_ACTION = '/api/actions/';
export const URL_ACTION_ON_POST = `${URL_ACTION}post/`;
export const URL_ACTION_ON_COMMENT = `${URL_ACTION}comment/`;
export const URL_ACTION_ON_REPLY = `${URL_ACTION}reply/`;
