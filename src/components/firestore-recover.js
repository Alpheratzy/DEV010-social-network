import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase.js';

function getPost() {
  const postRef = collection(db, 'dataBase2');
  return getDocs(postRef)
    .then((snapshot) => {
      const olderPosts = snapshot.docs
        .sort((a, b) => b.data().time - a.data().time)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      return olderPosts;
    })
    .catch((error) => {
      console.log(error);
    });
}

export default getPost;
