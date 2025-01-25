const chatbot = {
    init() {
        this.toggle = document.querySelector('.chatbot-toggle');
        this.container = document.querySelector('.chatbot-container');
        this.messages = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendBtn = document.getElementById('send-btn');
        this.isTyping = false;

        this.setupEventListeners();
        this.loadHistory();
        this.showWelcomeMessage();
    },

    setupEventListeners() {
        this.toggle.addEventListener('click', () => this.toggleChat());
        document.querySelector('.close-chat').addEventListener('click', () => this.closeChat());
        this.sendBtn.addEventListener('click', () => this.handleUserInput());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.isTyping) this.handleUserInput();
        });
    },

    toggleChat() {
        this.container.style.display = 'flex';
        this.toggle.style.display = 'none';
        this.scrollToBottom();
    },

    closeChat() {
        this.container.style.display = 'none';
        this.toggle.style.display = 'block';
    },

    addMessage(text, isUser = true) {
        const message = document.createElement('div');
        message.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const time = new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        message.innerHTML = `
            <div class="message-header">
                <div class="avatar ${isUser ? 'user' : 'bot'}"></div>
                <strong>${isUser ? 'You' : 'TechBot'}</strong>
            </div>
            <div class="message-content">${text}</div>
            <div class="message-time">${time}</div>
        `;

        this.messages.appendChild(message);
        this.scrollToBottom();
        this.saveHistory();
    },

    async handleUserInput() {
        try {
            const message = this.userInput.value.trim();
            if (!message || this.isTyping) return;

            this.addMessage(message, true);
            this.userInput.value = '';
            this.showTypingIndicator();
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const response = this.generateResponse(message);
            this.addMessage(response, false);
            this.hideTypingIndicator();
        } catch (error) {
            console.error('Chat error:', error);
            this.addMessage('Sorry, something went wrong. Please try again.', false);
            this.hideTypingIndicator();
        }
    },

    generateResponse(userMessage) {
        const lowerMsg = userMessage.toLowerCase();
        const responses = {
            greeting: [
                'Hello! How can I assist you today?',
                'Hi there! What can I help you with?',
                'Welcome to TechParts! How can I help?'
            ],
            shipping: [
                'We offer free shipping on orders over $500!',
                'Standard shipping takes 3-5 business days',
                'Express shipping available for $9.99'
            ],
            returns: [
                '30-day return policy for unused items',
                'Please contact support@techparts.com for returns',
                'Most items come with 1-year warranty'
            ],
            order: [
                'Check your order status with your order number',
                'Track your package using our order tracking system',
                'Shipping updates are sent via email'
            ],
            default: [
                'Could you please rephrase that?',
                'I\'m here to help with product questions!',
                'For more help, email support@techparts.com'
            ]
        };

        let category = 'default';
        if (/(hello|hi|hey)/i.test(lowerMsg)) category = 'greeting';
        if (/(ship|delivery)/i.test(lowerMsg)) category = 'shipping';
        if (/(return|refund)/i.test(lowerMsg)) category = 'returns';
        if (/(order|track)/i.test(lowerMsg)) category = 'order';

        const replyOptions = responses[category] || responses.default;
        return replyOptions[Math.floor(Math.random() * replyOptions.length)];
    },

    showTypingIndicator() {
        if (this.isTyping) return;
        this.isTyping = true;
        
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = `
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        `;
        
        this.messages.appendChild(typing);
        this.scrollToBottom();
    },

    hideTypingIndicator() {
        this.isTyping = false;
        const indicators = this.messages.querySelectorAll('.typing-indicator');
        indicators.forEach(indicator => indicator.remove());
    },

    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    },

    saveHistory() {
        try {
            const history = Array.from(this.messages.children)
                .map(msg => msg.outerHTML)
                .filter(html => !html.includes('typing-indicator'));
            
            localStorage.setItem('chatHistory', JSON.stringify(history));
        } catch (error) {
            console.error('Error saving history:', error);
        }
    },

    loadHistory() {
        try {
            const history = JSON.parse(localStorage.getItem('chatHistory'));
            if (history && history.length > 0) {
                this.messages.innerHTML = history.join('');
                this.scrollToBottom();
            }
        } catch (error) {
            console.error('Error loading history:', error);
            localStorage.removeItem('chatHistory');
        }
    },

    showWelcomeMessage() {
        if (!localStorage.getItem('chatHistory')) {
            setTimeout(() => {
                this.addMessage('Welcome to TechParts! How can I help you today?', false);
            }, 500);
        }
    }
};

// Initialize when DOM is loaded
if (document.readyState !== 'loading') {
    chatbot.init();
} else {
    document.addEventListener('DOMContentLoaded', () => chatbot.init());
}