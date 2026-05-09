import { createRoot } from 'react-dom/client'
import ShopsList from './components/ShopsList.jsx';
import Login from './components/Login.jsx';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { ItemsList } from './components/ItemsList.jsx';
import logo from './assets/logo3.png';
import './input.css'
import './css/item.css'


const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
};


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
        path: "/shops",
        element: <ShopsList />,
      },
      {
        path: '/shops/:shopId',
        element: <ItemsList></ItemsList>
      }
  ]);
const root= createRoot(document.getElementById('root'));

root.render(
  <Layout>

<RouterProvider router={router} />
</Layout>
)
