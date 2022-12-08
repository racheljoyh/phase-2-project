import React from "react";
import PhotoCard from "./PhotoCard";
import App from "/src/App.css";

function MyLikes({ photos, onHandleRemoveLike, onAddToLikes }) {
  const likedPhotos = photos.filter((photo) => photo.liked);

  const allPosts = likedPhotos.map((photo) => (
    <PhotoCard
      key={photo.id}
      photo={photo}
      onHandleRemoveLike={onHandleRemoveLike}
      onAddToLikes={onAddToLikes}
    />
  ));
  return (
    <div className="likes-container">
      <h2 className="my-likes-title">My Likes</h2>
      <div className="my-likes-container">{allPosts}</div>
    </div>
  );
}

export default MyLikes;
