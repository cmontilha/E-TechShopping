import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '../CartSlice';
import '../styles/ProductList.css';

export default function Navbar({ mode = 'landing', onBack, onShowCart }) {
    const qty = useSelector(selectTotalQuantity);

    return (
        <nav className="navbar">
            <ul className="ul">
                <div className="tag_home_link" style={{ gap: 8, flexDirection: 'row' }}>
                    {mode === 'products' && (
                        <button
                            onClick={onBack}
                            style={{
                                border: 0, borderRadius: 8, padding: '6px 10px',
                                background: '#fff', color: '#4CAF50', cursor: 'pointer', fontWeight: 700
                            }}
                            aria-label="Back to Landing"
                            title="Back"
                        >
                            ← Back
                        </button>
                    )}
                    <h3 style={{ margin: 0 }}>E-TechShopping</h3>
                </div>

                <div />

                <div className="cart" style={{ cursor: 'pointer' }} onClick={onShowCart}>
                    <span>🛒 Cart</span>
                    <span className="cart_quantity_count">{qty}</span>
                </div>
            </ul>
        </nav>
    );
}
