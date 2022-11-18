import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Post } from './components/Post';
import PostList from './components/PostList';
import { PostProvider } from './contexts/PostContext';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route
            path="/posts/:id"
            element={
              <PostProvider>
                <Post />
              </PostProvider>
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
