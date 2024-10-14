import { useNavigate } from 'react-router-dom';
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from 'firebase/firestore';

  
export function ShopsList (){

  const [shopsList, setShops] = useState([]);
console.log('useState')
  const navigate = useNavigate();

  const handleClick = (to) => {
    navigate(to);
  };

 
  


  console.log('pre useeffect')

  
  console.log('post useState')

return (
  
  <div className="items-list">
    <h2 className="header center" >Tiendas</h2>
          <ul className="collection">
          {
            shopsList.map( ({name} )=> (
              <li onClick={handleClick({name})} 
              className="collection-item row">
                <p className="col s12">{name}</p>
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

