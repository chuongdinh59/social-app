import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import './app.css';
import { routers } from './routes';

function App() {
  const element = useRoutes(routers);
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
}

export default App;
