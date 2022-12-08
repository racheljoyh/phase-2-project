import React, { useEffect, useState } from "react";
import MyLikes from "./MyLikes";
import PhotoContainer from "./PhotoContainer";
import Nav from "./Nav";
import CreatePost from "./CreatePost";

import { Switch, Route } from "react-router-dom";

function App() {
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch(`http://localhost:3000/photos`)
      .then((r) => r.json())
      .then((photos) => setPhotos(photos));
  }, []);

  function handleAddPost(newPost) {
    setPhotos([newPost, ...photos]);
  }

  function handleLikeToAdd(postToAdd) {
    const postInMyLikes = photos.map((post) => {
      if (post.id === postToAdd.id) {
        return postToAdd;
      } else {
        return post;
      }
    });
    setPhotos(postInMyLikes);
  }

  function handleRemoveLike(unLikedPhoto) {
    const unLiked = photos.filter((photo) => photo.id !== unLikedPhoto.id);
    setPhotos(unLiked);
  }

  const postFilter = [...photos].filter((photo) => {
    if (category === "All") return true;
    return photo.category === category;
  });

  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/">
          <PhotoContainer
            filterBy={category}
            onChangeFilter={setCategory}
            photos={postFilter}
            onAddToLikes={handleLikeToAdd}
            onHandleRemoveLike={handleRemoveLike}
          />
        </Route>
        <Route path="/my-likes">
          <MyLikes
            photos={photos}
            onHandleRemoveLike={handleRemoveLike}
            onAddToLikes={handleLikeToAdd}
          />
        </Route>
        <Route>
          <CreatePost path="/add" onAddPost={handleAddPost} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
