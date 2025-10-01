const firebaseConfig = {
    apiKey: "AIzaSyChno4wU3q2Zkuivw6xXszUC_otw_-YrdE",
    authDomain: "portfolio-dee26.firebaseapp.com",
    projectId: "portfolio-dee26",
    storageBucket: "portfolio-dee26.firebasestorage.app",
    messagingSenderId: "77213621627",
    appId: "1:77213621627:web:9f78b5ea7848a4b6aa71de"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function sendContactMessage(name, email, message) {
    try {
        const docRef = await db.collection("contacts").add({
            name: name,
            email: email,
            message: message,
            timestamp: new Date()
        });
        console.log("Mensagem enviada com ID: ", docRef.id);
        return true;
    } catch (error) {
        console.error("Erro ao enviar mensagem: ", error);
        return false;
    }
}