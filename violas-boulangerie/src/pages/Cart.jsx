import emailjs from '@emailjs/browser';

// ... innerhalb deiner Komponente, wenn man auf "Bestellen" klickt:
const sendOrder = (e) => {
    e.preventDefault();

    const templateParams = {
        name: customerName, // State aus deinem Input-Feld
        whatsapp: customerNumber, // State aus deinem Input-Feld
        bestellung: cartItems.map(item => `${item.name} (${item.preis}€)`).join(', ')
    };

    emailjs.send('DEINE_SERVICE_ID', 'DEIN_TEMPLATE_ID', templateParams, 'DEIN_PUBLIC_KEY')
        .then((response) => {
            console.log('Erfolgreich gesendet!', response.status, response.text);
            alert('Bestellung erfolgreich aufgegeben!');
            // Hier den Warenkorb leeren
        }, (error) => {
            console.log('Fehler...', error);
        });
};