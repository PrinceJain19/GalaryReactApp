import React from "react";

function Gallery({ images, setImages }) {
  return (
    <ul className="image_list">
      {images && images.length > 0 ? (
        images?.map((item, index) => (
          <Item key={index} item={item} setImages={setImages} images={images} />
        ))
      ) : (
        <p>No images to display</p>
      )}
    </ul>
  );
}

function Item({ item, setImages, images }) {
  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleDelete = () => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.id !== item.id)
    );
    const updatedImages = JSON.stringify(
      images.filter((image) => image.id !== item.id)
    );
    localStorage.setItem("images", updatedImages);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  const handleInputSubmit = (event) => {
    event.preventDefault();
    const updatedImages = JSON.stringify(images);
    localStorage.setItem("images", updatedImages);
    setEditing(false);
  };

  const handleInputBlur = () => {
    const updatedImages = JSON.stringify(images);
    localStorage.setItem("images", updatedImages);
    setEditing(false);
  };

  const handleInputChange = (e) => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === item.id ? { ...image, caption: e.target.value } : image
      )
    );
  };

  return (
    <li id={item?.id} className="image_item">
      {editing ? (
        <div>
          <img src={item.image} alt={item.title} />
          <form className="edit-form" onSubmit={handleInputSubmit}>
            <label htmlFor="edit-caption">
              <input
                ref={inputRef}
                type="text"
                name="edit-caption"
                id="edit-caption"
                defaultValue={item?.caption}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
              />
            </label>
          </form>
        </div>
      ) : (
        <div className="todo_items_left">
          {item.image && <img src={item.image} alt={item.caption} />}
          <p>{item?.caption}</p>
          <div className="todo_items_right">
            <button onClick={handleEdit}>Edit</button>&nbsp;&nbsp;
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </li>
  );
}

export default Gallery;
