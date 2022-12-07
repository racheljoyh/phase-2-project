import React from "react";
import PhotoCard from "./PhotoCard";
import App from "/src/App.css";

function MyLikes({ photos, onHandleRemoveLike }) {
  const likedPhotos = photos.filter((photo) => photo.liked);

  const allPosts = likedPhotos.map((photo) => (
    <PhotoCard key={photo.id} photo={photo} onLikeClick={onHandleRemoveLike} />
  ));
  return (
    <div className="likes-container">
      <h2 className="my-likes-title">My Likes</h2>
      <div className="my-likes-container">{allPosts}</div>
    </div>
  );
}

export default MyLikes;
