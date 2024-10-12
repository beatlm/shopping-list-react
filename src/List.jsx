import Item from "./Item";

const itemsList = [
  {
    name:'Arroz',
    creationUser: 'Bea'
  } ,
  {
    name:'leche',
    quantity: 6,
  }
  ]

export function List ({listName }){

return (
  
  <div className="items-list">
    <h1 className="header center" >{listName}</h1>
      <div className="row">
        <form className="col s12">
        <div className="row">
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
         <div className="row" >
          <div className="input-field col s8">
            <input id="new_product" type="text" className="validate"/>  
            <label htmlFor="new_product">Nuevo producto</label>
          </div>
          <div className="input-field col s4">
            <a className="waves-effect waves-light btn"><i className="material-icons left">add_shopping_cart</i></a>
          </div>
      </div>
    </div>
        </form>
        </div>
        <div className="row">
          <a className=" col s12 waves-effect waves-light btn">Volver<i className="material-icons right">arrow_back_ios</i></a>
        </div>
    </div>
)
}

export default List;

