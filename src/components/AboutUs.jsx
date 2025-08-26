import React from 'react';
import '../styles/AboutUs.css';

function AboutUs() {
    return (
        <div className="about-us-container">
            <p className="about-us-description">
                Welcome to <strong>E-TechShopping</strong>, your simple online store for essential tech gear.
            </p>

            <p className="about-us-content">
                We focus on practical items for developers, students, and creators: keyboards, mice, headsets, SSDs,
                monitors, Raspberry Pi kits, and more. The goal of this project is to demonstrate a clean
                e-commerce flow: browse products, add to cart, adjust quantities, and see accurate subtotals and totals.
            </p>

            <p className="about-us-content">
                E-TechShopping is built to showcase core e-commerce functionality with React Hooks and Redux state management.
                Suggestions for new features are always appreciated!
            </p>

            <p className="about-us-content">
                Thanks for stopping by and happy building!
            </p>
        </div>
    );
}

export default AboutUs;
