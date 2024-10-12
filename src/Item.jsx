import { useState } from 'react'
import './css/item.css'
export function Item ({name , quantity =1, creationUser }){

  const [priority , setPriority]=useState(false);

  const priorityText = priority?  'Alta':'Normal';

  const handleComprado = () =>{
    setPriority(!priority);
  }
return (

<li className="collection-item row">
    <p className="col s3">{name}</p>
    <p className="col s2">{quantity}</p>
    <p className="col s2">{creationUser}</p>
    <p className="col s2">{priorityText}</p>
    <a className="col s2 waves-effect waves-light btn delete" >
        <i className="material-icons left">delete</i>
        borrar
    </a>
</li>


  )
}

export default Item

