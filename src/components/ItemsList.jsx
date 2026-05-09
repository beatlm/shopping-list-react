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
    <div className="min-h-screen bg-apple-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-apple-gray-100">
        <div className="max-w-screen-sm mx-auto px-4 py-4 pt-12 pb-6">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 text-apple-blue text-sm font-medium mb-3 transition-opacity hover:opacity-70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tiendas
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-apple-blue to-apple-blue/70 flex items-center justify-center text-white font-semibold text-lg shadow-apple-sm">
              {shop.name.charAt(0).toUpperCase() || "🛒"}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-apple-gray-900">{shop.name}</h1>
              <p className="text-sm text-apple-gray-500">{products.length} {products.length === 1 ? "producto" : "productos"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-sm mx-auto px-4 py-6 pb-24">
        {/* Products List */}
        {products.length === 0 ? (
          <div className="apple-card p-8 text-center">
            <div className="mb-4 inline-block p-3 bg-apple-gray-100 rounded-full">
              <svg className="w-8 h-8 text-apple-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m0 0h6m0 0h6m0-6v6m0 0v6" />
              </svg>
            </div>
            <p className="text-apple-gray-500">Aún no hay productos. ¡Añade uno abajo!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Pending Products */}
            {pendingProducts.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-apple-gray-700 px-1 mb-2">Pendientes</h2>
                <div className="space-y-2">
                  {pendingProducts.map((product, index) => (
                    <Item
                      key={index}
                      name={product.name}
                      shopId={shop.id}
                      quantity={product.quantity}
                      creationUser={product.addedBy}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Completed Products */}
            {completedProducts.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-apple-gray-400 px-1 mb-2">Completados</h2>
                <div className="space-y-2 opacity-60">
                  {completedProducts.map((product, index) => (
                    <Item
                      key={index}
                      name={product.name}
                      shopId={shop.id}
                      quantity={product.quantity}
                      creationUser={product.addedBy}
                      onDelete={handleDelete}
                    />
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
              className="flex-shrink-0 w-12 h-12 bg-apple-blue text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-apple-sm"
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
  );
}

export default ItemsList;
