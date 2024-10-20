import Item from "./Item";
import { db } from "../firebase";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export function ItemsList() {
  const location = useLocation();
  const { shop, loggedUser } = location.state || [];
  console.log(shop + " shop");
  console.log(loggedUser + " loggedUser");
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");

  if (!shop) {
    return <div>No se encontró información de la tienda.</div>;
  }

  console.log("Carga de ItemsList ");

  //Navegaciones
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior en el historial
  };

  //Añadir un nuevo producto
  const addProductToShop = async (e) => {
    e.preventDefault();

    const db = getFirestore();
    const shopRef = doc(db, "shops", shop.id);

    // Verificar que la tienda existe
    const shopDoc = await getDoc(shopRef);
    if (!shopDoc.exists()) {
      throw new Error("Tienda no encontrada");
    }
    console.log(loggedUser + "loggeduser");
    console.log(newProductName + "newProductName");

    await updateDoc(shopRef, {
      products: arrayUnion({
        addedBy: "Bea",
        name: newProductName,
        quantity: 1,
        priority: 1,
      }),
    });
    setNewProductName("");
    fetchProducts();
  };


  const handleDelete = (itemId) => {
    console.log("Eliminamos del listado el item: " + itemId);
    fetchProducts();
  };

  ///////

  const fetchProducts = async () => {
    if (!shop?.id) return;
    const shopRef = doc(db, "shops", shop.id);
    const shopDoc = await getDoc(shopRef);

    if (shopDoc.exists()) {
      const shopData = shopDoc.data();
      setProducts(shopData.products || []);

    }
  };

  useEffect(() => {
    fetchProducts();
  }, [shop?.id]);

  /////
  return (
    <div className="items-list">
      <h2 className="header center">{shop.name}</h2>
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
      <form className="col s12">
        <div className="row">
          <div className="input-field col s8">
            <input
              id="new_product"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              type="text"
              className="validate"
            />
            <label htmlFor="new_product">Nuevo producto</label>
          </div>
          <div className="input-field col s4">
            <button
              onClick={addProductToShop}
              className="waves-effect waves-light btn-large "
            >
              <i className="material-icons right">add_shopping_cart</i>
              Añadir
            </button>
          </div>
        </div>
      </form>
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
