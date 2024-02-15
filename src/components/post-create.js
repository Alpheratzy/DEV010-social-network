import editPost from './firestore-edit.js';
import likes from './likes.js';
import eliminarPost from './firestore-delete.js';
import like from '../assets/like.png';
import unlike from '../assets/unlike.png';

const selectedUserName = localStorage.getItem('selectedUserName');

function postCreate(userImage, userName, numberLikes, postText, idPost, isLiking) {
  let isLike = isLiking;
  // crear el li que contenga
  const liPost = document.createElement('li');
  liPost.setAttribute('id', idPost);
  liPost.classList.add('commentContainer');
  // icono, nombre, botones de editar y borrar, post y boton de like
  // ICONO
  const imgUser = document.createElement('img');
  imgUser.setAttribute('id', 'userImage');
  imgUser.setAttribute('class', 'userImagePost');
  imgUser.setAttribute('src', userImage);
  // NOMBRE
  const nameUser = document.createElement('p');
  nameUser.textContent = userName;
  nameUser.setAttribute('class', 'userNamePost');
  // BOTONES DE EDITAR Y BORRAR
  const containerButtons = document.createElement('div');
  containerButtons.setAttribute('class', 'postButtons');

  const deleteLink = document.createElement('a');
  deleteLink.textContent = 'Borrar';
  deleteLink.classList.add('action-link');

  const editLink = document.createElement('a');
  editLink.setAttribute('id', 'editLink');
  editLink.textContent = 'Editar';
  editLink.classList.add('action-link');
  containerButtons.appendChild(editLink);
  containerButtons.appendChild(deleteLink);
  // AREA DEL POST
  const commentTextarea = document.createElement('textarea');
  commentTextarea.value = postText;
  commentTextarea.setAttribute('class', 'commentTextarea');
  commentTextarea.setAttribute('name', 'commentTextarea');
  commentTextarea.setAttribute('readonly', 'true');

  // ACCION DE EDITAR
  let postId;
  let isEditing = false;
  editLink.addEventListener('click', () => {
    if (selectedUserName === userName) {
      postId = liPost.id;
      isEditing = true;
      commentTextarea.removeAttribute('readonly');
      commentTextarea.focus();
    }
  });
  commentTextarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isEditing) {
        const newPost = commentTextarea.value;
        editPost(postId, newPost);
        commentTextarea.setAttribute('readonly', 'true');
        commentTextarea.blur();
        isEditing = false;
      }
    }
  });

  // ACCION DE BORRAR
  deleteLink.addEventListener('click', () => {
    if (selectedUserName === userName) {
      const shouldDelete = window.confirm('¿Estás seguro de que deseas borrar este comentario?');
      if (shouldDelete) {
        postId = liPost.id;
        eliminarPost(postId)
          .then(() => {
            liPost.remove();
            // console.log('Post eliminado correctamente');
          })
          .catch((error) => {
            // console.error('Error al eliminar el post:', error);
          });
      }
    }
  });
  // BOTON DE LIKE
  const containerLikes = document.createElement('div');
  containerLikes.setAttribute('class', 'likeArea');
  const btnLike = document.createElement('img');
  btnLike.setAttribute('id', idPost);
  btnLike.classList.add('btnLike');
  if (isLiking) {
    btnLike.setAttribute('src', like);
  } else {
    btnLike.setAttribute('src', unlike);
  }
  const sumLikes = document.createElement('span');
  sumLikes.setAttribute('id', 'sumLikes');
  sumLikes.innerHTML = numberLikes;

  let lkNumber;
  btnLike.addEventListener('click', () => {
    if (!isLike) {
      if (selectedUserName !== userName) {
        btnLike.setAttribute('src', like);
        isLike = true;
        lkNumber = sumLikes.textContent;
        const newLikes = likes(btnLike.id, lkNumber, isLike, selectedUserName);
        sumLikes.innerHTML = newLikes;
      }
    } else {
      btnLike.setAttribute('src', unlike);
      isLike = false;
      lkNumber = sumLikes.textContent;
      const newLikes = likes(btnLike.id, lkNumber, isLike, selectedUserName);
      sumLikes.innerHTML = newLikes;
    }
  });

  containerLikes.appendChild(btnLike);
  containerLikes.appendChild(sumLikes);
  liPost.appendChild(imgUser);
  liPost.appendChild(nameUser);
  liPost.appendChild(containerButtons);
  liPost.appendChild(commentTextarea);
  liPost.appendChild(containerLikes);

  return liPost;
}

export default postCreate;
