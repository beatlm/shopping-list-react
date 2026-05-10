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
  console.log(shop + " shop");
  console.log(loggedUser + " loggedUser");


  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState(1);



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
    return <div>No se encontró información de la tienda.</div>;
  }

  console.log("Carga de ItemsList ");

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
          quantity: newProductQuantity,
          priority: 1,
        }),
      });
      setNewProductName("");
      setNewProductQuantity(1);
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

  const handleDeleteAll = async () => {
    if (!window.confirm("¿Estás seguro que quieres borrar todos los productos?")) {
      return;
    }
    try {
      const shopRef = doc(db, "shops", shop.id);
      await updateDoc(shopRef, { products: [] });
    } catch (error) {
      console.error("Error deleting all products:", error);
    }
  };

  const handleShareWhatsApp = async () => {
    if (products.length === 0) {
      alert("No hay productos para compartir");
      return;
    }

    const productList = products
      .map((product) => `${product.quantity} ${product.name} `)
      .join(", ");
    
    const message = `Productos de ${productList}`;

    // Copiar al portapapeles
    try {
      await navigator.clipboard.writeText(productList);
      alert("Productos copiados al portapapeles");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }

    // Abrir WhatsApp Web o app
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{shop.name}</h1>
        </div>
        <button
          onClick={handleGoBack}
          className="p-3 rounded-lg bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-soft transition-all text-gray-600 hover:text-gray-800"
          title="Volver atrás"
        >
          ← Atrás
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-soft mb-8">
          <div className="text-5xl mb-4">📝</div>
          <p className="text-gray-600 text-lg mb-4">No hay productos aún</p>
          <p className="text-gray-400 text-sm">Añade el primero abajo</p>
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          {products.map((product, index) => (
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
      )}

      <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Añadir producto</h2>
        <form onSubmit={addProductToShop} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              id="new_product"
              type="text"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 placeholder-gray-400"
              placeholder="Ej: Leche, Pan, Manzanas..."
            />
          </div>
          <div className="w-full sm:w-24 relative">
            <input
              id="new_quantity"
              type="number"
              min="1"
              value={newProductQuantity}
              onChange={(e) => setNewProductQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 placeholder-gray-400 text-center"
              placeholder="1"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg font-semibold text-white text-base bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:scale-95 transition-all shadow-medium hover:shadow-lg whitespace-nowrap"
          >
            + Añadir
          </button>
        </form>
      </div>

      {products.length > 0 && (
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <button
            onClick={handleDeleteAll}
            className="px-6 py-3 rounded-lg font-semibold text-white text-base bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 active:scale-95 transition-all shadow-medium hover:shadow-lg"
          >
            🗑️ Borrar todos
          </button>
          <button
            onClick={handleShareWhatsApp}
            className="px-6 py-3 rounded-lg font-semibold text-white text-base bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 active:scale-95 transition-all shadow-medium hover:shadow-lg"
          >
            📱 Compartir en WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}

export default ItemsList;
