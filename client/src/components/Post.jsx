import { usePost } from '../contexts/PostContext';

const Post = () => {
  const { post } = usePost();
  return (
    <div>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
      <h3 className="comments-title">Comments</h3>
    </div>
  );
};

export { Post };
