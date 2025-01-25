const chatbot = {
    init() {
        this.toggle = document.querySelector('.chatbot-toggle');
        this.container = document.querySelector('.chatbot-container');
        this.messages = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendBtn = document.getElementById('send-btn');
        this.isProcessing = false;

        this.setupEventListeners();
        this.loadHistory();
        this.showWelcomeMessage();
    },

    setupEventListeners() {
        this.toggle.addEventListener('click', () => this.toggleChat());
        document.querySelector('.close-chat').addEventListener('click', () => this.closeChat());
        this.sendBtn.addEventListener('click', () => this.handleUserInput());
        this.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey && !this.isProcessing) {
                e.preventDefault();
                this.handleUserInput();
            }
        });
    },

    toggleChat() {
        this.container.classList.toggle('open');
        this.toggle.classList.toggle('active');
        this.scrollToBottom();
    },

    closeChat() {
        this.container.classList.remove('open');
        this.toggle.classList.remove('active');
    },

    async handleUserInput() {
        const message = this.userInput.value.trim();
        if (!message || this.isProcessing) return;

        try {
            this.isProcessing = true;
            this.addMessage(message, true);
            this.userInput.value = '';
            
            // Show typing indicator
            this.showTypingIndicator();
            
            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const response = this.generateResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, false);
            
            this.saveHistory();
        } catch (error) {
            this.addMessage('⚠️ Connection error. Please try again.', false);
            console.error('Chat error:', error);
        } finally {
            this.isProcessing = false;
        }
    },

    generateResponse(userMessage) {
        const lowerMsg = userMessage.toLowerCase();
        const responses = {
            greeting: {
                patterns: [/hello/i, /hi/i, /hey/i],
                replies: [
                    "Hello! Welcome to TechParts. How can I assist you today? 😊",
                    "Hi there! What can I help you with?",
                    "Welcome! Need help with computer parts or peripherals?"
                ]
            },
            shipping: {
                patterns: [/shipping/i, /delivery/i, /ship time/i],
                replies: [
                    "We offer:\n- 🚚 Standard shipping (3-5 days)\n- ✈️ Express shipping (1-2 days)",
                    "Free shipping on orders over $500! 📦"
                ]
            },
            returns: {
                patterns: [/return/i, /refund/i, /exchange/i],
                replies: [
                    "Our return policy:\n- 30-day returns\n- Original packaging required",
                    "Need help with a return? Visit our [Returns Portal](#) 📦"
                ]
            },
            default: {
                replies: [
                    "I can help with:\n- Order tracking\n- Product recommendations\n- Technical support\nHow can I assist?",
                    "Need help with:\n1. 🖥️ Computer components\n2. ⌨️ Peripherals\n3. 📦 Shipping info\nWhat do you need?"
                ]
            }
        };

        const category = Object.entries(responses).find(([_, data]) => 
            data.patterns?.some(pattern => pattern.test(lowerMsg))
        )?.[0] || 'default';

        const replies = responses[category].replies;
        return replies[Math.floor(Math.random() * replies.length)];
    },

    addMessage(text, isUser = false) {
        const message = document.createElement('div');
        message.className = `message ${isUser ? 'user' : 'bot'}`;
        
        const time = new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        message.innerHTML = `
            <div class="message-container">
                <div class="avatar">${isUser ? '👤' : '🤖'}</div>
                <div class="content">
                    <div class="text">${this.formatMarkdown(text)}</div>
                    <div class="meta">
                        <span class="time">${time}</span>
                    </div>
                </div>
            </div>
        `;

        this.messages.appendChild(message);
        this.scrollToBottom();
    },

    showTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'message bot typing';
        typing.innerHTML = `
            <div class="message-container">
                <div class="avatar">🤖</div>
                <div class="content">
                    <div class="text"><span class="typing-dots">...</span></div>
                </div>
            </div>
        `;

        this.messages.appendChild(typing);
        this.scrollToBottom();
    },

    hideTypingIndicator() {
        const typing = this.messages.querySelector('.typing');
        if (typing) typing.remove();
    },

    formatMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
            .replace(/\n/g, '<br>');
    },

    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    },

    saveHistory() {
        const history = Array.from(this.messages.children)
            .map(msg => msg.outerHTML)
            .filter(html => !html.includes('typing'));
        
        localStorage.setItem('chatHistory', JSON.stringify(history));
    },

    loadHistory() {
        try {
            const history = JSON.parse(localStorage.getItem('chatHistory'));
            if (history) {
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
                this.addMessage("Welcome to TechParts! I'm your AI assistant. Ask me about:\n\n- Product availability\n- Order status\n- Technical specifications\n- Compatibility questions", false);
            }, 1000);
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => chatbot.init());