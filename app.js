import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs,
    onSnapshot 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// אתחול Firebase
const app = initializeApp(window.firebaseConfig);
const db = getFirestore(app);

// הוספת נתונים
window.addData = async function() {
    const name = document.getElementById('name').value;
    
    try {
        await addDoc(collection(db, "users"), {
            name: name,
            timestamp: new Date()
        });
        document.getElementById('name').value = '';
        console.log("נתונים נוספו בהצלחה!");
    } catch (error) {
        console.error("שגיאה:", error);
    }
}

// האזנה לשינויים בזמן אמת
const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = '';
    
    snapshot.forEach((doc) => {
        const data = doc.data();
        dataList.innerHTML += `<p>${data.name}</p>`;
    });
});
