// Chatbot functionality
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotContainer = document.querySelector('.chatbot-container');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Toggle chatbot visibility
chatbotToggle.addEventListener('click', () => {
    chatbotContainer.style.display = 'flex';
    chatbotToggle.style.display = 'none';
});

document.querySelector('.close-chat').addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
    chatbotToggle.style.display = 'block';
});

// Handle user messages
function addMessage(message, isUser = true) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simple bot responses
function handleBotResponse(userMessage) {
    const responses = {
        'hello': 'Hello! How can I assist you today?',
        'shipping': 'We offer free shipping on orders over $500!',
        'return': 'Our return policy allows returns within 30 days of purchase.',
        'payment': 'We accept all major credit cards and PayPal.',
        'default': 'Sorry, I didn\'t understand that. Could you please rephrase?'
    };

    const lowerMessage = userMessage.toLowerCase();
    let response = responses.default;

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        response = responses.hello;
    } else if (lowerMessage.includes('shipping')) {
        response = responses.shipping;
    } else if (lowerMessage.includes('return')) {
        response = responses.return;
    } else if (lowerMessage.includes('payment')) {
        response = responses.payment;
    }

    setTimeout(() => {
        addMessage(response, false);
    }, 1000);
}

// Send message
sendBtn.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        handleBotResponse(message);
        userInput.value = '';
    }
});

// Handle Enter key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

// Initial bot message
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        addMessage('Hello! How can I help you with your computer hardware needs?', false);
    }, 1000);
});