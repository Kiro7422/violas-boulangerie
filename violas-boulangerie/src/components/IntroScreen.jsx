import { motion } from 'framer-motion';

function IntroScreen({ onStart }) {
    return (
        <div className="intro-screen">
            <motion.div
                className="intro-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                {/* HIER KANNST DU DEINEN TEXT SCHREIBEN */}
                <p dir="rtl" className="arabic-text">
                    احم احم مبحبش اللحظات الجد دي بس كنت حابب اقول لحضرتك يا تاسوني ان دي خطوه كلنا فرحانين بيها عشان اخيرا هتظهري و تستفيدي من مواهبك و قدراتك و يمكن بالنسبالك دي خطوه بسيطه بالنسبالك بس هي اول خطوه نجاح و عايز اقولك دوسي و كلنا بنشجعك و وراكي و الموقع ده زي تشجيع مني انا و هيفين و سيلين عشان تعرفي انك مش لوحدك و ان اللي بتعمليه ذو اهميه كبيره و كلنا عايزينك تكملي و كلنا فرحنا اوي بالخطوه دي
                    احلي تاسوني و احلي boulangerie
                    ملقتش صوره للبتاع اللي شبه البرجر بقي 🙃
                    <br />
                </p>
            </motion.div>

            <motion.button
                className="intro-button"
                onClick={onStart}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                فلنبدا بدا حسن
            </motion.button>
        </div>
    );
}

export default IntroScreen;