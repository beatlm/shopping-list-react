import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import '../css/item.css'
export function Item ({name ,shopId,quantity =1, creationUser,onDelete }){



  const handleDelete = async () => {
    console.log('Borramos en bbdd el producto con nombre '+name)
    const db = getFirestore();
    const shopRef = doc(db, 'shops', shopId);

    try {
      // Primero, obtenemos el documento actual de la tienda
      const shopDoc = await getDoc(shopRef);
      if (!shopDoc.exists()) {
        throw new Error('La tienda no existe');
      }

      const shopData = shopDoc.data();
      const products = shopData.products || [];

      // Filtramos el array para eliminar el producto con el nombre especificado
      const updatedProducts = products.filter(product => product.name !== name);

      // Actualizamos el documento con el nuevo array de productos
      await updateDoc(shopRef, { products: updatedProducts });
      //Avisamos al padre
      onDelete(name);

      console.log('Producto eliminado con éxito');
    } catch (err) {
      console.error('Error al eliminar el producto:', err);
    } 
  };



return (

<li className="collection-item row">
    <p className="col s3">{name}</p>
    <p className="col s2">{quantity}</p>
    <p className="col s3">{creationUser}</p>
    <button className="col s1 waves-effect waves-light btn delete" >
        <a onClick={handleDelete} className="material-icons ">delete</a>
    </button>
</li>

  )
}

export default Item

