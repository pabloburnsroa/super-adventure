import { makeRequest } from './makeRequest';

function getPosts() {
  return makeRequest('/posts');
}
function getPost(id: string | undefined) {
  return makeRequest(`/posts/${id}`);
}

export { getPosts, getPost };
