import readline from 'readline';
import fs from 'fs';
import { Events } from './create-event.js';

export class ConsoleInterface {
    constructor() {
        this.events = new Events();
    }

    async start() {
        console.log('Welcome to the Events Console Interface!');
        while (true) {
            await this.showMainMenu();
        }
    }

    async showMainMenu() {
        console.log('\nMain Menu:');
        console.log('1. List Events');
        console.log('2. Create New Event');
        console.log('3. Exit');

        const choice = await this.prompt('Enter your choice (1-3): ');
        
        switch (choice) {
            case '1':
                await this.listEvents();
                break;
            case '2':
                await this.createEvent();
                break;
            case '3':
                process.exit(0);
            default:
                console.log('Invalid choice. Please try again.');
        }
    }

    async listEvents() {
        const events = await this.events.listEvents();
        if (events.length === 0) {
            console.log('No events available.');
            return;
        }
        console.log('\nEvents:');
        for (const event of events) {
            console.log(`ID: ${event.id}, Name: ${event.name}, Description: ${event.desc}`);
            if (event.picture) {
                const imagePath = `${event.name}.png`;
                fs.writeFileSync(imagePath, event.picture, 'base64');
                console.log(`Picture saved as: ${imagePath}`);
            }
        }
    }

    async createEvent() {
        const name = await this.prompt('Enter event name: ');
        const desc = await this.prompt('Enter event description: ');
        const picturePath = await this.prompt('Enter path to picture (or leave blank for default): ');
        const event = await this.events.createEvent(name, desc, picturePath);
        console.log(`Created new event: ID: ${event.id}, Name: ${event.name}, Description: ${event.desc}`);
        if (event.picture) {
            console.log('Picture: [Attached]');
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