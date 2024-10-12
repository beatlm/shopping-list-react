import Item from "./Item";
import './list.css'

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
    <section className="items-list">
      <p>{listName}</p>
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
        
    <button>+</button>
    <span>Volver</span>
    </section>
)
}

export default List;

