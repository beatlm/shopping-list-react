import { useNavigate } from 'react-router-dom';
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from 'firebase/firestore';

  
export function ShopsList (){

  const [shopsList, setShops] = useState([]);
  const [error, setError] = useState([]);

  const [loading, setLoading] = useState(true)
  const [fieldCount, setFieldCount] = useState(0)

  const navigate = useNavigate();

  const handleClick = (to) => {
    navigate(to);
  };

  useEffect(() => {
    setLoading(true)

    console.log('useeffect')
    const fetchShops = async () => {

      try {
        const shopsCollection = collection(db, 'shops');
        const shopsSnapshot = await getDocs(shopsCollection);
        shopsSnapshot.
        const shopsList = shopsSnapshot.docs.map(doc => ({
          id: doc.id,
          
          ...doc.data()

        }));

        setShops(shopsList);
        setLoading(false);
      } catch (err) {
          console.error("Error fetching shops: ", err);
          if (err.code === 'permission-denied') {
            setError("Permission denied. Please check Firestore security rules.");
          } else {
            setError("Failed to load shops. Please try again later.");
          }
          setLoading(false);
      }
    }

    // Limpiar el listener cuando el componente se desmonte
fetchShops()
  }, []);
  


  
  if (loading) {
    return <div className="text-center p-4">Cargando recetas...</div>
  }
return (
  
  <div className="items-list">
    <h2 className="header center" >Tiendas</h2>
          <ul className="collection">
          {
            shopsList.map( ({name} )=> (
              <li onClick={handleClick({name})} 
              className="collection-item row">
                <p className="col s10">{name}</p>
                <p className="col s2">{name}</p>

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

