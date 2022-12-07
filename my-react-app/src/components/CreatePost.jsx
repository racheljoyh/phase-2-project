import React, { useState } from "react";

function CreatePost({ onAddPost }) {
  const [formData, setFormData] = useState({
    caption: "",
    image: "",
    category: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const newPost = {
      caption: formData.caption,
      image: formData.image,
      category: formData.category,
    };

    fetch(`http://localhost:3000/photos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((r) => r.json())
      .then((newPost) => onAddPost(newPost));
  }

  function handleOnChange(e) {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="create-post">
      <div className="post-container">
        <h2 className="post-heading">Post Your Photo</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="category">
              Description
              <input
                onChange={handleOnChange}
                value={formData.caption}
                type="text"
                name="caption"
                placeholder="Add a description..."
              />
            </label>
          </div>
          <div>
            <label htmlFor="category">
              Image
              <input
                onChange={handleOnChange}
                value={formData.image}
                type="text"
                name="image"
                placeholder="Upload an image..."
              />
            </label>
          </div>
          <div>
            <label htmlFor="category">
              Category:
              <select
                onChange={handleOnChange}
                value={formData.category}
                name="category"
              >
                <option value="Portraits">Portraits</option>
                <option value="Street">Street</option>
              </select>
            </label>
          </div>
          <button className="btn btn--form">Post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
