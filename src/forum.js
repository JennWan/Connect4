import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, 'forum_data.json');

export class Forum {
    constructor() {
        this.conversations = [];
        this.loadFromFile();
    }

    async loadFromFile() {
        try {
            const data = await fs.readFile(DATA_FILE, 'utf8');
            this.conversations = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // File doesn't exist yet, create it with empty data
                await this.saveToFile();
            } else {
                console.warn('Failed to load data from file:', error);
                this.conversations = [];
            }
        }
    }

    async saveToFile() {
        try {
            await fs.writeFile(DATA_FILE, JSON.stringify(this.conversations, null, 2));
        } catch (error) {
            console.warn('Failed to save data to file:', error);
        }
    }
    
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
            createdAt: new Date().toISOString()
        }
        this.conversations.push(conversation);
        await this.saveToFile();
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
        await this.saveToFile();
        return message;
    }

    // Additional helper methods
    async clearAllData() {
        this.conversations = [];
        await this.saveToFile();
    }

    async deleteConversation(conversationId) {
        this.conversations = this.conversations.filter(c => c.id !== conversationId);
        await this.saveToFile();
    }
}