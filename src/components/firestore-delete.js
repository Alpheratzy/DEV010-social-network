import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase.js';

function eliminarPost(docID, callback) {
  console.log('DEBUG: Antes de la línea if (callback && typeof callback === "function")');
  const postRef = doc(db, 'dataBase2', docID);

  return deleteDoc(postRef)
    .then(() => {
      const mensaje = 'Post eliminado correctamente';
      if (callback && typeof callback === 'function') {
        callback(mensaje);
      }
      return mensaje;
    })
    .catch((error) => {
      const mensajeError = `Error al eliminar el post: ${error.message}`;
      if (callback && typeof callback === 'function') {
        callback(mensajeError);
      }
      throw new Error(mensajeError);
    });
}
export default eliminarPost;
