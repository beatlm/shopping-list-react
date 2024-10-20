import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  getCountFromServer,
  collectionGroup,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";

export function ShopsList() {
  const location = useLocation();

  const { loggedUser } = location.state || {};

  const [shopsList, setShops] = useState([]);
  const [error, setError] = useState([]);
  const [newShopName, setNewShopName] = useState("");

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleShopClick = (shop) => {
    navigate(`/shops/${shop.name}`, { state: { shop, loggedUser } });
  };
  console.log("hoplist loggedUser" + loggedUser);

  useEffect(() => {
    fetchShopsWithProductCount();
  }, []);

  const fetchShopsWithProductCount = async () => {
    try {
      const shopsRef = collection(db, "shops");
      const shopSnapshot = await getDocs(shopsRef);

      const shopsWithProducts = shopSnapshot.docs.map((doc) => {
        const shopData = doc.data();
        const products = shopData.products || [];
        return {
          id: doc.id,
          ...shopData,
          productCount: Array.isArray(products) ? products.length : 0,
        };
      });

      console.log("Tiendas obtenidas:", shopsWithProducts);
      setShops(shopsWithProducts);
      setLoading(false);
    } catch (err) {
      console.error("Error obteniendo tiendas y contando productos:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  // fetchShopsWithProductCount();

  async function addShop(newShopName) {
    try {
      const shopsCollection = collection(db, "shops");
      const newShop = await addDoc(shopsCollection, {
        image: "",
        name: newShopName,
        owner: "test",
        products: [],
      });

      console.log("Tienda añadida con ID:", newShop.id);
      //Borramos el valor del input de la nueva tienda
      console.log("borramos el valor del input");
      setNewShopName("");
      console.log("Recargamos el listado de tiendas");
      fetchShopsWithProductCount();

      return newShop.id;
    } catch (error) {
      console.error("Error al añadir la tienda:", error);
      throw error;
    }
  }

  // Ejemplo de uso en un componente
  const handleSubmit = async (e) => {
    console.log("Añadimos shop" + newShopName);
    e.preventDefault();

    try {
      const shopId = await addShop(newShopName);
      console.log("Se ha añadido OK");
    } catch (error) {
      console.log("Ha habido un error: " + error);
    }
  };

  if (loading) {
    return <div className="header center p-4">Cargando tiendas...</div>;
  }
  return (
    <div className="items-list">
      <h2 className="header center">Tiendas</h2>
      <ul className="collection">
        {shopsList.map((shop) => (
          <li
            key={shop.id}
            onClick={() => handleShopClick(shop)}
            className="collection-item row"
          >
            <p className="col s10">{shop.name}</p>
            <p className="col s2">{shop.productCount}</p>
          </li>
        ))}
      </ul>
      <div className="row">
        <div className="input-field col s8">
          <input
            id="new-shop"
            type="text"
            className="validate"
            value={newShopName}
            onChange={(e) => setNewShopName(e.target.value)}
          />
          <label htmlFor="new-shop">Nueva tienda</label>
        </div>
        <div className="input-field col s4">
          <a className="waves-effect waves-light btn-large ">
            <i onClick={handleSubmit} className="material-icons ">
              add_circle
            </i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ShopsList;
