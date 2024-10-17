import { useNavigate } from 'react-router-dom';
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query, getCountFromServer, collectionGroup } from 'firebase/firestore';

  
export function ShopsList (){

  const [shopsList, setShops] = useState([]);
  const [error, setError] = useState([]);

  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const handleShopClick = (shop) => {
    navigate(`/shops/${shop.id}`, { state: { shop } });
  };
   
          
      useEffect(() => {
    const fetchShopsWithProductCount = async () => {
      try {
        const shopsRef = collection(db, 'shops');
        const shopSnapshot = await getDocs(shopsRef);
        
        const shopsWithProducts = shopSnapshot.docs.map(doc => {
          const shopData = doc.data();
          const products = shopData.products || [];
          return {
            id: doc.id,
            ...shopData,
            productCount: Array.isArray(products) ? products.length : 0
          };
        });
        
        console.log('Tiendas obtenidas:', shopsWithProducts);
        setShops(shopsWithProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error obteniendo tiendas y contando productos:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchShopsWithProductCount();
  }, []);


  
  if (loading) {
    return <div className="text-center p-4">Cargando recetas...</div>
  }
return (
  
  <div className="items-list">
    <h2 className="header center" >Tiendas</h2>
          <ul className="collection">
          {
            shopsList.map( (shop)=> (
              <li
               key={shop.id} 
            onClick={() => handleShopClick(shop)}
              className="collection-item row">
                <p className="col s10">{shop.name}</p>
                <p className="col s2">{shop.productCount}</p>

              </li>
            ))
         }
         </ul>
         <div className="row" >
          <div className="input-field col s8">
            <input id="new_product" type="text" className="validate"/>  
            <label htmlFor="new_product">Nueva tienda</label>
          </div>
          <div className="input-field col s4">
            <a className="waves-effect waves-light btn-large ">
            <i className="material-icons ">add_circle</i>
             </a>
          </div>
        </div>
    </div>
)
}

export default ShopsList

