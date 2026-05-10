import { createRoot } from 'react-dom/client'
import ShopsList from './components/ShopsList.jsx';
import Login from './components/Login.jsx';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { ItemsList } from './components/ItemsList.jsx';
import logo from './assets/logo3.png'; // Importa el logo
import './css/item.css'
import './index.css';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-soft sticky top-0 z-10">
          <img className='logo fadeIn' src={logo} alt="Shopping List Pro" />
      </header>
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">{children}</main>
      <footer className="bg-white border-t border-gray-100 py-4 px-4 text-center text-sm text-gray-500">© 2026 Shopping List Pro</footer>
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
