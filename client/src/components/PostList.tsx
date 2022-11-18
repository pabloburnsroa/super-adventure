// import { useEffect, useState } from 'react';
import { useAsync } from '../hooks/useAsync';
import { getPosts } from '../services/posts';

const PostList = () => {
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   getPosts().then(setPosts);
  // }, []);

  /*useAsync hook*/

  const { loading, error, value: posts } = useAsync(getPosts);

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>{error}</h1>;

  return <div>{JSON.stringify(posts)}</div>;
};

export default PostList;
