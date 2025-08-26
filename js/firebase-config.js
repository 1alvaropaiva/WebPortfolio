const firebaseConfig = {
  apiKey: "AIzaSyBkFp-Gri-69zayaCwqFBLtWDGHAHWnBZI",
  authDomain: "portfolio-web-26593.firebaseapp.com",
  projectId: "portfolio-web-26593",
  storageBucket: "portfolio-web-26593.firebasestorage.app",
  messagingSenderId: "807097996914",
  appId: "1:807097996914:web:7d01bd999b886c7b1014eb"
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