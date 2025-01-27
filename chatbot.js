const chatbot = {
    init() {
        this.toggle = document.getElementById('chatbot-toggle');
        this.container = document.getElementById('chatbot-container');
        this.closeBtn = document.getElementById('close-chat');
        this.messages = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendBtn = document.getElementById('send-btn');
        this.isProcessing = false;

        this.setupEventListeners();
        this.showWelcomeMessage();
    },

    setupEventListeners() {
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        this.sendBtn.addEventListener('click', () => this.handleUserInput());
        this.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserInput();
            }
        });
    },

    toggleChat() {
        this.container.classList.toggle('d-none');
    },

    closeChat() {
        this.container.classList.add('d-none');
    },

    async handleUserInput() {
        const message = this.userInput.value.trim();
        if (!message || this.isProcessing) return;

        this.isProcessing = true;
        this.addMessage(message, true);
        this.userInput.value = '';

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const response = this.generateResponse(message);
        this.addMessage(response, false);

        this.isProcessing = false;
    },

    generateResponse(userMessage) {
        const responses = {
            greeting: ["Hello! How can I assist you today? 😊"],
            default: ["I’m here to help with your queries!"],
        };

        return responses.greeting[0];
    },

    addMessage(text, isUser) {
        const message = document.createElement("div");
        message.className = `message ${isUser ? "user" : "bot"}`;
        message.textContent = text;
        this.messages.appendChild(message);
      
        // Scroll to the bottom of the chat
        this.messages.scrollTop = this.messages.scrollHeight;
      }
      ,

    showWelcomeMessage() {
        setTimeout(() => {
            this.addMessage("Welcome to Tech Support! How can I help you?", false);
        }, 1000);
    },
};

// Initialize the chatbot
document.addEventListener('DOMContentLoaded', () => chatbot.init());
