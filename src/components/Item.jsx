import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import IconButton from "./ui/IconButton";

export function Item({ name, shopId, quantity = 1, creationUser, onDelete }) {
  const handleDelete = async () => {
    const db = getFirestore();
    const shopRef = doc(db, "shops", shopId);

    try {
      const shopDoc = await getDoc(shopRef);
      if (!shopDoc.exists()) throw new Error("La tienda no existe");

      const shopData = shopDoc.data();
      const products = shopData.products || [];
      const updatedProducts = products.filter((product) => product.name !== name);

      await updateDoc(shopRef, { products: updatedProducts });
      if (onDelete) onDelete(name);
    } catch (err) {
      console.error("Error al eliminar el producto:", err);
    }
  };

  return (
    <div className="apple-card p-4 flex items-center justify-between gap-3 transition-all duration-300 hover:shadow-apple-lg hover:scale-[1.01]">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold shadow-md">
          {name.charAt(0).toUpperCase() || "•"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-base font-semibold text-apple-gray-900 truncate">{name}</div>
          <div className="text-xs text-apple-gray-500">Añadido por {creationUser || "—"}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-md">
          x{quantity}
        </span>
        <IconButton onClick={handleDelete} ariaLabel={`Eliminar ${name}`} variant="danger">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}

export default Item;

