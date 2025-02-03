const chatbot = {
    init() {
        this.toggle = document.getElementById('chatbot-toggle');
        this.container = document.getElementById('chatbot-container');
        this.closeBtn = document.getElementById('close-chat');
        this.messages = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendBtn = document.getElementById('send-btn');
        this.typingIndicator = document.createElement('div');
        this.typingIndicator.className = 'typing-indicator';
        this.typingIndicator.textContent = 'Typing...';
        this.messages.appendChild(this.typingIndicator);
        this.isProcessing = false;
        this.userName = this.getUserName();
        this.chatHistory = this.getChatHistory(); // Retrieve chat history from local storage
        this.awaitingInput = null;
        this.currentCategory = null; // Track the main menu category selected

        this.setupEventListeners();
        if (!this.userName) {
            this.addMessage("Please log in first.", false);
        } else {
            this.messages.innerHTML = ""; // Clear the chat UI before displaying history
            this.displayChatHistory(); // Display chat history when user is logged in
            this.showMainMenu();
        }
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

        // Assuming you have a logout button to trigger logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
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
        this.addMessage(message, true); // Add user message to the chat UI
        this.userInput.value = '';
        this.chatHistory.push({ sender: 'User', message, timestamp: new Date().toISOString() }); // Save user message to history

        this.typingIndicator.style.display = 'block';
        await new Promise(resolve => setTimeout(resolve, 800));

        let botResponse = "";
        if (this.awaitingInput) {
            this.awaitingInput(message);
            this.awaitingInput = null;
        } else {
            botResponse = this.processMenuSelection(message); // Get AI response
        }

        if (botResponse) {
            this.addMessage(botResponse, false); // Add AI response to the chat UI
            this.chatHistory.push({ sender: 'Bot', message: botResponse, timestamp: new Date().toISOString() }); // Save AI response to history
        }

        this.typingIndicator.style.display = 'none';
        this.isProcessing = false;

        this.saveChatHistory(); // Save the updated chat history
    },

    processMenuSelection(selection) {
        if (this.currentCategory) {
            return this.handleSubMenuSelection(selection);
        }

        let response = "";
        switch (selection) {
            case '1': // Order Issues
                this.currentCategory = 'orderIssues';
                response = "What issue are you experiencing with your order?\n1. Order Not Received\n2. Wrong Item Received\n3. Order Delay";
                break;
            case '2': // Technical Issues
                this.currentCategory = 'techIssues';
                response = "What technical issue do you need help with?\n1. Website Not Loading\n2. App Crashes\n3. Payment Failure";
                break;
            case '3': // Account Issues
                this.currentCategory = 'accountIssues';
                response = "What issue are you facing with your account?\n1. Account Not Accessible\n2. Forgot Password\n3. Account Deletion";
                break;
            case '4': // Customer Support
                this.currentCategory = 'customerSupport';
                response = "How can we assist you with customer support?\n1. Contact Support\n2. Chat with Agent\n3. FAQs";
                break;
            case 'exit': // Exit
                response = "Thank you for visiting! Have a great day!";
                break;
            default:
                response = "I'm not sure how to respond to that. Please choose a valid option.";
                this.showMainMenu();
        }
        return response;
    },

    handleSubMenuSelection(selection) {
        let response = "";
        switch (this.currentCategory) {
            case 'orderIssues':
                switch (selection) {
                    case '1':
                        response = "Sorry for the inconvenience. You can check your order status here: [link]";
                        break;
                    case '2':
                        response = "We apologize for the mix-up. Here's how to return the wrong item: [link]";
                        break;
                    case '3':
                        response = "We understand the delay is frustrating. Here's what you can do: [link]";
                        break;
                    default:
                        response = "I'm sorry, I didn't understand that selection. Please choose a valid option.";
                }
                break;
            case 'techIssues':
                switch (selection) {
                    case '1':
                        response = "If the website isn't loading, try clearing your cache or using a different browser.";
                        break;
                    case '2':
                        response = "If the app crashes, make sure you're using the latest version. Here's how to update: [link]";
                        break;
                    case '3':
                        response = "For payment issues, check if your card details are correct or try a different method.";
                        break;
                    default:
                        response = "I'm sorry, I didn't understand that selection. Please choose a valid option.";
                }
                break;
            case 'accountIssues':
                switch (selection) {
                    case '1':
                        response = "If you're having trouble accessing your account, follow these steps: [link]";
                        break;
                    case '2':
                        response = "To reset your password, go to the 'Forgot Password' section on the login page.";
                        break;
                    case '3':
                        response = "To delete your account, follow these instructions: [link]";
                        break;
                    default:
                        response = "I'm sorry, I didn't understand that selection. Please choose a valid option.";
                }
                break;
            case 'customerSupport':
                switch (selection) {
                    case '1':
                        response = "You can contact support via email or phone. Here are the details: [link]";
                        break;
                    case '2':
                        response = "You can chat with an agent now. Please hold for a moment.";
                        break;
                    case '3':
                        response = "Here are the frequently asked questions that might help: [link]";
                        break;
                    default:
                        response = "I'm sorry, I didn't understand that selection. Please choose a valid option.";
                }
                break;
            default:
                response = "I'm sorry, I didn't understand that selection. Please choose a valid option.";
        }
        return response;
    },

    showMainMenu() {
        const userName = this.getUserName(); // Get the user's name
        const greeting = userName ? `Hi, ${userName}! Welcome to customer support. How can I assist you today?` : "Hi! Welcome to customer support. How can I assist you today?";
        this.addMessage(greeting, false);
        this.addMessage("1. Order Issues\n2. Technical Issues\n3. Account Issues\n4. Customer Support\nType 'exit' to leave.", false);
    },

    addMessage(text, isUser) {
        const message = document.createElement("div");
        message.className = `message ${isUser ? "user" : "bot"}`;
        message.textContent = text;
        this.messages.appendChild(message);
        this.messages.scrollTop = this.messages.scrollHeight;
    },

    getUserName() {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        return loggedInUser ? loggedInUser.username : null;
    },

    getChatHistory() {
        const history = JSON.parse(localStorage.getItem('chatHistory')) || {};
        return history[this.userName] || [];
    },

    saveChatHistory() {
        const history = JSON.parse(localStorage.getItem('chatHistory')) || {};
        history[this.userName] = this.chatHistory;
        localStorage.setItem('chatHistory', JSON.stringify(history));
    },

    displayChatHistory() {
        this.chatHistory.forEach(entry => {
            this.addMessage(entry.message, entry.sender === 'User');
        });
    },

    logout() {
        // Save the chat history before logging out
        this.saveChatHistory();
        
        // Clear user data from local storage
        localStorage.removeItem('loggedInUser');
        
        // Optionally, clear chat history after logout (uncomment if needed)
        // localStorage.removeItem('chatHistory');
        
        // Inform the user that they have logged out
        this.addMessage("You have successfully logged out. See you next time!", false);

        // Optionally, close the chat container
        this.closeChat();
    }
};

document.addEventListener('DOMContentLoaded', () => chatbot.init());