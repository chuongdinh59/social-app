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

// Post API
export const URL_POST = '/api/posts/';

// Comment API
export const URL_COMMENT = '/api/comments/';
export const URL_ADD_REPLY = `${URL_COMMENT}addReply/`;

// Action API
export const URL_ACTION = '/api/actions/';
export const URL_ACTION_ON_POST = `${URL_ACTION}post/`;
export const URL_ACTION_ON_COMMENT = `${URL_ACTION}comment/`;
export const URL_ACTION_ON_REPLY = `${URL_ACTION}reply/`;
