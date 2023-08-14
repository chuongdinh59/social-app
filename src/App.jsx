import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routers } from './routes';
import './app.css';

function App() {
  const element = useRoutes(routers);
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
}

export default App;
