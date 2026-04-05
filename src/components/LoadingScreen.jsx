import { motion } from 'framer-motion';

function LoadingScreen() {
    return (
        <div className="loading-screen">
            <motion.img
                src="/BoulangrieLogo.png"
                alt="Violas Boulangerie Logo"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 1 }}
                transition={{ duration: 2 }}
                className="loading-logo-large"
            />

            <motion.div
                className="falling-item visible-item"
                initial={{ y: -200, opacity: 0, x: -100 }}
                animate={{ y: 800, opacity: 1, rotate: 720 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
                🥖
            </motion.div>
            <motion.div
                className="falling-item visible-item"
                initial={{ y: -200, opacity: 0, x: 100 }}
                animate={{ y: 800, opacity: 1, rotate: -720 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
            >
                🥐
            </motion.div>
            <motion.div
                className="falling-item visible-item"
                initial={{ y: -200, opacity: 0, x: 0 }}
                animate={{ y: 800, opacity: 1, rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
            >
                🥨
            </motion.div>
        </div>
    );
}

export default LoadingScreen;