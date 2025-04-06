export class Forum {
    constructor(forumId = 'default') {
        this.forumId = forumId;
        this.baseStorageKey = 'forum_data';
        this.storageKey = `${this.baseStorageKey}_${forumId}`;
        this.conversations = [];
        this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem(this.storageKey);
            this.conversations = data ? JSON.parse(data) : [];
        } catch (error) {
            console.warn('Failed to load data from storage:', error);
            this.conversations = [];
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.conversations));
        } catch (error) {
            console.warn('Failed to save data to storage:', error);
        }
    }
    
    //public method to list conversations as Promise<Conversation[]>
    async listConversation() {
        return this.conversations;
    }

    async listMessages(conversationId) {
        const conversation = this.conversations.find(c => c.id === conversationId);
        return conversation ? conversation.messages : [];
    }

    async createConversation(title) {
        const conversation = {
            id: this.conversations.length,
            title: title,
            messages: [],
            createdAt: new Date().toISOString()
        }
        this.conversations.push(conversation);
        this.saveToStorage();
        return conversation;
    }

    async addMessage(conversationId, text, author) {
        const conversation = this.conversations.find(c => c.id === conversationId);
        if (!conversation) {
            throw new Error('Conversation not found');
        }
        
        const message = {
            id: conversation.messages.length,
            text: text,
            author: author,
            createdAt: new Date().toISOString()
        }
        conversation.messages.push(message);
        this.saveToStorage();
        return message;
    }

    // Additional helper methods
    async clearAllData() {
        this.conversations = [];
        localStorage.removeItem(this.storageKey);
    }

    async deleteConversation(conversationId) {
        this.conversations = this.conversations.filter(c => c.id !== conversationId);
        this.saveToStorage();
    }
}