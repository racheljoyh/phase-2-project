import React, { useEffect, useState } from "react";
import PhotoContainer from "./PhotoContainer";
import Nav from "./Nav";
import CreatePost from "./CreatePost";
import MyLikes from "./MyLikes";
import { Switch, Route } from "react-router-dom";

function App() {
  const [photos, setPhotos] = useState([]);
  const [myLikes, setMyLikes] = useState([]);
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
    const unLiked = myLikes.filter((photo) => photo.id !== unLikedPhoto.id);
    setMyLikes(unLiked);
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
          />
        </Route>
        <Route path="/photos/my-likes">
          <MyLikes photos={photos} onHandleRemoveLike={handleRemoveLike} />
        </Route>
        <Route>
          <CreatePost path="/photos/add" onAddPost={handleAddPost} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
