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

  return (
    <div>
      <h5 className="header center">{shop.name}</h5>
      <ul className="collection">
        {products.map((product, index) => (
          <Item
            key={index}
            name={product.name}
            shopId={shop.id}
            quantity={product.quantity}
            creationUser={product.addedBy}
            onDelete={handleDelete}
          ></Item>
        ))}
      </ul>
      <div className="row">
        <form className="col s12">
          <div className="input-field col s10">
            <input
              id="new_product"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              type="text"
              className="validate"
            />
            <label htmlFor="new_product">Nuevo producto</label>
          </div>
          <div className="input-field col s2">
            <button
              onClick={addProductToShop}
              className="col s12 waves-effect waves-light btn-large "
            >
              <i className="material-icons">add_shopping_cart</i>
            </button>
          </div>
        </form>
      </div>

      <div className="row">
        <button
          className=" col s12 waves-effect waves-light btn-large"
          onClick={handleGoBack}
        >
          Volver<i className="material-icons right">arrow_back_ios</i>
        </button>
      </div>
    </div>
  );
}

export default ItemsList;
