import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase.js';

function editPost(docID, newPost) {
  const postRef = doc(db, 'dataBase2', docID);
  updateDoc(postRef, {
    post: newPost,
  });
  return 'Post editado';
}

export default editPost;
