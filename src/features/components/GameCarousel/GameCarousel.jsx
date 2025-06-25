import { useState, useEffect } from 'react';
import '../../../shared/styles/style.css';

const GameCarousel = ({ images, alt }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <div className="game-carousel">
      <img src={images[index]} alt={alt} />
      {images.length > 1 && (
        <div className="carousel-dots">
          {images.map((_, i) => (
            <span key={i} className={i === index ? 'active' : ''}></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameCarousel;
