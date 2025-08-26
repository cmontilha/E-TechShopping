import '../styles/ProductList.css';
import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from '../CartSlice';

// local images
import teclado from '../assets/teclado.png';
import mouse from '../assets/mouse.png';
import headset from '../assets/headset.png';
import ssd from '../assets/raspberryPi5.png'; // or change to an ssd image file if you add one later
import monitor from '../assets/monitor.png';
import hubusb from '../assets/hubUSB-C7em1.png';
import microfone from '../assets/microfone.png';
import adaptador from '../assets/adaptador.png';

const products = [
    {
        name: 'Mechanical Keyboard (RGB)',
        category: 'Keyboards',
        image_url: teclado,
        description: 'Hot-swappable switches, per-key RGB, aluminum frame.',
        cost: '$89.99',
    },
    {
        name: 'Ergonomic Mouse',
        category: 'Accessories',
        image_url: mouse,
        description: 'Low-latency sensor, 8 buttons, 2.4G + BT.',
        cost: '$39.90',
    },
    {
        name: 'Wireless Headset',
        category: 'Audio',
        image_url: headset,
        description: 'ENC mic, 40h battery, low-latency mode.',
        cost: '$79.00',
    },
    {
        name: 'Portable Monitor 1080p',
        category: 'Monitors',
        image_url: monitor,
        description: '15.6", IPS, USB-C power + video.',
        cost: '$189.00',
    },
    {
        name: 'USB-C 7-in-1 Hub',
        category: 'Accessories',
        image_url: hubusb,
        description: 'HDMI, SD/TF, 2x USB-A, USB-C PD, gigabit.',
        cost: '$29.00',
    },
    {
        name: 'Condenser Microphone (USB)',
        category: 'Audio',
        image_url: microfone,
        description: 'Cardioid pattern, mute button, headphone jack.',
        cost: '$59.00',
    },
    {
        name: 'USB-C to HDMI Adapter',
        category: 'Adapters',
        image_url: adaptador,
        description: '4K@60Hz, aluminum shell, plug & play.',
        cost: '$19.00',
    },
    {
        name: 'Raspberry Pi 5 (8GB)',
        category: 'SBC Kits',
        image_url: ssd,
        description: 'Maker kit for IoT/CS projects (board-only for demo).',
        cost: '$79.00',
    },
];

export default function ProductList() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const [addedToCart, setAddedToCart] = useState({}); // { [name]: true }

    useMemo(() => {
        const preset = {};
        for (const it of cartItems) preset[it.name] = true;
        setAddedToCart(preset);
    }, [cartItems]);

    const grouped = products.reduce((acc, p) => {
        (acc[p.category] = acc[p.category] || []).push(p);
        return acc;
    }, {});

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart(prev => ({ ...prev, [product.name]: true }));
    };

    return (
        <div className="product-grid">
            {Object.entries(grouped).map(([section, items]) => (
                <section key={section} style={{ width: '100%' }}>
                    <div className="plantname_heading">
                        <h2 className="plant_heading">{section}</h2>
                    </div>

                    <div className="product-list">
                        {items.map((p) => (
                            <div className="product-card" key={p.name}>
                                <img className="product-image" src={p.image_url} alt={p.name} />
                                <div className="product-title">{p.name}</div>
                                <div className="product-price">{p.cost}</div>
                                <p style={{ minHeight: 48 }}>{p.description}</p>

                                <button
                                    className={`product-button ${addedToCart[p.name] ? 'added-to-cart' : ''}`}
                                    disabled={!!addedToCart[p.name]}
                                    onClick={() => handleAddToCart(p)}
                                >
                                    {addedToCart[p.name] ? 'Added to Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
