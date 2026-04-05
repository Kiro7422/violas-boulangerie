import { products } from '../data';
import ProductCard from '../components/ProductCard';

function Home() {
    return (
        <div className="page home-page">
            <h1>المنتجات</h1>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Home;