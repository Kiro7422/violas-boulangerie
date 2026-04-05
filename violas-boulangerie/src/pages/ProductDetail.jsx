import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { products } from '../data';
import { CartContext } from '../App';
import { motion } from 'framer-motion';

function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);

    const product = products.find(p => p.id === parseInt(id));

    if (!product) return <h2>Produkt nicht gefunden!</h2>;

    return (
        <motion.div
            className="page product-detail"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <img src={product.image} alt={product.name} className="detail-image" />
            <div className="detail-info">
                <h2>{product.name}</h2>
                <p className="price">{product.price.toFixed(2)} €</p>
                <p>{product.description}</p>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addToCart(product)}
                    className="btn-add"
                >
                    In den Warenkorb 🛒
                </motion.button>
            </div>
        </motion.div>
    );
}

export default ProductDetail;