import React, { useState } from "react";
import App from "/src/App.css";
import LazyLoad from "react-lazy-load";
import Popup from "./Popup";

function PhotoCard({ photo, onAddToLikes, onHandleRemoveLike }) {
  const { id, caption, image, liked, lqpi } = photo;
  const [isLiked, setIsLiked] = useState(liked);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  function onLoad() {
    // delay for demo only
    setTimeout(() => setIsLoading(false), 1000);
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  function handleLikeChange() {
    setIsLiked((isLiked) => !isLiked);
    fetch(`http://localhost:3000/photos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ liked: !liked }),
    })
      .then((r) => r.json())
      .then((updatedLike) => onAddToLikes(updatedLike));
  }

  return (
    <div className="photo-card">
      <div className="pop-up">
        {isOpen && (
          <Popup
            content={<img className="popup-image" src={image} />}
            handleClose={togglePopup}
          />
        )}
      </div>
      {/* <LazyLoad height={500} threshold={0.5}> */}
      <img
        className="image"
        // width={500}
        src={lqpi}
        style={{ display: isLoading ? "block" : "none" }}
        alt={caption}
      />
      {/* </LazyLoad> */}

      <LazyLoad>
        <img
          src={image}
          className="image"
          // width={500}
          alt={caption}
          style={{ display: isLoading ? "none" : "block" }}
          onLoad={onLoad}
        />
      </LazyLoad>
      <div className="middle">
        <p className="caption">"{caption}"</p>

        {isLiked ? (
          <div onClick={handleLikeChange}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="like-icon-filled"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
        ) : (
          <div onClick={handleLikeChange}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="like-icon-unfilled"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>
        )}
        <button onClick={togglePopup}>Click to make big</button>
      </div>
    </div>
  );
}

export default PhotoCard;
