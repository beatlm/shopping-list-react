import { createRoot } from 'react-dom/client'
import ShopsList from './components/ShopsList.jsx';
import Login from './components/Login.jsx';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { ItemsList } from './components/ItemsList.jsx';
import logo from './assets/logo.png'; // Importa el logo
import './css/item.css'

const Layout = ({ children }) => {
  return (
    <div>
      <header>
          <img className='logo' src={logo} alt="Logo" />
        {/* Aquí puedes añadir una barra de navegación si lo deseas */}
      </header>
      <main>{children}</main>
      <footer>{/* Contenido del footer */}</footer>
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
