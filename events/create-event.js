import fs from 'fs';
import path from 'path';

export class Events {
    events = [];
    defaultPict = fs.readFileSync(path.resolve("ARC'TERYX.png"), "base64");

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
        return event;
    }

}