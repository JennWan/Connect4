import { Forum } from './forum.js';
import readline from 'readline';

export class ConsoleInterface {
    constructor() {
        this.forum = new Forum();
        this.currentConversationId = null;
    }

    async start() {
        console.log('Welcome to the Forum Console Interface!');
        while (true) {
            await this.showMainMenu();
        }
    }

    async showMainMenu() {
        console.log('\nMain Menu:');
        console.log('1. List Conversations');
        console.log('2. Create New Conversation');
        console.log('3. Select Conversation');
        console.log('4. Delete Conversation');
        console.log('5. Clear All Data');
        console.log('6. Exit');

        const choice = await this.prompt('Enter your choice (1-6): ');
        
        switch (choice) {
            case '1':
                await this.listConversations();
                break;
            case '2':
                await this.createConversation();
                break;
            case '3':
                await this.selectConversation();
                break;
            case '4':
                await this.deleteConversation();
                break;
            case '5':
                await this.clearAllData();
                break;
            case '6':
                process.exit(0);
            default:
                console.log('Invalid choice. Please try again.');
        }
    }

    async listConversations() {
        const conversations = await this.forum.listConversation();
        if (conversations.length === 0) {
            console.log('No conversations available.');
            return;
        }
        console.log('\nConversations:');
        conversations.forEach(conv => {
            console.log(`${conv.id}: ${conv.title} (${conv.messages.length} messages)`);
        });
    }

    async createConversation() {
        const title = await this.prompt('Enter conversation title: ');
        const conversation = await this.forum.createConversation(title);
        console.log(`Created new conversation: ${conversation.title}`);
    }

    async selectConversation() {
        const conversations = await this.forum.listConversation();
        if (conversations.length === 0) {
            console.log('No conversations available.');
            return;
        }

        console.log('\nAvailable Conversations:');
        conversations.forEach(conv => {
            console.log(`${conv.id}: ${conv.title}`);
        });

        const id = await this.prompt('Enter conversation ID: ');
        const conversation = conversations.find(c => c.id === parseInt(id));
        
        if (!conversation) {
            console.log('Invalid conversation ID.');
            return;
        }

        this.currentConversationId = parseInt(id);
        await this.showConversationMenu();
    }

    async showConversationMenu() {
        while (true) {
            console.log('\nConversation Menu:');
            console.log('1. View Messages');
            console.log('2. Add Message');
            console.log('3. Back to Main Menu');

            const choice = await this.prompt('Enter your choice (1-3): ');
            
            switch (choice) {
                case '1':
                    await this.viewMessages();
                    break;
                case '2':
                    await this.addMessage();
                    break;
                case '3':
                    this.currentConversationId = null;
                    return;
                default:
                    console.log('Invalid choice. Please try again.');
            }
        }
    }

    async viewMessages() {
        const messages = await this.forum.listMessages(this.currentConversationId);
        if (messages.length === 0) {
            console.log('No messages in this conversation.');
            return;
        }
        console.log('\nMessages:');
        messages.forEach(msg => {
            console.log(`${msg.author}: ${msg.text}`);
        });
    }

    async addMessage() {
        const text = await this.prompt('Enter your message: ');
        const author = await this.prompt('Enter your name: ');
        await this.forum.addMessage(this.currentConversationId, text, author);
        console.log('Message added successfully!');
    }

    async deleteConversation() {
        const conversations = await this.forum.listConversation();
        if (conversations.length === 0) {
            console.log('No conversations available to delete.');
            return;
        }

        console.log('\nAvailable Conversations:');
        conversations.forEach(conv => {
            console.log(`${conv.id}: ${conv.title}`);
        });

        const id = await this.prompt('Enter conversation ID to delete: ');
        const conversation = conversations.find(c => c.id === parseInt(id));
        
        if (!conversation) {
            console.log('Invalid conversation ID.');
            return;
        }

        const confirm = await this.prompt(`Are you sure you want to delete conversation "${conversation.title}"? (yes/no): `);
        if (confirm.toLowerCase() === 'yes') {
            await this.forum.deleteConversation(parseInt(id));
            console.log('Conversation deleted successfully.');
        } else {
            console.log('Deletion cancelled.');
        }
    }

    async clearAllData() {
        const confirm = await this.prompt('WARNING: This will delete ALL conversations and messages. Are you sure? (yes/no): ');
        if (confirm.toLowerCase() === 'yes') {
            await this.forum.clearAllData();
            console.log('All data has been cleared.');
        } else {
            console.log('Operation cancelled.');
        }
    }

    prompt(question) {
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question(question, (answer) => {
                rl.close();
                resolve(answer);
            });
        });
    }
} 