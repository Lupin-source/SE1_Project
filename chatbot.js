    // Selectors
const chatbotContainer = document.querySelector(".chatbot-container");
const chatWindow = document.querySelector(".chat-window .message-list");
const messageInput = document.querySelector(".message-input");
const sendButton = document.querySelector(".send-button");
const chatbotToggle = document.querySelector("#chatbot-toggle-container");
const closeChatButton = document.querySelector(".close-chat");

// Chatbot API Setup
const API_KEY = "AIzaSyCc5Detfk2da4f6DdK5gjE7briveqvI_Dw";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
const chatHistory = [];

// Toggle Chatbot Visibility
// Toggle Chatbot Visibility
function toggleChatbot() {
    sessionStorage.removeItem("chatOpened");
    const isChatOpen = chatbotContainer.style.display === "block";

    if (isChatOpen) {
        chatbotContainer.style.display = "none";
        chatbotToggle.classList.remove("hide-toggle"); // Show toggle button
    } else {
        chatbotContainer.style.display = "block";
        chatbotToggle.classList.add("hide-toggle"); // Hide toggle button

        // Ensure the welcome message is shown when the chat opens for the first time
        if (!sessionStorage.getItem("chatOpened")) {
            sessionStorage.setItem("chatOpened", "true"); // Mark chat as opened
            setTimeout(showWelcomeMessage, 500); // Delay slightly to ensure UI is visible
        }
    }
}


// Function to Show Welcome Message
function showWelcomeMessage() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const username = loggedInUser ? JSON.parse(loggedInUser).username : "Guest";

    const welcomeText = `Hello ${username}! 👋 I'm your Chat Assistant. How can I help you today?`;
    addMessage(welcomeText, "bot");

    setTimeout(() => {
        const concernText = "Please choose one of the following concerns:";
        addMessage(concernText, "bot");
        showConcernButtons();
    }, 1000); // Delay to ensure smooth display
}
function showConcernButtons() {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("concern-buttons");

    const concerns = [
        { text: "📦 Product Concern", value: "product" },
        { text: "🔐 Account Concern", value: "account" },
        { text: "🤝 Customer Support", value: "support" },
        { text: "⚙️ Technical Concern", value: "technical" }
    ];

    concerns.forEach(concern => {
        const button = document.createElement("button");
        button.innerText = concern.text;
        button.classList.add("concern-button");
        button.onclick = () => handleConcernSelection(concern.value);
        buttonContainer.appendChild(button);
    });

    chatWindow.appendChild(buttonContainer);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
function handleConcernSelection(concern) {
    let response = "";
    let buttons = [];

    switch (concern) {
        case "product":
            if (!chatbotAwaitingProduct) {
                response = "🔍 You selected **Product Concern**. Please type the product name or category, and I'll assist you.";
                addMessage(response, "bot");
                chatbotAwaitingProduct = true;
            }
            return;

        case "account":
            response = "🔑 **Account Concern** - What do you need help with?";
            buttons = [
                { text: "Reset Password 🔑", value: "password reset" },
                { text: "Recover Account 📧", value: "recover account" },
                { text: "Update Details ⚙️", value: "update account" }
            ];
            break;

        case "support":
            response = "💬 **Customer Support** - Choose an option:";
            buttons = [
                { text: "Track Order 📦", value: "order tracking" },
                { text: "Refund Policy 💰", value: "refund policy" },
                { text: "Return Process 🔄", value: "return process" }
            ];
            break;

        case "technical":
            response = "🛠️ **Technical Concern** - Select your issue:";
            buttons = [
                { text: "Website Not Loading ⚠️", value: "website not loading" },
                { text: "App Crash 📲", value: "app crash" },
                { text: "Payment Failure 💳", value: "payment failure" }
            ];
            break;

        default:
            response = "I didn't understand that. Please select a valid option.";
    }

    addMessage(response, "bot");
    showSelectionButtons(buttons);
}
function showSelectionButtons(buttons) {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("selection-buttons");

    buttons.forEach(button => {
        const btn = document.createElement("button");
        btn.innerText = button.text;
        btn.classList.add("chat-option-button");
        btn.onclick = () => handleUserSelection(button.value);
        buttonContainer.appendChild(btn);
    });

    chatWindow.appendChild(buttonContainer);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
function handleConcernSelection(concern) {
    let response = "";
    let buttons = [];

    switch (concern) {
        case "product":
            // Prevent duplicate product concern messages
            if (!chatbotAwaitingProduct) {
                response = "🔍 You selected <b>Product Concern</b>. Please type the product name or category, and I'll assist you.";
                addMessage(response, "bot");
                chatbotAwaitingProduct = true; // Mark chatbot as waiting for product input
            }
            return;

        case "account":
            response = "🔑 <b>Account Concern</b> - What do you need help with?";
            buttons = [
                { text: "Reset Password 🔑", value: "password reset" },
                { text: "Recover Account 📧", value: "recover account" },
                { text: "Update Details ⚙️", value: "update account" }
            ];
            break;

        case "support":
            response = "💬 <b>Customer Support</b> - Choose an option:";
            buttons = [
                { text: "Track Order 📦", value: "order tracking" },
                { text: "Refund Policy 💰", value: "refund policy" },
                { text: "Return Process 🔄", value: "return process" }
            ];
            break;

        case "technical":
            response = "🛠️ <b>Technical Concern</b> - Select your issue:";
            buttons = [
                { text: "Website Not Loading ⚠️", value: "website not loading" },
                { text: "Payment Failure 💳", value: "payment failure" }
            ];
            break;

        default:
            response = "I didn't understand that. Please select a valid option.";
    }

    addMessage(response, "bot");
    showSelectionButtons(buttons);
}





// Close Chatbot Function (For 'X' Button)
closeChatButton.addEventListener("click", () => {
    chatbotContainer.style.display = "none";
    chatbotToggle.classList.remove("hide-toggle"); // Show toggle button again
});

// Function to Add Messages to Chat Window

function addMessage(text, sender) {
    const messageElement = document.createElement("li");
    messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");

    if (sender === "bot") {
        messageElement.innerHTML = `
            <div class="bot-container">
                <img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" alt="Bot" class="bot-icon">
                <div class="bot-text">${text}</div>
            </div>
        `;
    } else {
        messageElement.innerHTML = `<div class="user-text">${text}</div>`;
    }

    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
function checkForProductQuestion(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Keywords that indicate a product-related question
    const questionKeywords = ["price", "how much", "available", "stock", "cost", "buy", "do you have", "show me", "is there"];

    // Check if the message contains any of the keywords
    const isProductQuestion = questionKeywords.some(keyword => lowerCaseMessage.includes(keyword));

    if (isProductQuestion) {
        // Search for a matching product in the database
        return findProductInMessage(lowerCaseMessage);
    }

    return false;
}

function findProductInMessage(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Search for products in TechPart's database
    const foundProducts = products.filter(product =>
        lowerCaseMessage.includes(product.name.toLowerCase()) || 
        lowerCaseMessage.includes(product.category.toLowerCase()) ||
        (lowerCaseMessage.includes("intel") && product.name.toLowerCase().includes("intel")) ||
        (lowerCaseMessage.includes("amd") && product.name.toLowerCase().includes("amd")) ||
        (lowerCaseMessage.includes("nvidia") && product.name.toLowerCase().includes("nvidia"))
    );

    if (foundProducts.length > 0) {
        let response = `<div style="color: #3498db; font-weight: bold;">✅ Available Products:</div><br>`;
        foundProducts.forEach(product => {
            response += `
                <div style="margin-bottom: 10px;">
                    <span style="color: #e74c3c; font-weight: bold;">🛒 ${product.name}</span><br>
                    <span style="color: #2ecc71; font-weight: bold;">💰 Price:</span> ₱${product.price.toLocaleString()}<br>
                    <span style="color: #f39c12; font-weight: bold;">📦 Category:</span> ${product.category}<br>
                    <span style="color: #9b59b6; font-weight: bold;">📖 Description:</span> ${product.description}<br>
                </div>`;
        });

        addMessage(response, "bot");
        return true;
    } else {
        addMessage(`<span style="color: #e74c3c; font-weight: bold;">⚠️ Sorry, I couldn't find that product.</span> Try searching by category (e.g., 'graphics-card').`, "bot");
        return true;
    }
}

function handleUserSelection(selection) {
    addMessage(`✅ ${selection}`, "user"); // Display user's choice

    let response = "";
    switch (selection) {
        // Account Concerns
        case "reset password ":
            response = "🔑 **To reset your password**, visit [Reset Password](#) or contact support.";
            break;
        case "recover account":
            response = "📧 **To recover your account**, check your email for recovery instructions or contact support.";
            break;
        case "update account":
            response = "⚙️ **To update your account details**, go to your profile settings or contact support.";
            break;

        // Customer Support
        case "order tracking":
            response = "📦 **To track your order**, enter your order number on [Track Order](#) page.";
            break;
        case "refund policy":
            response = "💰 **For refunds**, check our [Refund Policy](#) or contact support.";
            break;
        case "return process":
            response = "🔄 **To return a product**, visit our [Return Process](#) page for instructions.";
            break;

        // Technical Concerns
        case "website not loading":
            response = "⚠️ **Try clearing your cache, using a different browser, or checking your internet connection.**";
            break;
        case "app crash":
            response = "📲 **Try updating the app or reinstalling it. If the issue persists, contact support.**";
            break;
        case "payment failure":
            response = "💳 **Check your card details, try another payment method, or contact support.**";
            break;

        default:
            response = "I didn't understand that. Please try again.";
    }

    addMessage(response, "bot");
}



// Function to Generate Bot Response
async function generateBotResponse() {
    const requestBody = {
        contents: chatHistory,
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);

        const botText = data.candidates[0].content.parts[0].text.trim();
        addMessage(botText, "bot");

        // Store bot response in history
        chatHistory.push({ role: "model", parts: [{ text: botText }] });

    } catch (error) {
        addMessage("Error: Unable to fetch response.", "bot");
        console.error(error);
    }
}

// Handle Sending Messages
let chatbotAwaitingProduct = false; // Track if chatbot is waiting for product input

function sendMessage() {
    const userMessage = messageInput.value.trim();
    if (!userMessage) return;

    // Display user message
    addMessage(userMessage, "user");
    messageInput.value = "";

    // If chatbot is waiting for product input, search for a product
    if (chatbotAwaitingProduct) {
        chatbotAwaitingProduct = false; // Reset flag after handling product input
        findProductInMessage(userMessage);
        return;
    }

    // Check if the user is asking a product-related question before AI response
    if (checkForProductQuestion(userMessage)) {
        return;
    }

    // Store user message in chat history
    chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

    // Show bot thinking message
    const thinkingMessage = document.createElement("li");
    thinkingMessage.classList.add("bot-message");
    thinkingMessage.innerText = "Thinking...";
    chatWindow.appendChild(thinkingMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Generate AI response after a delay
    setTimeout(() => {
        chatWindow.removeChild(thinkingMessage);
        generateBotResponse();
    }, 800);
}



// Event Listeners
sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});
function handleProductInquiry(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Search for product by name or category
    const foundProduct = products.find(product => 
        product.name.toLowerCase().includes(lowerCaseMessage) || 
        product.category.toLowerCase().includes(lowerCaseMessage)
    );

    if (foundProduct) {
        addMessage(`🛒 Product Found: **${foundProduct.name}**  
        💰 Price: ₱${foundProduct.price.toLocaleString()}  
        📦 Category: ${foundProduct.category}`, "bot");
    } else {
        addMessage("⚠️ Sorry, I couldn't find that product. Please check the spelling or try another product.", "bot");
    }
}
