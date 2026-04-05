import { useContext, useState } from 'react';
import { CartContext } from '../App';

function Cart() {
    const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const sendWhatsApp = () => {
        if (!name || !phone) return alert("Bitte Name und Nummer eingeben!");

        let message = `Hallo Viola! 🥖\nIch möchte bestellen:\n\n`;
        cart.forEach(item => {
            message += `- ${item.name} (${item.quantity}x) - ${(item.price * item.quantity).toFixed(2)}€\n`;
        });
        message += `\nGesamt: ${total.toFixed(2)}€\n\nName: ${name}\nWhatsApp: ${phone}`;

        window.open(`https://wa.me/DEINE_NUMMER?text=${encodeURIComponent(message)}`);
    };

    if (cart.length === 0) return <div className="page"><h2>Dein Warenkorb ist leer 🥨</h2></div>;

    return (
        <div className="page cart-page">
            <h2 className="section-title">Dein Warenkorb</h2>

            <div className="cart-grid">
                {/* Linke Seite: Produktliste */}
                <div className="cart-items-list">
                    {cart.map(item => (
                        <div key={item.id} className="cart-card">
                            <img src={item.images[0]} alt={item.name} className="cart-card-img" />
                            <div className="cart-card-info">
                                <h3>{item.name}</h3>
                                <p className="item-price">{item.price.toFixed(2)} €</p>
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    <button className="delete-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Rechte Seite: Kasse / Zusammenfassung */}
                <div className="cart-summary">
                    <h3>Zusammenfassung</h3>
                    <div className="summary-row">
                        <span>Produkte:</span>
                        <span>{total.toFixed(2)} €</span>
                    </div>
                    <div className="summary-row total">
                        <span>Gesamtsumme:</span>
                        <span>{total.toFixed(2)} €</span>
                    </div>

                    <div className="order-inputs">
                        <input
                            type="text"
                            placeholder="Dein Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="WhatsApp Nummer"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <button className="btn-order-final" onClick={sendWhatsApp}>
                        Jetzt über WhatsApp bestellen
                    </button>
                    <p className="info-text">Deine Bestellung wird direkt an Viola gesendet.</p>
                </div>
            </div>
        </div>
    );
}

export default Cart;