// src/components/Landing.jsx
import { Link } from 'react-router-dom';
import heroBg from '../assets/background.png';
import logo from '../assets/logo.png';          // <- your logo file in src/assets
import '../styles/App.css';

export default function Landing() {
    return (
        <section className="landing-page">
            <div
                className="background-image"
                style={{ backgroundImage: `url(${heroBg})` }}
            />
            <div className="content">
                <div className="landing_content">
                    {}
                    <img
                        src={logo}
                        alt="E-TechShopping"
                        className="logo-img"
                        draggable="false"
                    />

                    <div className="divider" />
                    <p>Keyboards, mice, headsets, SSDs, monitors, Raspberry Pi and more.</p>

                    <Link to="/plants">
                        <button className="get-started-button">Get Started</button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
