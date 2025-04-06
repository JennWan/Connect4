import fs from 'fs';
import path from 'path';

export class Events {
    defaultPict = fs.readFileSync(path.resolve("ARC'TERYX.png"), "base64");

    constructor() {
        this.storageKey = 'events_data';
        this.randomStorageKey = 'random_event';
        this.events = [];
        this.loadFromStorage();
        
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem(this.storageKey);
            this.events = data ? JSON.parse(data) : [];
        } catch (error) {
            console.warn('Failed to load data from storage:', error);
            this.events = [];
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.events));
        } catch (error) {
            console.warn('Failed to save data to storage:', error);
        }
    }

   getRandom() {
        const randomEvent = events[Math.floor(Math.random() * this.events.length)];
        this.saveRandom(randomEvent);
        return randomEvent;
   }

   saveRandom(event) {
        try {
            localStorage.setItem(this.randomStorageKey, JSON.stringify(event));
        }  catch(error) {
            console.warn('Failed to save data to storage:', error);
        }
   }

    async listEvents() {
        return this.events;
    }

    async createEvent(name, desc, pict) {
        const picture = pict ? fs.readFileSync(pict, "base64") : this.defaultPict;
        const event = {
            id: this.events.length,
            name: name,
            desc: desc,
            picture: picture,
        }
        this.events.push(event);
        this.saveToStorage();
        return event;
    }

}