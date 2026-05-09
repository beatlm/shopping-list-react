import Item from "./Item";
import { db } from "../firebase";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export function ItemsList() {
  //Cargamos los datos que vienen de la pantalla
  const location = useLocation();
  const { shop, loggedUser } = location.state || [];

  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");

  useEffect(() => {
    if (!shop?.id) return;

    const shopRef = doc(db, "shops", shop.id);
    const unsubscribe = onSnapshot(shopRef, (doc) => {
      if (doc.exists()) {
        const shopData = doc.data();
        setProducts(shopData.products || []);
      }
    }, (error) => {
      console.error("Error fetching products:", error);
    });

    return () => unsubscribe();
  }, [shop?.id]);

  if (!shop) {
    return <div className="flex items-center justify-center min-h-screen">No se encontró información de la tienda.</div>;
  }

  //Navegaciones
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior en el historial
  };

  const addProductToShop = async (e) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    try {
      const shopRef = doc(db, "shops", shop.id);
      await updateDoc(shopRef, {
        products: arrayUnion({
          addedBy: loggedUser || "Anonymous",
          name: newProductName,
          quantity: 1,
          priority: 1,
        }),
      });
      setNewProductName("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = async (productName) => {
    try {
      const shopRef = doc(db, "shops", shop.id);
      const updatedProducts = products.filter(product => product.name !== productName);
      await updateDoc(shopRef, { products: updatedProducts });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const completedProducts = products.filter(p => p.completed);
  const pendingProducts = products.filter(p => !p.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-apple-blue via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-screen-sm mx-auto px-4 py-4 pt-12 pb-6">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 text-white text-sm font-semibold mb-3 transition-opacity hover:opacity-70"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Tiendas
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/30 to-purple-300/30 flex items-center justify-center text-white font-semibold text-lg shadow-lg border border-white/20">
                {shop.name.charAt(0).toUpperCase() || "🛒"}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow">{shop.name}</h1>
                <p className="text-white/70 text-sm">{products.length} {products.length === 1 ? "producto" : "productos"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Content */}
        <div className="max-w-screen-sm mx-auto px-4 py-6 pb-24">
          {/* Products List */}
          {products.length === 0 ? (
            <div className="apple-card p-8 text-center">
              <div className="mb-4 inline-block p-4 bg-apple-blue/10 rounded-full">
                <svg className="w-8 h-8 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m0 0h6m0-6v6m0 0v6" />
                </svg>
              </div>
              <p className="text-apple-gray-500 font-medium">Aún no hay productos. ¡Añade uno abajo!</p>
            </div>
          ) : (
            <div className="space-y-4 animate-slideInUp">
              {/* Pending Products */}
              {pendingProducts.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold text-white/80 drop-shadow px-1 mb-2">Pendientes ({pendingProducts.length})</h2>
                  <div className="space-y-2">
                    {pendingProducts.map((product, index) => (
                      <div key={index} style={{animationDelay: `${index * 0.05}s`}} className="animate-fadeIn">
                        <Item
                          name={product.name}
                          shopId={shop.id}
                          quantity={product.quantity}
                          creationUser={product.addedBy}
                          onDelete={handleDelete}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Products */}
              {completedProducts.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/20">
                  <h2 className="text-sm font-semibold text-white/50 drop-shadow px-1 mb-2">Completados ({completedProducts.length})</h2>
                  <div className="space-y-2 opacity-60">
                    {completedProducts.map((product, index) => (
                      <div key={index} style={{animationDelay: `${index * 0.05}s`}} className="animate-fadeIn">
                        <Item
                          name={product.name}
                          shopId={shop.id}
                          quantity={product.quantity}
                          creationUser={product.addedBy}
                          onDelete={handleDelete}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Add New Product Form */}
          <div className="mt-8">
            <form onSubmit={addProductToShop} className="flex gap-2">
              <input
                id="new_product"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                type="text"
                placeholder="Leche 1L, Manzanas..."
                className="apple-input flex-1"
              />
              <button
                type="submit"
                disabled={!newProductName.trim()}
                className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-apple-blue to-purple-600 text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                aria-label="Añadir producto"
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

export default ItemsList;
