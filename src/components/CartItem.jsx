import '../styles/CartItem.css';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../CartSlice'; // <- fixed relative import

const parseCost = (raw) => {
    if (raw == null) return 0;
    let s = String(raw).trim();
    s = s.replace(/R\$\s?|\$\s?/g, '').replace(/\s+/g, '');
    const hasDot = s.includes('.');
    const hasComma = s.includes(',');
    if (hasDot && hasComma) {
        s = s.replace(/\./g, '').replace(',', '.');
    } else if (!hasDot && hasComma) {
        s = s.replace(',', '.');
    }
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
};


export default function CartItem({ item }) {
    const dispatch = useDispatch();
    const unit = parseCost(item.cost);
    const subtotal = (unit * item.quantity).toFixed(2);

    const handleIncrement = () => {
        dispatch(updateQuantity({ name: item.name, amount: item.quantity + 1 }));
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, amount: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = () => dispatch(removeItem(item.name));

    return (
        <div className="cart-item">
            <img src={item.image_url} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Unit: {item.cost}</div>

                <div className="cart-item-quantity">
                    <button className="cart-item-button" onClick={handleDecrement}>−</button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button className="cart-item-button" onClick={handleIncrement}>+</button>
                </div>

                <div className="cart-item-total">Subtotal: ${subtotal}</div>

                <button className="cart-item-delete" onClick={handleRemove}>Delete</button>
            </div>
        </div>
    );
}
