import { useContext, useState } from 'react';
import { CartContext } from '../App';
import emailjs from '@emailjs/browser';

function Cart() {
    const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSending, setIsSending] = useState(false);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const sendEmail = (e) => {
        e.preventDefault();
        if (!name || !phone) return alert("Bitte Name und WhatsApp-Nummer für Rückfragen angeben!");

        setIsSending(true);

        // Formatiert die Produkte für die E-Mail
        const productList = cart.map(item =>
            `${item.name} (${item.quantity}x) - ${(item.price * item.quantity).toFixed(2)}€`
        ).join('\n');

        const templateParams = {
            from_name: name,
            phone_number: phone,
            message: productList,
            total_price: `${total.toFixed(2)}€`,
            to_email: 'DEINE_EMAIL_ADRESSE_HIER' // Optional, falls im Template genutzt
        };

        emailjs.send(
            'service_wmosyyf',   // Ersetzen
            'template_bkd9aod',  // Ersetzen
            templateParams,
            'tbB-z1UYnAe9jYhJU'    // Ersetzen
        )
            .then((response) => {
                alert("Vielen Dank! Deine Bestellung wurde an Viola gesendet. ✨");
                clearCart(); // Warenkorb nach Erfolg leeren
                setIsSending(false);
            })
            .catch((err) => {
                alert("Fehler beim Senden. Bitte versuche es später nochmal.");
                setIsSending(false);
            });
    };

    if (cart.length === 0) return <div className="page"><h2>Dein Warenkorb ist leer 🥨</h2></div>;

    return (
        <div className="page cart-page">
            <h2 className="section-title">Dein Warenkorb</h2>

            <div className="cart-grid">
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

                <div className="cart-summary">
                    <h3>Kasse</h3>
                    <div className="summary-row total">
                        <span>Gesamtsumme:</span>
                        <span>{total.toFixed(2)} €</span>
                    </div>

                    <form onSubmit={sendEmail} className="order-inputs">
                        <input
                            type="text"
                            placeholder="Dein Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="WhatsApp Nummer für Rückfragen"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <button type="submit" className="btn-order-final" disabled={isSending}>
                            {isSending ? "Wird gesendet..." : `Jetzt für ${total.toFixed(2)}€ bestellen`}
                        </button>
                    </form>
                    <p className="info-text">Viola erhält deine Bestellung per E-Mail.</p>
                </div>
            </div>
        </div>
    );
}

export default Cart;