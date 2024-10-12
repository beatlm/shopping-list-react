import { useState } from 'react'
import './Item.css'

export function Item ({name , quantity =1, creationUser }){

  const [priority , setPriority]=useState(false);

  const priorityText = priority?  'Alta':'Normal';

  const handleComprado = () =>{
    setPriority(!priority);
  }
return (
    <div>
      <p>{name}</p>
      <p>{quantity}</p>
      <p>{creationUser}</p>
      <p>{priorityText}</p>
      <button onClick={handleComprado}> Cambiar prioridad</button>
      <button>
      Borrar
      </button>
 </div>
  )
}

export default Item

