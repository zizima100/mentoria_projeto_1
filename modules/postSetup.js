import { writePostEditorContainer } from "./postEditorSetup.js";
import { deletePost } from "./events/deletePost.js";
import {
  getCard,
  getWrapper,
  getCmntContainer,
  getPostEdtrWrapper,
  getBtnsContainer,
  getDeletePostBtn,
  getEditPostBtn,
  getShowCmntsBtn,
  getTitle,
  getContent,
} from "./getElements/postElements.js";
import { validatePost } from "./helpers/validatePost.js";
import { cmntsHandler } from "./helpers/cmntsHandler.js";

function togglePostEdtr(id) {
  const postEdtrWrapper = document.getElementById(`post-editor__wrapper${id}`);
  const postEditorContainer = writePostEditorContainer(id);
  postEdtrWrapper.appendChild(postEditorContainer);

  const postWrapper = document.getElementById(`card__post-wrapper${id}`);
  postWrapper.style.display = "none";
}

function postSetup(position) {
  const post = window.postsArray[position];

  validatePost(post);

  const { id, title, body } = post;
  const postsContainer = document.getElementById("posts-container");
  const postCard = getCard(id);
  const postWrapper = getWrapper(id);
  const cmntContainer = getCmntContainer(id);
  const postEdtrWrapper = getPostEdtrWrapper(id);
  const btnsContainer = getBtnsContainer(id);

  const deletePostBtn = getDeletePostBtn(id);
  deletePostBtn.addEventListener("click", () => deletePost(post));

  const editPostBtn = getEditPostBtn(id);
  editPostBtn.addEventListener("click", () => togglePostEdtr(id));

  const showCmntsBtn = getShowCmntsBtn(id);
  showCmntsBtn.addEventListener("click", () => cmntsHandler(id));

  btnsContainer.appendChild(showCmntsBtn);
  btnsContainer.appendChild(editPostBtn);
  btnsContainer.appendChild(deletePostBtn);

  postWrapper.appendChild(getTitle(id, title));
  postWrapper.appendChild(getContent(id, body));
  postWrapper.appendChild(btnsContainer);

  postCard.appendChild(postWrapper);
  postCard.appendChild(postEdtrWrapper);
  postCard.appendChild(cmntContainer);

  postsContainer.prepend(postCard);
}

export { postSetup };
