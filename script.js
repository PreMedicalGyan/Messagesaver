// ✅ Fixed Login System (Username: Kuldeep, Password: 965396)
window.login = function () {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "Kuldeep" && password === "965396") {
        // Login successful
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("messageApp").style.display = "block";
    } else {
        alert("Invalid username or password!");
    }
};

// ✅ Firebase SDKs Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCihZdi6B5FYsMp1NEOTw3e7JCoSnrIt9Y",
    authDomain: "message-app-25361.firebaseapp.com",
    databaseURL: "https://message-app-25361-default-rtdb.firebaseio.com",
    projectId: "message-app-25361",
    storageBucket: "message-app-25361.firebasestorage.app",
    messagingSenderId: "314442707468",
    appId: "1:314442707468:web:fd2dedd309143f8b7cb429"
};

// ✅ Firebase Initialize
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messagesRef = ref(database, "messages");

// ✅ Save Message Function
window.saveMessage = function () {
    let messageInput = document.getElementById("messageInput");
    let messageText = messageInput.value.trim();

    if (messageText === "") {
        alert("Please write a message before saving.");
        return;
    }

    push(messagesRef, {
        message: messageText,
        timestamp: Date.now()
    });

    alert("Message Saved!");
    messageInput.value = "";
};

// ✅ Load Messages from Firebase
window.loadMessages = function () {
    let messageList = document.getElementById("messageList");
    messageList.innerHTML = "";

    onChildAdded(messagesRef, (snapshot) => {
        let messageData = snapshot.val();
        let newMessageItem = document.createElement("li");

        // ✅ Message Text
        let messageText = document.createElement("span");
        messageText.textContent = messageData.message;

        // ✅ Copy Button (📋 Icon)
        let copyButton = document.createElement("button");
        copyButton.innerHTML = "📋";
        copyButton.classList.add("copy-btn");
        copyButton.onclick = function () {
            navigator.clipboard.writeText(messageData.message);
            alert("Message Copied!");
        };

        // ✅ Append Elements
        newMessageItem.appendChild(messageText);
        newMessageItem.appendChild(copyButton);
        messageList.appendChild(newMessageItem);
    });
};

// ✅ Page Load - Load Messages
window.onload = function () {
    loadMessages();
};