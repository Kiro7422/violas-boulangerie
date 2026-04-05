import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import IntroScreen from './components/IntroScreen'; // NEU IMPORTIERT
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import './App.css';
import './index.css';

export const CartContext = createContext();

function BackButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="universal-back-btn">
      ⬅ Zurück
    </button>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true); // Steuert den schwarzen Startbildschirm
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  // Der Timer startet JETZT erst, wenn showIntro auf 'false' gesetzt wurde (Knopf gedrückt)
  useEffect(() => {
    if (!showIntro) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  const toastStyle = {
    style: {
      border: '1px solid #8b5a2b',
      padding: '16px',
      color: '#8b5a2b',
      backgroundColor: '#fff8f0',
      fontWeight: 'bold',
    },
    iconTheme: {
      primary: '#8b5a2b',
      secondary: '#fff8f0',
    },
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} ist im Körbchen! 🥖`, toastStyle);
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    toast('Aus dem Korb genommen. 🗑️', {
      icon: '🥐',
      style: { border: '1px solid #ccc', padding: '16px', color: '#555', backgroundColor: '#fff' },
    });
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      <Router>
        <Toaster position="bottom-center" reverseOrder={false} />

        {/* LOGIK: Erst Intro, dann Loading, dann Website */}
        {showIntro ? (
          <IntroScreen onStart={() => setShowIntro(false)} />
        ) : isLoading ? (
          <LoadingScreen />
        ) : (
          <div className="app-container">
            <div className="bakery-background"></div>
            <Navbar />
            <BackButton />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
          </div>
        )}
      </Router>
    </CartContext.Provider>
  );
}

export default App;