import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProductCard({ product }) {
    return (
        <motion.div
            className="product-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Link to={`/product/${product.id}`}>
                {/* Wir zeigen hier images[0] (das erste Bild in der Liste) */}
                <img src={product.images[0]} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price.toFixed(2)} €</p>
            </Link>
        </motion.div>
    );
}

export default ProductCard;