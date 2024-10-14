import Item from "./Item";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from "../firebase";
const itemsList = [
  {
    name:'Arroz',
    creationUser: 'Bea',
    key: 'Arroz'
  } ,
  {
    name:'leche',
    quantity: 6,
    key: 'Leche'
  }
  ]
  


export function ItemsList ({shopName }){
 // const [itemsList, setItemsList] = useState([]);



console.log('Se cargan los elementos de la tienda',{shopName});

const navigate = useNavigate();

const handleGoBack = () => {
  navigate(-1); // Navega a la página anterior en el historial
};

return (
  
  <div className="items-list">
    <h2 className="header center" >{shopName}</h2>
          <ul className="collection">
          {
            itemsList.map( ({name, quantity, creationUser} )=> (
              <Item 
                key={name}
                name={name}
                quantity={quantity}
                creationUser = {creationUser}>
              </Item>
            )
            )
         }
         </ul>
         <form className="col s12">

         <div className="row" >
          <div className="input-field col s8">
            <input id="new_product" type="text" className="validate"/>  
            <label htmlFor="new_product">Nuevo producto</label>
          </div>
          <div className="input-field col s4">
            <a className="waves-effect waves-light btn-large ">
            <i className="material-icons right">add_shopping_cart</i>
            Añadir
             </a>
          </div>
        </div>
        </form>
        <div className="row">
          <a className=" col s12 waves-effect waves-light btn-large"
          onClick={handleGoBack}>Volver<i className="material-icons right">arrow_back_ios</i></a>
        </div>
    </div>
)
}

export default ItemsList;

