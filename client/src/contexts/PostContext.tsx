// PostContext will contain all information for post / comments / crud ....

import React, { createContext, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { getPost } from '../services/posts';

export const Context = createContext({});

export const usePost = () => {
  return useContext(Context);
};

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams();
  // console.log(id);
  const { loading, error, value: post } = useAsync(() => getPost(id), [id]);
  console.log(post);
  return (
    <Context.Provider
      value={{
        post: { id, ...post },
      }}
    >
      {loading ? <h1>Loading</h1> : error ? <h1>{error}</h1> : children}
    </Context.Provider>
  );
};
