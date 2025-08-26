// src/App.jsx
import React, { useState } from 'react';
import './styles/App.css';
import './styles/ProductList.css';

import AboutUs from './components/AboutUs.jsx';
import ProductList from './components/ProductList.jsx';
import CartItems from './components/CartItems.jsx';
import Navbar from './components/Navbar.jsx';

import heroBg from './assets/background.png';
import logo from './assets/logo.png'; // <- coloque seu arquivo aqui (src/assets/logo.png)

export default function App() {
    const [showProducts, setShowProducts] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const handleGetStarted = () => setShowProducts(true);
    const handleBackToLanding = () => {
        setShowCart(false);
        setShowProducts(false);
    };
    const openCart = () => setShowCart(true);
    const closeCart = () => setShowCart(false);

    return (
        <div className="app-container">
            {/* Landing (no scroll) */}
            <div className={`landing-page ${showProducts ? 'fade-out' : ''}`}>
                <div
                    className="background-image"
                    style={{ backgroundImage: `url(${heroBg})` }}
                />
                <div className="content">
                    <div className="landing_content">
                        {/* ✅ Logo no lugar do título */}
                        <img
                            src={logo}
                            alt="E-TechShopping"
                            className="logo-img"
                            draggable="false"
                        />

                        <div className="divider" />
                        <p>Keyboards, mice, headsets, SSDs, monitors, and more.</p>

                        <button className="get-started-button" onClick={handleGetStarted}>
                            Get Started
                        </button>
                    </div>

                    <div className="aboutus_container">
                        <AboutUs />
                    </div>
                </div>
            </div>

            {/* Products panel (slides in) */}
            <div className={`product-panel ${showProducts ? 'visible' : ''}`}>
                <Navbar mode="products" onBack={handleBackToLanding} onShowCart={openCart} />
                <div className="products-scroll">
                    <ProductList />
                </div>
            </div>

            {/* Cart drawer + scrim */}
            <div className={`cart-scrim ${showCart ? 'open' : ''}`} onClick={closeCart} />
            <aside className={`cart-drawer ${showCart ? 'open' : ''}`}>
                <div className="cart-drawer-header">
                    <h3>Your Cart</h3>
                    <button className="danger" onClick={closeCart}>Close</button>
                </div>

                {/* Área rolável do carrinho */}
                <div className="cart-drawer-content">
                    <CartItems onContinueShopping={closeCart} />
                </div>
            </aside>
        </div>
    );
}
