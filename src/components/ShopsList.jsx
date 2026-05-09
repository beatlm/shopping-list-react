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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-apple-blue via-purple-500 to-pink-500">
        <div className="text-center">
          <div className="inline-block p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-4">
            <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <span className="text-white text-lg font-medium drop-shadow">Cargando tiendas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-apple-blue via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Safe Area Header */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-screen-sm mx-auto px-4 pt-12 pb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-lg">Tiendas</h1>
                <p className="text-white/70 text-sm">Tu lista de compras</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-screen-sm mx-auto px-4 py-6 pb-20">
          {/* Shops List */}
          <div className="space-y-3">
            {shopsList.length === 0 ? (
              <div className="apple-card p-8 text-center">
                <div className="mb-4 inline-block p-4 bg-apple-blue/10 rounded-full">
                  <svg className="w-8 h-8 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" />
                  </svg>
                </div>
                <p className="text-apple-gray-500 font-medium">Crea tu primera tienda</p>
              </div>
            ) : (
              shopsList.map((shop, index) => (
                <button
                  key={shop.id}
                  onClick={() => handleShopClick(shop)}
                  onKeyDown={(e) => e.key === "Enter" && handleShopClick(shop)}
                  className="apple-card-hover w-full p-4 text-left transition-all duration-300 group animate-fadeIn"
                  style={{animationDelay: `${index * 0.1}s`}}
                  aria-label={`Abrir ${shop.name}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-apple-blue to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                        {shop.name.charAt(0).toUpperCase() || "🛒"}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-apple-gray-900 truncate">{shop.name}</p>
                      <p className="text-xs text-apple-gray-500">Por {shop.owner || "—"}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-apple-blue to-purple-600 text-white text-xs font-semibold rounded-full shadow-md">
                        {shop.productCount} {shop.productCount === 1 ? "producto" : "productos"}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-apple-gray-300 mt-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <h2 className="text-sm font-semibold text-white drop-shadow mb-3">Añadir nueva tienda</h2>
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
                className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-apple-blue to-purple-600 text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopsList;
