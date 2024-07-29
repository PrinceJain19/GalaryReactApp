import { useEffect, useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import Gallery from './components/gallary';
function App() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("images"));
    if (storedImages) {
      setImages(storedImages);
    }
  }, []);

  return (
    <div className="Wrapper">
      <ImageUpload images={images} setImages={setImages} />
      <Gallery images={images} setImages={setImages} />
    </div>
  );
}

export default App;
