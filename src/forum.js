export class Forum {
    conversations = [];
    
    //public method to list conversations as Promise<Conversation[]>
    async listConversation() {
        return this.conversations;
    }

    async listMessages(conversationId) {
        const conversation = this.conversations.find(c => c.id === conversationId);
        return conversation.messages;
    }

    async createConversation(title) {
        const conversation = {
            id: this.conversations.length,
            title: title,
            messages: [],
        }
        this.conversations.push(conversation);
        return conversation;
    }

    async addMessage(conversationId, text, author) {
        const conversation = this.conversations.find(c => c.id === conversationId);
        const message = {
            id: conversation.messages.length,
            text: text,
            author: author,
        }
        conversation.messages.push(message);
    }
}