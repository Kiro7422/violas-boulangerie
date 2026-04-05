import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../App';

function Navbar() {
    const { cart } = useContext(CartContext);

    // Summiert alle Mengen auf
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo">
                <img src="/BoulangrieLogo.png" alt="Logo" width="50" />
                <span>Violas Boulangerie</span>
            </Link>
            <div className="nav-links">
                <Link to="/">Produkte</Link>
                <Link to="/contact">Kontakt</Link>
                <Link to="/cart" className="cart-link">
                    Warenkorb ({totalItems})
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;