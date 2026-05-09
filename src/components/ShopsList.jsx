import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useState } from "react";

import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useLocation } from "react-router-dom";

export function ShopsList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedUser } = location.state || {};

  const [shopsList, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newShopName, setNewShopName] = useState("");

  useEffect(() => {
    const shopsRef = collection(db, "shops");
    const unsubscribe = onSnapshot(
      shopsRef,
      (snapshot) => {
        const updatedShops = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "",
            owner: data.owner || "",
            image: data.image || "",
            productCount: Array.isArray(data.products) ? data.products.length : 0,
          };
        });
        setShops(updatedShops);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching shops:", error);
        setLoading(false);
      }
    );

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
      <div className="flex items-center justify-center h-screen bg-apple-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue mx-auto mb-4"></div>
          <span className="text-apple-gray-500">Cargando tiendas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-apple-gray-50">
      {/* Safe Area Header */}
      <div className="bg-white border-b border-apple-gray-100">
        <div className="max-w-screen-sm mx-auto px-4 pt-12 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-apple-blue rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-apple-gray-900">Tiendas</h1>
              <p className="text-sm text-apple-gray-500">Tu lista de compras</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-sm mx-auto px-4 py-6 pb-20">
        {/* Shops List */}
        <div className="space-y-2">
          {shopsList.length === 0 ? (
            <div className="apple-card p-8 text-center">
              <div className="mb-4 inline-block p-3 bg-apple-gray-100 rounded-full">
                <svg className="w-8 h-8 text-apple-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" />
                </svg>
              </div>
              <p className="text-apple-gray-500">Crea tu primera tienda</p>
            </div>
          ) : (
            shopsList.map((shop) => (
              <button
                key={shop.id}
                onClick={() => handleShopClick(shop)}
                onKeyDown={(e) => e.key === "Enter" && handleShopClick(shop)}
                className="apple-card-hover w-full p-4 text-left transition-all duration-200"
                aria-label={`Abrir ${shop.name}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-apple-blue to-apple-blue/70 flex items-center justify-center text-white font-semibold text-lg shadow-apple-sm">
                      {shop.name.charAt(0).toUpperCase() || "🛒"}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-apple-gray-900 truncate">{shop.name}</p>
                    <p className="text-xs text-apple-gray-500">Por {shop.owner || "—"}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="inline-block px-3 py-1 bg-apple-blue/10 text-apple-blue text-xs font-semibold rounded-full">
                      {shop.productCount} {shop.productCount === 1 ? "producto" : "productos"}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-apple-gray-300 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Add New Shop Form */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-apple-gray-700 mb-3">Añadir nueva tienda</h2>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              id="new-shop"
              type="text"
              placeholder="Nombre de la tienda"
              className="apple-input flex-1"
              value={newShopName}
              onChange={(e) => setNewShopName(e.target.value)}
            />
            <button
              type="submit"
              disabled={!newShopName.trim()}
              className="flex-shrink-0 w-12 h-12 bg-apple-blue text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-apple-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShopsList;
