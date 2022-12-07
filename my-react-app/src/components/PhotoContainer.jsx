import React from "react";
import PhotoCard from "./PhotoCard";
import App from "/src/App.css";

function PhotoContainer({ photos, onAddToLikes, filterBy, onChangeFilter }) {
  const photosList = photos.map((photo) => (
    <PhotoCard key={photo.id} photo={photo} onLikeClick={onAddToLikes} />
  ));

  function handleFilterChange(e) {
    onChangeFilter(e.target.value);
  }

  return (
    <div className="main">
      <div className="filter">
        <label>
          <strong className="filter-label">Filter:</strong>
          <select
            className="select-photo-container"
            onChange={handleFilterChange}
            value={filterBy}
          >
            <option value="All">All</option>
            <option value="Portraits">Portraits</option>
            <option value="Street">Street</option>
          </select>
        </label>
      </div>
      <div className="photo-container">{photosList}</div>
    </div>
  );
}

export default PhotoContainer;
