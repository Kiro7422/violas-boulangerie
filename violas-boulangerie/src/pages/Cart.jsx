import { useContext, useState } from 'react';
import { CartContext } from '../App';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast'; // NEU importieren

function Cart() {
    const { cart, clearCart, updateQuantity, removeFromCart } = useContext(CartContext);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Wiederverwenden des Bäcker-Styles für Fehler/Erfolge
    const bakeryStyle = {
        border: '1px solid #8b5a2b',
        padding: '16px',
        color: '#8b5a2b',
        backgroundColor: '#fff8f0',
        fontWeight: 'bold',
    };

    const handleOrder = (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            toast.error("Dein Körbchen ist noch leer! 🥨", { style: bakeryStyle });
            return;
        }

        const orderList = cart.map(item => `${item.quantity}x ${item.name}`).join(', ');

        const templateParams = {
            to_name: "Inhaberin Viola",
            from_name: name,
            phone_number: phone,
            message: `Neue Bestellung! Liste: ${orderList}. Gesamtpreis: ${totalPrice.toFixed(2)}€`,
        };

        // Lade-Popup anzeigen, während Email sendet
        const toastId = toast.loading('Bestellung wird in den Ofen geschoben... 👩‍🍳', { style: bakeryStyle });

        emailjs.send('service_wmosyyf', 'template_4zk2a4e', templateParams, 'tbB-z1UYnAe9jYhJU')
            .then(() => {
                // Wenn erfolgreich, Lade-Popup mit Erfolg ersetzen
                toast.success('Bestellung erfolgreich! Wir melden uns per WhatsApp. 🎉', {
                    id: toastId,
                    style: bakeryStyle,
                    duration: 5000 // Bleibt 5 Sekunden sichtbar
                });
                clearCart();
                setName('');
                setPhone('');
            })
            .catch((error) => {
                // Wenn Fehler auftritt
                toast.error('Da ist etwas angebrannt. Bitte versuche es nochmal! 🔥', { id: toastId, style: bakeryStyle });
                console.log(error);
            });
    };

    return (
        <div className="page cart-page">
            <h2>Dein Warenkorb</h2>
            {cart.length === 0 ? <p>Dein Warenkorb ist noch leer...</p> : (
                <div className="cart-container">
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-info">
                                    <strong>{item.name}</strong>
                                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                                </div>

                                <div className="cart-item-controls">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn">-</button>
                                    <span className="qty-number">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn">+</button>

                                    <button onClick={() => removeFromCart(item.id)} className="delete-btn">
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Gesamtsumme: {totalPrice.toFixed(2)} €</h3>
                    </div>

                    <form onSubmit={handleOrder} className="order-form">
                        <input type="text" placeholder="Dein Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <input type="tel" placeholder="WhatsApp Nummer" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        <button type="submit" className="btn-order">Jetzt für {totalPrice.toFixed(2)}€ bestellen</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Cart;