import { Suspense, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import './app.css';
import { routers } from './routes';

function App() {
  const element = useRoutes(routers);
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
}

export default App;

// aud: "810184422731-00b0916a2pnska28ko2h66sf0dcnmquj.apps.googleusercontent.com"
// azp: "810184422731-00b0916a2pnska28ko2h66sf0dcnmquj.apps.googleusercontent.com"
// email: "hakoru1a@gmail.com"
// email_verified: trueexp: 1694281066
// family_name: "hako"
// given_name: "ru"
// iat: 1694277466
// iss: "https://accounts.google.com"
// jti: "c3e4bcc7e884f8d444fe959babf87cb947f87d6a"
// locale: "vi"
// name: "ru hako"
// nbf: 1694277166
// picture: "https://lh3.googleusercontent.com/a/ACg8ocLpOKXdhFmFw5sdft1q_QwRLs1SsNT6GJmszdCY4vRY=s96-c"
// sub: "109798610743232957745"

// aud: '810184422731-00b0916a2pnska28ko2h66sf0dcnmquj.apps.googleusercontent.com';
// azp: '810184422731-00b0916a2pnska28ko2h66sf0dcnmquj.apps.googleusercontent.com';
// email: '2051052012chuong@ou.edu.vn';
// email_verified: true;
// exp: 1694283581;
// family_name: 'Đặng Phạm Đình';
// given_name: 'Chương';
// hd: 'ou.edu.vn';
// iat: 1694279981;
// iss: 'https://accounts.google.com';
// jti: 'e417c08ec8c836e918f8a746431a728de7ce1850';
// locale: 'vi';
// name: 'Chương Đặng Phạm Đình';
// nbf: 1694279681;
// picture: 'https://lh3.googleusercontent.com/a/ACg8ocIW8sH4hr68nEeVAshxJ81dwMS9oJB9cXKrDAEQqNL4=s96-c';
// sub: '103291695851513005714';

// aud: '810184422731-00b0916a2pnska28ko2h66sf0dcnmquj.apps.googleusercontent.com';
// azp: '810184422731-00b0916a2pnska28ko2h66sf0dcnmquj.apps.googleusercontent.com';
// email: '2051052012chuong@ou.edu.vn';
// email_verified: true;
// exp: 1694283626;
// family_name: 'Đặng Phạm Đình';
// given_name: 'Chương';
// hd: 'ou.edu.vn';
// iat: 1694280026;
// iss: 'https://accounts.google.com';
// jti: '2a54e5a9da2d3c0ab72983973e4d8f3b31a88a35';
// locale: 'vi';
// name: 'Chương Đặng Phạm Đình';
// nbf: 1694279726;
// picture: 'https://lh3.googleusercontent.com/a/ACg8ocIW8sH4hr68nEeVAshxJ81dwMS9oJB9cXKrDAEQqNL4=s96-c';
// sub: '103291695851513005714';
