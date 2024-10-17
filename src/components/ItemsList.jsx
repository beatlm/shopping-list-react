import Item from "./Item";
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';



export function ItemsList ({shopName }){
 // const [itemsList, setItemsList] = useState([]);

 const { id } = useParams();
 const location = useLocation();
 const { shop } = location.state || {};

 if (!shop) {
   return <div>No se encontró información de la tienda.</div>;
 }

console.log('Se cargan los elementos de la tienda',{shopName});

const navigate = useNavigate();

const handleGoBack = () => {
  navigate(-1); // Navega a la página anterior en el historial
};

return (
  
  <div className="items-list">
    <h2 className="header center" >{shopName}</h2>
          <ul className="collection">
          {shop.products.map((product, index) => (
           
              <Item 
                key={index}
                name={product.name}
                quantity={product.quantity}
                creationUser = {product.addedBy}>
              </Item>
          ))}
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

