const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
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