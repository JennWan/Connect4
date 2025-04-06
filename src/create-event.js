export class Events {
    constructor() {
        this.storageKey = 'events_data';
        this.randomStorageKey = 'random_event';
        this.defaultImageUrl = 'https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w=';
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
        if (this.events.length === 0) return null;
        const randomEvent = this.events[Math.floor(Math.random() * this.events.length)];
        this.saveRandom(randomEvent);
        return randomEvent;
    }

    saveRandom(event) {
        try {
            localStorage.setItem(this.randomStorageKey, JSON.stringify(event));
        }  catch(error) {
            console.warn('Failed to save random event to storage:', error);
        }
    }

    async listEvents() {
        return this.events;
    }

    async createEvent(name, desc, imageUrl = '') {
        const event = {
            id: this.events.length,
            name: name,
            desc: desc,
            imageUrl: this.getValidImageUrl(imageUrl),
            createdAt: new Date().toISOString()
        };
        this.events.push(event);
        this.saveToStorage();
        return event;
    }

    getValidImageUrl(imageUrl) {
        if (!imageUrl || imageUrl.trim() === '') {
            return this.defaultImageUrl;
        }
        return imageUrl;
    }

    async deleteEvent(eventId) {
        this.events = this.events.filter(e => e.id !== eventId);
        this.saveToStorage();
    }

    async clearAllEvents() {
        this.events = [];
        this.saveToStorage();
    }
} 