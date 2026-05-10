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
  <div className="bg-white border-2 border-gray-100 rounded-xl p-4 sm:p-5 transition-all duration-200 hover:shadow-medium hover:border-blue-200 slideUp">
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-1200 text-base sm:text-lg truncate">{name}</h3>
      </div>
          <div className="text-center">
       
             <p className="text-lg sm:text-l text-white-600">{creationUser}</p>
         </div>
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg px-3 py-2 min-w-fit">
       
          <div className="text-center">
            <p className="text-lg sm:text-xl font-bold text-blue-600">{quantity}</p>
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          className="delete p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 hover:shadow-medium"
          title="Eliminar producto"
          aria-label="Eliminar producto"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 8l-1.5-1.5L12 10.5 9.5 8 8 9.5 10.5 12 8 14.5 9.5 16 12 13.5 14.5 16 16 14.5 13.5 12z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
)
}

export default Item

