import React, { useState } from "react";

function ImageUpload({ images, setImages }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
        const value = caption;
        const newImage = {
            caption: value,
            id: images.length + 1,
            image: image ? URL.createObjectURL(image) : null
        };
        setImages((prevImage) => [
            ...prevImage,
            newImage
        ]);

        const updatedImages = JSON.stringify([...images, newImage]);
        localStorage.setItem("images", updatedImages);
        event.target.reset();
        setImage(null);
        setCaption('');
  }

  const handleImage = (event) => {
    console.log(event.target.files);
    setImage(event.target.files[0]);
  };
  const handleCaption = (event) => {
    console.log(event.target.value);
    setCaption(event.target.value);
  };
    
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="image">Choose Image</label>
        <input type="file" name="image" onChange={handleImage} />
        <div className="img-thumbs img-thumbs-hidden" id="img-preview"></div>
        <input
          type="text"
          placeholder="Enter caption..."
          id="caption"
          name="caption"
          value={caption}
          onChange={handleCaption}
        />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
}

export default ImageUpload;