import '../styles/CartItem.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectTotalAmount, clearCart } from '../CartSlice';
import CartItem from './CartItem.jsx';

export default function CartItems({ onContinueShopping }) {
    const items = useSelector(selectCartItems);
    const total = useSelector(selectTotalAmount);
    const dispatch = useDispatch();

    const handleCheckoutShopping = () => {
        alert('Functionality to be added for future reference');
    };

    const handleClear = () => dispatch(clearCart());

    if (items.length === 0) {
        return (
            <div className="cart-container" style={{ padding: 16 }}>
                <h2>Shopping Cart</h2>
                <p>Your cart is empty.</p>
                <div className="cart-actions">
                    <button className="btn" onClick={onContinueShopping}>Continue Shopping</button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container" style={{ padding: 16 }}>
            <h2>Shopping Cart</h2>

            <div className="cart-list" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {items.map((it) => (
                    <CartItem key={it.name} item={it} />
                ))}
            </div>

            {/* FOOTER */}
            <div className="cart-summary">
                <div className="cart-total">Total: ${total.toFixed(2)}</div>
                <div className="cart-actions">
                    <button className="btn" onClick={onContinueShopping}>Continue Shopping</button>
                    <button className="btn btn-primary" onClick={handleCheckoutShopping}>Checkout</button>
                    <button className="btn btn-danger" onClick={handleClear}>Clear Cart</button>
                </div>
            </div>
        </div>
    );
}
