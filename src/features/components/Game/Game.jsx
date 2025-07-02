import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../ProductContext/ProductContext';
import TarjetaProducto from '../TarjetaProducto/TarjetaProducto';
import GameCard from '../GameCard/GameCard';
import RegistroForm from '../RegistroForm/RegistroForm';
import LoginForm from '../Login/LoginForm';
import Footer from '../../../shared/components/footer';
import Navbar from '../../../shared/components/navbar';
import CarritoDeCompra from '../carritodecompra/carrito';
import '../../../shared/styles/style.css';

const App = () => {
  const {
    productos,
    loading,
    error,
    cart,
    addToCart,
    increaseCartItem,
    decreaseCartItem,
    removeFromCart,
    clearCart // <-- Trae la función del contexto
  } = useContext(ProductContext);

  const [showRegistro, setShowRegistro] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCarrito, setShowCarrito] = useState(false);

  // Tu arreglo de juegos destacados original
  const juegos = [
    {
      name: 'The Legend of Zelda',
      desc: 'Aventura épica en un mundo abierto lleno de misterios.',
      price: 59.99,
      images: [
        'https://i.ytimg.com/vi/gp9aY09li1s/hq720.jpg',
        'https://imagenes.heraldo.es/files/image_1920_1080/uploads/imagenes/2023/05/19/the-legend-of-zelda-tears-of-the-kingdom.jpeg',
        'https://phantom-marca.unidadeditorial.es/f9bbb73de3b7c796adcb23769c29ea85/resize/828/f/jpg/assets/multimedia/imagenes/2023/05/21/16846677187332.jpg'
      ]
    },
    {
      name: 'Ori and the Will of the Wisps',
      desc: 'Un viaje mágico y visualmente impresionante.',
      price: 29.99,
      images: [
        'https://akihabarablues.b-cdn.net/wp-content/uploads/2019/06/Ori-and-the-will-of-the-wisps-1.jpg',
        'https://niveloculto.com/wp-content/uploads/2020/03/Ori-and-the-Will-of-the-Wisps-1-1.jpg',
        'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/03/analisis-ori-and-will-wisps-xbox-one-windows-10-1888339.png'
      ]
    },
    {
      name: 'Monster Hunter: World',
      desc: 'Caza monstruos en un mundo vibrante y peligroso.',
      price: 39.99,
      images: [
        'https://cdn.cloudflare.steamstatic.com/steam/apps/582010/header.jpg',
        'https://wallpapers.com/images/featured/monster-hunter-world-tbe0vlyb55q790lw.jpg',
        'https://image.api.playstation.com/vulcan/img/rnd/202010/0106/IyY3JSzHNCVoh7FultMPaE8F.jpg'
      ]
    },
    {
      name: 'God of War',
      desc: 'Acción y mitología nórdica en una historia impresionante.',
      price: 49.99,
      images: [
        'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.png',
        'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/ax0V5TYMax06mLzmkWeQMiwH.jpg',
        'https://uvejuegos.com/img/destacados/analisis/7937/5E5F389C-9D80-43C1-AE32-70B741FD7008.jpeg'
      ]
    },
    {
      name: 'Hollow Knight',
      desc: 'Explora un mundo subterráneo lleno de desafíos y secretos.',
      price: 14.99,
      images: [
        'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg',
        'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/05/hollow-knight-1943657.jpg',
        'https://assetsio.gnwcdn.com/how-hollow-knights-community-crafted-gibberish-into-a-real-language-1567781461548.jpg'
      ]
    },
    {
      name: 'Celeste',
      desc: 'Una plataforma desafiante con una historia conmovedora.',
      price: 19.99,
      images: [
        'https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg',
        'https://cdn1.epicgames.com/b671fbc7be424e888c9346a9a6d3d9db/offer/Celeste%20-%20landscape%20offer%20image-2560x1440-0b9b94fd493d817704ecfdf4c704989a.jpg',
        'https://humanprincess.wordpress.com/wp-content/uploads/2018/11/celeste-8-e1542821111783.png'
      ]
    },
    {
      name: 'Stardew Valley',
      desc: 'Construye tu granja y vive la vida rural.',
      price: 9.99,
      images: [
        'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg',
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/OAJK4CQOVZEU3GNAU6O2O5AECM.jpg',
        'https://alfabetajuega.com/hero/2021/03/stardew-valley.jpg'
      ]
    },
    {
      name: 'Hades',
      desc: 'Un roguelike lleno de acción y mitología griega.',
      price: 24.99,
      images: [
        'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg',
        'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145360/ss_bcb499a0dd001f4101823f99ec5094d2872ba6ee.1920x1080.jpg',
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/KXLKFVGRDFFLZH7XRV53L34P2I.jpg'
      ]
    }
  ];

  const totalProductos = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPagar = cart.reduce((acc, item) => acc + (item.price || item.precio) * item.cantidad, 0);

  useEffect(() => {
    const starryBg = document.getElementById('starry-bg');
    if (!starryBg) return;
    starryBg.innerHTML = '';
    const numStars = 80;
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = 1 + Math.random() * 2.5;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = `${0.5 + Math.random() * 0.5}`;
      star.style.background = 'white';
      star.style.position = 'absolute';
      star.style.zIndex = '-1';
      star.style.animation = `twinkle ${2 + Math.random() * 2}s infinite alternate`;
      starryBg.appendChild(star);
    }
  }, []);

  return (
    <div>
      <div id="starry-bg"></div>
      <header className="header">
        <h1 className="logo-nombre">VirtuaGames</h1>
        <Navbar
          setShowRegistro={setShowRegistro}
          setShowCarrito={setShowCarrito}
          setShowLogin={setShowLogin}
          totalProductos={totalProductos}
        />
      </header>

      <section className="featured-games" id="juegos">
        <h3>Juegos Destacados</h3>
        <div className="games-grid">
          {juegos.map((juego, i) => (
            <GameCard juego={juego} key={i} />
          ))}
        </div>
      </section>

      {/* Modal de Registro */}
      <section id="registro">
        {showRegistro && (
          <div className="modal-overlay" onClick={() => setShowRegistro(false)}>
            <div className="modal-registro" onClick={e => e.stopPropagation()}>
              <button className="modal-cerrar" onClick={() => setShowRegistro(false)}>&times;</button>
              <RegistroForm setShowRegistro={setShowRegistro} />
            </div>
          </div>
        )}
      </section>

      {/* Modal de Login */}
      <section id="login">
        {showLogin && (
          <div className="modal-overlay" onClick={() => setShowLogin(false)}>
            <div className="modal-registro" onClick={e => e.stopPropagation()}>
              <button className="modal-cerrar" onClick={() => setShowLogin(false)}>&times;</button>
              <LoginForm setShowLogin={setShowLogin} />
            </div>
          </div>
        )}
      </section>

      <section className="productos" id="productos">
        <h3>Productos</h3>
        {loading && <p>Cargando productos...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="productos-grid">
          {productos.map((producto, i) => (
            <TarjetaProducto producto={producto} key={i} />
          ))}
        </div>
      </section>

      {showCarrito && (
        <CarritoDeCompra
          cart={cart}
          totalProductos={totalProductos}
          totalPagar={totalPagar}
          decreaseCartItem={decreaseCartItem}
          increaseCartItem={increaseCartItem}
          removeFromCart={removeFromCart}
          setShowCarrito={setShowCarrito}
          clearCart={clearCart}
        />
      )}

      <section className="about-box">
        <h2>Historia y Visión</h2>
        <p>
          VirtuaGames nació de la pasión por los videojuegos y la tecnología, con el objetivo de crear una comunidad donde los gamers puedan descubrir, compartir y disfrutar de los mejores títulos del mundo. Nuestra visión es ser el punto de encuentro favorito para los amantes de los videojuegos, ofreciendo información actualizada, recomendaciones y un espacio para conectar con otros jugadores. ¡Únete a nuestra aventura y vive la experiencia VirtuaGames!
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default App;