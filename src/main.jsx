import { createRoot } from 'react-dom/client'
import ShopsList from './components/ShopsList.jsx';
import Login from './components/Login.jsx';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { ItemsList } from './components/ItemsList.jsx';

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
<RouterProvider router={router} />

)
