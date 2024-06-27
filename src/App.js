import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import List from './pages/list';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/list',
    element: <List />
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
