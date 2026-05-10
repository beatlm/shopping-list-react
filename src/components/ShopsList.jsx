import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";

export function ShopsList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedUser } = location.state || {};

  const [shopsList, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newShopName, setNewShopName] = useState("");

 


  useEffect(() => {
    console.log('Use effect');
    // Referencia a la colección de tiendas
    const shopsRef = collection(db, 'shops');

    // Escucha los cambios en tiempo real

    // Si estás usando Firestore, usa esto en su lugar:
     const unsubscribe = onSnapshot(shopsRef, (snapshot) => {
      const updatedShops = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          owner: data.owner || '',
          image: data.image || '',
          productCount: Array.isArray(data.products) ? data.products.length : 0,
        };
      });
      console.log(updatedShops);
       setShops(updatedShops);
       setLoading(false);

     },
      (error) => {
      console.error("Error fetching shops:", error);
      setLoading(false);
    });
    //Limpieza al desmontar el componente
    return () => unsubscribe();

  }, []);


  const handleShopClick = (shop) => {
    navigate(`/shops/${shop.name}`, { state: { shop, loggedUser } });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newShopName.trim()) return;

    try {
      const shopsCollection = collection(db, "shops");
      await addDoc(shopsCollection, {
        name: newShopName,
        owner: loggedUser || "test",
        image: "",
        products: [],
      });
      setNewShopName("");
    } catch (error) {
      console.error("Error adding shop:", error);
    }
  };

 
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Cargando tus tiendas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-2 py-6">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Mis Tiendas</h1>
      </div>

      {shopsList.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-soft">
          <div className="text-5xl mb-4">🛒</div>
          <p className="text-gray-600 text-lg mb-4">No tienes tiendas aún</p>
          <p className="text-gray-400 text-sm">Crea una para comenzar</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden mb-8">
          <ul className="collection">
            {shopsList.map((shop) => (
              <li
                key={shop.id}
                onClick={() => handleShopClick(shop)}
                className="collection-item row hover:bg-gray-50 cursor-pointer transition-colors duration-200 flex items-center"
              >
                <div className="col s5 flex items-center">
                  <p className="flow-text font-semibold text-gray-800">{shop.name}</p>
                </div>
                <div className="col s5 flex items-center justify-end">
                  <span className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg px-3 py-2 text-lg font-bold text-blue-600">
                    {shop.productCount}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Crear nueva tienda</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              id="new-shop"
              type="text"
              value={newShopName}
              onChange={(e) => setNewShopName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 placeholder-gray-400"
              placeholder="Nombre de la tienda (ej: Supermercado, Farmacia)"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg font-semibold text-white text-base bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-95 transition-all shadow-medium hover:shadow-lg whitespace-nowrap"
          >
            + Añadir Tienda
          </button>
        </form>
      </div>
    </div>
  );
}

export default ShopsList;
