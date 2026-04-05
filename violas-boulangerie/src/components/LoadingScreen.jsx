import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
    useEffect(() => {
        // Nach 3 Sekunden verschwindet der Ladebildschirm
        setTimeout(() => {
            onComplete();
        }, 3000);
    }, [onComplete]);

    return (
        <div className="loading-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdf6e3' }}>

            {/* Das Logo fadet ein */}
            <motion.img
                src="/logo.png" // Pack dein Logo in den 'public' Ordner!
                alt="Viola's Boulangerie"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                style={{ width: '250px' }}
            />

            {/* Ein Baguette / Croissant fliegt von unten rein */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                style={{ fontSize: '3rem', marginTop: '20px' }}
            >
                🥖 🥐
            </motion.div>
        </div>
    );
}