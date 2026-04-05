import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../App';

function Navbar() {
    const { cart } = useContext(CartContext);

    // Berechnet die Gesamtzahl aller Artikel im Warenkorb (z.B. 2 Croissants + 1 Brot = 3)
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="navbar">
            {/* Linke Seite: Logo und Name */}
            <Link to="/" className="nav-logo">
                <img src="/BoulangrieLogo.png" alt="Violas Logo" />
                <span>Violas Boulangerie</span>
            </Link>

            {/* Rechte Seite: Navigation und Warenkorb */}
            <div className="nav-links">
                <Link to="/">Produkte</Link>
                <Link to="/contact">Kontakt</Link>
                <Link to="/cart" className="cart-btn">
                    Warenkorb ({totalItems})
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;